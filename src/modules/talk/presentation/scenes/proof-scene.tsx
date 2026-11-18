import { growthFactor } from "../../application/impact";
import { Question } from "../ui/question";
import { Scene } from "../ui/scene";
import { Stage, Takeaway } from "../ui/slide";
import { BigNumber } from "../visuals/big-number";
import { Donut } from "../visuals/donut";
import { GrowthTrend } from "../visuals/growth-trend";
import { StackBar } from "../visuals/stack-bar";
import type { SceneProps } from "./scene-props";

const PANEL =
  "flex min-h-0 flex-col justify-center overflow-hidden rounded-2xl border border-line bg-surface p-[clamp(.8rem,2.4vh,1.6rem)]";

export function ProofScene({ talk, scene }: SceneProps) {
  const { metrics } = talk;

  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage className="items-stretch">
        <div className="grid h-full w-full gap-[clamp(.6rem,2vh,1.2rem)] md:grid-cols-2 lg:grid-rows-2">
          <div className={PANEL}>
            <BigNumber metric={metrics.proofRuns} label="agent runs" size="lg" hot />
          </div>
          <div className={PANEL}>
            <Donut fraction={0.93} metric={metrics.proofCompleted} label="completed" />
          </div>
          <div className={PANEL}>
            <b className="mb-[1.5vh] text-[clamp(1rem,2.6vh,1.6rem)]">
              199 issues · <span className="text-brand-hi">77 done</span>
            </b>
            <StackBar
              segments={[
                { label: "done", value: 77, className: "bg-emerald-400" },
                { label: "review", value: 66, className: "bg-amber-400" },
                { label: "blocked", value: 23, className: "bg-brand" },
                { label: "other", value: 33, className: "bg-white/30" },
              ]}
            />
          </div>
          <div className={PANEL}>
            <GrowthTrend
              months={[
                { label: "Aug", value: 17 },
                { label: "Sep", value: 30 },
                { label: "Oct", value: 40 },
                { label: "Nov", value: metrics.proofNovember.value },
              ]}
              cause="Nov 1 · Claude Opus 5.5"
              factor={{ value: growthFactor(17, metrics.proofNovember.value), decimals: 1 }}
              note="17 → 30 → 40 → 112 issues. Nov is only 13 days old, and it jumped when Claude Opus 5.5 became the engine."
            />
          </div>
        </div>
      </Stage>
      <Takeaway>Runs are activity. *Evidence is value* — and Opus 5.5 made it grow.</Takeaway>
    </Scene>
  );
}
