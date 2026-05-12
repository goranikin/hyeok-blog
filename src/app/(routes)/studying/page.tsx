import { studying } from "#site/contents";
import { Card } from "@/components/cards";
import {
  EmptyState,
  PageHero,
  SectionDivider,
  SectionHeader,
} from "@/components/collectionPageSections";
import { getCollectionByKey } from "@/config/collections-new";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default async function StudyingPage() {
  const collection = getCollectionByKey("studying");

  if (!collection) {
    return null;
  }

  const sortedPosts = [...studying].sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
  );

  const accentColors = [
    "sky",
    "olive",
    "heather",
    "clay",
    "coral",
    "cactus",
  ] as const;

  return (
    <>
      <PageHero
        title="Studying"
        description="Notes and progress on what I'm learning — textbooks, courses, papers, and anything else I'm working through in a structured way."
        subdescription="Separate from informal writing: this section is for organizing study material and milestones."
      />

      <SectionDivider />

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeader
            title="Topics & notes"
            description="Study entries in reverse chronological order"
          />

          {sortedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedPosts.map((post, index) => {
                const date = new Date(post.publishDate);
                const formattedDate = date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                });
                const accent = accentColors[index % accentColors.length];

                return (
                  <Link
                    href={`/studying/${post.slug}`}
                    key={post.slug}
                    className="block h-full animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Card accent={accent} className="h-full space-y-4">
                      <div>
                        <h3 className="text-[22px] font-semibold text-[#1A1A1A] leading-tight mb-2">
                          {post.title}
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-[#8A8A8A] mb-3">
                          <BookOpen className="h-4 w-4" />
                          <time dateTime={post.publishDate}>
                            {formattedDate}
                          </time>
                        </div>

                        <p className="text-base text-[#4A4A4A] leading-relaxed line-clamp-3">
                          {post.description}
                        </p>
                      </div>

                      <div className="pt-2">
                        <span className="text-[#6B5B3A] hover:text-[#4A3F28] font-medium text-sm transition-colors duration-200 inline-flex items-center gap-1">
                          Open notes →
                        </span>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="No study notes yet"
              description="Add MDX files under src/contents/studying/ to show them here."
            />
          )}
        </div>
      </section>
    </>
  );
}
