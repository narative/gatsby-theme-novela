require('dotenv').config();

const siteMetadata = {
  title: `Dolim's Dev Log`,
  name: `Dolim`,
  siteUrl: `https://dolim.kr`,
  description: `Dolim's IT, Computer Science Blog`,
  hero: {
    heading: `DoLim's Dev Log`,
    maxWidth: 800,
  },
  social: [
    //   {
    //     name: `twitter`,
    //     url: `https://twitter.com/narative`,
    //   },
    {
      name: `github`,
      url: `https://github.com/imdigo`,
    },
    {
      name: `instagram`,
      url: `https://www.instagram.com/dong_0_lim/`,
    },
    //   {
    //     name: `linkedin`,
    //     url: `https://www.linkedin.com/company/narative/`,
    //   },
    //   {
    //     name: `dribbble`,
    //     url: `https://dribbble.com/narativestudio`,
    //   },
  ],
};

const plugins = [
  {
    resolve: '@narative/gatsby-theme-novela',
    options: {
      // contentPosts: "content/posts",
      // contentAuthors: "content/authors",
      rootPath: '/',
      basePath: '/',
      // authorsPage: true,
      // mailchimp: true,
      // sources: {
      //   local: false,
      //   contentful: true,
      // },
      // contentPosts: "content/posts",
      // contentAuthors: "content/authors",
      // basePath: "/",
      // articlePermalinkFormat: ':year/:slug', // Do not work when source is contentful
      authorsPage: true,
      sources: {
        local: false,
        contentful: true,
      },
    },
  },
  {
    // resolve: `gatsby-plugin-manifest`,
    // options: {
    //   name: `Novela by Narative`,
    //   short_name: `Novela`,
    //   start_url: `/`,
    //   background_color: `#fff`,
    //   theme_color: `#fff`,
    //   display: `standalone`,
    //   icon: `src/assets/favicon.png`,
    // },
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `DoLim's Dev Log`,
      short_name: `Dolim`,
      start_url: `/`,
      background_color: `#fff`,
      theme_color: `#fff`,
      display: `standalone`,
      icon: `src/assets/favicon.png`,
      lang: `ko`,
    },
  },
  `gatsby-plugin-sitemap`,
  `gatsby-plugin-robots-txt`,
  {
    resolve: 'gatsby-plugin-google-tagmanager',
    options: {
      id: 'GTM-WZKHHMR',

      // Include GTM in development.
      // Defaults to false meaning GTM will only be loaded in production.
      includeInDevelopment: false,

      // datalayer to be set before GTM is loaded
      // should be an object or a function that is executed in the browser
      // Defaults to null
      defaultDataLayer: { platform: 'gatsby' },

      // Specify optional GTM environment details.
      // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
      // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
      // dataLayerName: "YOUR_DATA_LAYER_NAME",
    },
  },
  {
    resolve: `gatsby-plugin-gtag`,
    options: {
      // your google analytics tracking id
      trackingId: `G-P1WTZGD1ZS`,
      // Puts tracking script in the head instead of the body
      head: true,
      // enable ip anonymization
      anonymize: false,
    },
  },
  {
    resolve: 'gatsby-plugin-mailchimp',
    options: {
      endpoint:
        'https://narative.us19.list-manage.com/subscribe/post?u=65ef169332a03669b9538f6ef&amp;id=c55c426282',
    },
  },
];

/**
 * For development purposes if there's no Contentful Space ID and Access Token
 * set we don't want to add in gatsby-source-contentful because it will throw
 * an error.
 *
 * To enanble Contentful you must
 * 1. Create a new Space on contentful.com
 * 2. Import the Contentful Model from @narative/gatsby-theme-novela/conteful
 * 3. Add .env to www/ (see www/env.example)
 * 4. Enable contentful as a source in this file for @narative/gatsby-theme-novela
 */
if (process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN) {
  plugins.push({
    resolve: 'gatsby-source-contentful',
    options: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    },
  });
}

module.exports = {
  siteMetadata,
  plugins,
};
