import { Question } from "../ui/question";
import { Reveal } from "../ui/reveal";
import { Scene } from "../ui/scene";
import { Stage, Takeaway } from "../ui/slide";
import { Chip, TileGrid } from "../visuals/tiles";
import type { SceneProps } from "./scene-props";

export function GuardrailsScene({ scene }: SceneProps) {
  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage className="flex-col gap-[3.5vh]">
        <TileGrid
          items={[
            { icon: "🔒", title: "Read-only by default" },
            { icon: "✅", title: "Humans merge" },
            { icon: "🧾", title: "Evidence or it didn’t happen" },
            { icon: "🙋", title: "Ask when unsure" },
          ]}
        />
        <Reveal step={4} className="flex flex-wrap justify-center gap-3">
          <Chip>Jira</Chip>
          <Chip>Confluence</Chip>
          <Chip>GitHub</Chip>
          <Chip>AWS</Chip>
          <Chip>Teams</Chip>
        </Reveal>
      </Stage>
      <Takeaway>Who is accountable? *Me.*</Takeaway>
    </Scene>
  );
}
