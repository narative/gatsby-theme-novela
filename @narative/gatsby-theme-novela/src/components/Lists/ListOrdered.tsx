import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const OrderedList = styled.ol`
  list-style: none;
  counter-reset: list;
  color: ${p => p.theme.colors.articleText};
  position: relative;
  padding: 15px 0 30px 30px;
  margin: 0 auto;
  transition: ${p => p.theme.colorModeTransition};
  font-size: 18px;

  width: 100%;
  max-width: 680px;

  ${mediaqueries.desktop`
    max-width: 507px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
    padding-left: 0px;
  `};

  ${mediaqueries.phablet`
    padding-left: 20px;
  `};

  li {
    position: relative;
    padding-bottom: 15px;

    ${mediaqueries.tablet`
      padding-left: 30px;
    `};

    ${mediaqueries.phablet`
      padding-left: 30px;
    `};

    p {
      ${mediaqueries.tablet`
        padding: 0;
      `};
    }
  }

  li > * {
    display: inline;
  }

  li::before {
    width: 3rem;
    display: inline-block;
    position: absolute;
    color: ${p => p.theme.colors.articleText};
  }

  li::before {
    counter-increment: list;
    content: counter(list) ".";
    font-weight: 600;
    position: absolute;
    left: -3rem;
    top: -0.3rem;
    font-size: 2rem;

    ${mediaqueries.tablet`
      left: 0;
    `};
  }
`;

export default OrderedList;
