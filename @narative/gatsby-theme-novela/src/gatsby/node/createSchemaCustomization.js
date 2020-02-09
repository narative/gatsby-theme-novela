module.exports = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type PluginOptions {
      basePath: String
      rootPath: String
      isSideMenuEnabled: Boolean
    }
    type SitePlugin implements Node {
      pluginOptions: PluginOptions
    }
  `;

  createTypes(typeDefs);
};
