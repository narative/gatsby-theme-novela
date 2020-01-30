import React from 'react';

import SEO from '@components/SEO';

import { IArticle, IAuthor } from '@types';
import { graphql, useStaticQuery } from 'gatsby';

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
            siteUrl
          }
        }
      }
    }
  }
`;

interface ArticleSEOProps {
  article: IArticle;
  authors: IAuthor[];
  location: Location;
}

const ArticleSEO: React.FC<ArticleSEOProps> = ({
  article,
  authors,
  location,
}) => {
  const results = useStaticQuery(siteQuery);
  const name = results.allSite.edges[0].node.siteMetadata.name;
  const siteUrl = results.allSite.edges[0].node.siteMetadata.siteUrl;

  const authorsData = authors.map(author => ({
    '@type': 'Person',
    name: author.name,
  }));

  /**
   * For some reason `location.href` is undefined here when using `yarn build`.
   * That is why I am using static query `allSite` to get needed fields: name & siteUrl.
   */
  let microdata = `{
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${siteUrl + location.pathname}"
    },
    "headline": "${article.title}",
    "image": "${siteUrl + article.hero.seo.src}",
    "datePublished": "${article.dateForSEO}",
    "dateModified": "${article.dateForSEO}",
    "author": ${JSON.stringify(authorsData)},
    "description": "${article.excerpt.replace(/"/g, '\\"')}",
    "publisher": {
      "@type": "Organization",
      "name": "${name}",
      "logo": {
        "@type": "ImageObject",
        "url": "${siteUrl}/icons/icon-512x512.png"
      }
    }
  }
`.replace(/"[^"]+"|(\s)/gm, function(matched, group1) {
    if (!group1) {
      return matched;
    } else {
      return '';
    }
  });
  /**
   * See here for the explanation of the regex above:
   * https://stackoverflow.com/a/23667311
   */

  return (
    <SEO
      title={article.title}
      description={article.excerpt}
      image={article.hero.seo.src}
      timeToRead={article.timeToRead}
      published={article.date}
      pathname={location.href}
      canonicalUrl={article.canonicalUrl}
      tags={article.tags}
    >
      <script type="application/ld+json">{microdata}</script>
    </SEO>
  );
};

export default ArticleSEO;
