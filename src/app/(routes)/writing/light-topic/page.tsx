import { lightTopic } from "#site/contents";
import PageLayout from "@/components/pageLayout";
import PostList from "@/components/postList";
import { getCollectionByKey } from "@/config/collections";

export default async function LightTopicListPage() {
  const collection = getCollectionByKey("lightTopic");

  if (!collection) {
    return null;
  }

  return (
    <PageLayout title={collection.label} description={collection.description}>
      <PostList posts={lightTopic} basePath={collection.path} />
    </PageLayout>
  );
}
