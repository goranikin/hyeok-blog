import { research } from "#site/contents";
import { WritingCard } from "@/components/cards";
import { getCollectionByKey } from "@/config/collections-new";
import type { Post } from "@/utils/post";

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

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 animate-fade-in">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-semibold text-[#1A1A1A] mb-6 leading-tight">
              Research
            </h1>
            <p className="text-xl text-[#4A4A4A] leading-relaxed mb-4">
              My research focuses on developing efficient and interpretable methods
              for natural language processing and machine learning.
            </p>
            <p className="text-lg text-[#4A4A4A] leading-relaxed">
              I'm particularly interested in making AI systems more accessible,
              efficient, and trustworthy for real-world applications.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-t border-[#EFEFEF]" />

      {/* Publications Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1A1A1A] mb-3">
              Publications
            </h2>
            <p className="text-lg text-[#4A4A4A]">
              Papers, preprints, and research contributions
            </p>
          </div>

          {/* Publications by Year */}
          {years.length > 0 ? (
            <div className="space-y-16">
              {years.map((year) => (
                <div key={year} className="animate-fade-in">
                  <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-6">
                    {year}
                  </h3>
                  <div className="space-y-2">
                    {postsByYear[year].map((post: Post) => {
                      const date = new Date(post.publishDate);
                      const formattedDate = date.toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      });

                      return (
                        <WritingCard
                          key={post.slug}
                          title={post.title}
                          date={formattedDate}
                          excerpt={post.description}
                          href={`/research/${post.slug}`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#FAF9F6] rounded-2xl">
              <p className="text-xl text-[#4A4A4A] mb-2">
                Research publications coming soon!
              </p>
              <p className="text-base text-[#8A8A8A]">
                I'm currently working on exciting projects. Check back later for updates.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
