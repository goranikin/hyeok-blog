type PageHeroProps = {
  title: string;
  description: string;
  subdescription?: string;
  containerClassName?: string;
  contentClassName?: string;
};

type SectionHeaderProps = {
  title: string;
  description: string;
};

type EmptyStateProps = {
  title: string;
  description: string;
};

export function PageHero({
  title,
  description,
  subdescription,
  containerClassName = "max-w-7xl mx-auto px-6 lg:px-12",
  contentClassName = "max-w-3xl",
}: PageHeroProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className={containerClassName}>
        <div className={contentClassName}>
          <h1 className="text-4xl lg:text-5xl font-semibold text-[#1A1A1A] mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-[#4A4A4A] leading-relaxed mb-4">
            {description}
          </p>
          {subdescription ? (
            <p className="text-lg text-[#4A4A4A] leading-relaxed">
              {subdescription}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function SectionDivider() {
  return <hr className="border-t border-[#EFEFEF]" />;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl lg:text-4xl font-semibold text-[#1A1A1A] mb-3">
        {title}
      </h2>
      <p className="text-lg text-[#4A4A4A]">{description}</p>
    </div>
  );
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="text-center py-16 bg-[#FAF9F6] rounded-2xl">
      <p className="text-xl text-[#4A4A4A] mb-2">{title}</p>
      <p className="text-base text-[#8A8A8A]">{description}</p>
    </div>
  );
}
