import React from "react";

export interface IPaginator {
  pageCount: number;
  index: number;
  pathPrefix: string;
}

interface IGatsbyImage {
  src: string;
  base64?: string;
  srcWebp?: string;
  srcSet?: string;
  srcSetWebp?: string;
  tracedSVG?: string;
}

interface IGatsbyImageFluid extends IGatsbyImage {
  maxHeight: number;
  maxWidth: number;
}

interface IGatsbyImageFixed extends IGatsbyImage {
  height: number;
  width: number;
}

export interface IAuthor {
  authorsPage?: boolean;
  featured?: boolean;
  name: string;
  slug: string;
  bio: string;
  avatar: {
    image: IGatsbyImageFluid;
    full: IGatsbyImageFluid;
  };
}

export interface IArticle {
  slug: string;
  authors: IAuthor[];
  excerpt: string;
  body: string;
  id: string;
  hero: {
    full: IGatsbyImageFluid;
    preview: IGatsbyImageFluid;
    regular: IGatsbyImageFluid;
    seo: string;
  };
  timeToRead: number;
  date: string;
}

interface IArticleQuery {
  edges: {
    node: IArticle;
  }[];
}

export interface IProgress {
  height: number;
  offset: number;
  title: string;
  mode: string;
  onClose?: () => void;
}

export type Icon = React.FC<{
  fill: string
}>

export type Template = React.FC<{
  pageContext: {
    article: IArticle;
    authors: IAuthor[];
    mailchimp: boolean;
    next: IArticle[];
  };
  location: Location;
}>
