import { Character } from "../ui/character";
import { Question } from "../ui/question";
import { Reveal } from "../ui/reveal";
import { Scene } from "../ui/scene";
import { Stage, Takeaway } from "../ui/slide";
import { cn } from "../ui/styles";
import { POP, stagger } from "../visuals/anim";
import { Chip } from "../visuals/tiles";
import type { SceneProps } from "./scene-props";

const FLOW = [
  { icon: "📝", faces: [], label: "Spec", spec: true },
  { icon: "", faces: ["/assets/avatars/owl.png"], label: "Plan" },
  { icon: "", faces: ["/assets/avatars/cat.png", "/assets/avatars/raccoon.png"], label: "Build" },
  { icon: "", faces: ["/assets/avatars/wolf.png"], label: "Review" },
  { icon: "", faces: ["/assets/avatars/ladybug.png"], label: "Prove" },
  { icon: "", faces: ["/assets/avatars/tiger-happy.png"], label: "Merge" },
] as const;

export function AgentsVsOpenspecScene({ scene }: SceneProps) {
  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage className="flex-col gap-[3vh]">
        <ol className="flex w-full items-center justify-between gap-2">
          {FLOW.map((node, position) => (
            <li
              key={node.label}
              data-v=""
              className={cn(
                "flex flex-1 flex-col items-center rounded-2xl border p-[clamp(.5rem,1.6vh,1rem)] text-center",
                "spec" in node ? "border-brand bg-brand/10" : "border-line bg-surface",
                POP,
              )}
              style={stagger(position)}
            >
              <span className="flex h-[clamp(2rem,7vh,4rem)] items-center gap-1 text-[clamp(1.4rem,5vh,3rem)] leading-none">
                {node.icon}
                {node.faces.map((face, face_index) => (
                  <Character
                    key={face}
                    src={face}
                    size={96}
                    mood={node.label === "Merge" ? "cheer" : "working"}
                    phase={position + face_index}
                    className="size-[clamp(2rem,7vh,4rem)] rounded-full"
                  />
                ))}
              </span>
              <b className="mt-1 text-[clamp(.8rem,2.2vh,1.4rem)]">{node.label}</b>
            </li>
          ))}
        </ol>
        <div className="flex w-full gap-2 text-center text-[clamp(.8rem,2vh,1.2rem)] font-semibold">
          <span className="flex-1 border-t-4 border-brand pt-1 text-brand-hi">
            OpenSpec: <em>what</em>
          </span>
          <span className="flex-[5] border-t-4 border-white/30 pt-1 text-soft">
            A team: who builds, checks, ships
          </span>
        </div>
        <Reveal step={3}>
          <Chip>One repo, small change? One assistant + spec is enough.</Chip>
        </Reveal>
      </Stage>
      <Takeaway>The spec is the *contract between agents*.</Takeaway>
    </Scene>
  );
}
