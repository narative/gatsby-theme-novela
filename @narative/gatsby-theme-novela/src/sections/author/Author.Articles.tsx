import React from "react";
import styled from "@emotion/styled";

import mediaqueries from "@styles/media";
import { IArticle } from "@types";

import ArticlesList from "../articles/Articles.List";

interface AuthorArticlesProps {
  articles: IArticle[];
  tags?: string[];
}

const AuthorArticles: React.FC<AuthorArticlesProps> = ({ articles, tags }) => {
  return (
    <AuthorArticlesContainer>
      <ArticlesList articles={articles} tags={tags} alwaysShowAllDetails />
    </AuthorArticlesContainer>
  );
};

export default AuthorArticles;

const AuthorArticlesContainer = styled.div`
  background: linear-gradient(
    180deg,
    ${p => p.theme.colors.card} 0%,
    rgba(249, 250, 252, 0) 91.01%
  );
  border-radius: 8px;
  padding: 88px 98px;
  position: relative;
  z-index: 1;

  ${mediaqueries.desktop_medium`
    padding: 80px;
  `}

  ${mediaqueries.desktop`
    padding: 0;
    background: transparent;
  `}
`;
