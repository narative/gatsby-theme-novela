import styled from "@emotion/styled";
import { Theme } from "../../gatsby-plugin-theme-ui";

const Anchor = styled.a<{theme: Theme}>`
  transition: color 0.25s ease;
  color: ${p => p.theme.colors.accent};

  &:visited {
    color: ${p => p.theme.colors.accent};
    opacity: 0.85;
  }

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

export default Anchor;
