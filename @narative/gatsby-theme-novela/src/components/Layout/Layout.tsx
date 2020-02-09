import React, { useEffect, useState } from 'react';
import { Global } from '@emotion/core';
import styled from '@emotion/styled';
import { useColorMode } from 'theme-ui';

import NavigationFooter from '@components/Navigation/Navigation.Footer';
import NavigationHeader from '@components/Navigation/Navigation.Header';
import NavigationSideMenu from '@components/SideMenu/SideMenu';
import ArticlesContextProvider from '../../sections/articles/Articles.List.Context';

import { globalStyles } from '@styles';

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
const Layout: React.FC<{}> = ({ children }) => {
  const [colorMode] = useColorMode();
  const [showSideMenu, setShowSideMenu] = useState<boolean>(false);

  useEffect(() => {
    parent.postMessage({ theme: colorMode }, '*');
  }, [colorMode]);

  return (
    <ArticlesContextProvider>
      <Container>
        {showSideMenu && (
          <NavigationSideMenu
            setShowSideMenu={setShowSideMenu}
            showSideMenu={showSideMenu}
          />
        )}
        <Global styles={globalStyles} />
        <NavigationHeader setShowSideMenu={setShowSideMenu} />
        {children}
        <NavigationFooter />
      </Container>
    </ArticlesContextProvider>
  );
};

export default Layout;

const Container = styled.div`
  position: relative;
  background: ${p => p.theme.colors.background};
  transition: ${p => p.theme.colorModeTransition};
  min-height: 100vh;
`;
