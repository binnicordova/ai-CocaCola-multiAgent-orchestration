import type { Source } from "../../domain/source";

export const sources: readonly Source[] = [
  {
    publisher: "Anthropic Engineering",
    title: "How we built our multi-agent research system",
    url: "https://www.anthropic.com/research/multi-agent-research-system",
    note: "90.2%, 80%, 15×",
  },
  {
    publisher: "Anthropic",
    title: "Building effective agents",
    url: "https://www.anthropic.com/research/building-effective-agents",
    note: "workflows vs agents, orchestrator-workers, keep it simple",
  },
  {
    publisher: "Anthropic",
    title: "Writing effective tools for agents",
    url: "https://www.anthropic.com/research/writing-tools-for-agents",
    note: "token-efficient tool responses",
  },
  {
    publisher: "Anthropic",
    title: "2026 Agentic Coding Trends Report",
    url: "https://claude.com/resources/guides/2026-agentic-coding-trends-report",
    note: "engineering moves from writing code to coordinating agents",
  },
  {
    publisher: "Anthropic Engineering",
    title: "Equipping agents for the real world with Agent Skills",
    url: "https://www.anthropic.com/research/equipping-agents-for-the-real-world-with-agent-skills",
    note: "skills are folders of instructions an agent loads on demand",
  },
  {
    publisher: "Fission-AI",
    title: "OpenSpec: spec-driven development",
    url: "https://github.com/Fission-AI/OpenSpec",
    note: "propose, apply, archive: agree on the spec before the code",
  },
  {
    publisher: "Cognition",
    title: "Don’t Build Multi-Agents",
    url: "https://cognition.com/blog/dont-build-multi-agents",
    note: "the skeptics’ case: share context, actions carry implicit decisions",
  },
];
