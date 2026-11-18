import { Question } from "../ui/question";
import { Scene } from "../ui/scene";
import { Stage, Takeaway } from "../ui/slide";
import { Steps } from "../visuals/steps";
import type { SceneProps } from "./scene-props";

export function MondayScene({ scene }: SceneProps) {
  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage>
        <Steps
          items={[
            { icon: "🎯", title: "One job" },
            { icon: "📝", title: "Definition" },
            { icon: "🤝", title: "Pair-code", hint: "10 cases" },
            { icon: "🔒", title: "Guardrails", hint: "first" },
            { icon: "🔗", title: "Hand off" },
            { icon: "📈", title: "Measure", hint: "weekly", hot: true },
          ]}
        />
      </Stage>
      <Takeaway>Start with *one agent*, one job, one week.</Takeaway>
    </Scene>
  );
}
