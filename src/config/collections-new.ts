/**
 * NEW: Centralized configuration for blog collections
 * Updated structure: Research, CV, Writing (Logbook is served as static HTML, not MDX)
 */

export type CollectionConfig = {
  /** Unique key for the collection (matches Velite collection name) */
  key: string;
  /** Display name */
  label: string;
  /** Description text */
  description: string;
  /** Parent category (research, writing, studying, cv) */
  parent: "research" | "writing" | "studying" | "cv";
  /** Content file pattern for Velite */
  pattern: string;
  /** Base URL path */
  path: string;
  /** Category path used in getPostBySlug */
  categoryPath: string;
};

export type CategoryConfig = {
  key: "research" | "writing" | "studying" | "cv";
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

  // Studying collection (courses, books, structured learning notes)
  {
    key: "studying",
    label: "Studying",
    description: "What I'm learning — courses, books, and study notes",
    parent: "studying",
    pattern: "studying/**/*.mdx",
    path: "/studying",
    categoryPath: "studying",
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
    key: "writing",
    label: "Writing",
    description: "Blog posts, tutorials, and essays",
    path: "/writing",
    collections: collectionsConfig.filter((c) => c.parent === "writing"),
  },
  {
    key: "studying",
    label: "Studying",
    description: "Organized notes on what I'm studying",
    path: "/studying",
    collections: collectionsConfig.filter((c) => c.parent === "studying"),
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
  parent: "research" | "writing" | "studying" | "cv",
): CollectionConfig[] => collectionsConfig.filter((c) => c.parent === parent);
