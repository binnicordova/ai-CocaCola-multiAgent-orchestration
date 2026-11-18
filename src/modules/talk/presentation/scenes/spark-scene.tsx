import { phasesOf } from "../../application/impact";
import { Question } from "../ui/question";
import { Reveal } from "../ui/reveal";
import { Scene } from "../ui/scene";
import { Stage, Takeaway } from "../ui/slide";
import { cn } from "../ui/styles";
import { FADE, GROW_X, POP, stagger } from "../visuals/anim";
import { Chip } from "../visuals/tiles";
import type { SceneProps } from "./scene-props";

/** Two bursts of work separated by the quiet weeks where the agents were learning. */
export function SparkScene({ talk, scene }: SceneProps) {
  const phases = phasesOf(talk.timeline);
  let order = 0;

  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage className="flex-col gap-[4vh]">
        <ol className="flex w-full items-stretch gap-[clamp(.4rem,1.2vw,1rem)] max-lg:flex-col">
          {phases.map((phase, phaseIndex) => (
            <li key={phase.events[0]?.date} className="contents">
              {phase.quietDaysBefore > 0 && (
                <div className="flex min-w-[9rem] flex-col items-center justify-center gap-1 text-center max-lg:py-2 lg:flex-[.9]">
                  <b
                    data-v=""
                    className={cn(
                      "text-[clamp(2rem,7vh,4.4rem)] leading-none tabular-nums text-brand-hi",
                      POP,
                    )}
                    style={stagger(4)}
                  >
                    {phase.quietDaysBefore}
                  </b>
                  <span
                    data-v=""
                    className={cn("text-[clamp(.75rem,1.8vh,1rem)] text-mute", FADE)}
                    style={stagger(5)}
                  >
                    days of learning
                  </span>
                  <span
                    aria-hidden="true"
                    data-v=""
                    className={cn("quiet-dash h-[3px] w-full", GROW_X)}
                    style={stagger(4)}
                  />
                </div>
              )}
              <ol
                className={cn(
                  "grid flex-[3] content-start gap-[clamp(.4rem,1.2vh,.8rem)] rounded-2xl border p-[clamp(.7rem,2vh,1.3rem)]",
                  phaseIndex ? "border-brand bg-brand/[.07]" : "border-line bg-surface",
                )}
              >
                {phase.events.map((event) => {
                  const position = order++;
                  return (
                    <li
                      key={event.date}
                      data-v=""
                      className={cn("flex items-baseline gap-3", POP)}
                      style={stagger(position * 1.4)}
                    >
                      <time className="w-[4.2rem] shrink-0 font-mono text-[clamp(.85rem,2vh,1.1rem)] font-semibold text-brand-hi">
                        {event.date}
                      </time>
                      <span className="text-[clamp(.9rem,2.2vh,1.3rem)] leading-snug text-soft">
                        {event.label}
                      </span>
                    </li>
                  );
                })}
                <span className="mt-1 text-[clamp(.75rem,1.8vh,1rem)] text-mute">
                  {phase.spanDays === 0 ? "" : `${phase.spanDays + 1}-day burst`}
                </span>
              </ol>
            </li>
          ))}
        </ol>
        <Reveal step={5} className="flex flex-wrap justify-center gap-3">
          <Chip hot>⏱ Support check every 15 min = 96 a day</Chip>
          <Chip>PR review every 30 min = 48 a day</Chip>
          <Chip hot>🧠 Nov 1 · Claude Opus 5.5 → trust → faster maturity</Chip>
        </Reveal>
      </Stage>
      <Takeaway>One workspace. One agent. *Ten weeks* later: a support desk.</Takeaway>
    </Scene>
  );
}
