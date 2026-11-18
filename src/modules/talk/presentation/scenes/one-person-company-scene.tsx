import { Question } from "../ui/question";
import { Reveal } from "../ui/reveal";
import { Scene } from "../ui/scene";
import { Stage, Takeaway } from "../ui/slide";
import { cn } from "../ui/styles";
import { POP } from "../visuals/anim";
import { BigNumber } from "../visuals/big-number";
import { Chip } from "../visuals/tiles";
import type { SceneProps } from "./scene-props";

const WORK_WEEK_HOURS = 40;

export function OnePersonCompanyScene({ talk, scene }: SceneProps) {
  const weeks = Math.round(talk.metrics.hoursLost.value / WORK_WEEK_HOURS);

  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage className="flex-col gap-[3vh]">
        <Reveal step={1}>
          <BigNumber
            metric={talk.metrics.hoursLost}
            label={`hours lost this year (estimate), about ${weeks} full work-weeks`}
            size="xl"
            hot
          />
        </Reveal>
        <Reveal step={2} className="flex flex-wrap justify-center gap-3">
          <Chip>🐛 Same bugs</Chip>
          <Chip>📧 Same emails</Chip>
          <Chip>🚀 Same deploys</Chip>
        </Reveal>
        <ol
          aria-label={`${weeks} work-weeks of ${WORK_WEEK_HOURS} hours, one block each`}
          className="grid w-full max-w-[900px] grid-cols-[repeat(21,minmax(0,1fr))] gap-[clamp(.15rem,.5vw,.4rem)]"
        >
          {Array.from({ length: weeks }, (_, week) => (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length blocks, never reordered
              key={week}
              data-v=""
              className={cn(
                "aspect-[1/2] rounded-[3px]",
                week < weeks / 3
                  ? "bg-emerald-400"
                  : week < (weeks * 2) / 3
                    ? "bg-amber-400"
                    : "bg-brand",
                POP,
              )}
              style={{ transitionDelay: `${(1 + week * 0.09).toFixed(2)}s` }}
            />
          ))}
        </ol>
      </Stage>
      <Takeaway>Developer. Support. Designer. *Everything.* Solo.</Takeaway>
    </Scene>
  );
}
