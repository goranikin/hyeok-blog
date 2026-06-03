// Client-side inference for the per-person email-usefulness models.
//
// The heavy lifting (training) happened in Python; this file only reproduces the
// 20 hand-engineered features and applies the exported linear models
// (Ridge for the 1-5 score, Logistic Regression for recommend / spam). It is a
// few dot products, so it runs instantly in the browser — no server compute,
// which suits a low-power (N100) host.
//
// The feature definitions MUST match statistics/src/features.py exactly; parity
// is checked against Python-computed vectors in validate.mjs.

export interface LinearModel {
  coef: number[];
  intercept: number;
}

export interface PersonModel {
  name: string;
  mean: number[];
  scale: number[];
  score: LinearModel;
  recommend: LinearModel;
  spam: LinearModel;
  sender_mean: Record<string, number>;
  sender_freq: Record<string, number>;
  global_mean: number;
}

export interface Artifact {
  features: string[];
  bracket_groups: Record<string, string[]>;
  emoji_ranges: [string, string][];
  labelers: Record<string, PersonModel>;
}

export interface EmailInput {
  subject: string;
  body: string;
  sender: string;
  /** ISO string or anything Date can parse; used for hour / weekend signals. */
  datetime: string;
  hyperlinkCount: number;
  fileCount: number;
}

export interface Prediction {
  code: string;
  name: string;
  score: number; // continuous, clamped to [1, 5]
  scoreRounded: number; // nearest integer 1..5
  recommend: boolean;
  recommendProb: number;
  spam: boolean;
  spamProb: number;
  senderKnown: boolean;
}

const log1p = (x: number) => Math.log1p(x);
const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
// Count Unicode code points (Python len), not UTF-16 units (JS .length), so
// emoji/astral characters are counted identically to the Python features.
const cpLen = (s: string) => [...s].length;
const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

function buildEmojiRegex(ranges: [string, string][]): RegExp {
  const cls = ranges
    .map(([a, b]) => `\\u{${a}}-\\u{${b}}`)
    .join("");
  return new RegExp(`[${cls}]`, "gu");
}

/** Parse hour and weekday (Mon=0..Sun=6) from the date string as written. */
function parseWallClock(s: string): { hour: number; weekday: number } {
  const m = (s ?? "").match(/(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})/);
  if (!m) return { hour: 12, weekday: 2 };
  const [, y, mo, da, hh] = m;
  // Date.UTC avoids the runner's local-timezone drift; getUTCDay: Sun=0..Sat=6.
  const utcDay = new Date(Date.UTC(+y, +mo - 1, +da)).getUTCDay();
  const weekday = (utcDay + 6) % 7; // -> Mon=0..Sun=6
  return { hour: +hh, weekday };
}

function bracketKeyword(subject: string): string {
  const m = subject.match(/[[(［【]([^\])］】]+)[\])］】]/u);
  return m ? m[1].trim() : "";
}

/**
 * Reproduce the 20-feature vector (features.py order) for one person. Sender
 * features are looked up from that person's exported maps, with the training
 * global mean / zero frequency as the cold-start fallback for unseen senders.
 */
export function extractFeatures(
  input: EmailInput,
  person: PersonModel,
  artifact: Artifact,
): { vector: number[]; senderKnown: boolean } {
  const subject = input.subject ?? "";
  const body = input.body ?? "";
  const sender = (input.sender ?? "").trim();

  const bodyLength = cpLen(body);
  const nonEmptyLines = body.split("\n").filter((l) => l.trim() !== "").length;
  const sentenceCount = Math.max(nonEmptyLines, 1);

  const emojiRe = buildEmojiRegex(artifact.emoji_ranges);
  const emojiCount = (`${subject}${body}`.match(emojiRe) || []).length;

  // Read the wall-clock hour/date AS WRITTEN (ignore any timezone offset), so a
  // datetime-local input and a "...+09:00" ISO string both yield the local hour.
  const { hour, weekday } = parseWallClock(input.datetime);
  const isWeekend = weekday >= 5 ? 1 : 0; // Mon=0..Sun=6
  const ang = (2 * Math.PI * hour) / 24;

  // bracket topic groups
  const kw = bracketKeyword(subject);
  const groupVals: Record<string, number> = {};
  let matchedAny = false;
  for (const [group, words] of Object.entries(artifact.bracket_groups)) {
    const hit = words.some((w) => kw.includes(w));
    groupVals[group] = hit ? 1 : 0;
    matchedAny = matchedAny || hit;
  }
  groupVals.brkt_other = matchedAny ? 0 : 1;

  // sender lookups
  const senderKnown = Object.prototype.hasOwnProperty.call(person.sender_mean, sender);
  const senderLooMean = senderKnown ? person.sender_mean[sender] : person.global_mean;
  const senderFreq = person.sender_freq[sender] ?? 0;

  const f: Record<string, number> = {
    sender_loo_mean: senderLooMean,
    log1p_sender_frequency: log1p(senderFreq),
    subject_length: cpLen(subject),
    log1p_body_length: log1p(bodyLength),
    subject_to_body_ratio: cpLen(subject) / Math.max(bodyLength, 1),
    log1p_hyperlink_count: log1p(input.hyperlinkCount || 0),
    has_file: (input.fileCount || 0) > 0 ? 1 : 0,
    emoji_count: emojiCount,
    emoji_density: emojiCount / sentenceCount,
    chars_per_sentence: bodyLength / sentenceCount,
    hour_sin: Math.sin(ang),
    hour_cos: Math.cos(ang),
    is_weekend: isWeekend,
    ...groupVals,
  };

  const vector = artifact.features.map((name) => {
    const v = f[name];
    if (v === undefined) throw new Error(`missing feature: ${name}`);
    return v;
  });
  return { vector, senderKnown };
}

function applyLinear(model: LinearModel, z: number[]): number {
  let acc = model.intercept;
  for (let i = 0; i < z.length; i++) acc += model.coef[i] * z[i];
  return acc;
}

export function predictPerson(
  input: EmailInput,
  code: string,
  artifact: Artifact,
): Prediction {
  const person = artifact.labelers[code];
  const { vector, senderKnown } = extractFeatures(input, person, artifact);
  const z = vector.map((x, i) => {
    const s = person.scale[i] || 1;
    return (x - person.mean[i]) / s;
  });

  const scoreRaw = clamp(applyLinear(person.score, z), 1, 5);
  const recProb = sigmoid(applyLinear(person.recommend, z));
  const spamProb = sigmoid(applyLinear(person.spam, z));

  return {
    code,
    name: person.name,
    score: scoreRaw,
    scoreRounded: clamp(Math.round(scoreRaw), 1, 5),
    recommend: recProb >= 0.5,
    recommendProb: recProb,
    spam: spamProb >= 0.5,
    spamProb: spamProb,
    senderKnown,
  };
}

export function predictAll(input: EmailInput, artifact: Artifact): Prediction[] {
  return Object.keys(artifact.labelers).map((code) =>
    predictPerson(input, code, artifact),
  );
}

/** Union of all known sender names across people (for the demo's autocomplete). */
export function knownSenders(artifact: Artifact): string[] {
  const set = new Set<string>();
  for (const p of Object.values(artifact.labelers)) {
    for (const s of Object.keys(p.sender_mean)) set.add(s);
  }
  return Array.from(set).sort();
}
