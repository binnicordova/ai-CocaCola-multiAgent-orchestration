import { Question } from "../ui/question";
import { Reveal } from "../ui/reveal";
import { Scene } from "../ui/scene";
import { Stage, Takeaway } from "../ui/slide";
import { Pipeline } from "../visuals/pipeline";
import { TileGrid } from "../visuals/tiles";
import type { SceneProps } from "./scene-props";

export function TeamScene({ talk, scene }: SceneProps) {
  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage className="flex-col gap-[5vh]">
        <Reveal step={1} className="w-full">
          <Pipeline agents={talk.agents} />
        </Reveal>
        <TileGrid
          columns={3}
          items={[
            { icon: "🔗", title: "Issues track every handoff" },
            { icon: "🔒", title: "Read-only by default" },
            { icon: "📝", title: "Lessons written back" },
          ]}
        />
      </Stage>
      <Takeaway>Five specialists. *One human.*</Takeaway>
    </Scene>
  );
}
