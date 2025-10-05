import { lightTopic } from "#site/contents";
import PageLayout from "@/components/pageLayout";
import PostPageLayout from "@/components/postPageLayout";
import { getCollectionByKey } from "@/config/collections";
import metadata from "@/utils/metadata";
import { getPostBySlug } from "@/utils/post";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const collection = getCollectionByKey("lightTopic");

export default async function LightTopicPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug({ slug: slug, category: collection?.categoryPath || "" });

  if (!post) {
    notFound();
  }

  return (
    <PageLayout>
      <PostPageLayout post={post} />
    </PageLayout>
  );
}

export function generateStaticParams() {
  return lightTopic.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = lightTopic.find((post) => post.slug === slug);

  if (!post) {
    return {};
  }

  return metadata({
    title: post.title,
    description: post.description,
    path: post.permalink,
    publishDate: post.publishDate,
    image: post.thumbnailUrl,
  });
}
