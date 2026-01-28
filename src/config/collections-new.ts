/**
 * NEW: Centralized configuration for blog collections
 * Updated structure: Research, Projects, CV, Writing
 */

export type CollectionConfig = {
  /** Unique key for the collection (matches Velite collection name) */
  key: string;
  /** Display name */
  label: string;
  /** Description text */
  description: string;
  /** Parent category (research, projects, writing, cv) */
  parent: "research" | "projects" | "writing" | "cv";
  /** Content file pattern for Velite */
  pattern: string;
  /** Base URL path */
  path: string;
  /** Category path used in getPostBySlug */
  categoryPath: string;
};

export type CategoryConfig = {
  key: "research" | "projects" | "writing" | "cv";
  label: string;
  description: string;
  path: string;
  collections: CollectionConfig[];
};

// Define all collections with their metadata
export const collectionsConfig: CollectionConfig[] = [
  // Research collection (papers, publications)
  {
    key: "research",
    label: "Research",
    description: "Publications, papers, and research work",
    parent: "research",
    pattern: "research/**/*.mdx",
    path: "/research",
    categoryPath: "research",
  },

  // Projects collection (code projects, implementations)
  {
    key: "projects",
    label: "Projects",
    description: "Open-source projects and technical implementations",
    parent: "projects",
    pattern: "projects/**/*.mdx",
    path: "/projects",
    categoryPath: "projects",
  },

  // Writing collection (blog posts, essays, tutorials)
  {
    key: "writing",
    label: "Writing",
    description: "Blog posts, tutorials, and personal essays",
    parent: "writing",
    pattern: "writing/**/*.mdx",
    path: "/writing",
    categoryPath: "writing",
  },

  // CV collection (optional - if you want CV sections as MDX)
  {
    key: "cv",
    label: "CV",
    description: "Curriculum Vitae sections",
    parent: "cv",
    pattern: "cv/**/*.mdx",
    path: "/cv",
    categoryPath: "cv",
  },
];

// Define parent categories
export const categoriesConfig: CategoryConfig[] = [
  {
    key: "research",
    label: "Research",
    description: "Publications, papers, and research work",
    path: "/research",
    collections: collectionsConfig.filter((c) => c.parent === "research"),
  },
  {
    key: "projects",
    label: "Projects",
    description: "Open-source projects and implementations",
    path: "/projects",
    collections: collectionsConfig.filter((c) => c.parent === "projects"),
  },
  {
    key: "writing",
    label: "Writing",
    description: "Blog posts, tutorials, and essays",
    path: "/writing",
    collections: collectionsConfig.filter((c) => c.parent === "writing"),
  },
  {
    key: "cv",
    label: "CV",
    description: "Curriculum Vitae",
    path: "/cv",
    collections: collectionsConfig.filter((c) => c.parent === "cv"),
  },
];

// Utility functions for easy access
export const getCollectionByKey = (key: string): CollectionConfig | undefined =>
  collectionsConfig.find((c) => c.key === key);

export const getCollectionByPath = (
  path: string,
): CollectionConfig | undefined =>
  collectionsConfig.find((c) => path.startsWith(c.path));

export const getCategoryByKey = (key: string): CategoryConfig | undefined =>
  categoriesConfig.find((c) => c.key === key);

export const getCollectionsByParent = (
  parent: "research" | "projects" | "writing" | "cv",
): CollectionConfig[] => collectionsConfig.filter((c) => c.parent === parent);
