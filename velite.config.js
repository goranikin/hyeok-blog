import rehypeShiki from "@shikijs/rehype";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { defineConfig, s } from "velite";
import { collectionsConfig } from "./src/config/collections.ts";

/**
 * Generate Velite schema for a collection
 * This creates a standardized schema with transformation for all collections
 */
const createCollectionSchema = (pattern, pathPrefix) => {
  return s
    .object({
      title: s.string(),
      description: s.string(),
      slug: s.path(),
      publishDate: s.string().date(),
      thumbnailUrl: s.string().optional(),
      content: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/${data.slug}`,
      slug: data.slug.replaceAll(`${pathPrefix}/`, ""),
    }));
};

/**
 * Generate Velite collections from centralized configuration
 * This eliminates the need to manually define each collection
 */
const generateCollections = () => {
  const collections = {};

  for (const config of collectionsConfig) {
    // Convert path like "/study/development" to "study/development"
    const pathPrefix = config.path.substring(1);

    collections[config.key] = {
      name: config.key.charAt(0).toUpperCase() + config.key.slice(1),
      pattern: config.pattern,
      schema: createCollectionSchema(
        config.pattern.split("/**")[0],
        pathPrefix,
      ),
    };
  }

  return collections;
};

export default defineConfig({
  root: "src/contents",
  output: {
    data: ".velite", // 생성된 데이터가 저장될 위치
    assets: "public/static", // 에셋 파일이 복사될 위치
    base: "/static/", // 에셋 파일의 기본 URL 경로
    name: "[name]-[hash:8].[ext]", // 에셋 파일 이름 포맷
    clean: true, // 빌드 전 출력 디렉토리 정리
  },
  collections: generateCollections(),
  mdx: {
    rehypePlugins: [[rehypeShiki, { theme: "github-light" }], rehypeKatex],
    remarkPlugins: [[remarkMath]],
  },
});
