module.exports = ({
  contentAuthors = 'content/authors',
  contentPosts = 'content/posts',
}) => ({
  mapping: {
    'Mdx.frontmatter.author': `AuthorsYaml`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: contentPosts,
        name: contentPosts,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: contentAuthors,
        name: contentAuthors,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 10000,
              linkImagesToOriginal: false,
              quality: 80,
              withWebp: true,
            },
          },
          { resolve: `gatsby-remark-copy-linked-files` },
          { resolve: `gatsby-remark-numbered-footnotes` },
          { resolve: `gatsby-remark-smartypants` },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noreferrer', // eslint-disable-line unicorn/prevent-abbreviations
            },
          },
        ],
        remarkPlugins: [require(`remark-slug`)], // eslint-disable-line global-require
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        displayName: process.env.NODE_ENV === `development`,
      },
    },
    `gatsby-plugin-theme-ui`,
  ],
});
