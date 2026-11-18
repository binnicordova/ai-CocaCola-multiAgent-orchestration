import type { TimelineEvent } from "../../domain/timeline-event";

/** Dates from the Multica workspace history, 2026. */
export const timeline: readonly TimelineEvent[] = [
  { date: "Aug 11", label: "Workspace + Mika" },
  { date: "Aug 14", label: "Specialist agents + Product Team squad" },
  { date: "Aug 17", label: "Code Reviewer + PR autopilot" },
  { date: "Oct 27", label: "Support Agent" },
  { date: "Oct 28", label: "Support chats autopilot · every 15 min" },
  { date: "Oct 30", label: "Teams PR-review autopilot · every 30 min" },
  {
    date: "Nov 1",
    label: "Claude Opus 5.5 (just launched) becomes the engine: efficient enough to trust",
  },
];
