import { Character } from "../ui/character";
import { CutVideo } from "../ui/cut-video";
import { Question } from "../ui/question";
import { Reveal } from "../ui/reveal";
import { Scene } from "../ui/scene";
import { Stage, Takeaway } from "../ui/slide";
import { cn } from "../ui/styles";
import { POP, stagger } from "../visuals/anim";
import { Chip } from "../visuals/tiles";
import type { SceneProps } from "./scene-props";

const SPECIALISTS = ["mobile", "cloud", "qa"] as const;
const MCPS = [
  { icon: "☁️", name: "AWS", does: "reads CloudWatch" },
  { icon: "🎫", name: "Jira", does: "reads and moves tickets" },
  { icon: "🌐", name: "Chrome", does: "drives the browser" },
  { icon: "📱", name: "ADB", does: "tests on real devices" },
] as const;

/** The solo company, but every hire is an agent: orchestrator, specialists, a support desk and its tools. */
export function CutScene({ talk, scene }: SceneProps) {
  const specialists = SPECIALISTS.flatMap(
    (id) => talk.agents.find((agent) => agent.id === id) ?? [],
  );

  return (
    <Scene scene={scene}>
      <Question>{scene.question}</Question>
      <Stage className="gap-[clamp(1rem,3vw,2.4rem)] max-lg:flex-col">
        <div className="flex min-w-0 flex-1 flex-col gap-[2vh]">
          <Reveal as="p" step={1} className="text-[clamp(.95rem,2.3vh,1.35rem)] text-soft">
            A solo founder wears every hat (CEO, dev, UX, sales) and then hires people. Here the
            hires are <b className="text-ink">AI agents</b>.
          </Reveal>
          <div className="grid items-center gap-[1.6vh]">
            <div
              data-v=""
              className={cn(
                "flex items-center gap-3 rounded-2xl border border-brand bg-brand/[.08] p-[clamp(.6rem,1.8vh,1.1rem)]",
                POP,
              )}
              style={stagger(1)}
            >
              <Character
                src="/assets/avatars/tiger-conductor.png"
                size={96}
                mood="idle"
                className="size-[clamp(2.6rem,7.5vh,4.4rem)] shrink-0 rounded-full border-2 border-brand"
              />
              <div>
                <b className="block text-[clamp(1.05rem,2.8vh,1.7rem)]">Orchestrator</b>
                <span className="text-[clamp(.8rem,1.9vh,1.1rem)] text-mute">
                  splits the work and hands it off
                </span>
              </div>
            </div>
            <ul className="grid grid-cols-3 gap-[1.2vh]">
              {specialists.map((agent, position) => (
                <li
                  key={agent.id}
                  data-v=""
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-2xl border border-line bg-surface p-[clamp(.5rem,1.6vh,1rem)] text-center",
                    POP,
                  )}
                  style={stagger(position + 2)}
                >
                  <Character
                    src={agent.avatar}
                    size={96}
                    mood="working"
                    phase={position}
                    className="size-[clamp(2.2rem,6vh,3.6rem)] rounded-full border-2"
                    style={{ borderColor: agent.color }}
                  />
                  <b className="text-[clamp(.9rem,2.1vh,1.2rem)]">{agent.short}</b>
                  <span className="text-[clamp(.7rem,1.6vh,.9rem)] text-mute">specialist</span>
                </li>
              ))}
            </ul>
            <div
              data-v=""
              className={cn(
                "flex items-center gap-3 rounded-2xl border border-line bg-surface p-[clamp(.6rem,1.8vh,1.1rem)]",
                POP,
              )}
              style={stagger(5)}
            >
              <Character
                src="/assets/avatars/ticket.svg"
                size={96}
                mood="working"
                className="size-[clamp(2.2rem,6vh,3.6rem)] shrink-0"
              />
              <div>
                <b className="block text-[clamp(1rem,2.5vh,1.5rem)]">Mature Support Agent</b>
                <span className="text-[clamp(.8rem,1.9vh,1.1rem)] text-brand-hi">
                  scans and acts every 15 minutes
                </span>
              </div>
            </div>
          </div>
          <Reveal as="div" step={5} className="flex flex-wrap gap-2">
            {MCPS.map((mcp) => (
              <Chip key={mcp.name} hot={mcp.name === "Chrome"}>
                {mcp.icon} {mcp.name} · {mcp.does}
              </Chip>
            ))}
          </Reveal>
        </div>
        <Reveal step={2} className="h-full max-h-[52vh] min-h-0 max-lg:h-[40vh]">
          <CutVideo />
        </Reveal>
      </Stage>
      <Takeaway>A company of one. *A team of agents.* Tools through MCP.</Takeaway>
    </Scene>
  );
}
