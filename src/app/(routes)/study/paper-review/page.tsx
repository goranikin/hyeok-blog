import PageLayout from "@/components/pageLayout";
import PostList from "@/components/postList";
import { paperReview } from "#site/contents";

export default async function DevelopmentListPage() {
	return (
		<PageLayout title="개발" description="개발 기록을 위한 공간">
			<PostList posts={paperReview} basePath="/study/paper-review" />
		</PageLayout>
	);
}
