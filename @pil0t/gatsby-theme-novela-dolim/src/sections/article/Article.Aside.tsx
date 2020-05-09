import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import throttle from "lodash/throttle";

import HandleOverlap from "./Article.HandleOverlap";

import mediaqueries from "@styles/media";
import { clamp } from "@utils";

interface AsideProps {
  contentHeight: number;
}

/**
 * Aside: the wonderful fixed positioned elements that are to the left
 * and the right of the written content on our articles. For example, the
 * progress bar and dark controls are within an Aside. The main responsibility
 * of this component is to show or hide its children if it's at the top or bottom
 * of the page!
 *
 * The left and right Asides!
 *
 * left Aside ----> |  content  | <--- right Aside
 *                  |  content  |
 *                  |  content  |
 *                  |  content  |
 *
 */
const Aside: React.FC<AsideProps> = ({ contentHeight, children }) => {
  const progressRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState<number>(0);
  const [imageOffset, setImageOffset] = useState<number>(0);
  const [shouldFixAside, setShouldFixAside] = useState<boolean>(false);

  const show = imageOffset && progress < 100;
  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { show }),
  );

  useEffect(() => {
    const imageRect = document
      .getElementById("ArticleImage__Hero")
      .getBoundingClientRect();

    const imageOffsetFromTopOfWindow = imageRect.top + window.scrollY;
    setImageOffset(imageOffsetFromTopOfWindow);

    const handleScroll = throttle(() => {
      const el = progressRef.current;
      const top = el.getBoundingClientRect().top;
      const height = el.offsetHeight;
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      const percentComplete = (window.scrollY / contentHeight) * 100;

      setProgress(clamp(+percentComplete.toFixed(2), 0, 105));

      if (top + window.scrollY < imageOffsetFromTopOfWindow) {
        return setShouldFixAside(false);
      }

      if (top + height / 2 <= windowHeight / 2) {
        return setShouldFixAside(true);
      }
    }, 20);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [contentHeight]);

  return (
    <AsideContainer>
      <Align
        show={show}
        imageOffset={imageOffset}
        shouldFixAside={shouldFixAside}
      >
        <div ref={progressRef}>
          <HandleOverlap>{childrenWithProps}</HandleOverlap>
        </div>
      </Align>
    </AsideContainer>
  );
}

export default Aside;

const AsideContainer = styled.aside`
  display: flex;
  margin: 0 auto;
  max-width: 1140px;

  ${mediaqueries.desktop_medium`
    display: none;
  `}
`;

const Align = React.memo(styled.div<{
  show: boolean;
  shouldFixAside: boolean;
  imageOffset: number;
}>`
  position: ${p => (p.shouldFixAside ? "fixed" : "absolute")};
  display: flex;
  transform: translateY(0px);
  top: ${p => (p.shouldFixAside ? 0 : p.imageOffset)}px;
  align-items: ${p => (p.shouldFixAside ? "center" : "flex-start")};
  height: 100vh;
  z-index: 3;

  opacity: ${p => (p.show ? 1 : 0)};
  visibility: ${p => (p.show ? "visible" : "hidden")};
  transition: ${p =>
    p.show
      ? "opacity 0.4s linear, visibility 0.4s linear"
      : "opacity 0.2s linear, visibility 0.4s linear"};
`);
