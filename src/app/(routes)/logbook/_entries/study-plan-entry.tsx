"use client";

import { useState } from "react";

type ChapterBlock = {
  chapter: string;
  description: string;
  expectedTime: string;
  status: "Deep focus" | "Light pass" | "Core focus" | "Recap" | "Defer";
};

type BookBlock = {
  title: string;
  totalEstimate: string;
  chapters: ChapterBlock[];
};

const bookPlan: BookBlock[] = [
  {
    title: "Convex Optimization (Boyd)",
    totalEstimate: "About 12-13 weeks total",
    chapters: [
      {
        chapter: "Ch 4 - Convex optimization problems",
        description:
          "Recognize LP/QP/SOCP/SDP classes used repeatedly in logistics and OR modeling.",
        expectedTime: "2.0-2.5 weeks",
        status: "Deep focus",
      },
      {
        chapter: "Ch 5 - Duality",
        description:
          "Build KKT and Lagrangian intuition for Wolsey, decomposition, SVM, and constrained RL.",
        expectedTime: "2.5-3.0 weeks",
        status: "Deep focus",
      },
      {
        chapter: "Ch 9 - Unconstrained minimization",
        description:
          "Develop gradient/Newton optimization intuition that transfers to DL and RL optimization.",
        expectedTime: "1.5-2.0 weeks",
        status: "Deep focus",
      },
      {
        chapter: "Ch 10 - Equality-constrained minimization",
        description:
          "Bridge chapter feeding directly into interior-point understanding.",
        expectedTime: "1.0-1.5 weeks",
        status: "Light pass",
      },
      {
        chapter: "Ch 11 - Interior-point methods",
        description:
          "Understand solver internals without deriving every proof step.",
        expectedTime: "1.5-2.0 weeks",
        status: "Light pass",
      },
      {
        chapter: "Ch 6 - Approximation and fitting",
        description:
          "Connect to Lasso, robust regression, and ML fitting patterns.",
        expectedTime: "0.8-1.0 weeks",
        status: "Light pass",
      },
      {
        chapter: "Ch 7 - Statistical estimation",
        description:
          "Useful but likely revisited in dedicated stats/ML contexts.",
        expectedTime: "0.5 week (map only)",
        status: "Defer",
      },
      {
        chapter: "Ch 8 - Geometric problems",
        description:
          "Lower immediate ROI unless SDP-relaxation-heavy facility-location work appears.",
        expectedTime: "0.5 week (map only)",
        status: "Defer",
      },
    ],
  },
  {
    title: "Introduction to Probability Models (Ross)",
    totalEstimate: "About 6 weeks for priority set",
    chapters: [
      {
        chapter: "Ch 8 - Queueing Theory",
        description:
          "Covers M/M/1, M/M/c, M/G/1, Little's Law, and Jackson networks for logistics operations.",
        expectedTime: "3.0-4.0 weeks",
        status: "Deep focus",
      },
      {
        chapter: "Ch 11 - Simulation",
        description:
          "Monte Carlo and variance-reduction foundations needed for stochastic RL and logistics simulation.",
        expectedTime: "2.0 weeks",
        status: "Deep focus",
      },
      {
        chapter: "Ch 7 - Renewal Theory",
        description:
          "Learn on demand for specific queueing/inventory tasks (key theorem-level familiarity).",
        expectedTime: "0.5 week (map only)",
        status: "Defer",
      },
      {
        chapter: "Ch 9 - Reliability",
        description:
          "Defer unless reliability/maintenance research becomes active.",
        expectedTime: "0.3 week (map only)",
        status: "Defer",
      },
      {
        chapter: "Ch 10 - Brownian Motion",
        description:
          "Moderate long-term value for diffusion/SDE topics; not immediate critical path.",
        expectedTime: "0.5 week (map only)",
        status: "Defer",
      },
    ],
  },
  {
    title: "Fundamentals of Supply Chain Theory (Snyder)",
    totalEstimate: "About 10-12 weeks",
    chapters: [
      {
        chapter: "Post-Ch 5 remaining chapters",
        description:
          "Treat all remaining sections as core because this is the primary domain for paper writing.",
        expectedTime: "10-12 weeks (about 1.0-1.5 week/chapter)",
        status: "Core focus",
      },
    ],
  },
  {
    title: "Understanding Analysis (Abbott)",
    totalEstimate: "About 2 weeks recap",
    chapters: [
      {
        chapter: "Ch 2 - Sequences and Series",
        description:
          "Refresh epsilon-N convergence logic used in optimization analysis.",
        expectedTime: "0.5 week",
        status: "Recap",
      },
      {
        chapter: "Ch 3 - Topology of R",
        description:
          "Reinforce compactness/open-closed concepts for existence and continuity arguments.",
        expectedTime: "0.5 week",
        status: "Recap",
      },
      {
        chapter: "Ch 4-5 - Continuity and Derivative",
        description:
          "Quick reading pass to tighten proof fluency and notation comfort.",
        expectedTime: "0.7 week",
        status: "Recap",
      },
      {
        chapter: "Ch 7-8",
        description:
          "Skip now; revisit later if measure-theory pathway is activated.",
        expectedTime: "0.3 week (map only)",
        status: "Defer",
      },
    ],
  },
];

const statusClass: Record<ChapterBlock["status"], string> = {
  "Deep focus": "bg-[#E8F3EA] text-[#27573A]",
  "Light pass": "bg-[#F7F1E5] text-[#6B4E1E]",
  "Core focus": "bg-[#E7EDF8] text-[#1F4A7A]",
  Recap: "bg-[#EEEAF7] text-[#4A376F]",
  Defer: "bg-[#F2F2F2] text-[#5A5A5A]",
};

type BookToggleButtonProps = {
  index: number;
  title: string;
  estimate: string;
  open: boolean;
  onToggle: () => void;
};

function BookToggleButton({
  index,
  title,
  estimate,
  open,
  onToggle,
}: BookToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="flex w-full items-center gap-3 border-b border-[#F0F0F0] px-4 py-3 text-left"
    >
      <span className="w-16 shrink-0 text-sm font-semibold uppercase tracking-wide text-[#4A5E42]">
        Book {index + 1}
      </span>
      <span className="min-w-0 flex-1 text-lg font-semibold text-[#1F2E22]">
        {title}
      </span>
      <span className="hidden rounded-full border border-[#C8D7BF] px-2 py-0.5 text-sm font-medium text-[#4A5E42] sm:inline-flex">
        {estimate}
      </span>
      <span className="text-lg font-semibold text-[#4A5E42]">{open ? "-" : "+"}</span>
    </button>
  );
}

export function StudyPlanEntry() {
  const [openBook, setOpenBook] = useState<string>(bookPlan[0]?.title ?? "");

  return (
    <div className="space-y-8 text-base leading-8 text-[#2F2F2F]">
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-[#1A1A1A]">
          Detailed study plan
        </h3>
        <p>
          Goal: build a strong path to logistics optimization research with ML
          under limited weekly study time.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-[#1A1A1A]">
          Book and chapter blocks
        </h3>

        {bookPlan.map((book, index) => {
          const isOpen = openBook === book.title;

          return (
            <article
              key={book.title}
              className="rounded-xl border border-[#EDEDED] bg-white shadow-sm"
            >
              <BookToggleButton
                index={index}
                title={book.title}
                estimate={book.totalEstimate}
                open={isOpen}
                onToggle={() =>
                  setOpenBook((current) => (current === book.title ? "" : book.title))
                }
              />

              {isOpen ? (
                <div className="space-y-3 p-4">
                  {book.chapters.map((item) => (
                    <div
                      key={`${book.title}-${item.chapter}`}
                      className="rounded-lg border border-[#EFEFEF] bg-[#FAF9F6] p-3"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium text-[#1F1F1F]">{item.chapter}</p>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusClass[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-1 text-[#3F3F3F]">{item.description}</p>
                      <p className="mt-2 text-sm font-medium text-[#676767]">
                        Expected time: {item.expectedTime}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </article>
          );
        })}
      </section>
    </div>
  );
}
