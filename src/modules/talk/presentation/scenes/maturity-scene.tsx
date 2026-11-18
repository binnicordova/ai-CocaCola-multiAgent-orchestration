import { daysBetween, runRate } from "../../application/impact";
import { Character } from "../ui/character";
import { Question } from "../ui/question";
import { Scene } from "../ui/scene";
import { Stage, Takeaway } from "../ui/slide";
import { cn } from "../ui/styles";
import { GROW_X, POP, stagger } from "../visuals/anim";
import type { SceneProps } from "./scene-props";

const CAPTURED = "Nov 13";

const AGENTS = [
  { icon: "🛎️", name: "Support", level: "Mature", runs: 2268, since: "Oct 27", hot: true },
  {
    avatar: "/assets/avatars/wolf.png",
    name: "Reviewer",
    level: "Established",
    runs: 500,
    since: "Aug 17",
  },
  {
    avatar: "/assets/avatars/owl.png",
    name: "Analyst",
    level: "Growing",
    runs: 348,
    since: "Aug 14",
  },
  {
    avatar: "/assets/avatars/cat.png",
    name: "Mobile",
    level: "Growing",
    runs: 304,
    since: "Aug 14",
  },
  {
    avatar: "/assets/avatars/raccoon.png",
    name: "Cloud",
    level: "Growing",
    runs: 157,
    since: "Aug 14",
  },
  {
    avatar: "/assets/avatars/ladybug.png",
    name: "QA",
    level: "Emerging",
    runs: 21,
    since: "Aug 17",
  },
] as const;

const RATES = AGENTS.map((agent) => runRate(agent.runs, daysBetween(agent.since, CAPTURED)));
const FASTEST = Math.max(...RATES);

export function MaturityScene({ scene }: SceneProps) {
  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage className="flex-col gap-[2.4vh]">
        <p
          data-v=""
          className={cn(
            "w-full rounded-2xl border border-brand bg-brand/[.08] px-[clamp(.9rem,2.4vh,1.6rem)] py-[1.2vh] text-[clamp(.9rem,2.2vh,1.3rem)]",
            POP,
          )}
        >
          <b className="text-brand-hi">Why the curve bends upward:</b> since Nov 1 the agents run on{" "}
          <b>Claude Opus 5.5</b>, just launched. Its efficiency was enough to trust it with real
          work, so maturity accelerated.
        </p>
        <ul className="grid w-full gap-[clamp(.6rem,2vh,1.2rem)] md:grid-cols-2 xl:grid-cols-3">
          {AGENTS.map((agent, position) => {
            const rate = RATES[position] ?? 0;
            return (
              <li
                key={agent.name}
                data-v=""
                className={cn(
                  "rounded-2xl border bg-surface p-[clamp(.9rem,2.6vh,1.6rem)]",
                  "hot" in agent ? "border-brand" : "border-line",
                  POP,
                )}
                style={stagger(position)}
              >
                <div className="flex items-center gap-[1.4vh]">
                  {"avatar" in agent ? (
                    <Character
                      src={agent.avatar}
                      size={96}
                      mood="working"
                      phase={position}
                      className="size-[clamp(2.2rem,6.5vh,3.6rem)] shrink-0 rounded-full border-2 border-line"
                    />
                  ) : (
                    <Character
                      src="/assets/avatars/ticket.svg"
                      size={96}
                      mood="working"
                      className="size-[clamp(2.2rem,6.5vh,3.6rem)] shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <b className="block text-[clamp(1.1rem,3vh,1.8rem)] leading-tight">
                      {agent.name}
                    </b>
                    <span className="block text-[clamp(.9rem,2.1vh,1.2rem)] font-semibold text-brand-hi">
                      {agent.level}
                    </span>
                  </div>
                  <b className="ml-auto text-right text-[clamp(1.2rem,3.4vh,2rem)] leading-none tabular-nums">
                    {rate}
                    <span className="block text-[clamp(.65rem,1.5vh,.85rem)] font-normal text-mute">
                      runs / day
                    </span>
                  </b>
                </div>
                <span className="mt-[1.2vh] block h-[clamp(.4rem,1vh,.7rem)] overflow-hidden rounded-full bg-white/[.07]">
                  <span
                    data-v=""
                    className={cn(
                      "block h-full rounded-full",
                      "hot" in agent
                        ? "bg-brand shadow-[0_0_18px_rgb(232_33_46/.7)]"
                        : "bg-white/40",
                      GROW_X,
                    )}
                    style={stagger(position + 2, { width: `${(rate / FASTEST) * 100}%` })}
                  />
                </span>
                <span className="mt-[.8vh] block text-[clamp(.8rem,1.9vh,1.1rem)] text-mute">
                  {agent.runs.toLocaleString("en-US")} runs · since {agent.since}
                </span>
              </li>
            );
          })}
        </ul>
      </Stage>
      <Takeaway>Maturity is *earned in runs and corrections* — and Opus 5.5 sped it up.</Takeaway>
    </Scene>
  );
}
