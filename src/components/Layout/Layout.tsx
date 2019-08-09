import React from "react";
import { ThemeProvider, useColorMode } from "theme-ui";
import { Global } from "@emotion/core";

import Container from "@components/Layout/Layout.Container";
import Footer from "@components/Navigation/Navigation.Footer";

import { globalStyles } from "@styles";
import theme from "../../gatsby-plugin-theme-ui";
import {colors} from "../../gatsby-plugin-theme-ui/colors";

interface LayoutProps {
  children: React.ReactChild;
}

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
function Layout({ children, ...rest }: LayoutProps) {
  const [colorMode] = useColorMode();
  let finalTheme = theme;

  if (colorMode === "dark") {
    finalTheme = Object.assign({}, theme, { colors: colors.modes[colorMode] });
  }

  return (
    <ThemeProvider theme={finalTheme}>
      <>
        <Global styles={globalStyles} />
        <Container {...rest}>
          {children}
          <Footer />
        </Container>
      </>
    </ThemeProvider>
  );
}

export default Layout;
