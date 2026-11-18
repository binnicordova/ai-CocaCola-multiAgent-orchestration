import { Question } from "../ui/question";
import { Scene } from "../ui/scene";
import { Stage, Takeaway } from "../ui/slide";
import { TileGrid } from "../visuals/tiles";
import type { SceneProps } from "./scene-props";

export function NextStepsScene({ scene }: SceneProps) {
  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage>
        <TileGrid
          columns={3}
          items={[
            { icon: "📏", title: "Measure drift", hint: "Weekly eval of 20 closed tickets" },
            { icon: "🔌", title: "Teams + Jira via MCP", hint: "Fewer tokens, no browser lag" },
            { icon: "💸", title: "Cost per run", hint: "Report tokens on every run" },
            { icon: "🙋", title: "Human approval", hint: "Before any external message" },
            { icon: "🧪", title: "Grow QA", hint: "Only 21 runs so far" },
            { icon: "👥", title: "Squads", hint: "A leader routes the work" },
          ]}
        />
      </Stage>
      <Takeaway>Next: *measure it, connect it, keep a human in charge*.</Takeaway>
    </Scene>
  );
}
