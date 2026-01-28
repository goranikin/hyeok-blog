import { projects } from "#site/contents";
import { Card } from "@/components/cards";
import {
  EmptyState,
  PageHero,
  SectionDivider,
  SectionHeader,
} from "@/components/collectionPageSections";
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
      <PageHero
        title="Projects"
        description="Anything related to AI, web development."
        subdescription="Python, JavaScript (TypeScript), Rust"
      />

      <SectionDivider />

      {/* Projects Grid Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeader
            title="All Projects"
            description="Explore my work across machine learning, web development, and more"
          />

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
            <EmptyState
              title="New projects on the way!"
              description="I'm actively working on exciting new tools and implementations. Stay tuned!"
            />
          )}
        </div>
      </section>
    </>
  );
}
