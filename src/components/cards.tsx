import { cn } from "@/utils/cn";
import Link from "next/link";
import type { ReactNode } from "react";

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
        className,
      )}
    >
      {children}
    </div>
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
              <p className="text-base text-[#4A4A4A] line-clamp-2">{excerpt}</p>
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
