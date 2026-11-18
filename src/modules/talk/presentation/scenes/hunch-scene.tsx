import { Question } from "../ui/question";
import { Reveal } from "../ui/reveal";
import { Scene } from "../ui/scene";
import { Shot } from "../ui/shot";
import { Stage, Takeaway } from "../ui/slide";
import type { SceneProps } from "./scene-props";

const FACTS = [
  { big: "10/10", label: "records match the logs" },
  { big: "2–24 m", label: "spread around one point" },
  { big: "≤ 10 m", label: "proposed accuracy rule" },
] as const;

export function HunchScene({ talk, scene }: SceneProps) {
  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage className="gap-[3vw] max-lg:flex-col">
        <Reveal step={1} className="w-full lg:w-3/5">
          <Shot evidence={talk.evidence.fa5379Chart} fit inGrid />
        </Reveal>
        <ul className="grid w-full gap-[2.5vh] lg:w-2/5">
          {FACTS.map((fact, position) => (
            <Reveal key={fact.big} as="p" step={position + 2}>
              <b className="block text-[clamp(2rem,7vh,4.2rem)] leading-none text-brand-hi tabular-nums">
                {fact.big}
              </b>
              <span className="text-[clamp(.85rem,2.1vh,1.3rem)] text-mute">{fact.label}</span>
            </Reveal>
          ))}
        </ul>
      </Stage>
      <Takeaway>Not a backend bug: *a fresh GPS reading on every save*.</Takeaway>
    </Scene>
  );
}
