import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";

import Icons from "../../icons/";
import mediaqueries from "@styles/media";

import { Theme } from "../../gatsby-plugin-theme-ui";

const icons = {
  dribbble: Icons.Dribbble,
  linkedin: Icons.LinkedIn,
  twitter: Icons.Twitter,
  facebook: Icons.Facebook,
  instagram: Icons.Instagram,
  github: Icons.Github,
};

const socialQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            social {
              name
              url
            }
          }
        }
      }
    }
  }
`;

function SocialLinks({ fill = "#73737D" }: { fill: string }) {
  const result = useStaticQuery(socialQuery);
  const socialOptions = result.allSite.edges[0].node.siteMetadata.social;

  return (
    <>
      {socialOptions.map(option => {
        const Icon = icons[option.name];

        return (
          <SocialIconContainer
            key={option.name}
            target="_blank"
            rel="noopener"
            data-a11y="false"
            aria-label={`Link to ${option.name}`}
            href={option.url}
          >
            <Icon fill={fill} />
            <Hidden>Link to ${option.name}</Hidden>
          </SocialIconContainer>
        );
      })}
    </>
  );
}

export default SocialLinks;

const SocialIconContainer = styled.a<{theme: Theme}>`
  position: relative;
  margin-left: 3.2rem;
  text-decoration: none;

  &:hover {
    svg {
      &:hover * {
        fill: ${p => p.theme.colors.primary};
      }
      * {
        transition: fill 0.25s var(--ease-in-out-quad);
      }
    }
  }

  &:first-of-type {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  &[data-a11y="true"]:focus::after {
    content: "";
    position: absolute;
    left: -50%;
    top: -20%;
    width: 200%;
    height: 160%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.tablet`
    margin: 0 2.2rem;
  `};
`;

const Hidden = styled.span`
  width: 0px;
  height: 0px;
  visibility: hidden;
  opacity: 0;
  overflow: hidden;
  display: inline-block;
`;
