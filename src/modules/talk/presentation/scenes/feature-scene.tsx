import { Question } from "../ui/question";
import { Scene } from "../ui/scene";
import { Stage, Takeaway } from "../ui/slide";
import { Steps } from "../visuals/steps";
import type { SceneProps } from "./scene-props";

export function FeatureScene({ scene }: SceneProps) {
  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage>
        <Steps
          items={[
            { icon: "📐", title: "Tech Design", hint: "Confluence" },
            { icon: "📜", title: "Contract first", hint: "mobile uses a mock" },
            { icon: "⚙️", title: "Build in parallel", hint: "PRs #555 · #330", hot: true },
            { icon: "🚩", title: "Feature flags", hint: "AR · BR · CL · PY" },
          ]}
        />
      </Stage>
      <Takeaway>A bug is a loop. A feature is *parallel builds*.</Takeaway>
    </Scene>
  );
}
