import type { Metric, MetricKey } from "../../domain/metric";

export const metrics: Readonly<Record<MetricKey, Metric>> = {
  heroRuns: { value: 3722 },
  hoursLost: {
    value: 847,
    label:
      "hours lost this year to the same bugs, emails and deploys (my estimate, not a Multica metric)",
  },
  researchGain: {
    value: 90.2,
    decimals: 1,
    suffix: "%",
    label:
      "better than a single agent on Anthropic’s internal research eval (lead Opus 4 + Sonnet 4 subagents)",
  },
  researchVariance: {
    value: 80,
    suffix: "%",
    label:
      "of performance variance on BrowseComp explained by tokens spent. More parallel thinking, more capacity",
  },
  researchTokens: {
    value: 15,
    suffix: "×",
    label: "the tokens of a chat. It only pays off when the task is worth it",
  },
  ticketsSeller: { value: 38, prefix: "~", label: "tickets: create or update a seller" },
  ticketsZones: { value: 27, prefix: "~", label: "tickets: change zones and routes" },
  ticketsInvestigate: {
    value: 18,
    prefix: "~",
    label: "tickets: investigate a failure (login, order, price/SKU)",
  },
  proofRuns: { value: 3722, label: "agent runs" },
  proofIssues: { value: 199, label: "issues created, 77 already done" },
  proofCompleted: {
    value: 93,
    suffix: "%",
    label: "of runs completed (3,458 of 3,722, captured Nov 13)",
  },
  proofNovember: { value: 112, label: "issues in November alone, up from 17 in August" },
};
