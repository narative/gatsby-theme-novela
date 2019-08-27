import React from "react";
import { ThemeProvider, useColorMode } from "theme-ui";
import { Global } from "@emotion/core";
import styled from "@emotion/styled";

import NavigationFooter from "@components/Navigation/NavigationFooter";
import NavigationHeader from "@components/Navigation/NavigationHeader";
import ArticlesContextProvider from "../../sections/articles/ArticlesListContext";

import { globalStyles } from "@styles";
import theme from "../../gatsby-plugin-theme-ui";
import colors from "../../gatsby-plugin-theme-ui/colors";

interface LayoutProps {
  children: React.ReactChild;
}

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
function Layout({ children }: LayoutProps) {
  const [colorMode] = useColorMode();
  let finalTheme = theme;

  if (colorMode === "dark") {
    finalTheme = Object.assign({}, theme, { colors: colors.modes[colorMode] });
  }

  return (
    <ThemeProvider theme={finalTheme}>
      <ArticlesContextProvider>
        <Container>
          <Global styles={globalStyles} />
          <NavigationHeader />
          {children}
          <NavigationFooter />
        </Container>
      </ArticlesContextProvider>
    </ThemeProvider>
  );
}

export default Layout;

const Container = styled.div`
  position: relative;
  background: ${p => p.theme.colors.background};
  transition: ${p => p.theme.colorModeTransition};
  min-height: 100vh;
`;
