import { writing } from "#site/contents";
import { WritingCard } from "@/components/cards";
import { getCollectionByKey } from "@/config/collections-new";

export default async function WritingPage() {
  const collection = getCollectionByKey("writing");

  if (!collection) {
    return null;
  }

  // Sort posts by date (newest first)
  const sortedPosts = [...writing].sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
  );

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 animate-fade-in">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div>
            <h1 className="text-4xl lg:text-5xl font-semibold text-[#1A1A1A] mb-6 leading-tight">
              Writing
            </h1>
            <p className="text-xl text-[#4A4A4A] leading-relaxed mb-4">
              Thoughts on AI research, engineering practices, and the journey of
              learning and building in the world of machine learning.
            </p>
            <p className="text-lg text-[#4A4A4A] leading-relaxed">
              From technical deep-dives to personal reflections, I write to
              share what I learn and connect with others on similar paths.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-t border-[#EFEFEF]" />

      {/* Posts Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1A1A1A] mb-3">
              All Posts
            </h2>
            <p className="text-lg text-[#4A4A4A]">
              Essays, tutorials, and reflections in reverse chronological order
            </p>
          </div>

          {sortedPosts.length > 0 ? (
            <div className="space-y-2">
              {sortedPosts.map((post, index) => {
                const date = new Date(post.publishDate);
                const formattedDate = date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                });

                return (
                  <div
                    key={post.slug}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <WritingCard
                      title={post.title}
                      date={formattedDate}
                      excerpt={post.description}
                      href={`/writing/${post.slug}`}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#FAF9F6] rounded-2xl">
              <p className="text-xl text-[#4A4A4A] mb-2">
                More writing coming soon!
              </p>
              <p className="text-base text-[#8A8A8A]">
                I&apos;m working on new posts about AI, engineering, and
                everything in between.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
