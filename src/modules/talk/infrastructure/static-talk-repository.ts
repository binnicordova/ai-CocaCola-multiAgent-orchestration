import { createTalk, type Talk } from "../domain/talk";
import type { TalkRepository } from "../domain/talk-repository";
import { agents } from "./content/agents";
import { evidence } from "./content/evidence";
import { metrics } from "./content/metrics";
import { scenes } from "./content/scenes";
import { sources } from "./content/sources";
import { timeline } from "./content/timeline";

/** Adapter: the talk content lives in the codebase, no external service. */
export class StaticTalkRepository implements TalkRepository {
  get(): Talk {
    return createTalk({
      title: "Multi-Agent AI Development",
      description:
        "How a team of AI agents delivers real Jira tickets at Coca-Cola Andina: the story, the evidence, the research behind it and the lessons. By Binni Cordova.",
      presenter: {
        name: "Binni Cordova",
        role: "Market Operations",
        company: "Coca-Cola Andina",
      },
      scenes,
      agents,
      timeline,
      metrics,
      evidence,
      sources,
    });
  }
}
