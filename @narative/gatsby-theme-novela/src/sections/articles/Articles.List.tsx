import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from 'gatsby';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';

import mediaqueries from '@styles/media';
import { IArticle } from '@types';

import { GridLayoutContext } from './Articles.List.Context';

import TagsList from '../tags/Tags.List';

/**
 * Tiles
 * [LONG], [SHORT]
 * [SHORT], [LONG]
 * [SHORT], [LONG]
 *
 * or ------------
 *
 * Rows
 * [LONG]
 * [LONG]
 * [LONG]
 */

interface ArticlesListProps {
  articles: IArticle[];
  alwaysShowAllDetails?: boolean;
  tags?: boolean;
}

interface ArticlesListItemProps {
  article: IArticle;
  narrow?: boolean;
  tags?: boolean;
}

const ArticlesList: React.FC<ArticlesListProps> = ({
  articles,
  alwaysShowAllDetails,
  tags,
}) => {
  if (!articles) return null;

  const hasOnlyOneArticle = articles.length === 1;
  const { gridLayout = 'tiles', hasSetGridLayout, getGridLayout } = useContext(
    GridLayoutContext,
  );

  /**
   * We're taking the flat array of articles [{}, {}, {}...]
   * and turning it into an array of pairs of articles [[{}, {}], [{}, {}], [{}, {}]...]
   * This makes it simpler to create the grid we want
   */
  const articlePairs = articles.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []);

  useEffect(() => getGridLayout(), []);

  return (
    <ArticlesListContainer
      style={{ opacity: hasSetGridLayout ? 1 : 0 }}
      alwaysShowAllDetails={alwaysShowAllDetails}
    >
      {articlePairs.map((ap, index) => {
        const isEven = index % 2 !== 0;
        const isOdd = index % 2 !== 1;

        return (
          <List
            key={index}
            gridLayout={gridLayout}
            hasOnlyOneArticle={hasOnlyOneArticle}
            reverse={isEven}
          >
            <ListItem article={ap[0]} narrow={isEven} tags={tags} />
            <ListItem article={ap[1]} narrow={isOdd} tags={tags} />
          </List>
        );
      })}
    </ArticlesListContainer>
  );
};

export default ArticlesList;

const ListItem: React.FC<ArticlesListItemProps> = ({
  article,
  narrow,
  tags,
}) => {
  if (!article) return null;

  const { gridLayout } = useContext(GridLayoutContext);
  const hasOverflow = narrow && article.title.length > 35;
  const imageSource = narrow ? article.hero.narrow : article.hero.regular;
  const hasHeroImage =
    imageSource &&
    Object.keys(imageSource).length !== 0 &&
    imageSource.constructor === Object;

  return (
    <Item gridLayout={gridLayout}>
      <ArticleLink to={article.slug} data-a11y="false">
        <ImageContainer narrow={narrow} gridLayout={gridLayout}>
          {hasHeroImage ? <Image src={imageSource} /> : <ImagePlaceholder />}
        </ImageContainer>
      </ArticleLink>
      <div>
        <ArticleLink to={article.slug} data-a11y="false">
          <Title dark hasOverflow={hasOverflow} gridLayout={gridLayout}>
            {article.title}
          </Title>
          <Excerpt
            narrow={narrow}
            hasOverflow={hasOverflow}
            gridLayout={gridLayout}
          >
            {article.excerpt}
          </Excerpt>
          <MetaData tags={tags && article.tags.length > 0}>
            {article.date} · {article.timeToRead} min read
          </MetaData>
        </ArticleLink>
        {tags && (
          <Tags narrow={narrow}>
            <TagsList tags={article.tags} />
          </Tags>
        )}
      </div>
    </Item>
  );
};

const wide = '1fr';
const narrow = '457px';

const limitToTwoLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;

  ${mediaqueries.phablet`
    -webkit-line-clamp: 3;
  `}
`;

const showDetails = css`
  p {
    display: -webkit-box;
  }

  h2 {
    margin-bottom: 10px;
  }
`;

const ArticlesListContainer = styled.div<{ alwaysShowAllDetails?: boolean }>`
  transition: opacity 0.25s;
  ${p => p.alwaysShowAllDetails && showDetails}
`;

const listTile = p => css`
  position: relative;
  display: grid;
  grid-template-columns: ${p.reverse
    ? `${narrow} ${wide}`
    : `${wide} ${narrow}`};
  grid-template-rows: 2;
  column-gap: 30px;

  &:not(:last-child) {
    margin-bottom: 75px;
  }

  ${mediaqueries.desktop_medium`
    grid-template-columns: 1fr 1fr;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;

    &:not(:last-child) {
      margin-bottom: 0;
    }
  `}
`;

const listItemRow = p => css`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 488px;
  grid-column-gap: 96px;
  grid-template-rows: 1;
  align-items: center;
  position: relative;
  margin-bottom: 50px;

  ${mediaqueries.desktop`
    grid-column-gap: 24px;
    grid-template-columns: 1fr 380px;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
  `}

  @media (max-width: 540px) {
    background: ${p.theme.colors.card};
  }

  ${mediaqueries.phablet`
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  `}
`;

const listItemTile = p => css`
  position: relative;

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}

  @media (max-width: 540px) {
    background: ${p.theme.colors.card};
  }

  ${mediaqueries.phablet`
    margin-bottom: 40px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  `}
`;

// If only 1 article, dont create 2 rows.
const listRow = p => css`
  display: grid;
  grid-template-rows: ${p.hasOnlyOneArticle ? '1fr' : '1fr 1fr'};
`;

const List = styled.div<{
  reverse: boolean;
  gridLayout: string;
  hasOnlyOneArticle: boolean;
}>`
  ${p => (p.gridLayout === 'tiles' ? listTile : listRow)}
`;

const Item = styled.div<{ gridLayout: string }>`
  ${p => (p.gridLayout === 'rows' ? listItemRow : listItemTile)}

  position: relative;
  display: grid;
  max-width: 100%;
  max-height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  z-index: 1;
  transition: transform 0.33s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
`;

const ImageContainer = styled.div<{ narrow: boolean; gridLayout: string }>`
  position: relative;
  height: ${p => (p.gridLayout === 'tiles' ? '280px' : '220px')};
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, ${p => (p.narrow ? 0.22 : 0.3)}),
    0 18px 36px -18px rgba(0, 0, 0, ${p => (p.narrow ? 0.25 : 0.33)});
  margin-bottom: ${p => (p.gridLayout === 'tiles' ? '30px' : 0)};
  transition: transform 0.3s var(--ease-out-quad),
    box-shadow 0.3s var(--ease-out-quad);

  & > div {
    height: 100%;
  }

  ${mediaqueries.tablet`
    height: 200px;
    margin-bottom: 35px;
  `}

  ${mediaqueries.phablet`
    overflow: hidden;
    margin-bottom: 0;
    box-shadow: none;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  `}
`;

const Title = styled(Headings.h2)`
  font-size: 21px;
  font-family: ${p => p.theme.fonts.serif};
  margin-bottom: ${p =>
    p.hasOverflow && p.gridLayout === 'tiles' ? '35px' : '10px'};
  transition: color 0.3s ease-in-out;
  ${limitToTwoLines};

  ${mediaqueries.desktop`
    margin-bottom: 15px;
  `}

  ${mediaqueries.tablet`
    font-size: 24px;
  `}

  ${mediaqueries.phablet`
    font-size: 22px;
    padding: 30px 20px 0;
    margin-bottom: 10px;
    -webkit-line-clamp: 3;
  `}
`;

const Excerpt = styled.p<{
  hasOverflow: boolean;
  narrow: boolean;
  gridLayout: string;
}>`
  ${limitToTwoLines};
  font-size: 16px;
  margin-bottom: 10px;
  color: ${p => p.theme.colors.grey};
  display: ${p => (p.hasOverflow && p.gridLayout === 'tiles' ? 'none' : 'box')};
  max-width: ${p => (p.narrow ? '415px' : '515px')};

  ${mediaqueries.desktop`
    display: -webkit-box;
  `}

  ${mediaqueries.tablet`
    margin-bottom; 15px;
  `}

  ${mediaqueries.phablet`
    max-width: 100%;
    padding:  0 20px;
    margin-bottom: 20px;
    -webkit-line-clamp: 3;
  `}
`;

const Tags = styled.div<{
  narrow: boolean;
}>`
  position: relative;
  display: block;
  width: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  z-index: 1;
  transition: transform 0.33s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  margin: 10px 0;

  ${mediaqueries.phablet`
    max-width: 100%;
    padding: 10px 15px 10px;
  `}
`;

const MetaData = styled.div<{
  tags: boolean;
}>`
  font-weight: 600;
  font-size: 16px;
  color: ${p => p.theme.colors.grey};
  opacity: 0.33;

  ${p =>
    p.tags
      ? mediaqueries.phablet`
          max-width: 100%;
          padding: 0 20px;
        `
      : mediaqueries.phablet`
          max-width: 100%;
          padding: 0 20px 30px;
        `}
`;

const ArticleLink = styled(Link)`
  &:hover ${ImageContainer}, &:focus ${ImageContainer} {
    transform: translateY(-1px);
    box-shadow: 0 50px 80px -20px rgba(0, 0, 0, 0.27),
      0 30px 50px -30px rgba(0, 0, 0, 0.3);
  }

  &:hover h2,
  &:focus h2 {
    color: ${p => p.theme.colors.accent};
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -1.5%;
    top: -2%;
    width: 103%;
    height: 104%;
    border: 3px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.phablet`
    &:hover ${ImageContainer} {
      transform: none;
      box-shadow: initial;
    }

    &:active {
      transform: scale(0.97) translateY(3px);
    }
  `}
`;
