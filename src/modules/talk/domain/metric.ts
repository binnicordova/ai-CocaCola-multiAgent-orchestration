export interface Metric {
  readonly value: number;
  readonly decimals?: number;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly label?: string;
}

export type MetricKey =
  | "heroRuns"
  | "hoursLost"
  | "researchGain"
  | "researchVariance"
  | "researchTokens"
  | "ticketsSeller"
  | "ticketsZones"
  | "ticketsInvestigate"
  | "proofRuns"
  | "proofIssues"
  | "proofCompleted"
  | "proofNovember";

const GROUP_SEPARATOR = ",";

/** Display string of a metric: grouped thousands, fixed decimals, prefix and suffix. */
export function formatMetric({ value, decimals = 0, prefix = "", suffix = "" }: Metric): string {
  const [whole = "0", fraction] = value.toFixed(decimals).split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, GROUP_SEPARATOR);
  return `${prefix}${grouped}${fraction ? `.${fraction}` : ""}${suffix}`;
}
