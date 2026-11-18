import { Question } from "../ui/question";
import { Scene } from "../ui/scene";
import { SourceTag, Stage, Takeaway } from "../ui/slide";
import { ShapeCurve } from "../visuals/shape-curve";
import type { SceneProps } from "./scene-props";

export function ShapeScene({ scene }: SceneProps) {
  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage className="flex-col">
        <ShapeCurve />
        <SourceTag>Conceptual curve, not measured data</SourceTag>
      </Stage>
      <Takeaway>The decline is slow and quiet… *noticed too late.*</Takeaway>
    </Scene>
  );
}
