const ArticleFormOptions = {
  fields: [
    {
      label: 'Title',
      name: 'rawFrontmatter.title',
      description: 'Enter the title of the post here',
      component: 'text',
    },
    {
      label: 'Authors',
      name: 'rawFrontmatter.author',
      description: 'Add author names separated by comas.',
      component: 'text',
    },
    {
      label: 'Date',
      name: 'rawFrontmatter.date',
      component: 'text',
    },
    {
      label: 'Article Hero',
      name: 'rawFrontmatter.hero',
      description: 'Add a link to hero image',
      component: 'text',
    },
    {
      label: 'Excerpt',
      name: 'rawFrontmatter.excerpt',
      component: 'text',
    },
    {
      label: 'Canonical URL',
      name: 'rawFrontmatter.canonical_url',
      component: 'text',
    },
    {
      label: 'Body',
      name: 'rawMdxBody',
      description: 'Enter the post body',
      component: 'textarea',
    },
  ],
};

export default ArticleFormOptions;
