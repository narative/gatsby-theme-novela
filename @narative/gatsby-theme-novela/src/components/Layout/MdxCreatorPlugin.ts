import { MdxCreatorPlugin } from "gatsby-tinacms-mdx";

const creatorForm = {
    label: "New Article Post",
    filename: form => {
      return form.filename
    },
    frontmatter: form => ({
      title: form.title,
      author: form.authors,
      date: new Date(),
      hero: form.hero,
      excerpt: form.excerpt,
      canonical_url: form.excerpt,
    }),
    body: form => {
      return form.body
    },
    fields: [
      {
        name: "filename",
        component: "text",
        label: "Filename",
        placeholder: "content/posts/2020-05-04-new-article/index.mdx",
        description:
          "The full path to the new markdown file, relative to the repository root.",
      },
      {
        name: "title",
        component: "text",
        label: "Title",
      },
      {
        name: "authors",
        component: "text",
        label: "Authors",
        description:
        "Add author names separated by comas.",
      },
      {
        name: "hero",
        component: "text",
        label: "Article Hero",
        description:
        "Add path to an image",
      },
      {
        name: "excerpt",
        component: "text",
        label: "Excerpt",
      },
      {
        name: "canonical_url",
        component: "text",
        label: "Canonical URL",
      },
      {
        name: "body",
        component: "textarea",
        label: "Body",
      },
    ],
  }

export default new MdxCreatorPlugin(creatorForm);