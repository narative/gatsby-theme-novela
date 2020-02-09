import React, { useState } from 'react';
import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';
import { IArticle } from '@types';

import Anchor from '@components/Anchor';
import Section from '@components/Section';
import Headings from '@components/Headings';
import Icons from '@icons';

import SideMenuSection from './SideMenuSection.tsx';

import { useColorMode } from 'theme-ui';

const articlesQuery = graphql`
  {
    allArticle(sort: { fields: date }) {
      nodes {
        slug
        title
        secret
        date
        category
      }
    }
    sitePlugin(name: { eq: "@narative/gatsby-theme-novela" }) {
      pluginOptions {
        isSideMenuEnabled
      }
    }
  }
`;

type Section = {
  name: string;
  link: string;
  articles: Array<IArticle>;
};

function buildSectionObject(articles: Array<IArticle>): { [string]: Section } {
  return articles.reduce((acc, article) => {
    if (article.category == null) {
      return {
        ...acc,
        ...{
          [article.slug]: {
            name: article.title,
            link: article.slug,
            articles: [],
          },
        },
      };
    }
    if (acc[article.category] != null) {
      const articles = acc[article.category].articles;
      acc[article.category].articles = articles.concat(article);
    } else {
      acc[article.category] = {
        name: article.category,
        link: null,
        articles: [article],
      };
    }
    return acc;
  }, Object.create(null));
}

type Props = {
  showSideMenu: boolean;
  setShowSideMenu: (boolean) => void;
};

function SideMenu({ showSideMenu, setShowSideMenu }: Props) {
  const { allArticle, sitePlugin } = useStaticQuery(articlesQuery);
  const { isSideMenuEnabled } = sitePlugin.pluginOptions;
  if (isSideMenuEnabled !== true) {
    return <div />;
  }
  const [colorMode] = useColorMode();
  const fill = colorMode === 'dark' ? '#fff' : '#000';
  const [openSection, setOpenSection] = useState<string>(null);

  // Build section data model
  const sections = buildSectionObject(allArticle.nodes);

  return (
    <Container
      style={{
        zIndex: showSideMenu ? 999 : 0,
      }}
    >
      <ContentContainer>
        <Section>
          <RelativeContainer>
            <CloseButton onClick={() => setShowSideMenu(false)}>
              <Icons.Ex fill={fill} />
            </CloseButton>
            <Headings.h2>
              <Anchor href="/" onClick={() => setShowSideMenu(false)}>
                Home
              </Anchor>
            </Headings.h2>
            <div style={{ marginTop: 40 }}>
              {Object.keys(sections).map((sectionKey, index) => {
                const section = sections[sectionKey];
                return (
                  <div key={index}>
                    <SideMenuSection
                      isOpen={false}
                      title={section.name}
                      link={section.link}
                      sectionKey={sectionKey}
                      openSection={openSection}
                      isDark={colorMode === 'dark'}
                      hasArticles={section.articles.length > 0}
                      onClick={sectionKey =>
                        setOpenSection(
                          openSection === sectionKey ? null : sectionKey,
                        )
                      }
                    >
                      {section.articles.map(article => (
                        <ArticleLink key={article.slug}>
                          <Anchor
                            href={article.slug}
                            onClick={() => setShowSideMenu(false)}
                          >
                            {article.title}
                          </Anchor>
                        </ArticleLink>
                      ))}
                    </SideMenuSection>
                  </div>
                );
              })}
            </div>
          </RelativeContainer>
        </Section>
      </ContentContainer>
    </Container>
  );
}

export default SideMenu;

const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: ${p => p.theme.colors.background};
  z-index: 0;
  overflow: scroll;
`;

const ContentContainer = styled.div`
  padding: 50px 0px;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 4px;
  top: 0px;
`;

const RelativeContainer = styled.div`
  position: relative;
`;

const ArticleLink = styled(Headings.h4)`
  margin: 24px 0px;
`;
