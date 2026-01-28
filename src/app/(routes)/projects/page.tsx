import { projects } from "#site/contents";
import { Card } from "@/components/cards";
import { getCollectionByKey } from "@/config/collections-new";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default async function ProjectsPage() {
  const collection = getCollectionByKey("projects");

  if (!collection) {
    return null;
  }

  // Sort projects by date (newest first)
  const sortedProjects = [...projects].sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
  );

  // Accent colors for variety
  const accentColors = [
    "olive",
    "heather",
    "sky",
    "coral",
    "clay",
    "cactus",
  ] as const;

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 animate-fade-in">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-semibold text-[#1A1A1A] mb-6 leading-tight">
              Projects
            </h1>
            <p className="text-xl text-[#4A4A4A] leading-relaxed mb-4">
              Anything related to AI, web development.
            </p>
            <p className="text-lg text-[#4A4A4A] leading-relaxed">
              Python, JavaScript (TypeScript), Rust
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-t border-[#EFEFEF]" />

      {/* Projects Grid Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1A1A1A] mb-3">
              All Projects
            </h2>
            <p className="text-lg text-[#4A4A4A]">
              Explore my work across machine learning, web development, and more
            </p>
          </div>

          {sortedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProjects.map((project, index) => {
                const date = new Date(project.publishDate);
                const formattedDate = date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                });
                const accent = accentColors[index % accentColors.length];

                return (
                  <Link
                    href={`/projects/${project.slug}`}
                    key={project.slug}
                    className="block h-full animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Card accent={accent} className="h-full space-y-4">
                      {/* Content */}
                      <div>
                        <h3 className="text-[22px] font-semibold text-[#1A1A1A] leading-tight mb-2">
                          {project.title}
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-[#8A8A8A] mb-3">
                          <Calendar className="h-4 w-4" />
                          <time dateTime={project.publishDate}>
                            {formattedDate}
                          </time>
                        </div>

                        <p className="text-base text-[#4A4A4A] leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      <div className="pt-2">
                        <span className="text-[#6B5B3A] hover:text-[#4A3F28] font-medium text-sm transition-colors duration-200 inline-flex items-center gap-1">
                          View Project →
                        </span>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#FAF9F6] rounded-2xl">
              <p className="text-xl text-[#4A4A4A] mb-2">
                New projects on the way!
              </p>
              <p className="text-base text-[#8A8A8A]">
                I&apos;m actively working on exciting new tools and
                implementations. Stay tuned!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
