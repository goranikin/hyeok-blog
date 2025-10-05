import { bookReview } from "#site/contents";
import PageLayout from "@/components/pageLayout";
import PostList from "@/components/postList";
import { getCollectionByKey } from "@/config/collections";

export default async function BookReviewListPage() {
  const collection = getCollectionByKey("bookReview");

  if (!collection) {
    return null;
  }

  return (
    <PageLayout title={collection.label} description={collection.description}>
      <PostList posts={bookReview} basePath={collection.path} />
    </PageLayout>
  );
}
