import PageLayout from "@/components/pageLayout";
import PostList from "@/components/postList";
import { project } from "#site/contents";

export default async function DevelopmentListPage() {
  return (
    <PageLayout title="프로젝트" description="프로젝트를 회고합니다.">
      <PostList posts={project} basePath="/study/project" />
    </PageLayout>
  );
}
