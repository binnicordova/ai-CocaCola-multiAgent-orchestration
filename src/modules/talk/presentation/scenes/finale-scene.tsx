import { Character } from "../ui/character";
import { Question } from "../ui/question";
import { Reveal } from "../ui/reveal";
import { Scene } from "../ui/scene";
import { Stage } from "../ui/slide";
import { Eyebrow } from "../ui/typography";
import { Chip } from "../visuals/tiles";
import type { SceneProps } from "./scene-props";

export function FinaleScene({ talk, scene }: SceneProps) {
  const { presenter, agents } = talk;

  return (
    <Scene scene={scene} variant="finale" showEyebrow={false}>
      <svg
        className="slash"
        viewBox="0 0 1000 400"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <line x1="-20" y1="420" x2="1020" y2="-20" />
      </svg>
      <Reveal>
        <Eyebrow>{scene.eyebrow}</Eyebrow>
      </Reveal>
      <Question variant="finale">{scene.question}</Question>
      <Stage className="flex-col items-start justify-center gap-[3vh]">
        <Reveal step={1} className="flex flex-wrap items-center gap-2">
          <Chip>Prompt engineer</Chip>
          <span className="text-brand">→</span>
          <Chip>Vibe coder</Chip>
          <span className="text-brand">→</span>
          <Chip>Agentic engineer</Chip>
          <span className="text-brand">→</span>
          <Chip>Loop engineer</Chip>
          <span className="text-brand">→</span>
          <Chip hot>
            <s className="text-mute">Unemployed</s> Orchestrator
          </Chip>
        </Reveal>
        <Reveal
          as="p"
          step={2}
          className="text-[clamp(1.8rem,min(4vw,7vh),3.4rem)] font-bold tracking-[-.03em]"
        >
          So, what will <em>you</em> conduct?
        </Reveal>
      </Stage>
      <Reveal step={3} className="mb-[2vh] flex items-end gap-[1.4vh]">
        {agents.map((agent, position) => (
          <Character
            key={agent.id}
            src={agent.avatar}
            alt={agent.name}
            size={96}
            mood={agent.kind === "human" ? "idle" : "cheer"}
            phase={position}
            className={`rounded-full border-2 ${agent.kind === "human" ? "size-[clamp(3rem,10vh,6rem)]" : "size-[clamp(2.2rem,7vh,4.4rem)]"}`}
            style={{ borderColor: agent.color }}
          />
        ))}
      </Reveal>
      <Reveal step={4} className="flex flex-col text-mute">
        <strong className="text-[clamp(1.1rem,2.8vh,1.6rem)] text-ink">{presenter.name}</strong>
        <span className="text-[clamp(.8rem,1.9vh,1.05rem)]">
          {presenter.company} · {presenter.role}
        </span>
      </Reveal>
    </Scene>
  );
}
