import React from "react";
import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";

import Section from "@components/Section";
import SocialLinks from "@components/SocialLinks";

import mediaqueries from "@styles/media";

import { Theme } from "../../gatsby-plugin-theme-ui";

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
          }
        }
      }
    }
  }
`;

function Footer() {
  const results = useStaticQuery(siteQuery);
  const name = results.allSite.edges[0].node.siteMetadata.name;

  return (
    <>
      <FooterGradient />
      <Section narrow>
        <HoritzontalRule />
        <FooterContainer>
          <FooterText>
            © {new Date().getFullYear()} {name}
          </FooterText>
          <div>
            <SocialLinks />
          </div>
        </FooterContainer>
      </Section>
    </>
  );
}

export default Footer;

const FooterContainer = styled.div<{theme: Theme}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 80px;
  color: ${p => p.theme.colors.grey};

  ${mediaqueries.tablet`
    flex-direction: column;
    padding-bottom: 100px;
  `}

  ${mediaqueries.phablet`
    padding-bottom: 50px;
  `}
`;

const HoritzontalRule = styled.div<{theme: Theme}>`
  position: relative;
  margin: 140px auto 50px;
  border-bottom: 1px solid ${p => p.theme.colors.horizontalRule};

  ${mediaqueries.tablet`
    margin: 60px auto;
  `}

  ${mediaqueries.phablet`
    display: none;
  `}
`;

const FooterText = styled.div`
  ${mediaqueries.tablet`
    margin-bottom: 80px;
  `}

  ${mediaqueries.phablet`
    margin: 120px auto 100px;
  `}
`;

const FooterGradient = styled.div<{theme: Theme}>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 590px;
  z-index: 0;
  pointer-events: none;
  background: ${p => p.theme.colors.gradient};
  transition: background 0.3s var(--ease-in-out-quad);
`;
