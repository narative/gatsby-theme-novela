// helper that grabs the mdx resolver when given a string fieldname
const mdxResolverPassthrough = fieldName => async (
  source,
  arguments_,
  context,
  info,
) => {
  const type = info.schema.getType(`Mdx`);
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  });
  const resolver = type.getFields()[fieldName].resolve;
  const result = await resolver(mdxNode, arguments_, context, {
    fieldName,
  });
  return result;
};

// Define resolvers for custom fields
module.exports = ({ createResolvers }) => {
  createResolvers({
    Article: {
      excerpt: {
        resolve: mdxResolverPassthrough(`excerpt`),
      },
      body: {
        resolve: mdxResolverPassthrough(`body`),
      },
      timeToRead: {
        resolve: mdxResolverPassthrough(`timeToRead`),
      },
    },
  });
};
