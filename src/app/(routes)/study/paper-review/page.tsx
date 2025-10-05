import { paperReview } from "#site/contents";
import PageLayout from "@/components/pageLayout";
import PostList from "@/components/postList";
import { getCollectionByKey } from "@/config/collections";

export default async function PaperReviewListPage() {
  const collection = getCollectionByKey("paperReview");

  if (!collection) {
    return null;
  }

  return (
    <PageLayout title={collection.label} description={collection.description}>
      <PostList posts={paperReview} basePath={collection.path} />
    </PageLayout>
  );
}
