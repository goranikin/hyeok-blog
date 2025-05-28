import LinkButton from "@/components/link-button";
import PageLayout from "@/components/pageLayout";

export default async function LaboratoryPage() {
	return (
		<PageLayout title="실험실" description="이것 저것 만들어보는 곳">
			<div className="flex flex-col gap-4 mt-6">
				<LinkButton
					href="/laboratory/human-interface-design-class"
					label="휴먼 인터페이스 디자인 수업용"
					className="py-6"
				/>
			</div>
		</PageLayout>
	);
}
