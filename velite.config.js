import rehypeShiki from "@shikijs/rehype";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { defineConfig, s } from "velite";

export default defineConfig({
  root: "src/contents",
  output: {
    data: ".velite", // 생성된 데이터가 저장될 위치
    assets: "public/static", // 에셋 파일이 복사될 위치
    base: "/static/", // 에셋 파일의 기본 URL 경로
    name: "[name]-[hash:8].[ext]", // 에셋 파일 이름 포맷
    clean: true, // 빌드 전 출력 디렉토리 정리
  },
  collections: {
    development: {
      name: "Development",
      pattern: "study/development/**/*.mdx",
      schema: s
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
          slug: data.slug.replaceAll("study/development/", ""),
        })),
    },
    project: {
      name: "Project",
      pattern: "study/project/**/*.mdx",
      schema: s
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
          slug: data.slug.replaceAll("study/project/", ""),
        })),
    },
    paperReview: {
      name: "PaperReview",
      pattern: "study/paper-review/**/*.mdx",
      schema: s
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
          slug: data.slug.replaceAll("study/paper-review/", ""),
        })),
    },
    bookReview: {
      name: "BookReview",
      pattern: "writing/book-review/**/*.mdx",
      schema: s
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
          slug: data.slug.replaceAll("writing/book-review/", ""),
        })),
    },
    personalEssay: {
      name: "PersonalEssay",
      pattern: "writing/personal-essay/**/*.mdx",
      schema: s
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
          slug: data.slug.replaceAll("writing/personal-essay/", ""),
        })),
    },
    lightTopic: {
      name: "LightTopic",
      pattern: "writing/light-topic/**/*.mdx",
      schema: s
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
          slug: data.slug.replaceAll("writing/light-topic/", ""),
        })),
    },
  },
  mdx: {
    rehypePlugins: [[rehypeShiki, { theme: "nord" }], rehypeKatex],
    remarkPlugins: [[remarkMath]],
  },
});
