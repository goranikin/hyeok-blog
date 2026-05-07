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
  const selectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSelect = (entry: LogbookEntry) => {
    if (selectTimerRef.current) {
      clearTimeout(selectTimerRef.current);
    }

    selectTimerRef.current = setTimeout(() => {
      setSelected(entry);
      selectTimerRef.current = null;
    }, 500);
  };

  const handleClose = () => {
    if (selectTimerRef.current) {
      clearTimeout(selectTimerRef.current);
      selectTimerRef.current = null;
    }
    setSelected(null);
  };

  useEffect(() => {
    if (selected && viewerRef.current) {
      viewerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selected]);

  useEffect(() => {
    return () => {
      if (selectTimerRef.current) {
        clearTimeout(selectTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <SectionDivider />

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <LogbookTopicField
            entries={logbookEntries}
            slots={topicSlots}
            selected={selected}
            onSelect={handleSelect}
          />

          {selected && (
            <LogbookEmbeddedViewer
              selected={selected}
              viewerRef={viewerRef}
              onClose={handleClose}
            />
          )}
        </div>
      </section>
    </>
  );
}
