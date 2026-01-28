import { cn } from "@/utils/cn";
import Link from "next/link";
import { ReactNode } from "react";

// Base Card Component
interface CardProps {
  children: ReactNode;
  className?: string;
  accent?: "clay" | "sky" | "coral" | "olive" | "cactus" | "heather" | "none";
  hover?: boolean;
}

export const Card = ({
  children,
  className,
  accent = "none",
  hover = true,
}: CardProps) => {
  const accentColors = {
    clay: "bg-[#E8DED0]",
    sky: "bg-[#E3EBF2]",
    coral: "bg-[#F4E5E0]",
    olive: "bg-[#E8EBE0]",
    cactus: "bg-[#DFE8DC]",
    heather: "bg-[#E8E3EB]",
    none: "bg-white border border-[#EFEFEF]",
  };

  return (
    <div
      className={cn(
        "rounded-xl p-8 transition-all duration-300",
        accentColors[accent],
        hover && "card-hover cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};

// Research Card Component
interface ResearchCardProps {
  title: string;
  authors: string;
  venue: string;
  year: string;
  abstract?: string;
  pdfLink?: string;
  arxivLink?: string;
  codeLink?: string;
  projectLink?: string;
  accent?: "clay" | "sky" | "coral" | "olive" | "cactus" | "heather";
}

export const ResearchCard = ({
  title,
  authors,
  venue,
  year,
  abstract,
  pdfLink,
  arxivLink,
  codeLink,
  projectLink,
  accent = "clay",
}: ResearchCardProps) => {
  return (
    <Card accent={accent} hover={false} className="space-y-4">
      <div>
        <h3 className="text-[22px] font-semibold text-[#1A1A1A] leading-tight mb-2">
          {title}
        </h3>
        <p className="text-sm text-[#8A8A8A]">
          {authors} · {venue} {year}
        </p>
      </div>

      {abstract && (
        <p className="text-base text-[#4A4A4A] leading-relaxed line-clamp-3">
          {abstract}
        </p>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        {pdfLink && (
          <Link
            href={pdfLink}
            className="text-[#6B5B3A] hover:text-[#4A3F28] font-medium text-sm transition-colors duration-200 inline-flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            PDF →
          </Link>
        )}
        {arxivLink && (
          <Link
            href={arxivLink}
            className="text-[#6B5B3A] hover:text-[#4A3F28] font-medium text-sm transition-colors duration-200 inline-flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            arXiv →
          </Link>
        )}
        {codeLink && (
          <Link
            href={codeLink}
            className="text-[#6B5B3A] hover:text-[#4A3F28] font-medium text-sm transition-colors duration-200 inline-flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code →
          </Link>
        )}
        {projectLink && (
          <Link
            href={projectLink}
            className="text-[#6B5B3A] hover:text-[#4A3F28] font-medium text-sm transition-colors duration-200 inline-flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Project →
          </Link>
        )}
      </div>
    </Card>
  );
};

// Project Card Component
interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  demoLink?: string;
  date?: string;
  stars?: number;
  accent?: "clay" | "sky" | "coral" | "olive" | "cactus" | "heather";
}

export const ProjectCard = ({
  title,
  description,
  techStack,
  githubLink,
  demoLink,
  date,
  stars,
  accent,
}: ProjectCardProps) => {
  return (
    <Card accent={accent} className="space-y-4">
      <div>
        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-[#1A1A1A] text-white rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <h3 className="text-[22px] font-semibold text-[#1A1A1A] leading-tight mb-2">
          {title}
        </h3>

        {(date || stars) && (
          <p className="text-sm text-[#8A8A8A]">
            {date && <span>{date}</span>}
            {date && stars && <span> · </span>}
            {stars && <span>⭐ {stars}</span>}
          </p>
        )}
      </div>

      <p className="text-base text-[#4A4A4A] leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap gap-3 pt-2">
        {githubLink && (
          <Link
            href={githubLink}
            className="text-[#6B5B3A] hover:text-[#4A3F28] font-medium text-sm transition-colors duration-200 inline-flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub →
          </Link>
        )}
        {demoLink && (
          <Link
            href={demoLink}
            className="text-[#6B5B3A] hover:text-[#4A3F28] font-medium text-sm transition-colors duration-200 inline-flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Demo →
          </Link>
        )}
      </div>
    </Card>
  );
};

// Writing Card Component (for blog list)
interface WritingCardProps {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  href: string;
}

export const WritingCard = ({
  title,
  date,
  excerpt,
  tags,
  href,
}: WritingCardProps) => {
  return (
    <Link href={href} className="block group">
      <div className="py-6 border-b border-[#EFEFEF] transition-all duration-200 group-hover:translate-x-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-semibold text-[#1A1A1A] group-hover:text-[#6B5B3A] transition-colors duration-200">
              {title}
            </h3>
            {excerpt && (
              <p className="text-base text-[#4A4A4A] line-clamp-2">
                {excerpt}
              </p>
            )}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-[#8A8A8A] px-2 py-1 bg-[#FAF9F6] rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <time className="text-sm text-[#8A8A8A] whitespace-nowrap">
            {date}
          </time>
        </div>
      </div>
    </Link>
  );
};

// Featured Card (for home page highlights)
interface FeaturedCardProps {
  type: "paper" | "project" | "post";
  title: string;
  description: string;
  link: string;
  accent?: "clay" | "sky" | "coral" | "olive" | "cactus" | "heather";
}

export const FeaturedCard = ({
  type,
  title,
  description,
  link,
  accent = "sky",
}: FeaturedCardProps) => {
  const typeLabels = {
    paper: "Recent Paper",
    project: "Featured Project",
    post: "Latest Post",
  };

  return (
    <Link href={link} className="block h-full">
      <Card accent={accent} className="h-full space-y-3">
        <span className="text-xs font-medium uppercase tracking-wide text-[#8A8A8A]">
          {typeLabels[type]}
        </span>
        <h3 className="text-xl font-semibold text-[#1A1A1A] leading-tight">
          {title}
        </h3>
        <p className="text-base text-[#4A4A4A] leading-relaxed line-clamp-3">
          {description}
        </p>
        <div className="pt-2">
          <span className="text-[#6B5B3A] hover:text-[#4A3F28] font-medium text-sm transition-colors duration-200 inline-flex items-center gap-1">
            Learn more →
          </span>
        </div>
      </Card>
    </Link>
  );
};
