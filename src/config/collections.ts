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
    label: "개발",
    description: "개발 관련 공부 및 자료를 정리합니다.",
    parent: "study",
    pattern: "study/development/**/*.mdx",
    path: "/study/development",
    categoryPath: "study/development",
  },
  {
    key: "paperReview",
    label: "논문 리뷰",
    description: "정리해두고 싶은 논문들을 리뷰합니다.",
    parent: "study",
    pattern: "study/paper-review/**/*.mdx",
    path: "/study/paper-review",
    categoryPath: "study/paper-review",
  },
  {
    key: "project",
    label: "프로젝트",
    description: "프로젝트를 회고합니다.",
    parent: "study",
    pattern: "study/project/**/*.mdx",
    path: "/study/project",
    categoryPath: "study/project",
  },

  // Writing collections
  {
    key: "lightTopic",
    label: "가벼운 것들",
    description: "생각나는 대로 적는 편한 공간",
    parent: "writing",
    pattern: "writing/light-topic/**/*.mdx",
    path: "/writing/light-topic",
    categoryPath: "writing/light-topic",
  },
  {
    key: "personalEssay",
    label: "삶의 기록",
    description: "삶의 무의미를 위한 공간",
    parent: "writing",
    pattern: "writing/personal-essay/**/*.mdx",
    path: "/writing/personal-essay",
    categoryPath: "writing/personal-essay",
  },
  {
    key: "bookReview",
    label: "책 정리",
    description: "실용적인 서적을 읽고 정리하는 공간",
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
    label: "공부",
    description: "공부한 내용을 정리하는 공간",
    path: "/study",
    collections: collectionsConfig.filter((c) => c.parent === "study"),
  },
  {
    key: "writing",
    label: "글",
    description: "개인적인 글을 남기는 공간",
    path: "/writing",
    collections: collectionsConfig.filter((c) => c.parent === "writing"),
  },
  {
    key: "laboratory",
    label: "실험실",
    description: "실험적인 프로젝트 공간",
    path: "/laboratory",
    collections: [],
  },
];

// Laboratory routes (not MDX-based collections)
export const laboratoryRoutes = [
  {
    key: "human-interface-design-class",
    label: "휴인디",
    path: "/laboratory/human-interface-design-class",
  },
  {
    key: "extract-transcript",
    label: "자막 추출",
    path: "/laboratory/extract-transcript",
  },
];

// Utility functions for easy access
export const getCollectionByKey = (key: string): CollectionConfig | undefined =>
  collectionsConfig.find((c) => c.key === key);

export const getCollectionByPath = (
  path: string,
): CollectionConfig | undefined =>
  collectionsConfig.find((c) => path.startsWith(c.path));

export const getCategoryByKey = (
  key: string,
): CategoryConfig | undefined =>
  categoriesConfig.find((c) => c.key === key);

export const getCollectionsByParent = (
  parent: "study" | "writing" | "laboratory",
): CollectionConfig[] => collectionsConfig.filter((c) => c.parent === parent);

