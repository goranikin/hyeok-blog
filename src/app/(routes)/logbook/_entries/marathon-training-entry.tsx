"use client";

import { useMemo, useState } from "react";

type GoalCard = {
  tier: string;
  target: string;
  pace: string;
  note: string;
};

type PaceBand = {
  code: string;
  pace: string;
  purpose: string;
};

type WeekPlan = {
  num: number;
  dates: string;
  totalKm: number;
  longRunKm: number;
  keyWorkout: string;
  tag?: "build" | "cutback" | "peak" | "race";
};

type Phase = {
  id: "1" | "2" | "3";
  label: string;
  name: string;
  meta: string;
  summary: string;
  weeks: WeekPlan[];
};

type LongRunTopic = {
  id:
    | "pacing"
    | "fuel"
    | "caffeine"
    | "hydration"
    | "meal"
    | "recovery"
    | "logistics"
    | "mental"
    | "redflags"
    | "checklist";
  label: string;
  headline: string;
  bullets: string[];
};

const overviewStats = [
  { label: "Goal Pace", value: "4:58 / km" },
  { label: "Peak Volume", value: "78 km/week" },
  { label: "Longest Run", value: "32 km" },
  { label: "Total Volume", value: "~1,500 km" },
];

const goalCards: GoalCard[] = [
  {
    tier: "A - Stretch",
    target: "3:20",
    pace: "4:44 / km",
    note: "Use only if Phase 2 feels easy and HM tune-up is under 1:32.",
  },
  {
    tier: "B - Default",
    target: "3:30",
    pace: "4:58 / km",
    note: "Primary target based on current fitness and existing 10K/HM data.",
  },
  {
    tier: "C - Safety",
    target: "3:45",
    pace: "5:20 / km",
    note: "Fallback for heat, disruption, or rough late-race legs.",
  },
];

const paceBands: PaceBand[] = [
  {
    code: "RC - Recovery",
    pace: "6:15-6:45",
    purpose: "Very easy reset pace.",
  },
  {
    code: "E - Easy",
    pace: "5:45-6:15",
    purpose: "Main aerobic volume bucket.",
  },
  {
    code: "LR - Long",
    pace: "5:45-6:05",
    purpose: "Endurance foundation pace.",
  },
  { code: "MP - Marathon", pace: "4:58", purpose: "Goal B race pace." },
  { code: "T - Tempo", pace: "4:30-4:40", purpose: "Lactate threshold work." },
  {
    code: "I - Interval",
    pace: "4:05-4:15",
    purpose: "VO2max and speed support.",
  },
];

const phases: Phase[] = [
  {
    id: "1",
    label: "Phase I - W1-10",
    name: "Base Building",
    meta: "Apr 27 - Jul 5 | 33 -> 57 km/wk",
    summary:
      "Raise volume and long-run durability with mostly easy/recovery work.",
    weeks: [
      {
        num: 1,
        dates: "Apr 27 - May 3",
        totalKm: 33,
        longRunKm: 12,
        keyWorkout: "12km LR",
        tag: "build",
      },
      {
        num: 2,
        dates: "May 4 - 10",
        totalKm: 35,
        longRunKm: 13,
        keyWorkout: "13km LR",
        tag: "build",
      },
      {
        num: 3,
        dates: "May 11 - 17",
        totalKm: 45,
        longRunKm: 15,
        keyWorkout: "9km E + 6 strides",
        tag: "build",
      },
      {
        num: 4,
        dates: "May 18 - 24",
        totalKm: 31,
        longRunKm: 12,
        keyWorkout: "Cutback week",
        tag: "cutback",
      },
      {
        num: 5,
        dates: "May 25 - 31",
        totalKm: 49,
        longRunKm: 17,
        keyWorkout: "17km LR",
        tag: "build",
      },
      {
        num: 6,
        dates: "Jun 1 - 7",
        totalKm: 48,
        longRunKm: 18,
        keyWorkout: "18km LR",
        tag: "build",
      },
      {
        num: 7,
        dates: "Jun 8 - 14",
        totalKm: 53,
        longRunKm: 20,
        keyWorkout: "20km LR",
        tag: "build",
      },
      {
        num: 8,
        dates: "Jun 15 - 21",
        totalKm: 34,
        longRunKm: 15,
        keyWorkout: "Cutback week",
        tag: "cutback",
      },
      {
        num: 9,
        dates: "Jun 22 - 28",
        totalKm: 55,
        longRunKm: 22,
        keyWorkout: "22km LR",
        tag: "build",
      },
      {
        num: 10,
        dates: "Jun 29 - Jul 5",
        totalKm: 57,
        longRunKm: 22,
        keyWorkout: "22km LR",
        tag: "build",
      },
    ],
  },
  {
    id: "2",
    label: "Phase II - W11-22",
    name: "Marathon-Specific",
    meta: "Jul 6 - Sep 27 | peak 77 km/wk",
    summary: "Introduce tempo, intervals, and marathon-pace long-run endings.",
    weeks: [
      {
        num: 11,
        dates: "Jul 6 - 12",
        totalKm: 59,
        longRunKm: 24,
        keyWorkout: "4 W/U + 5T + 2 C/D",
      },
      {
        num: 12,
        dates: "Jul 13 - 19",
        totalKm: 62,
        longRunKm: 26,
        keyWorkout: "6x1km I @4:30",
      },
      {
        num: 13,
        dates: "Jul 20 - 26",
        totalKm: 65,
        longRunKm: 26,
        keyWorkout: "26km LR, last 6 @ MP",
      },
      {
        num: 14,
        dates: "Jul 27 - Aug 2",
        totalKm: 45,
        longRunKm: 18,
        keyWorkout: "Cutback week",
        tag: "cutback",
      },
      {
        num: 15,
        dates: "Aug 3 - 9",
        totalKm: 67,
        longRunKm: 28,
        keyWorkout: "8x800 I, 90s jog",
      },
      {
        num: 16,
        dates: "Aug 10 - 16",
        totalKm: 70,
        longRunKm: 28,
        keyWorkout: "28km LR, last 8 @ MP",
      },
      {
        num: 17,
        dates: "Aug 17 - 23",
        totalKm: 72,
        longRunKm: 30,
        keyWorkout: "5x1.6km I, 400m jog",
      },
      {
        num: 18,
        dates: "Aug 24 - 30",
        totalKm: 50,
        longRunKm: 21,
        keyWorkout: "Cutback week",
        tag: "cutback",
      },
      {
        num: 19,
        dates: "Aug 31 - Sep 6",
        totalKm: 76,
        longRunKm: 32,
        keyWorkout: "4 W/U + 10T + 2 C/D",
      },
      {
        num: 20,
        dates: "Sep 7 - 13",
        totalKm: 75,
        longRunKm: 30,
        keyWorkout: "30km LR, last 12 @ MP",
      },
      {
        num: 21,
        dates: "Sep 14 - 20",
        totalKm: 77,
        longRunKm: 32,
        keyWorkout: "4 W/U + 12T + 2 C/D",
      },
      {
        num: 22,
        dates: "Sep 21 - 27",
        totalKm: 53,
        longRunKm: 23,
        keyWorkout: "Cutback + HM tune-up",
        tag: "cutback",
      },
    ],
  },
  {
    id: "3",
    label: "Phase III - W23-27",
    name: "Peak + Taper",
    meta: "Sep 28 - Nov 1 | race day",
    summary: "One final peak week, then a controlled taper into race day.",
    weeks: [
      {
        num: 23,
        dates: "Sep 28 - Oct 4",
        totalKm: 78,
        longRunKm: 32,
        keyWorkout: "32km LR, last 16 @ MP",
        tag: "peak",
      },
      {
        num: 24,
        dates: "Oct 5 - 11",
        totalKm: 58,
        longRunKm: 24,
        keyWorkout: "5x1km I",
      },
      {
        num: 25,
        dates: "Oct 12 - 18",
        totalKm: 45,
        longRunKm: 18,
        keyWorkout: "4 W/U + 5T + 2 C/D",
      },
      {
        num: 26,
        dates: "Oct 19 - 25",
        totalKm: 32,
        longRunKm: 12,
        keyWorkout: "5E with 3 @ MP",
      },
      {
        num: 27,
        dates: "Oct 26 - Nov 1",
        totalKm: 64,
        longRunKm: 42.2,
        keyWorkout: "Race week",
        tag: "race",
      },
    ],
  },
];

const longRunTopics: LongRunTopic[] = [
  {
    id: "pacing",
    label: "01 - Pacing",
    headline: "Slower than you think.",
    bullets: [
      "Standard long run: 5:45-6:05/km with full-sentence breathing.",
      "Recovery long run: 6:15-6:45/km in heat or fatigue.",
      "MP-ending run: easy first, then close at 4:58/km.",
    ],
  },
  {
    id: "fuel",
    label: "02 - Fueling",
    headline: "Beat the wall with carbs.",
    bullets: [
      "90-150 min runs: 30-60g carbs/hour.",
      "Race day (3:30): target 5-6 gels every 35-40 minutes.",
      "Practice fueling in training from Week 13 onward.",
    ],
  },
  {
    id: "caffeine",
    label: "03 - Caffeine",
    headline: "A legal 2-4% boost.",
    bullets: [
      "Pre-run dose: 3-6 mg/kg, 30-60 minutes before effort.",
      "Mid-race top-up: caffeinated gel around km 25-30.",
      "Test tolerance before race day to avoid GI issues.",
    ],
  },
  {
    id: "hydration",
    label: "04 - Hydration",
    headline: "Drink to thirst, plus margin in heat.",
    bullets: [
      "Cool: thirst-guided; moderate: 400-600 ml/hour; hot: 600-800 ml/hour.",
      "Add sodium for long/hot runs: ~300-700 mg per liter.",
      "Avoid over-hydration and stomach sloshing.",
    ],
  },
  {
    id: "meal",
    label: "05 - Pre-Run Meal",
    headline: "Carbs first, gut-safe choices.",
    bullets: [
      "Eat 2-3 hours before (or 60-90 min for very early runs).",
      "Target 1-2g carbs/kg, keep fat/fiber low.",
      "Korean-friendly picks: rice + light protein, banana toast, simple kimbap.",
    ],
  },
  {
    id: "recovery",
    label: "06 - Recovery",
    headline: "The first hour matters.",
    bullets: [
      "Within 30-60 min: 20-30g protein + 60-80g carbs.",
      "Within 2 hours: full meal plus hydration.",
      "Sleep is the top recovery lever.",
    ],
  },
  {
    id: "logistics",
    label: "07 - Logistics",
    headline: "Plan the boring details.",
    bullets: [
      "Use race shoes on several long runs before race day.",
      "Prefer loop routes for easy fuel/water access.",
      "In summer Seoul, start early (around 6am).",
    ],
  },
  {
    id: "mental",
    label: "08 - Mental Game",
    headline: "Train mindset on Sundays.",
    bullets: [
      "Segment long runs into manageable blocks.",
      "Use cues: relax shoulders, quick feet, strong arms.",
      "Treat late-run discomfort as race-specific practice.",
    ],
  },
  {
    id: "redflags",
    label: "09 - Red Flags",
    headline: "Stop early to protect consistency.",
    bullets: [
      "Stop on sharp localized pain, dizziness, or chills in heat.",
      "Cut the run if HR stays abnormally high despite slowing.",
      "Stop when form breaks down completely.",
    ],
  },
  {
    id: "checklist",
    label: "10 - Checklist",
    headline: "Four-stage routine.",
    bullets: [
      "Night before: lay out gear, route, weather, early sleep.",
      "During run: start controlled, fuel on schedule, hydrate by thirst.",
      "After run: refuel early, walk, hydrate, and recover sleep.",
    ],
  },
];

const principles = [
  "80/20 rule: keep most volume easy.",
  "Long run is sacred every week.",
  "Follow 10% progression control.",
  "Use cutback every fourth week.",
  "Fuel all runs over 90 minutes.",
  "Adjust pace by effort in heat.",
];

function weekTagClass(tag?: WeekPlan["tag"]) {
  if (tag === "cutback") return "bg-[#EEECE7] text-[#5A5147]";
  if (tag === "peak") return "bg-[#E7F0DF] text-[#335E2B]";
  if (tag === "race") return "bg-[#244321] text-white";
  return "bg-[#F5F7F2] text-[#5A6853]";
}

export function MarathonTrainingEntry() {
  const [activePhase, setActivePhase] = useState<Phase["id"]>("1");
  const [activeTopic, setActiveTopic] = useState<LongRunTopic["id"]>("pacing");

  const selectedPhase = useMemo(
    () => phases.find((phase) => phase.id === activePhase) ?? phases[0],
    [activePhase],
  );
  const selectedTopic = useMemo(
    () =>
      longRunTopics.find((topic) => topic.id === activeTopic) ??
      longRunTopics[0],
    [activeTopic],
  );

  return (
    <div className="space-y-8 text-base leading-8 text-[#2F2F2F]">
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-[#1A1A1A]">
          Sub-3:30 marathon protocol (27 weeks)
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {overviewStats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-lg border border-[#E4E8DE] bg-[#F7FAF3] px-3 py-2"
            >
              <p className="text-xs uppercase tracking-wide text-[#6B7465]">
                {stat.label}
              </p>
              <p className="text-sm font-semibold text-[#1F2A1B]">
                {stat.value}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="text-base font-semibold text-[#1A1A1A]">
          Race-day goals
        </h4>
        <div className="grid gap-3 md:grid-cols-3">
          {goalCards.map((goal) => (
            <article
              key={goal.tier}
              className="rounded-lg border border-[#E6E6E6] bg-white p-3"
            >
              <p className="text-xs uppercase tracking-wide text-[#6A6A6A]">
                {goal.tier}
              </p>
              <p className="mt-1 text-lg font-semibold text-[#1A1A1A]">
                {goal.target}
              </p>
              <p className="text-sm font-medium text-[#355C2D]">{goal.pace}</p>
              <p className="mt-2 text-sm text-[#404040]">{goal.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="text-base font-semibold text-[#1A1A1A]">Pace bands</h4>
        <div className="grid gap-2 sm:grid-cols-2">
          {paceBands.map((band) => (
            <article
              key={band.code}
              className="rounded-md border border-[#ECECEC] bg-[#FCFCFC] px-3 py-2"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[#666]">
                {band.code}
              </p>
              <p className="text-sm font-semibold text-[#1F1F1F]">
                {band.pace} / km
              </p>
              <p className="text-sm text-[#444]">{band.purpose}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="text-base font-semibold text-[#1A1A1A]">
          Protocol by phase
        </h4>
        <div className="flex flex-wrap gap-2">
          {phases.map((phase) => (
            <button
              key={phase.id}
              type="button"
              onClick={() => setActivePhase(phase.id)}
              className={`rounded-full border px-3 py-1.5 text-base transition-colors ${
                activePhase === phase.id
                  ? "border-[#31572B] bg-[#31572B] text-white"
                  : "border-[#CCD8C5] bg-[#F7FAF3] text-[#31572B] hover:bg-[#EEF5E8]"
              }`}
            >
              {phase.label}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-[#E5EBDD] bg-white p-4">
          <p className="text-sm font-semibold text-[#1D2A19]">
            {selectedPhase.name}
          </p>
          <p className="text-xs uppercase tracking-wide text-[#6A7565]">
            {selectedPhase.meta}
          </p>
          <p className="mt-2 text-sm text-[#384235]">{selectedPhase.summary}</p>

          <div className="mt-4 grid gap-2">
            {selectedPhase.weeks.map((week) => (
              <article
                key={week.num}
                className="rounded-md border border-[#ECEFE8] bg-[#FBFCFA] px-3 py-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-[#1E2A1A]">
                    W{String(week.num).padStart(2, "0")} - {week.dates}
                  </p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${weekTagClass(week.tag)}`}
                  >
                    {(week.tag ?? "build").toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-[#44503F]">
                  {week.totalKm} km/week | Long run {week.longRunKm} km
                </p>
                <p className="text-sm text-[#3A4436]">
                  Key workout: {week.keyWorkout}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h4 className="text-base font-semibold text-[#1A1A1A]">
          Long run manual
        </h4>
        <div className="flex flex-wrap gap-2">
          {longRunTopics.map((topic) => (
            <button
              key={topic.id}
              type="button"
              onClick={() => setActiveTopic(topic.id)}
              className={`rounded-md border px-2.5 py-1.5 text-sm font-medium transition-colors ${
                activeTopic === topic.id
                  ? "border-[#31572B] bg-[#31572B] text-white"
                  : "border-[#CCD8C5] bg-[#F7FAF3] text-[#31572B] hover:bg-[#EEF5E8]"
              }`}
            >
              {topic.label}
            </button>
          ))}
        </div>

        <article className="rounded-xl border border-[#E5EBDD] bg-white p-4">
          <h5 className="text-base font-semibold text-[#1E2A1A]">
            {selectedTopic.headline}
          </h5>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#394434]">
            {selectedTopic.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="space-y-2">
        <h4 className="text-base font-semibold text-[#1A1A1A]">Ground rules</h4>
        <ul className="list-disc space-y-1 pl-5 text-sm text-[#394434]">
          {principles.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
