import styled from "@emotion/styled";

const Cta = styled.a`
  border-radius: 35px;
  letter-spacing: 0.42px;
  border: 1px solid;
  padding: 1rem 2rem;
  font-size: 20px;
  text-decoration: none;
  margin: 0 auto 2rem;
  color: ${p => p.theme.colors.accent};
  font-family: ${p => p.theme.fonts.sansSerif};
  transition: ${p => p.theme.colorModeTransition};

  :hover {
    background: ${p => p.theme.colors.accent};
    color: ${p => p.theme.colors.background};
  }
`;

export default Cta;
