import type { TimelineEvent } from "../domain/timeline-event";

const YEAR = 2026;
const MS_PER_DAY = 86_400_000;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Whole days between two "Mon D" labels of the talk year. */
export function daysBetween(from: string, to: string): number {
  const parse = (label: string): number => {
    const [month = "", day = "0"] = label.split(" ");
    return Date.UTC(YEAR, MONTHS.indexOf(month), Number(day));
  };
  return Math.round((parse(to) - parse(from)) / MS_PER_DAY);
}

/** How many times larger `to` is than `from`, one decimal. */
export const growthFactor = (from: number, to: number): number => Math.round((to / from) * 10) / 10;

/** Runs per day since activation, one decimal. */
export const runRate = (runs: number, days: number): number => Math.round((runs / days) * 10) / 10;

/** Share of a total as a whole percentage. */
export const percentOf = (part: number, total: number): number => Math.round((part / total) * 100);

export interface TimelinePhase {
  readonly events: readonly TimelineEvent[];
  /** Days of silence before this phase; 0 for the first. */
  readonly quietDaysBefore: number;
  /** Days from the first to the last event of the phase. */
  readonly spanDays: number;
}

const QUIET_THRESHOLD_DAYS = 30;

/** Splits a timeline wherever a long quiet stretch separates two bursts of activity. */
export function phasesOf(events: readonly TimelineEvent[]): readonly TimelinePhase[] {
  const phases: TimelineEvent[][] = [];
  const quiet: number[] = [];
  for (const event of events) {
    const current = phases.at(-1);
    const last = current?.at(-1);
    const gap = last ? daysBetween(last.date, event.date) : 0;
    if (current && gap < QUIET_THRESHOLD_DAYS) {
      current.push(event);
    } else {
      phases.push([event]);
      quiet.push(gap);
    }
  }
  return phases.map((group, index) => ({
    events: group,
    quietDaysBefore: quiet[index] ?? 0,
    spanDays: daysBetween(group[0]?.date ?? "Jan 1", group.at(-1)?.date ?? "Jan 1"),
  }));
}
