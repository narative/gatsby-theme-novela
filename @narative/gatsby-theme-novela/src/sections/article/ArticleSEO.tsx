import React from "react";

import SEO from "@components/SEO";

import { IArticle, IAuthor } from "@types";

function ArticleSEO({
  article,
  authors,
  location,
}: {
  article: IArticle;
  authors: IAuthor[];
  location: any;
}) {
  const authorsData = authors.map(author => ({
    "@type": "Person",
    name: author.name,
  }));

  const microdata = `{
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${location.href}"
    },
    "headline": "${article.title}",
    "image": "${article.hero.seo.src}",
    "datePublished": "${article.dateForSEO}",
    "author": ${authorsData},
    "description": "${article.excerpt.replace(/"/g, '\\"')}"
  }
`.replace(/\s/g, "");

  return (
    <SEO
      title={article.title}
      description={article.excerpt}
      image={article.hero.seo.src}
      timeToRead={article.timeToRead}
      published={article.date}
      pathname={location.href}
    >
      <script type="application/ld+json">{microdata}</script>
    </SEO>
  );
}

export default ArticleSEO;
