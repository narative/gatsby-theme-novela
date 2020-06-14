import React from 'react';
import styled from '@emotion/styled';

import Icons from '@icons';
import mediaqueries from '@styles/media';

interface SocialLinksProps {
  links: {
    name: string;
    url: string;
  }[];
  fill: string;
}

const icons = {
  behance: Icons.Behance,
  dribbble: Icons.Dribbble,
  linkedin: Icons.LinkedIn,
  twitter: Icons.Twitter,
  facebook: Icons.Facebook,
  instagram: Icons.Instagram,
  devto: Icons.DevTo,
  github: Icons.Github,
  stackoverflow: Icons.Stackoverflow,
  youtube: Icons.YouTube,
  medium: Icons.Medium,
  notion: Icons.Notion,
  unsplash: Icons.Unsplash,
  patreon: Icons.Patreon,
  paypal: Icons.Paypal,
  digitalocean: Icons.DigitalOcean,
  tripadvisor: Icons.TripAdvisor,
  buymeacoffee: Icons.Buymeacoffee,
  mailto: Icons.Mailto,
};

const getHostname = url => {
  return new URL(url.toLowerCase()).hostname.replace(/www|com|net|\.so|org|[.-]/g,'').split('.')[0];
};

const getServicename = url => {
  return url.toLowerCase().split(':')[0];
};

const SocialLinks: React.FC<SocialLinksProps> = ({
  links,
  fill = '#73737D',
}) => {
  if (!links) return null;

  return (
    <>
      {links.map(option => {
        const name = option.name || getHostname(option.url) || getServicename(option.url);
        const Icon = icons[name];
        if (!Icon) {
          throw new Error(
            `unsupported social link name=${name} / url=${option.url}`,
          );
        }
        return (
          <SocialIconContainer
            key={option.url}
            target="_blank"
            rel="noopener nofollow"
            data-a11y="false"
            aria-label={`Link to ${option.url}`}
            href={option.url}
          >
            <Icon fill={fill} />
            <Hidden>Link to ${option.url}</Hidden>
          </SocialIconContainer>
        );
      })}
    </>
  );
};

export default SocialLinks;

const SocialIconContainer = styled.a`
  position: relative;
  margin-left: 3.2rem;
  text-decoration: none;
  max-width: 16px;

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

  &[data-a11y='true']:focus::after {
    content: '';
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
