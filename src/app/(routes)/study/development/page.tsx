import PageLayout from "@/components/pageLayout";
import PostList from "@/components/postList";
import { development } from "#site/contents";

export default async function DevelopmentListPage() {
	return (
		<PageLayout title="개발" description="개발 관련 공부 및 자료를 정리합니다.">
			<PostList posts={development} basePath="/study/development" />
		</PageLayout>
	);
}
