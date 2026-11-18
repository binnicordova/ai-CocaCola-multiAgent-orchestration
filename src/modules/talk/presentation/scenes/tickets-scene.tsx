import { percentOf } from "../../application/impact";
import { Question } from "../ui/question";
import { Reveal } from "../ui/reveal";
import { Scene } from "../ui/scene";
import { Stage, Takeaway } from "../ui/slide";
import { BarChart } from "../visuals/bar-chart";
import { BigNumber } from "../visuals/big-number";
import { Chip } from "../visuals/tiles";
import { WeeklyRuns } from "../visuals/weekly-runs";
import type { SceneProps } from "./scene-props";

const WEEKLY_RUNS = [23, 23, 43, 23, 46, 25, 64, 46, 71, 50, 57, 1036, 1355, 723];
const MONTHS = [
  "Aug",
  "Aug",
  "Aug",
  "Aug",
  "Sep",
  "Sep",
  "Sep",
  "Sep",
  "Oct",
  "Oct",
  "Oct",
  "Oct",
  "Nov",
  "Nov",
] as const;
const WEEKS = WEEKLY_RUNS.map((runs, index) => ({ runs, month: MONTHS[index] ?? "Nov" }));

export function TicketsScene({ scene }: SceneProps) {
  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage className="flex-col gap-[3vh]">
        <div className="grid w-full items-center gap-[clamp(.8rem,3vh,2rem)] lg:grid-cols-2">
          <div className="flex flex-col gap-[2.4vh]">
            <Reveal step={1}>
              <BigNumber metric={{ value: 199 }} label="" size="lg" hot />
              <span className="block text-[clamp(.9rem,2.3vh,1.4rem)] text-mute">
                issues in Multica · 20 distinct Jira tickets (FA-xxxx)
              </span>
            </Reveal>
            <BarChart
              labelWidth="7rem"
              items={[
                {
                  label: "Support",
                  value: 107,
                  display: "107",
                  share: percentOf(107, 199),
                  hot: true,
                },
                { label: "Reviewer", value: 33, display: "33", share: percentOf(33, 199) },
                { label: "Mobile", value: 25, display: "25", share: percentOf(25, 199) },
                { label: "Cloud", value: 12, display: "12", share: percentOf(12, 199) },
                { label: "QA + Analyst", value: 8, display: "8", share: percentOf(8, 199) },
              ]}
            />
          </div>
          <WeeklyRuns
            weeks={WEEKS}
            rampFrom={11}
            partialWeek={13}
            markers={[
              { week: 11, label: "Oct 27 · Support Agent" },
              { week: 12, label: "Nov 1 · Opus 5.5" },
            ]}
          />
        </div>
        <Reveal step={4} className="flex flex-wrap justify-center gap-3">
          <Chip>Captured Nov 13, 2026</Chip>
          <Chip>12 unassigned</Chip>
          <Chip hot>🧠 56% of issues came in Nov, with Claude Opus 5.5</Chip>
        </Reveal>
      </Stage>
      <Takeaway>Tickets attended: *counted in Multica*, not remembered.</Takeaway>
    </Scene>
  );
}
