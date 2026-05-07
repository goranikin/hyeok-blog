"use client";

import { cn } from "@/utils/cn";
import type { CSSProperties } from "react";
import type { LogbookEntry, TopicSlot } from "../types";
import styles from "./logbook-topic-field.module.css";

type LogbookTopicFieldProps = {
  entries: LogbookEntry[];
  slots: TopicSlot[];
  selected: LogbookEntry | null;
  onSelect: (entry: LogbookEntry) => void;
};

const circleSize =
  "flex h-56 w-56 items-center justify-center md:h-64 md:w-64 lg:h-72 lg:w-72";

type FloatingStyle = CSSProperties & {
  "--drift-x": string;
  "--drift-y": string;
  "--float-duration": string;
  "--float-delay": string;
  "--wave-delay": string;
};

export function LogbookTopicField({
  entries,
  slots,
  selected,
  onSelect,
}: LogbookTopicFieldProps) {
  return (
    <div className="relative w-full h-[640px] md:h-[760px] lg:h-[840px]">
      {entries.map((entry, index) => {
        const slot = slots[index % slots.length];
        const isActive = selected?.id === entry.id;
        const floatingStyle: FloatingStyle = {
          top: slot.top,
          left: slot.left,
          "--drift-x": slot.driftX,
          "--drift-y": slot.driftY,
          "--float-duration": slot.duration,
          "--float-delay": slot.delay,
          "--wave-delay": `${index * 180}ms`,
        };

        return (
          <div
            key={entry.id}
            className={cn("absolute", styles.orbitWrapper)}
            style={floatingStyle}
          >
            <button
              type="button"
              onClick={() => onSelect(entry)}
              className={cn(
                "rounded-full shadow-md",
                circleSize,
                "px-3 text-center text-lg font-semibold leading-snug text-[#1A1A1A] lg:text-2xl",
                "transition-all duration-300 ease-out",
                "hover:shadow-xl hover:-translate-y-1 hover:rotate-0",
                "focus:outline-none focus:ring-2 focus:ring-[#6B5B3A] focus:ring-offset-2",
                styles.topicButton,
                slot.accent,
                slot.rotate,
                isActive && styles.activeTopicButton,
                isActive && "ring-2 ring-[#6B5B3A] rotate-0 -translate-y-1",
              )}
            >
              <span className="max-w-[12.5rem] md:max-w-[14rem] lg:max-w-[15rem]">
                {entry.title}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
