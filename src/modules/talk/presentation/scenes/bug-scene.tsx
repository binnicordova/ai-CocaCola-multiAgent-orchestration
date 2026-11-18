import { Question } from "../ui/question";
import { Reveal } from "../ui/reveal";
import { Scene } from "../ui/scene";
import { Shot } from "../ui/shot";
import { Stage, Takeaway } from "../ui/slide";
import { cn } from "../ui/styles";
import { GROW_X, POP, stagger } from "../visuals/anim";
import type { SceneProps } from "./scene-props";

const MILESTONES = [
  { at: 0, date: "Sep 23", label: "Reported" },
  { at: 16, date: "Oct 1", label: "4 PRs: mobile fix" },
  { at: 100, date: "Nov 12", label: "Root cause found", hot: true },
] as const;

export function BugScene({ talk, scene }: SceneProps) {
  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage className="gap-[3vw] max-lg:flex-col">
        <div className="flex w-full flex-col gap-[4vh] lg:w-3/5">
          <div>
            <b className="text-[clamp(1.4rem,4vh,2.6rem)]">
              FA-4889 <span className="text-mute">·</span>{" "}
              <span className="text-brand-hi">50 days</span>
            </b>
            <div className="relative mt-[3vh] h-[clamp(.7rem,1.8vh,1.1rem)] rounded-full bg-white/[.06]">
              <div
                data-v=""
                className={cn(
                  "h-full w-full rounded-full bg-gradient-to-r from-white/40 to-brand",
                  GROW_X,
                )}
                style={{ transitionDuration: "2.2s", transitionDelay: ".8s" }}
              />
              {MILESTONES.map((m, position) => (
                <span
                  key={m.date}
                  data-v=""
                  className={cn("absolute top-1/2 w-0 -translate-y-1/2", POP)}
                  style={stagger(position + 3, { left: `${m.at}%` })}
                >
                  <i
                    className={cn(
                      "absolute top-0 left-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-bg",
                      "hot" in m ? "bg-brand" : "bg-white",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute top-5 -translate-x-1/2 text-center text-[clamp(.75rem,1.9vh,1.1rem)] whitespace-nowrap",
                      "hot" in m ? "-translate-x-[85%] text-brand-hi" : "text-soft",
                    )}
                  >
                    <b className="block">{m.date}</b>
                    {m.label}
                  </span>
                </span>
              ))}
            </div>
          </div>
          <Reveal
            step={4}
            className="mt-[6vh] rounded-2xl border border-line bg-surface p-[clamp(.8rem,2.4vh,1.5rem)] font-mono text-[clamp(.85rem,2.2vh,1.4rem)]"
          >
            <p className="text-mute">{"// who is right?"}</p>
            <p>
              mobile <span className="text-soft">sends</span>{" "}
              <mark className="rounded bg-brand/25 px-1.5 text-brand-hi">erpMeasureUnitId</mark>
            </p>
            <p>
              cloud <span className="text-soft">reads</span>{" "}
              <mark className="rounded bg-brand/25 px-1.5 text-brand-hi">erpUnitMeasure</mark>
            </p>
          </Reveal>
        </div>
        <Reveal step={2} className="w-full lg:w-2/5">
          <Shot evidence={talk.evidence.fa4889RootCause} fit inGrid />
        </Reveal>
      </Stage>
      <Takeaway>One mismatched field name. *Four PRs* missed it. The agent found it.</Takeaway>
    </Scene>
  );
}
