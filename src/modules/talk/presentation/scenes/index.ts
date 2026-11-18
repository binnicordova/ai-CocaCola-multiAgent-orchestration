import type { ComponentType } from "react";
import type { SceneId } from "../../domain/scene";
import { AgentVsSkillScene } from "./agent-vs-skill-scene";
import { AgentsVsOpenspecScene } from "./agents-vs-openspec-scene";
import { BugScene } from "./bug-scene";
import { CutScene } from "./cut-scene";
import { FaqScene } from "./faq-scene";
import { FeatureScene } from "./feature-scene";
import { FinaleScene } from "./finale-scene";
import { GuardrailsScene } from "./guardrails-scene";
import { HookScene } from "./hook-scene";
import { HunchScene } from "./hunch-scene";
import { LessonsScene } from "./lessons-scene";
import { LimitsScene } from "./limits-scene";
import { MaturityScene } from "./maturity-scene";
import { MondayScene } from "./monday-scene";
import { NextStepsScene } from "./next-steps-scene";
import { OnePersonCompanyScene } from "./one-person-company-scene";
import { ProofScene } from "./proof-scene";
import { ReceiptsScene } from "./receipts-scene";
import { ResearchScene } from "./research-scene";
import type { SceneProps } from "./scene-props";
import { ShapeScene } from "./shape-scene";
import { SkepticsScene } from "./skeptics-scene";
import { SparkScene } from "./spark-scene";
import { SupportScene } from "./support-scene";
import { TeamScene } from "./team-scene";
import { TicketsScene } from "./tickets-scene";

/** Maps each domain scene to the component that tells it. The compiler enforces exhaustiveness. */
export const sceneComponents: Record<SceneId, ComponentType<SceneProps>> = {
  hook: HookScene,
  "one-person-company": OnePersonCompanyScene,
  spark: SparkScene,
  research: ResearchScene,
  skeptics: SkepticsScene,
  team: TeamScene,
  cut: CutScene,
  "agent-vs-skill": AgentVsSkillScene,
  "agents-vs-openspec": AgentsVsOpenspecScene,
  bug: BugScene,
  feature: FeatureScene,
  support: SupportScene,
  hunch: HunchScene,
  proof: ProofScene,
  tickets: TicketsScene,
  maturity: MaturityScene,
  receipts: ReceiptsScene,
  shape: ShapeScene,
  lessons: LessonsScene,
  limits: LimitsScene,
  "next-steps": NextStepsScene,
  guardrails: GuardrailsScene,
  faq: FaqScene,
  monday: MondayScene,
  finale: FinaleScene,
};
