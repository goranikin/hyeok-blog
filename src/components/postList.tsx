import type { Post } from "@/utils/post";
import Image from "next/image";
import Link from "next/link";

interface PostListProps {
  posts: Post[];
  basePath: string; // 이동할 기본 경로 (예: '/development', '/writing/book-review')
}

const DEFAULT_IMAGE = "/itisme.png";

export default function PostList({ posts, basePath }: PostListProps) {
  return (
    <div>
      {posts
        .sort(
          (a, b) =>
            Number(new Date(b.publishDate)) - Number(new Date(a.publishDate)),
        )
        .map((post: Post) => {
          const date = new Date(post.publishDate);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();

          return (
            <Link
              href={`${basePath}/${post.slug}`}
              key={post.slug}
              className="flex py-5 items-center justify-between gap-2 border-b last:border-none"
            >
              <div className="flex flex-col gap-1 flex-1">
                <span className="font-medium text-lg break-all line-clamp-2">
                  {post.title}
                </span>
                <span className="break-all">
                  {basePath.includes("writing") ? "" : post.description}
                </span>
                <time className="text-sm mt-1">
                  {year}.{month}.{day}
                </time>
              </div>
              {post.thumbnailUrl ? (
                <Image
                  width={300}
                  height={300}
                  src={post.thumbnailUrl ?? DEFAULT_IMAGE}
                  alt={post.title}
                  className="object-cover w-40 h-40"
                />
              ) : null}
            </Link>
          );
        })}
    </div>
  );
}
