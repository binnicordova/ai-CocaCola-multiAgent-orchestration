import { Question } from "../ui/question";
import { Scene } from "../ui/scene";
import { Shot } from "../ui/shot";
import { Stage, Takeaway } from "../ui/slide";
import type { SceneProps } from "./scene-props";

export function ReceiptsScene({ talk, scene }: SceneProps) {
  const receipts = [
    { question: "Why an agent and not a skill?", evidence: talk.evidence.noSkills },
    { question: "How to improve the agents?", evidence: talk.evidence.playbook20 },
    { question: "Why multi-agent?", evidence: talk.evidence.delegationChat },
  ] as const;

  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage>
        <div className="grid w-full gap-[clamp(.6rem,2vh,1.2rem)] lg:grid-cols-3">
          {receipts.map(({ question, evidence }) => (
            <div key={question} className="flex flex-col gap-2">
              <b className="text-[clamp(.9rem,2.2vh,1.3rem)] text-brand-hi">{question}</b>
              <Shot evidence={evidence} fit inGrid />
            </div>
          ))}
        </div>
      </Stage>
      <Takeaway>Click any screenshot. *It is the real workspace.*</Takeaway>
    </Scene>
  );
}
