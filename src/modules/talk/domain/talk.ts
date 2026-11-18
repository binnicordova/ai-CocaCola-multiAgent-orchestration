import type { Agent } from "./agent";
import type { Evidence, EvidenceKey } from "./evidence";
import type { Metric, MetricKey } from "./metric";
import type { Scene } from "./scene";
import type { Source } from "./source";
import type { TimelineEvent } from "./timeline-event";

export interface Presenter {
  readonly name: string;
  readonly role: string;
  readonly company: string;
}

/** Aggregate root of the keynote. */
export interface Talk {
  readonly title: string;
  readonly description: string;
  readonly presenter: Presenter;
  readonly scenes: readonly Scene[];
  readonly agents: readonly Agent[];
  readonly timeline: readonly TimelineEvent[];
  readonly metrics: Readonly<Record<MetricKey, Metric>>;
  readonly evidence: Readonly<Record<EvidenceKey, Evidence>>;
  readonly sources: readonly Source[];
}

export class InvalidTalkError extends Error {}

/** Builds a Talk, enforcing its invariants. */
export function createTalk(talk: Talk): Talk {
  if (talk.scenes.length === 0) throw new InvalidTalkError("A talk needs at least one scene");

  const ids = talk.scenes.map((scene) => scene.id);
  const duplicated = ids.find((id, index) => ids.indexOf(id) !== index);
  if (duplicated) throw new InvalidTalkError(`Duplicated scene id: ${duplicated}`);

  const blank = talk.scenes.find((scene) => scene.question.trim() === "");
  if (blank) throw new InvalidTalkError(`Scene "${blank.id}" must open with a question`);

  for (const [key, evidence] of Object.entries(talk.evidence)) {
    if (evidence.alt.trim() === "") throw new InvalidTalkError(`Evidence "${key}" needs alt text`);
  }

  return talk;
}
