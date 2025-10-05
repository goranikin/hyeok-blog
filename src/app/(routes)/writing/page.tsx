import LinkButton from "@/components/link-button";
import PageLayout from "@/components/pageLayout";
import { getCategoryByKey } from "@/config/collections";

export default function WritingPage() {
  const category = getCategoryByKey("writing");

  if (!category) {
    return null;
  }

  return (
    <PageLayout title={category.label} description={category.description}>
      <div className="flex flex-col gap-4 mt-6">
        {category.collections.map((collection) => (
          <LinkButton
            key={collection.key}
            href={collection.path}
            label={collection.label}
            className="py-6"
          />
        ))}
      </div>
    </PageLayout>
  );
}
