import { cn } from "@/utils/cn";

type PageLayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

export default function PageLayout({
  children,
  title,
  description,
  className,
}: PageLayoutProps) {
  return (
    <div className={cn(["flex flex-col gap-8", className])}>
      {(title || description) && (
        <div className="flex flex-col gap-4 border-b pb-6">
          {title && (
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
