import styled from "@emotion/styled";
import mediaqueries from "@styles/media";
import { Theme } from "../../gatsby-plugin-theme-ui";

const Blockquote = styled.blockquote<{theme: Theme}>`
  transition: color 0.25s ease;
  margin: 15px auto 50px;
  color: ${p => p.theme.colors.articleText};
  font-family: ${p => p.theme.fonts.serif};
  font-style: italic;

  ${mediaqueries.tablet`
    margin: 10px auto 35px;
  `};

  & > p {
    max-width: 880px !important;
    padding-right: 100px;
    padding-bottom: 0;
    width: 100%;
    margin: 0 auto;
    font-size: 36px;
    line-height: 1.32;
    font-weight: bold;

    ${mediaqueries.tablet`
      font-size: 26px;
      padding: 0 180px;
    `};

    ${mediaqueries.phablet`
      font-size: 36px;
      padding: 0 20px 0 40px;
    `};
  }
`;

export default Blockquote;
