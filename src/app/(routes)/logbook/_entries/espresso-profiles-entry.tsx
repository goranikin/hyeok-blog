"use client";

import { useState } from "react";

type ProfileStat = {
  label: string;
  value: string;
};

type EspressoProfile = {
  id: string;
  numberLabel: string;
  name: string;
  acronym: string;
  tagline: string;
  pressureSummary: string;
  description: string;
  bestFor: string;
  stats: ProfileStat[];
};

const espressoProfiles: EspressoProfile[] = [
  {
    id: "flat-9-bar",
    numberLabel: "No. 01",
    name: "Flat 9 Bar",
    acronym: "CLASSIC",
    tagline: "The reference shot and baseline for traditional espresso.",
    pressureSummary: "Ramp to 9 bar and hold until finish (~28s).",
    description:
      "Mimics commercial pump espresso style: confident pressure ramp, then stable extraction.",
    bestFor:
      "Medium-dark roasts, classic blends, and milk drinks. A strong default for first dial-ins.",
    stats: [
      { label: "Dose", value: "18g" },
      { label: "Shot time", value: "~28s" },
      { label: "Brew ratio", value: "1:2 to 1:2.5 (18g -> 36-45g)" },
      { label: "Grind", value: "Standard 9-bar espresso" },
    ],
  },
  {
    id: "declining-pressure",
    numberLabel: "No. 02",
    name: "Declining Pressure",
    acronym: "FORGIVING",
    tagline: "Balanced spring-lever style extraction.",
    pressureSummary: "Peak 5-9 bar (6-7 recommended), then decline to ~2 bar.",
    description:
      "The gradual decline helps avoid bitter late extraction as the puck softens.",
    bestFor:
      "Most roast levels, especially when prep is not perfect and you want stability.",
    stats: [
      { label: "Dose", value: "18g" },
      { label: "Shot time", value: "25-30s" },
      { label: "Brew ratio", value: "1:2.5 to 1:3 (18g -> 45-54g)" },
      { label: "Grind", value: "Standard espresso grind" },
    ],
  },
  {
    id: "pull-hard-pull-soft",
    numberLabel: "No. 03",
    name: "Pull Hard, Pull Soft",
    acronym: "P-H-P-S",
    tagline: "Fast, modern, and focused on acidity and clarity.",
    pressureSummary: "Immediate ramp to 5 bar, then drop to 2-3 bar.",
    description:
      "High early pressure extracts sweetness, then soft pressure finishes without heavy bitterness.",
    bestFor:
      "Light-medium modern roasts. Bottom paper filter helps maintain low resistance.",
    stats: [
      { label: "Dose", value: "18g" },
      { label: "Shot time", value: "14-18s" },
      { label: "Brew ratio", value: "1:3 (18g -> 54g)" },
      { label: "Grind", value: "Low resistance + bottom paper filter" },
    ],
  },
  {
    id: "pull-soft-pull-hard",
    numberLabel: "No. 04",
    name: "Pull Soft, Pull Hard",
    acronym: "P-S-P-H",
    tagline: "Long gentle bloom, then stronger extraction push.",
    pressureSummary:
      "Pre-infuse at 0-3 bar until saturation, then ramp to 3-7 bar.",
    description:
      "The bloom phase expands and wets the puck evenly before higher-pressure extraction.",
    bestFor:
      "Dense light roasts when targeting higher extraction and sweetness.",
    stats: [
      { label: "Dose", value: "18g" },
      { label: "Shot time", value: "Fast modern style" },
      { label: "Brew ratio", value: "1:3 (18g -> 54g)" },
      { label: "Grind", value: "Low resistance / modern espresso" },
    ],
  },
  {
    id: "dc-soup",
    numberLabel: "No. 05",
    name: "DC Soup",
    acronym: "FAST ACIDITY",
    tagline: "Extreme bloom + very fast push for bright cups.",
    pressureSummary: "~0 bar bloom (max 0.5), then push through in 8-12s.",
    description:
      "Uses very coarse grind and short pressurized extraction to emphasize brightness.",
    bestFor:
      "Very light acidic single-origin coffees; expect tea-like body and low crema.",
    stats: [
      { label: "Dose", value: "18g" },
      { label: "Shot time", value: "8-12s (pressurized phase)" },
      { label: "Brew ratio", value: "1:3 (18g -> 54g)" },
      { label: "Grind", value: "~300 um, very coarse" },
    ],
  },
  {
    id: "f-2x",
    numberLabel: "Bonus",
    name: "F 2.x Filter Style",
    acronym: "CONCENTRATE",
    tagline: "Espresso equipment workflow for a filter-style final cup.",
    pressureSummary: "0 bar bloom 45-90s, then <1 bar at 1-2 ml/s.",
    description:
      "Create a small concentrate, then dilute with hot water to around 8 oz (236g).",
    bestFor:
      "Pour-over-like clarity when only espresso equipment is available.",
    stats: [
      { label: "Dose", value: "15-16g" },
      { label: "Total time", value: "45-90s (with bloom)" },
      { label: "Brew ratio", value: "1:3 to 1:3.5, then dilute" },
      { label: "Grind", value: "Fine (close to traditional espresso)" },
    ],
  },
];

type ProfileCardProps = {
  profile: EspressoProfile;
  open: boolean;
  onToggle: () => void;
};

type ProfileToggleButtonProps = {
  profile: EspressoProfile;
  open: boolean;
  onToggle: () => void;
};

function ProfileToggleButton({ profile, open, onToggle }: ProfileToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="flex w-full items-center gap-3 px-4 py-3 text-left"
    >
      <span className="w-16 shrink-0 text-sm font-semibold uppercase tracking-wide text-[#4A5E42]">
        {profile.numberLabel}
      </span>
      <span className="min-w-0 flex-1 text-lg font-semibold text-[#1F2E22]">
        {profile.name}
      </span>
      <span className="hidden rounded-full border border-[#C8D7BF] px-2 py-0.5 text-sm font-medium text-[#4A5E42] sm:inline-flex">
        {profile.acronym}
      </span>
      <span className="text-lg font-semibold text-[#4A5E42]">{open ? "-" : "+"}</span>
    </button>
  );
}

function ProfileCard({ profile, open, onToggle }: ProfileCardProps) {
  return (
    <article
      className={`rounded-xl border transition-colors ${
        open
          ? "border-[#2D5028] bg-[#F3F8EE]"
          : "border-[#D5E1CF] bg-[#F8FBF4] hover:border-[#91AF85]"
      }`}
    >
      <ProfileToggleButton profile={profile} open={open} onToggle={onToggle} />

      {open && (
        <div className="space-y-4 border-t border-[#C7D8BE] px-4 pb-4 pt-3">
          <p className="text-base italic text-[#31502A]">{profile.tagline}</p>

          <div className="grid gap-2 sm:grid-cols-2">
            {profile.stats.map((stat) => (
              <div
                key={`${profile.id}-${stat.label}`}
                className="rounded-md border border-[#D4E2CD] bg-[#EEF5E7] px-3 py-2"
              >
                <p className="text-xs uppercase tracking-wide text-[#4D6945]">
                  {stat.label}
                </p>
                <p className="mt-1 text-base font-medium text-[#1F2E22]">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-md border border-[#D4E2CD] bg-[#EEF5E7] px-3 py-2 text-base text-[#233527]">
            <p className="font-semibold text-[#31502A]">Pressure profile</p>
            <p>{profile.pressureSummary}</p>
          </div>

          <p className="text-base text-[#25382A]">{profile.description}</p>
          <p className="text-base text-[#25382A]">
            <span className="font-semibold text-[#31502A]">Best for:</span>{" "}
            {profile.bestFor}
          </p>
        </div>
      )}
    </article>
  );
}

export function EspressoProfilesEntry() {
  const [openId, setOpenId] = useState<string>(espressoProfiles[0]?.id ?? "");

  return (
    <div className="space-y-5 text-base leading-8 text-[#1F2E22]">
      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-[#1A1A1A]">
          Six espresso profiles (Flair 58 reference)
        </h3>
        <p className="text-[#355139]">
          A migrated, interactive index from the original HTML. Tap a profile to
          expand recipe details and pressure notes.
        </p>
        <p className="rounded-md border border-[#D4E2CD] bg-[#F1F7EB] px-3 py-2 text-base text-[#355139]">
          Original recipes were dialed on Acaia Orbit + SSP MP burrs. For J-Max,
          dial in by taste.
        </p>
      </section>

      <section className="space-y-3">
        {espressoProfiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            open={openId === profile.id}
            onToggle={() =>
              setOpenId((current) => (current === profile.id ? "" : profile.id))
            }
          />
        ))}
      </section>
    </div>
  );
}
