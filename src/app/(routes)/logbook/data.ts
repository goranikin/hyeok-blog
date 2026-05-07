import type { LogbookEntry, TopicSlot } from "./types";

export const logbookEntries: LogbookEntry[] = [
  {
    id: "study-plan",
    title: "Study Plan",
    description:
      "A weekly roadmap balancing optimization theory and ML research prep.",
    updatedAt: "May 2026",
  },
  {
    id: "marathon-training",
    title: "Marathon Training Schedules",
    description: "A training schedule for the Sub-3:30 marathon.",
    updatedAt: "May 2026",
  },
  {
    id: "espresso-profiles",
    title: "Espresso Profiles",
    description:
      "A collection of espresso profiles for different roast levels.",
    updatedAt: "May 2026",
  },
];

export const topicSlots: TopicSlot[] = [
  {
    top: "8%",
    left: "12%",
    rotate: "-rotate-3",
    accent: "bg-[#E8EBE0]",
    driftX: "18px",
    driftY: "12px",
    duration: "7.2s",
    delay: "-0.6s",
  },
  {
    top: "38%",
    left: "58%",
    rotate: "rotate-2",
    accent: "bg-[#F4E5E0]",
    driftX: "14px",
    driftY: "20px",
    duration: "8.1s",
    delay: "-2.2s",
  },
  {
    top: "62%",
    left: "20%",
    rotate: "-rotate-2",
    accent: "bg-[#E3EBF2]",
    driftX: "22px",
    driftY: "10px",
    duration: "7.8s",
    delay: "-1.3s",
  },
  {
    top: "18%",
    left: "65%",
    rotate: "rotate-3",
    accent: "bg-[#E8E3EB]",
    driftX: "16px",
    driftY: "14px",
    duration: "8.4s",
    delay: "-3.1s",
  },
  {
    top: "70%",
    left: "62%",
    rotate: "-rotate-1",
    accent: "bg-[#DFE8DC]",
    driftX: "13px",
    driftY: "18px",
    duration: "7.4s",
    delay: "-4.4s",
  },
  {
    top: "45%",
    left: "8%",
    rotate: "rotate-1",
    accent: "bg-[#E8DED0]",
    driftX: "20px",
    driftY: "11px",
    duration: "8.3s",
    delay: "-2.9s",
  },
];
