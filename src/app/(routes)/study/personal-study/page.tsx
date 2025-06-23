import PageLayout from "@/components/pageLayout";
import PostList from "@/components/postList";
import { personalStudy } from "#site/contents";

export default async function DevelopmentListPage() {
  return (
    <PageLayout title="개인 공부" description="공부 기록 남기기">
      <PostList posts={personalStudy} basePath="/study/personal-study" />
    </PageLayout>
  );
}
