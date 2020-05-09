import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { useColorMode } from 'theme-ui';

import Icons from '@icons';

import {
  getHighlightedTextPositioning,
  getSelectionDimensions,
  getSelectionText,
  getWindowDimensions,
  getBreakpointFromTheme,
} from '@utils';

interface MenuFloatState {
  x: number;
  y: number;
  show: boolean;
}

/**
 * Values we get to be able to ensure the positionting context are correct!
 * Padding is derviced from the CSS value in Editor
 */
const MENU_WIDTH: number = 225;
const MENU_HEIGHT: number = 46;

const ArticleShare: React.FC<{}> = () => {
  const [colorMode] = useColorMode();
  const [text, setText] = useState('');
  const [focus, setFocus] = useState(false);
  const [canTweet, setCanTweet] = useState(true);
  const [{ x, y, show }, setPosition] = useState<MenuFloatState>({
    x: 0,
    y: 0,
    show: false,
  });

  const share = generateShare(text);
  const isDark = colorMode === 'dark';

  useEffect(() => {
    const events: string[] = ['keydown', 'keyup', 'mouseup', 'resize'];

    function handleMenuFloatSettings() {
      /**
       * Why is there a setTimeout here?
       * There is an issue with clicking on highlited text and the browsers ability
       * to calcualte the correct ranges. If you highlight text, then click on it,
       * the window.selection values will give the previous ranges instead of the current!
       */
      setTimeout(() => {
        const article = document.getElementsByTagName('article')[0];
        const paragraphOffset = document.getElementsByTagName('p')[0]
          .offsetLeft;

        if (!article) return;

        // We want to not show the menu float in code blocks
        const codeBlocks = Array.from(
          article.getElementsByClassName('prism-code'),
        );
        const isHighlightedInCodeBlock = codeBlocks.some(block =>
          window.getSelection().containsNode(block, true),
        );

        if (isHighlightedInCodeBlock) return;

        const articleBox = article.getBoundingClientRect() as DOMRect;

        const { width, height } = getSelectionDimensions();
        const { x, y } = getHighlightedTextPositioning();
        const { width: windowWidth } = getWindowDimensions();
        const tablet = getBreakpointFromTheme('tablet');
        const desktop = getBreakpointFromTheme('desktop');

        /**
         * Because the article is offset to the side to compensate for the progress bar
         * we need to calculate the offset of the menu share in the same way.
         */
        let paddingOffset = 0;

        if (windowWidth > tablet) {
          paddingOffset = 53;
        }

        if (windowWidth > desktop) {
          paddingOffset = 68;
        }

        /**
         * Get the X and Y offsets of the editors Left and Top positions
         * If the height is great than 20 (the user has highlighted more than 2 rows of text)
         * then start the position from the left most edge so we can center the bar in
         * the middle of the text area
         */
        const offset: { x: number; y: number } = {
          x: height > 29 ? paragraphOffset + paddingOffset : x,
          y: y - articleBox.y - 160,
        };

        setPosition({
          x: offset.x + width / 2 - MENU_WIDTH / 2 - paddingOffset,
          y: offset.y - MENU_HEIGHT - 5,
          show: width > 1,
        });

        setText(getSelectionText());
      }, 0);
    }

    // attach all events
    events.forEach(event =>
      window.addEventListener(event, handleMenuFloatSettings),
    );

    return () => {
      // remove all events after mount
      events.forEach(event =>
        window.removeEventListener(event, handleMenuFloatSettings),
      );
    };
  }, [show]);

  /**
   * Small workaround to set the focus once the x and y positiosn are set.
   * If this is not here the user would see a quick flash of the floating bar
   * in its old position and then animating to the new location. We don't want that.
   */
  useEffect(() => {
    setTimeout(() => {
      const { width } = getSelectionDimensions();
      setFocus(width > 1);
    }, 0);
  }, [show]);

  function handleCopyClick() {
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.setAttribute('value', text);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  }

  /**
   * Setting the ability to tweet. If the user highlights more than the allowed
   * characters we need to give them feedback that it's too long to tweet.
   */
  useEffect(() => {
    const tweetLimit = 280;
    const otherCharactersInTweet = '""—  '; // 2 quotes, 1 emdash, 2 spaces
    const url = window.location.href;
    const tweet = text + url + otherCharactersInTweet;

    setCanTweet(tweet.length <= tweetLimit);
  }, [text]);

  return (
    <MenuFloat
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        display: show && focus ? 'flex' : 'none',
        pointerEvents: show && focus ? 'initial' : 'none',
      }}
      isDark={isDark}
    >
      <MenuText>Share: </MenuText>
      <ReferralLink disabled={!canTweet} share={share.twitter}>
        <Icons.Twitter width="18px" height="15px" />
      </ReferralLink>
      <ReferralLink disabled={false} share={share.linkedin}>
        <Icons.LinkedIn width="16px" height="16px" />
      </ReferralLink>
      <MenuDivider />
      <MenuButton onClick={handleCopyClick} aria-label="Copy selected text">
        <Icons.Copy />
      </MenuButton>
    </MenuFloat>
  );
};

export default ArticleShare;

function ReferralLink({ disabled, share, children }) {
  function handleClick(event) {
    event.preventDefault();
    if (disabled) return;

    window.open(
      share,
      '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600',
    );
  }

  return (
    <MenuShare
      href={disabled ? '' : share}
      onClick={handleClick}
      disabled={disabled}
    >
      <Hidden>Share the selected text</Hidden>
      {children}
    </MenuShare>
  );
}

function generateShare(shareText: string) {
  if (!shareText) return {};
  const url = window.location.href;

  return {
    twitter: `https://twitter.com/intent/tweet?text="${shareText}" — ${url}`,
    linkedin: `http://www.linkedin.com/shareArticle?mini=true&url=${url}&summary=${shareText}&title=${shareText}`,
  };
}

const popUpwards = keyframes`
  0% {
    transform:matrix(.97,0,0,1,0,12);
    opacity:0
  }
  20% {
    transform:matrix(.99,0,0,1,0,2);
    opacity:.7
  }
  40% {
    transform:matrix(1,0,0,1,0,-1);
    opacity:1
  }
  70% {
    transform:matrix(1,0,0,1,0,0);
    opacity:1
  }
  100% {
    transform:matrix(1,0,0,1,0,0);
    opacity:1
  }
`;

const MenuFloat = styled.div<{ isDark: boolean }>`
  position: absolute;
  align-items: center;
  z-index: 1;
  width: ${MENU_WIDTH}px;
  height: ${MENU_HEIGHT}px;
  padding: 7px 11px 7px 19px;
  color: ${p => p.theme.colors.grey};
  background: ${p => (p.isDark ? '#fafafa' : '#000')};
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  transition: left 75ms ease-out, right 75ms ease-out, background 200ms;
  animation: ${popUpwards} 200ms forwards;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: -8px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid ${p => (p.isDark ? '#fafafa' : '#000')};
    transition: border-color 200ms;
  }

  svg {
    path {
      fill: ${p => (p.isDark ? '#000' : '#fff')};
    }
  }
`;

const MenuText = styled.span`
  margin-right: 8px;
`;

const Hidden = styled.div`
  width: 0px;
  height: 0px;
  visibility: hidden;
  opacity: 0;
`;

const MenuShare = styled.a<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px 11px;
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};

  svg {
    path {
      fill: ${p => (p.disabled ? '#F89797' : '')};
    }
  }
`;

const MenuButton = styled.button`
  display: inline-block;
  padding: 16px 11px;
`;

const MenuDivider = styled.div`
  display: inline-block;
  height: 17px;
  width: 1px;
  position: relative;
  margin: 0 8px;
  background: rgba(115, 115, 125, 0.3);
`;
