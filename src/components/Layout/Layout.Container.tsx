import React from "react";
import styled from "@emotion/styled";

import Navigation from "@components/Navigation/Navigation.Header";
import { Theme } from "../../gatsby-plugin-theme-ui";

interface LayoutContainerProps {
  children: React.ReactNode
  theme: Theme
}

function LayoutContainer(props: LayoutContainerProps) {
  return (
    <Container>
      <Navigation />
      {props.children}
    </Container>
  );
}

export default LayoutContainer;

const Container = styled.div<{theme: Theme}>`
  position: relative;
  background: ${p => p.theme.colors.background};
  transition: background 0.25s var(--ease-in-out-quad);
  min-height: 100vh;
`;
