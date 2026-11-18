import type { Agent } from "../../domain/agent";
import { Character } from "../ui/character";
import { cn, cssVars } from "../ui/styles";
import { GROW_X, POP, stagger } from "./anim";

interface Node {
  readonly id: string;
  readonly avatar: string;
  readonly role: string;
  readonly label: string;
  readonly color: string;
  readonly human: boolean;
}

const TICKET: Node = {
  id: "ticket",
  avatar: "/assets/avatars/ticket.svg",
  role: "Ticket",
  label: "Jira",
  color: "#60a5fa",
  human: false,
};

const CIRCLE = "size-[clamp(3.2rem,11vh,7rem)]";

/** The relay as a diagram: ticket in, five specialists, a human at the end. */
export function Pipeline({
  agents,
  compact,
}: {
  readonly agents: readonly Agent[];
  readonly compact?: boolean;
}) {
  const nodes: readonly Node[] = [
    TICKET,
    ...agents.map((agent) => ({
      id: agent.id,
      avatar: agent.avatar,
      role: agent.role,
      label: agent.short,
      color: agent.color,
      human: agent.kind === "human",
    })),
  ];

  return (
    <ol className="relative flex w-full items-start justify-between">
      <li
        aria-hidden="true"
        className={cn(
          "baton",
          compact ? "top-[clamp(1.1rem,3.5vh,2.2rem)]" : "top-[clamp(1.6rem,5.5vh,3.5rem)]",
        )}
      />
      {nodes.map((node, position) => {
        const previous = nodes[position - 1];
        return (
          <li
            key={node.id}
            className="relative flex min-w-0 flex-1 flex-col items-center text-center"
          >
            {previous && (
              <span
                aria-hidden="true"
                data-v=""
                className={cn(
                  "absolute right-1/2 h-[3px] w-full rounded-full",
                  compact ? "top-[clamp(1.1rem,3.5vh,2.2rem)]" : "top-[clamp(1.6rem,5.5vh,3.5rem)]",
                  GROW_X,
                )}
                style={stagger(position, {
                  background: `linear-gradient(90deg, ${previous.color}, ${node.color})`,
                })}
              />
            )}
            <span
              aria-hidden="true"
              data-v=""
              className={cn(
                "wake relative z-10 grid place-items-center overflow-hidden rounded-full border-[3px] bg-surface",
                compact ? "size-[clamp(2.2rem,7vh,4.4rem)]" : `${CIRCLE}`,
                POP,
              )}
              style={stagger(position, {
                ...cssVars({ "--n": position }),
                borderColor: node.color,
                boxShadow: node.human
                  ? `0 0 0 6px ${node.color}33, 0 0 40px ${node.color}88`
                  : `0 0 28px ${node.color}44`,
              })}
            >
              <Character
                src={node.avatar}
                mood={node.human ? "cheer" : "idle"}
                phase={position}
                className="size-full"
              />
            </span>
            <b
              data-v=""
              className={cn("mt-[1.2vh] text-[clamp(.9rem,2.4vh,1.5rem)] leading-tight", POP)}
              style={stagger(position + 1, { color: node.color })}
            >
              {node.role}
            </b>
            <span
              data-v=""
              className={cn("text-[clamp(.75rem,1.8vh,1.05rem)] text-mute", POP)}
              style={stagger(position + 1)}
            >
              {node.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
