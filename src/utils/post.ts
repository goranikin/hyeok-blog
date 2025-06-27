import {
	bookReview,
	development,
	paperReview,
	personalEssay,
	project,
} from "#site/contents";

export type Post = {
	permalink: string;
	slug: string;
	title: string;
	description?: string;
	publishDate: string;
	content: string;
	thumbnailUrl?: string;
};

export const getPostBySlug = ({
	slug,
	category,
}: {
	slug: string;
	category: string;
}): Post | undefined => {
	let posts: Post[];

	switch (category) {
		case "study/development":
			posts = development;
			break;
		case "study/paper-review":
			posts = paperReview;
			break;
		case "study/project":
			posts = project;
			break;
		case "writing/book-review":
			posts = bookReview;
			break;
		case "writing/personal-essay":
			posts = personalEssay;
			break;
		default:
			posts = [];
	}

	return posts.find((post) => post.slug === slug);
};
