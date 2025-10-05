import type { Post } from "@/utils/post";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PostListProps {
  posts: Post[];
  basePath: string;
}

const DEFAULT_IMAGE = "/itisme.png";

export default function PostList({ posts, basePath }: PostListProps) {
  return (
    <div className="space-y-6">
      {posts
        .sort(
          (a, b) =>
            Number(new Date(b.publishDate)) - Number(new Date(a.publishDate)),
        )
        .map((post: Post, index: number) => {
          const date = new Date(post.publishDate);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");

          const showDescription = !basePath.includes("writing") && post.description;

          return (
            <Link
              href={`${basePath}/${post.slug}`}
              key={post.slug}
              className="group block"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <article className="flex gap-6 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 bg-white">
                {/* Thumbnail - Left side on desktop, top on mobile */}
                {post.thumbnailUrl && (
                  <div className="relative shrink-0 w-full sm:w-40 h-40 rounded-md overflow-hidden bg-gray-100">
                    <Image
                      width={300}
                      height={300}
                      src={post.thumbnailUrl ?? DEFAULT_IMAGE}
                      alt={post.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col justify-center gap-2.5 flex-1 min-w-0">
                  <h2 className="font-bold text-xl md:text-2xl leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors tracking-tight">
                    {post.title}
                  </h2>
                  
                  {showDescription && (
                    <p className="text-gray-600 text-base leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.publishDate}>
                      {year}.{month}.{day}
                    </time>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
    </div>
  );
}
