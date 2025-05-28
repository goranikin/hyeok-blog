import LinkButton from "@/components/link-button";
import PageLayout from "@/components/pageLayout";

export default function WritingPage() {
	return (
		<PageLayout title="글" description="개인적인 글을 남기는 공간">
			<div className="flex flex-col gap-4 mt-6">
				<LinkButton
					href="/writing/personal-essay"
					label="삶의 기록"
					className="py-6"
				/>
				<LinkButton
					href="/writing/book-review"
					label="읽은 책 정리"
					className="py-6"
				/>
			</div>
		</PageLayout>
	);
}
