import PageLayout from "@/components/pageLayout";
import PostList from "@/components/postList";
import { paperReview } from "#site/contents";

export default async function DevelopmentListPage() {
	return (
		<PageLayout
			title="논문 리뷰"
			description="정리해두고 싶은 논문들을 리뷰합니다."
		>
			<PostList posts={paperReview} basePath="/study/paper-review" />
		</PageLayout>
	);
}
