import { projects, research, writing } from "#site/contents";

export type Post = {
  permalink: string;
  slug: string;
  title: string;
  description?: string;
  publishDate: string;
  content: string;
  thumbnailUrl?: string;
};

export const getPostBySlug = ({
  slug,
  category,
}: {
  slug: string;
  category: string;
}): Post | undefined => {
  let posts: Post[];

  switch (category) {
    case "research":
      posts = research;
      break;
    case "projects":
      posts = projects;
      break;
    case "writing":
      posts = writing;
      break;
    default:
      posts = [];
  }

  return posts.find((post) => post.slug === slug);
};
