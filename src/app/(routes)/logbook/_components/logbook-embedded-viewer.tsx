"use client";

import { X } from "lucide-react";
import type { RefObject } from "react";
import { entryContentById } from "../_entries";
import type { LogbookEntry } from "../types";

type LogbookEmbeddedViewerProps = {
  selected: LogbookEntry;
  viewerRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
};

export function LogbookEmbeddedViewer({
  selected,
  viewerRef,
  onClose,
}: LogbookEmbeddedViewerProps) {
  const content = entryContentById[selected.id];

  return (
    <article
      ref={viewerRef}
      className="mt-12 rounded-2xl border border-[#EFEFEF] bg-white p-6 shadow-sm animate-fade-in"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-[#EFEFEF] pb-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-[#8A8A8A]">
            Mock logbook entry
          </p>
          <h2 className="mt-1 text-xl font-semibold text-[#1A1A1A]">
            {selected.title}
          </h2>
          <p className="mt-2 text-sm text-[#4D4D4D]">{selected.description}</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close entry"
          className="rounded-md p-1.5 text-[#4A4A4A] transition-colors hover:bg-[#F5F5F5] hover:text-[#1A1A1A]"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div className="mt-5 flex items-center">
        <span className="text-xs text-[#8A8A8A]">
          Updated {selected.updatedAt}
        </span>
      </div>

      <section className="mt-6">
        {content ?? <p>No content available.</p>}
      </section>
    </article>
  );
}
