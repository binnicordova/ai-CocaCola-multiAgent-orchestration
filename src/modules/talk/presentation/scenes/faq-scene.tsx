import { Question } from "../ui/question";
import { Scene } from "../ui/scene";
import { Stage, Takeaway } from "../ui/slide";
import { cn } from "../ui/styles";
import { POP, stagger } from "../visuals/anim";
import type { SceneProps } from "./scene-props";

interface Faq {
  readonly q: string;
  readonly a: string;
}

/** Every answer comes from a number or a slide already shown in this talk. */
const FAQS: readonly Faq[] = [
  {
    q: "Why agents and not just skills?",
    a: "Support has no skills assigned and still handled 107 issues. A skill is a recipe; an agent owns a job, keeps its definition and learns from corrected cases.",
  },
  {
    q: "Why a team and not just a good spec?",
    a: "A spec describes the work. A team checks it: the Reviewer hunts smells, QA brings evidence. On FA-4889 four PRs missed one mismatched field name; the agent found it.",
  },
  {
    q: "Is it safe? Who is in charge?",
    a: "Read-only by default, ask when unsure, evidence or it did not happen. Humans merge. Who is accountable? Me.",
  },
  {
    q: "Does it really work, or is it a demo?",
    a: "3,722 runs, 93% completed, 199 issues created and 77 already done, counted in Multica on Nov 13.",
  },
  {
    q: "Why did it speed up in November?",
    a: "On Nov 1 the agents moved to Claude Opus 5.5, just launched. Its efficiency was enough to trust it with real work, so maturity grew fast. The Support Agent (Oct 27) lit the fuse.",
  },
  {
    q: "What does the Support Agent do?",
    a: "Every 15 minutes it scans the chats and acts: create or update a seller, zones and routes, investigate a failure, each with a playbook.",
  },
  {
    q: "What still fails?",
    a: "Teams. The agents reach it through Chrome, which lags with several agents and sometimes sticks. We need a Teams MCP.",
  },
  {
    q: "Will it replace us?",
    a: "Fired by your own agents? Just kidding, mostly. The job is becoming a conductor’s: you define, review and approve.",
  },
  {
    q: "How do I start?",
    a: "One agent, one job, one week. Write the definition, pair-code ten cases, set guardrails first, measure weekly.",
  },
];

export function FaqScene({ scene }: SceneProps) {
  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage className="items-start overflow-y-auto">
        <ul className="grid w-full gap-[clamp(.4rem,1.2vh,.8rem)] lg:grid-cols-2">
          {FAQS.map((faq, position) => (
            <li
              key={faq.q}
              data-v=""
              className={cn("rounded-2xl border border-line bg-surface", POP)}
              style={stagger(position * 0.5)}
            >
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-[clamp(.6rem,1.6vh,1rem)] text-[clamp(.95rem,2.2vh,1.3rem)] font-semibold marker:content-none">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="text-brand-hi transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-[clamp(.6rem,1.6vh,1rem)] pb-[clamp(.6rem,1.6vh,1rem)] text-[clamp(.85rem,1.9vh,1.1rem)] leading-snug text-soft">
                  {faq.a}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </Stage>
      <Takeaway>Ask anything. *The answer is in the workspace.*</Takeaway>
    </Scene>
  );
}
