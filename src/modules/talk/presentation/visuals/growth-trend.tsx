import type { Metric } from "../../domain/metric";
import { Odometer } from "../ui/odometer";
import { DRAW, FADE, POP, stagger } from "./anim";

interface GrowthTrendProps {
  /** One measured entry per month on the axis. */
  readonly months: readonly { readonly label: string; readonly value: number }[];
  /** Annotation pinned on the last month, e.g. the model switch that explains the jump. */
  readonly cause: string;
  /** The headline multiple, e.g. 6.6 for ×6.6. */
  readonly factor: Metric;
  readonly note: string;
}

const W = 560;
const H = 230;
const PAD = { left: 36, right: 40, top: 24, bottom: 34 };

/** Two real measurements joined by a slope: the line is dashed where nothing was captured. */
export function GrowthTrend({ months, cause, factor, note }: GrowthTrendProps) {
  const first = months[0];
  const last = months[months.length - 1];
  if (!first || !last) return null;
  const stepX = (W - PAD.left - PAD.right) / (months.length - 1);
  const top = Math.ceil(last.value / 20) * 20;
  const y = (value: number) => PAD.top + (1 - value / top) * (H - PAD.top - PAD.bottom);
  const x0 = PAD.left;
  const x1 = W - PAD.right;
  const points = months.map((month, index) => ({
    ...month,
    px: x0 + stepX * index,
    py: y(month.value),
  }));
  const line = points.map((point) => `${point.px} ${point.py}`).join(" L");
  const ticks = [0, top / 2, top];

  return (
    <figure className="flex h-full min-h-0 w-full flex-col justify-center">
      <div className="flex items-baseline justify-between gap-3">
        <b className="text-[clamp(1rem,2.6vh,1.6rem)]">Issues per month</b>
        <span
          data-v=""
          className={`rounded-full bg-brand/15 px-3 py-0.5 text-[clamp(1.1rem,3.2vh,2rem)] font-bold text-brand-hi tabular-nums ${POP}`}
          style={stagger(5)}
        >
          ×<Odometer metric={factor} />
        </span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${months.map((month) => `${month.label}: ${month.value} issues`).join(". ")}. ${note}`}
        className="h-auto max-h-[28vh] w-full"
      >
        <defs>
          <linearGradient id="trend-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--color-brand)" stopOpacity=".45" />
            <stop offset="1" stopColor="var(--color-brand)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={PAD.left}
              x2={W - 8}
              y1={y(tick)}
              y2={y(tick)}
              stroke="rgb(255 255 255/.1)"
              strokeDasharray="3 5"
            />
            <text
              x={PAD.left - 8}
              y={y(tick) + 4}
              textAnchor="end"
              fontSize="11"
              fill="rgb(255 255 255/.55)"
            >
              {tick}
            </text>
          </g>
        ))}
        <path
          data-v=""
          d={`M${line} V${y(0)} H${x0} Z`}
          fill="url(#trend-fill)"
          className={FADE}
          style={{ transitionDelay: "1.6s" }}
        />
        <path
          data-v=""
          d={`M${line}`}
          pathLength={1}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray="1"
          className={DRAW}
          style={{ transitionDelay: ".8s" }}
        />
        <g data-v="" className={FADE} style={{ transitionDelay: "1.2s" }}>
          <line
            x1={x1 - stepX * 0.45}
            x2={x1 - stepX * 0.45}
            y1={PAD.top - 6}
            y2={y(0)}
            stroke="var(--color-brand-hi)"
            strokeDasharray="4 4"
          />
          <text
            x={x1 - stepX * 0.45 - 6}
            y={PAD.top + 8}
            textAnchor="end"
            fontSize="12"
            fontWeight="700"
            fill="var(--color-brand-hi)"
          >
            {cause}
          </text>
        </g>
        {points.map((point, position) => {
          const hot = position === points.length - 1;
          return (
            <g key={point.label} data-v="" className={POP} style={stagger(position * 2 + 1)}>
              <circle
                cx={point.px}
                cy={point.py}
                r="6"
                fill={hot ? "var(--color-brand)" : "#121214"}
                stroke="var(--color-brand)"
                strokeWidth="3"
              />
              <text
                x={point.px + (hot ? 12 : 0)}
                y={point.py - 14}
                textAnchor={hot ? "end" : "middle"}
                fontSize="22"
                fontWeight="700"
                fill="#fff"
              >
                {point.value}
              </text>
              <text
                x={point.px}
                y={H - 10}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="rgb(255 255 255/.75)"
              >
                {point.label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="text-[clamp(.75rem,1.7vh,1rem)] text-mute">{note}</figcaption>
    </figure>
  );
}
