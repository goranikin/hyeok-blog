import PageLayout from "@/components/pageLayout";
import PostList from "@/components/postList";
import { lightTopic } from "#site/contents";

export default async function PersonalEssayListPage() {
  return (
    <PageLayout title="가벼운 것들" description="생각나는 대로 적는 편한 공간">
      <PostList posts={lightTopic} basePath="/writing/light-topic" />
    </PageLayout>
  );
}
