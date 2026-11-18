import { Question } from "../ui/question";
import { Reveal } from "../ui/reveal";
import { Scene } from "../ui/scene";
import { SourceTag, Stage, Takeaway } from "../ui/slide";
import { Chip, TileGrid } from "../visuals/tiles";
import type { SceneProps } from "./scene-props";

export function SkepticsScene({ scene }: SceneProps) {
  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Reveal step={1}>
        <Chip hot>⚠️ Cognition: “Don’t build multi-agents”</Chip>
      </Reveal>
      <Stage className="flex-col">
        <TileGrid
          items={[
            { icon: "🧠", title: "One ticket, one memory" },
            { icon: "📜", title: "Contract first" },
            { icon: "🏃", title: "A relay, not a crowd" },
            { icon: "✋", title: "Human holds the pen" },
          ]}
        />
        <SourceTag>Cognition · “Don’t Build Multi-Agents”</SourceTag>
      </Stage>
      <Takeaway>Their warning became *our design rules*.</Takeaway>
    </Scene>
  );
}
