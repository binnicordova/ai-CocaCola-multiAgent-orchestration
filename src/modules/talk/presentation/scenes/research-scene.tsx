import { Question } from "../ui/question";
import { Reveal } from "../ui/reveal";
import { Scene } from "../ui/scene";
import { SourceTag, Stage, Takeaway } from "../ui/slide";
import { BigNumber } from "../visuals/big-number";
import { Chip } from "../visuals/tiles";
import { Uplift } from "../visuals/uplift";
import type { SceneProps } from "./scene-props";

export function ResearchScene({ talk, scene }: SceneProps) {
  const { metrics } = talk;

  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage className="gap-[4vw] max-lg:flex-col">
        <Reveal step={1} className="w-full lg:w-1/3">
          <BigNumber metric={metrics.researchGain} label="vs. a single agent" size="lg" hot />
          <div className="mt-[2vh] flex flex-wrap gap-2">
            <Chip>80% explained by tokens</Chip>
            <Chip>15× tokens of a chat</Chip>
          </div>
        </Reveal>
        <div className="w-full lg:w-2/3">
          <Uplift
            base={{ label: "Single agent", value: 100 }}
            boosted={{ label: "Lead + subagents", value: 190.2 }}
            gain={metrics.researchGain}
          />
          <SourceTag>
            Anthropic · multi-agent research system (internal eval, Opus 4 lead + Sonnet 4
            subagents)
          </SourceTag>
        </div>
      </Stage>
      <Takeaway>From writing code to *coordinating agents*.</Takeaway>
    </Scene>
  );
}
