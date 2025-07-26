import { MDXContent } from "@/mdx-components";
import type { Post } from "@/utils/post";

type Props = {
  post: Post;
};

const PostPageLayout = (props: Props) => {
  return (
    <div className="flex flex-col mt-5 gap-6">
      <div>
        <h1 className="text-2xl font-bold whitespace-pre-wrap">
          {props.post.title}
        </h1>
        <p className="mt-2">{props.post.publishDate}</p>
      </div>
      <div className="prose max-w-full text-lg leading-9">
        <MDXContent code={props.post.content} />
      </div>
    </div>
  );
};

export default PostPageLayout;
