import { Question } from "../ui/question";
import { Reveal } from "../ui/reveal";
import { Scene } from "../ui/scene";
import { Shot } from "../ui/shot";
import { Stage, Takeaway } from "../ui/slide";
import { Steps } from "../visuals/steps";
import { Chip } from "../visuals/tiles";
import type { SceneProps } from "./scene-props";

/** The honest scene: the agents talk to Teams through a browser, and that is the weak link. */
export function LimitsScene({ talk, scene }: SceneProps) {
  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage className="flex-col gap-[2.4vh]">
        <Reveal step={1} className="w-full">
          <Steps
            items={[
              { icon: "🤖", title: "Agent has news" },
              { icon: "🌐", title: "Opens Teams in Chrome", hint: "via Chrome MCP", hot: true },
              { icon: "⏳", title: "Sometimes it sticks", hint: "lag with several agents" },
              { icon: "🔌", title: "Teams MCP", hint: "needed soon" },
            ]}
          />
        </Reveal>
        <div className="grid w-full items-start gap-[clamp(.6rem,2vh,1.2rem)] lg:grid-cols-2">
          <Shot evidence={talk.evidence.teamsAgentMessage} fit inGrid />
          <Shot evidence={talk.evidence.teamsMcpChat} fit inGrid />
        </div>
        <Reveal step={5} className="flex flex-wrap justify-center gap-3">
          <Chip>It works: messages arrive</Chip>
          <Chip hot>It costs: more tokens, more lag</Chip>
          <Chip>Asked for authorisation: Teams via MCP</Chip>
        </Reveal>
      </Stage>
      <Takeaway>The agents send the message. *The browser is the bottleneck.*</Takeaway>
    </Scene>
  );
}
