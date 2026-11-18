import { Character } from "../ui/character";
import { Reveal } from "../ui/reveal";
import { Scene } from "../ui/scene";
import { Stage } from "../ui/slide";
import { cssVars } from "../ui/styles";
import { POP, RISE, stagger } from "../visuals/anim";
import type { SceneProps } from "./scene-props";

const LINE = "hero-line";

const TICKETS = [
  { id: "COC-201", label: "PROD down", tilt: "-rotate-6", pos: "left-[2%] top-[6%]" },
  { id: "COC-202", label: "Seller blocked", tilt: "rotate-3", pos: "left-[20%] top-[42%]" },
  { id: "COC-203", label: "Orders lost", tilt: "-rotate-3", pos: "right-[8%] top-[10%]" },
  { id: "COC-204", label: "Sync failing", tilt: "rotate-6", pos: "right-[2%] top-[40%]" },
  { id: "COC-205", label: "Invoice error", tilt: "-rotate-2", pos: "left-[40%] top-[0%]" },
] as const;

export function HookScene({ talk, scene }: SceneProps) {
  const { presenter, agents } = talk;
  const crew = agents.filter((agent) => agent.kind === "agent");

  return (
    <Scene scene={scene} variant="hero">
      <h1
        data-q="hero"
        className="mb-[2vh] flex flex-col items-start text-[clamp(2rem,min(5.6vw,9.5vh),5.4rem)] leading-[1.02] font-bold tracking-[-.035em] text-balance"
      >
        <span className="sr-only">{scene.question}</span>
        <span aria-hidden="true" className={LINE} style={cssVars({ "--l": 0 })}>
          Ever run out of time?
        </span>
        <span aria-hidden="true" className={LINE} style={cssVars({ "--l": 1 })}>
          Juggled five things at once?
        </span>
        <span aria-hidden="true" className={LINE} style={cssVars({ "--l": 2 })}>
          Watched <b className="font-bold text-brand-hi">five S1s</b> land together?
        </span>
      </h1>

      <Stage>
        <div className="relative h-full w-full max-w-[1100px]">
          {TICKETS.map((ticket, position) => (
            <div
              key={ticket.id}
              data-v=""
              className={`absolute ${ticket.pos} ${ticket.tilt} ${POP}`}
              style={stagger(position * 2 + 2)}
            >
              <div
                className="alarm flex items-center gap-[1vh] rounded-xl border-2 border-brand bg-surface px-[1.6vh] py-[1vh] shadow-lg"
                style={cssVars({ "--ph": position })}
              >
                <b className="rounded-md bg-brand px-[.8vh] text-[clamp(.8rem,2vh,1.2rem)] text-white motion-safe:animate-pulse">
                  S1
                </b>
                <span className="text-[clamp(.75rem,1.9vh,1.1rem)]">
                  {ticket.id} · {ticket.label}
                </span>
              </div>
            </div>
          ))}
          <div
            data-v=""
            className={`absolute bottom-0 left-1/2 h-[42%] aspect-square -translate-x-1/2 ${RISE}`}
            style={stagger(1)}
          >
            <Character
              src="/assets/avatars/tiger-tired.png"
              alt="Binni, exhausted, with tickets piling up"
              mood="tired"
              className="size-full rounded-full border-[3px] border-brand"
            />
            <span
              aria-hidden="true"
              className="absolute -top-[18%] -right-[10%] text-[clamp(1rem,3vh,2rem)] font-bold text-mute motion-safe:animate-pulse"
            >
              z<sup>z</sup>
            </span>
          </div>
        </div>
      </Stage>

      <Reveal step={3} className="flex items-end justify-between gap-6">
        <div className="flex items-center gap-[1.2vh]">
          {crew.map((agent) => (
            <Character
              key={agent.id}
              src={agent.avatar}
              alt={agent.name}
              size={96}
              mood="working"
              phase={crew.indexOf(agent)}
              className="size-[clamp(2rem,6vh,3.6rem)] rounded-full border-2"
              style={{ borderColor: agent.color }}
            />
          ))}
          <span className="ml-[1vh] text-[clamp(1rem,2.6vh,1.5rem)] font-semibold text-brand-hi">
            What if you weren’t alone?
          </span>
        </div>
        <div className="flex flex-col items-end text-mute">
          <strong className="text-[clamp(1.1rem,2.8vh,1.6rem)] text-ink">{presenter.name}</strong>
          <span className="text-[clamp(.8rem,1.9vh,1.05rem)]">{presenter.role} · → to begin</span>
        </div>
      </Reveal>
    </Scene>
  );
}
