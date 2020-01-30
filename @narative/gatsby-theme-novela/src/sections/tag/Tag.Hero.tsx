import React from 'react';
import styled from '@emotion/styled';

import mediaqueries from '@styles/media';

const TagHero = ({ tag }) => {
  return (
    <Hero>
      <Heading>{tag}</Heading>
    </Hero>
  );
};

export default TagHero;

const Hero = styled.div`
  position: relative;
  max-width: 100%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 35px auto 110px;
`;

const Heading = styled.h1`
  max-width: 100%;
  word-wrap: break-word;
  font-size: 38px;
  font-family: ${p => p.theme.fonts.sansSerif};
  color: ${p => p.theme.colors.primary};
  margin-bottom: 15px;
  font-weight: 600;
  text-transform: capitalize;
  ${mediaqueries.tablet`
  `}
  ${mediaqueries.phablet`
  `}
`;

const Subheading = styled.p`
  margin: 0 auto;
  max-width: 450px;
  color: ${p => p.theme.colors.grey};
  font-size: 18px;
  font-family: ${p => p.theme.fonts.sansSerif};
  line-height: 1.4;
  text-align: center;
  ${mediaqueries.phablet`
    font-size: 14px;
  `}
`;
