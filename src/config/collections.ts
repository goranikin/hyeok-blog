/**
 * Centralized configuration for all blog collections
 * This file defines all content categories, their metadata, and structure
 */

export type CollectionConfig = {
  /** Unique key for the collection (matches Velite collection name) */
  key: string;
  /** Display name in Korean */
  label: string;
  /** Description text */
  description: string;
  /** Parent category (study, writing, laboratory) */
  parent: "study" | "writing" | "laboratory";
  /** Content file pattern for Velite */
  pattern: string;
  /** Base URL path */
  path: string;
  /** Category path used in getPostBySlug */
  categoryPath: string;
};

export type CategoryConfig = {
  key: "study" | "writing" | "laboratory";
  label: string;
  description: string;
  path: string;
  collections: CollectionConfig[];
};

// Define all collections with their metadata
export const collectionsConfig: CollectionConfig[] = [
  // Study collections
  {
    key: "development",
    label: "development",
    description: "development related posts",
    parent: "study",
    pattern: "study/development/**/*.mdx",
    path: "/study/development",
    categoryPath: "study/development",
  },
  {
    key: "paperReview",
    label: "review of papers",
    description: "summarization of the content of the paper that I understand",
    parent: "study",
    pattern: "study/paper-review/**/*.mdx",
    path: "/study/paper-review",
    categoryPath: "study/paper-review",
  },
  {
    key: "project",
    label: "project",
    description: "organization of the project which I've done",
    parent: "study",
    pattern: "study/project/**/*.mdx",
    path: "/study/project",
    categoryPath: "study/project",
  },

  // Writing collections
  {
    key: "personalEssay",
    label: "personal essay",
    description: "the place where I write about my life",
    parent: "writing",
    pattern: "writing/personal-essay/**/*.mdx",
    path: "/writing/personal-essay",
    categoryPath: "writing/personal-essay",
  },
  {
    key: "bookReview",
    label: "book review",
    description: "pragmatic arrangement of the book",
    parent: "writing",
    pattern: "writing/book-review/**/*.mdx",
    path: "/writing/book-review",
    categoryPath: "writing/book-review",
  },
];

// Define parent categories
export const categoriesConfig: CategoryConfig[] = [
  {
    key: "study",
    label: "study",
    description: "the place where I write about my study",
    path: "/study",
    collections: collectionsConfig.filter((c) => c.parent === "study"),
  },
  {
    key: "writing",
    label: "writing",
    description: "the place where I write about my life",
    path: "/writing",
    collections: collectionsConfig.filter((c) => c.parent === "writing"),
  },
  {
    key: "laboratory",
    label: "laboratory",
    description: "the playground where I want to do something",
    path: "/laboratory",
    collections: [],
  },
];

// Laboratory routes (not MDX-based collections)
export const laboratoryRoutes = [
  {
    key: "human-interface-design-class",
    label: "human interface design class",
    path: "/laboratory/human-interface-design-class",
  },
  {
    key: "extract-transcript",
    label: "extract transcript",
    path: "/laboratory/extract-transcript",
  },
];

// Utility functions for easy access
export const getCollectionByKey = (key: string): CollectionConfig | undefined =>
  collectionsConfig.find((c) => c.key === key);

export const getCollectionByPath = (path: string): CollectionConfig | undefined =>
  collectionsConfig.find((c) => path.startsWith(c.path));

export const getCategoryByKey = (key: string): CategoryConfig | undefined =>
  categoriesConfig.find((c) => c.key === key);

export const getCollectionsByParent = (parent: "study" | "writing" | "laboratory"): CollectionConfig[] =>
  collectionsConfig.filter((c) => c.parent === parent);
