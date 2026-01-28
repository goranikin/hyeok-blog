import { projects } from "#site/contents";
import PostPageLayout from "@/components/postPageLayout";
import { getCollectionByKey } from "@/config/collections-new";
import metadata from "@/utils/metadata";
import { getPostBySlug } from "@/utils/post";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

const collection = getCollectionByKey("projects");

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug({
    slug: slug,
    category: collection?.categoryPath || "",
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <PostPageLayout post={post} />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return projects.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = projects.find((post) => post.slug === slug);

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
