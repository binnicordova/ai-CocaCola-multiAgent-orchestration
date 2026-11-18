import { growthFactor, percentOf } from "../../application/impact";
import { Question } from "../ui/question";
import { Reveal } from "../ui/reveal";
import { Scene } from "../ui/scene";
import { Stage, Takeaway } from "../ui/slide";
import { BarChart } from "../visuals/bar-chart";
import { Steps } from "../visuals/steps";
import { Chip } from "../visuals/tiles";
import type { SceneProps } from "./scene-props";

const DEFINITIONS_TOTAL = 33551 + 18987 + 17576 + 15114 + 10258 + 5240;

export function LessonsScene({ scene }: SceneProps) {
  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage className="flex-col gap-[3.5vh]">
        <Steps
          items={[
            { icon: "🔍", title: "Review", hint: "read the runs" },
            { icon: "🎛️", title: "Retune", hint: "pair-code, teach", hot: true },
            { icon: "✨", title: "Keep sharp", hint: "weekly" },
          ]}
        />
        <div className="w-full">
          <p className="mb-[1vh] text-[clamp(.75rem,1.8vh,1rem)] tracking-[.14em] text-mute uppercase">
            Definition size (characters)
          </p>
          <BarChart
            labelWidth="8rem"
            items={[
              {
                label: "Support",
                value: 33551,
                display: "33,551",
                share: percentOf(33551, DEFINITIONS_TOTAL),
                hot: true,
              },
              {
                label: "Reviewer",
                value: 18987,
                display: "18,987",
                share: percentOf(18987, DEFINITIONS_TOTAL),
              },
              {
                label: "Cloud",
                value: 17576,
                display: "17,576",
                share: percentOf(17576, DEFINITIONS_TOTAL),
              },
              {
                label: "Mobile",
                value: 15114,
                display: "15,114",
                share: percentOf(15114, DEFINITIONS_TOTAL),
              },
              {
                label: "Analyst",
                value: 10258,
                display: "10,258",
                share: percentOf(10258, DEFINITIONS_TOTAL),
              },
              {
                label: "QA",
                value: 5240,
                display: "5,240",
                share: percentOf(5240, DEFINITIONS_TOTAL),
              },
            ]}
          />
        </div>
        <Reveal step={4}>
          <div className="flex flex-wrap justify-center gap-3">
            <Chip hot>🔧 Fix the tool, not the prompt</Chip>
            <Chip>Support is {growthFactor(5240, 33551)}× the size of QA</Chip>
          </div>
        </Reveal>
      </Stage>
      <Takeaway>Agents grow like teammates: *review, retune, repeat.*</Takeaway>
    </Scene>
  );
}
