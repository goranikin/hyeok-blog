import { development } from "#site/contents";
import PageLayout from "@/components/pageLayout";
import PostList from "@/components/postList";
import { getCollectionByKey } from "@/config/collections";

export default async function DevelopmentListPage() {
  const collection = getCollectionByKey("development");

  if (!collection) {
    return null;
  }

  return (
    <PageLayout title={collection.label} description={collection.description}>
      <PostList posts={development} basePath={collection.path} />
    </PageLayout>
  );
}
