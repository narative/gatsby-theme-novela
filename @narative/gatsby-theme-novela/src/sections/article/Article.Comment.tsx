import React from 'react';
import { S9comment } from 'gatsby-plugin-social9-comment'
import { graphql, useStaticQuery } from 'gatsby';

interface ArticleCommentProps {}

const siteQuery = graphql`
{
  allSitePlugin(filter: {}) {
    edges {
      node {
        pluginOptions {
          enable
        }
        name
      }
    }
  }
}
`;

const ArticleComment: React.FC<ArticleCommentProps> = ({}) => {

  const results = useStaticQuery(siteQuery);
  const plugins = results.allSitePlugin.edges;
  var is_enable = false;
  for(var i in plugins){
    if(plugins[i].node.name == "gatsby-plugin-social9-comment"){
      is_enable = plugins[i].node.pluginOptions.enable
    }
  }
  if(is_enable){
  return (
    <div className="css-xbcnqo-Paragraph"><S9comment/></div>
  );
  }else{
    return (
      <div className="css-xbcnqo-Paragraph"></div>
    );
  }
};

export default ArticleComment;
