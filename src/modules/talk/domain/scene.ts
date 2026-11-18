export type SceneId =
  | "hook"
  | "one-person-company"
  | "spark"
  | "research"
  | "skeptics"
  | "team"
  | "cut"
  | "agent-vs-skill"
  | "agents-vs-openspec"
  | "bug"
  | "feature"
  | "support"
  | "hunch"
  | "proof"
  | "tickets"
  | "maturity"
  | "receipts"
  | "shape"
  | "lessons"
  | "limits"
  | "next-steps"
  | "guardrails"
  | "faq"
  | "monday"
  | "finale";

/** One beat of the story. Each scene opens with a question. */
export interface Scene {
  readonly id: SceneId;
  /** Short label for navigation. */
  readonly title: string;
  readonly eyebrow: string;
  readonly question: string;
}
