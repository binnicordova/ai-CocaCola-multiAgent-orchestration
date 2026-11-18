import { Question } from "../ui/question";
import { Scene } from "../ui/scene";
import { Stage, Takeaway } from "../ui/slide";
import { cn } from "../ui/styles";
import { POP, stagger } from "../visuals/anim";
import { Chip } from "../visuals/tiles";
import type { SceneProps } from "./scene-props";

const SKILLS = ["📐 Tech Design", "🌿 Branch naming", "📖 Read logs"] as const;
const ROWS = [
  ["Context", "Shared", "Its own"],
  ["Rights", "Borrowed", "Its own, limited"],
  ["Checked by", "Nobody", "Another agent"],
] as const;

export function AgentVsSkillScene({ scene }: SceneProps) {
  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage className="gap-[4vw] max-lg:flex-col">
        <div
          data-v=""
          className={cn(
            "w-full rounded-3xl border-2 border-brand bg-brand/5 p-[clamp(1rem,3vh,2rem)] shadow-[0_0_50px_rgb(232_33_46/.2)] lg:w-1/2",
            POP,
          )}
          style={stagger(0)}
        >
          <b className="block text-[clamp(1.2rem,3.4vh,2.2rem)]">🤖 Agent</b>
          <span className="text-[clamp(.85rem,2vh,1.2rem)] text-mute">
            own context · tools · rights
          </span>
          <div className="mt-[2vh] flex flex-wrap gap-2">
            {SKILLS.map((skill, position) => (
              <span
                key={skill}
                data-v=""
                className={cn(POP, "contents")}
                style={stagger(position + 2)}
              >
                <Chip hot>{skill}</Chip>
              </span>
            ))}
          </div>
        </div>
        <table className="w-full text-[clamp(.95rem,2.5vh,1.5rem)] lg:w-1/2">
          <thead>
            <tr className="text-left text-mute">
              <th className="pb-2 font-medium" />
              <th className="pb-2 font-medium">Skill</th>
              <th className="pb-2 font-medium text-brand-hi">Agent</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([aspect, skill, agent]) => (
              <tr key={aspect} className="border-t border-line">
                <th scope="row" className="py-[1.4vh] pr-3 text-left font-medium text-mute">
                  {aspect}
                </th>
                <td className="text-soft">{skill}</td>
                <td className="font-semibold text-brand-hi">{agent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Stage>
      <Takeaway>A skill is *what it knows*. An agent is *who does the job*.</Takeaway>
    </Scene>
  );
}
