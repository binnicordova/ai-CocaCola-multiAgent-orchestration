import { Character } from "../ui/character";
import { DRAW, FADE } from "./anim";

const MAIN = "M40 320 C160 320 200 80 340 70 L440 68";
const CARE = "M440 70 L510 82 L512 58 L582 70 L584 46 L654 58 L656 34 L726 46 L728 22 L760 22";
const CHECKUPS = [
  [512, 58],
  [584, 46],
  [656, 34],
  [728, 22],
] as const;

/** Real Multica events pinned on the learning curve (heights are illustrative). */
const MILESTONES = [
  { x: 118, y: 282, label: "Aug 14 · 4 agents", dx: 10, dy: 22 },
  { x: 183, y: 199, label: "Sep 23 · first bug", dx: 10, dy: 20 },
  { x: 251, y: 113, label: "Oct 27 · Support Agent", dx: 10, dy: 24 },
  { x: 340, y: 70, label: "Nov 1 · Claude Opus 5.5", dx: -8, dy: -14, end: true },
] as const;

const ZONES = [
  { x: 190, label: "LEARNING" },
  { x: 390, label: "PLATEAU" },
  { x: 600, label: "DRIFT" },
] as const;

/** Conceptual curve of an agent's quality over time. Not measured data. */
export function ShapeCurve() {
  return (
    <figure className="w-full">
      <svg
        viewBox="0 0 800 360"
        role="img"
        aria-label="Agent quality rises, plateaus, then drifts unless you maintain it"
        className="h-auto max-h-[52vh] w-full"
      >
        <line
          x1="340"
          y1="30"
          x2="340"
          y2="330"
          stroke="rgb(255 255 255/.15)"
          strokeDasharray="4 6"
        />
        <line
          x1="440"
          y1="30"
          x2="440"
          y2="330"
          stroke="rgb(255 255 255/.15)"
          strokeDasharray="4 6"
        />
        <path d="M40 330 H760" stroke="rgb(255 255 255/.25)" />
        {ZONES.map((zone) => (
          <text
            key={zone.label}
            x={zone.x}
            y="352"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            letterSpacing="3"
            fill="rgb(255 255 255/.7)"
          >
            {zone.label}
          </text>
        ))}
        <path
          data-v=""
          d={MAIN}
          pathLength={1}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="7"
          strokeLinecap="round"
          className={DRAW}
          style={{ transitionDelay: ".6s" }}
        />
        <path
          data-v=""
          d="M440 68 L760 154"
          fill="none"
          stroke="rgb(248 113 113)"
          strokeWidth="4"
          strokeDasharray="10 8"
          className={FADE}
          style={{ transitionDelay: "1.8s" }}
        />
        <path
          data-v=""
          d={CARE}
          pathLength={1}
          fill="none"
          stroke="#34d399"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1"
          className={DRAW}
          style={{ transitionDelay: "2.4s" }}
        />
        {CHECKUPS.map(([cx, cy], index) => (
          <circle
            key={cx}
            data-v=""
            cx={cx}
            cy={cy}
            r="6"
            fill="#34d399"
            className={FADE}
            style={{ transitionDelay: `${3 + index * 0.25}s` }}
          />
        ))}
        {MILESTONES.map((milestone, index) => (
          <g
            key={milestone.label}
            data-v=""
            className={FADE}
            style={{ transitionDelay: `${0.9 + index * 0.5}s` }}
          >
            <circle cx={milestone.x} cy={milestone.y} r="6" fill="#fff" />
            <text
              x={milestone.x + milestone.dx}
              y={milestone.y + milestone.dy}
              textAnchor={"end" in milestone ? "end" : "start"}
              fontSize="14"
              fontWeight="700"
              fill={
                index === MILESTONES.length - 1 ? "var(--color-brand-hi)" : "rgb(255 255 255/.8)"
              }
            >
              {milestone.label}
            </text>
          </g>
        ))}
        <text
          data-v=""
          x="540"
          y="36"
          textAnchor="middle"
          fontSize="13"
          fill="#34d399"
          className={FADE}
          style={{ transitionDelay: "3.4s" }}
        >
          check-up: run evals, fix, re-baseline
        </text>
        <text
          data-v=""
          x="740"
          y="14"
          textAnchor="end"
          fontSize="18"
          fontWeight="700"
          fill="#34d399"
          className={FADE}
          style={{ transitionDelay: "3.2s" }}
        >
          with care
        </text>
        <g className="rider">
          <foreignObject x="-20" y="-20" width="40" height="40">
            <Character
              src="/assets/avatars/owl.png"
              size={96}
              mood="working"
              className="size-10 rounded-full border-2 border-white"
            />
          </foreignObject>
        </g>
        <g data-v="" className={FADE} style={{ transitionDelay: "2.6s" }}>
          <circle
            cx="700"
            cy="140"
            r="16"
            fill="var(--color-brand)"
            opacity=".35"
            className="animate-ping [transform-box:fill-box] [transform-origin:center]"
          />
          <circle cx="700" cy="140" r="8" fill="var(--color-brand)" />
          <text x="700" y="190" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff">
            noticed too late
          </text>
        </g>
      </svg>
    </figure>
  );
}
