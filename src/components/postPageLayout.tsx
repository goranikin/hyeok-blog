import { MDXContent } from "@/mdx-components";
import type { Post } from "@/utils/post";
import { Calendar } from "lucide-react";

type Props = {
  post: Post;
};

const PostPageLayout = (props: Props) => {
  const date = new Date(props.post.publishDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="flex flex-col animate-fade-in">
      {/* Post Header */}
      <header className="mb-10 pb-8 border-b animate-slide-in">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5 tracking-tight">
          {props.post.title}
        </h1>

        {/* Metadata */}
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-4 w-4" />
          <time dateTime={props.post.publishDate} className="text-base">
            {formattedDate}
          </time>
        </div>
      </header>

      {/* Post Content */}
      <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-20 prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-8 prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-pre:bg-gray-50 prose-pre:border prose-img:rounded-lg prose-code:text-sm prose-strong:font-semibold">
        <MDXContent code={props.post.content} />
      </div>
    </article>
  );
};

export default PostPageLayout;
