import type { ReactNode } from "react";
import { EspressoProfilesEntry } from "./espresso-profiles-entry";
import { MarathonTrainingEntry } from "./marathon-training-entry";
import { StudyPlanEntry } from "./study-plan-entry";

export const entryContentById: Record<string, ReactNode> = {
  "study-plan": <StudyPlanEntry />,
  "marathon-training": <MarathonTrainingEntry />,
  "espresso-profiles": <EspressoProfilesEntry />,
};
