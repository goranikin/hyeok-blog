"use client";

import { SectionDivider } from "@/components/collectionPageSections";
import { useEffect, useRef, useState } from "react";
import { LogbookEmbeddedViewer } from "./_components/logbook-embedded-viewer";
import { LogbookTopicField } from "./_components/logbook-topic-field";
import { logbookEntries, topicSlots } from "./data";
import type { LogbookEntry } from "./types";

export default function LogbookPage() {
  const [selected, setSelected] = useState<LogbookEntry | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected && viewerRef.current) {
      viewerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selected]);

  return (
    <>
      <SectionDivider />

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <LogbookTopicField
            entries={logbookEntries}
            slots={topicSlots}
            selected={selected}
            onSelect={setSelected}
          />

          {selected && (
            <LogbookEmbeddedViewer
              selected={selected}
              viewerRef={viewerRef}
              onClose={() => setSelected(null)}
            />
          )}
        </div>
      </section>
    </>
  );
}
