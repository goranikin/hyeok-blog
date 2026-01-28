import { research } from "#site/contents";
import { Card } from "@/components/cards";
import {
  EmptyState,
  PageHero,
  SectionDivider,
  SectionHeader,
} from "@/components/collectionPageSections";
import { getCollectionByKey } from "@/config/collections-new";
import type { Post } from "@/utils/post";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default async function ResearchPage() {
  const collection = getCollectionByKey("research");

  if (!collection) {
    return null;
  }

  // Sort posts by date (newest first)
  const sortedPosts = [...research].sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
  );

  // Group posts by year
  const postsByYear = sortedPosts.reduce(
    (acc, post) => {
      const year = new Date(post.publishDate).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, typeof research>,
  );

  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  // Accent colors for variety
  const accentColors = [
    "clay",
    "sky",
    "coral",
    "olive",
    "cactus",
    "heather",
  ] as const;

  return (
    <>
      <PageHero
        title="Research"
        description="Publications, papers, and research work"
        subdescription="Data Augmentation, LLM Agent, Retrieval, Time-Series Analysis"
      />

      <SectionDivider />

      {/* Publications Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeader
            title="Publications"
            description="Papers, preprints, and research contributions"
          />

          {/* Publications by Year */}
          {years.length > 0 ? (
            <div className="space-y-16">
              {years.map((year: number) => (
                <div key={year} className="animate-fade-in">
                  <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-6">
                    {year}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {postsByYear[year].map((post: Post, index: number) => {
                      const date = new Date(post.publishDate);
                      const formattedDate = date.toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      });
                      const accent = accentColors[index % accentColors.length];

                      return (
                        <Link
                          href={`/research/${post.slug}`}
                          key={post.slug}
                          className="block h-full animate-fade-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <Card accent={accent} className="h-full space-y-4">
                            {/* Content */}
                            <div>
                              <h3 className="text-[22px] font-semibold text-[#1A1A1A] leading-tight mb-2">
                                {post.title}
                              </h3>

                              <div className="flex items-center gap-2 text-sm text-[#8A8A8A] mb-3">
                                <Calendar className="h-4 w-4" />
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
                                Read Paper →
                              </span>
                            </div>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Research publications coming soon!"
              description="I'm currently working on exciting projects. Check back later for updates."
            />
          )}
        </div>
      </section>
    </>
  );
}
