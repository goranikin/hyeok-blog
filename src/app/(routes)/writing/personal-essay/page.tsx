import { personalEssay } from "#site/contents";
import PageLayout from "@/components/pageLayout";
import PostList from "@/components/postList";
import { getCollectionByKey } from "@/config/collections";

export default function PersonalEssayListPage() {
  const collection = getCollectionByKey("personalEssay");

  if (!collection) {
    return null;
  }

  return (
    <PageLayout title={collection.label} description={collection.description}>
      <PostList posts={personalEssay} basePath={collection.path} />
    </PageLayout>
  );
}
