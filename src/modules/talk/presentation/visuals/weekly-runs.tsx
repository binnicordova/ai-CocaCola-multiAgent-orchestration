import { cn } from "../ui/styles";
import { FADE, POP, stagger } from "./anim";

interface Week {
  readonly month: "Aug" | "Sep" | "Oct" | "Nov";
  readonly runs: number;
}

interface Marker {
  readonly week: number;
  readonly label: string;
}

interface WeeklyRunsProps {
  readonly weeks: readonly Week[];
  /** Index of the first week that is part of the ramp-up. */
  readonly rampFrom: number;
  /** Index of the last week, still open when the data was captured. */
  readonly partialWeek: number;
  readonly markers: readonly Marker[];
}

const W = 560;
const H = 250;
const PAD = { left: 38, right: 8, top: 30, bottom: 30 };
const GROW =
  "origin-bottom [transform-box:fill-box] transition-transform duration-1000 ease-keynote js:scale-y-0 js:group-data-[in]/scene:scale-y-100";

/** Weekly agent runs: the attention curve, flat for ten weeks and then a wall. */
export function WeeklyRuns({ weeks, rampFrom, partialWeek, markers }: WeeklyRunsProps) {
  const peak = Math.max(...weeks.map((week) => week.runs));
  const top = Math.ceil((peak * 1.3) / 400) * 400;
  const slot = (W - PAD.left - PAD.right) / weeks.length;
  const barWidth = slot * 0.72;
  const base = H - PAD.bottom;
  const height = (runs: number) => (runs / top) * (base - PAD.top);
  const before = weeks.slice(0, rampFrom);
  const calmPace = before.reduce((sum, week) => sum + week.runs, 0) / before.length;
  const multiple = Math.round(peak / calmPace);
  const peakWeek = weeks.findIndex((week) => week.runs === peak);

  const months = weeks.reduce<{ month: string; from: number; to: number }[]>(
    (groups, week, index) => {
      const last = groups[groups.length - 1];
      if (last?.month === week.month) last.to = index;
      else groups.push({ month: week.month, from: index, to: index });
      return groups;
    },
    [],
  );

  return (
    <figure className="flex h-full min-h-0 w-full flex-col justify-center">
      <div className="flex items-baseline justify-between gap-3">
        <b className="text-[clamp(1rem,2.6vh,1.6rem)]">Agent runs per week</b>
        <span
          data-v=""
          className={cn(
            "rounded-full bg-brand/15 px-3 py-0.5 text-[clamp(1rem,2.8vh,1.8rem)] font-bold text-brand-hi tabular-nums",
            POP,
          )}
          style={stagger(8)}
        >
          ≈×{multiple} the calm pace
        </span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Weekly agent runs stayed near ${Math.round(calmPace)} a week for ${rampFrom} weeks, then reached about ${peak.toLocaleString("en-US")} a week after the Support Agent launch and Claude Opus 5.5`}
        className="h-auto max-h-[34vh] w-full"
      >
        {[0, top / 2, top].map((tick) => (
          <g key={tick}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={base - height(tick)}
              y2={base - height(tick)}
              stroke="rgb(255 255 255/.1)"
              strokeDasharray="3 5"
            />
            <text
              x={PAD.left - 6}
              y={base - height(tick) + 4}
              textAnchor="end"
              fontSize="11"
              fill="rgb(255 255 255/.55)"
            >
              {tick.toLocaleString("en-US")}
            </text>
          </g>
        ))}
        {weeks.map((week, index) => {
          const x = PAD.left + slot * index + (slot - barWidth) / 2;
          const ramp = index >= rampFrom;
          return (
            <g key={`${week.month}-${week.runs}-${x}`}>
              <rect
                data-v=""
                x={x}
                y={base - height(week.runs)}
                width={barWidth}
                height={height(week.runs)}
                rx="3"
                fill={ramp ? "var(--color-brand)" : "rgb(255 255 255/.4)"}
                opacity={index === partialWeek ? 0.6 : 1}
                strokeDasharray={index === partialWeek ? "4 3" : undefined}
                stroke={index === partialWeek ? "var(--color-brand-hi)" : undefined}
                className={GROW}
                style={stagger(index * 0.5)}
              />
              {index === peakWeek && (
                <text
                  data-v=""
                  x={x + barWidth / 2}
                  y={base - height(week.runs) - 6}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="#fff"
                  className={FADE}
                  style={stagger(9)}
                >
                  ~{peak.toLocaleString("en-US")}
                </text>
              )}
            </g>
          );
        })}
        {markers.map((marker, position) => {
          const x = PAD.left + slot * marker.week + slot / 2;
          return (
            <g key={marker.label} data-v="" className={FADE} style={stagger(7 + position)}>
              <line
                x1={x}
                x2={x}
                y1={PAD.top - 8 + position * 14}
                y2={base}
                stroke="var(--color-brand-hi)"
                strokeDasharray="3 4"
              />
              <text
                x={x - 5}
                y={PAD.top - 2 + position * 14}
                textAnchor="end"
                fontSize="11"
                fontWeight="700"
                fill="var(--color-brand-hi)"
              >
                {marker.label}
              </text>
            </g>
          );
        })}
        {months.map((group) => (
          <text
            key={group.month}
            x={PAD.left + slot * ((group.from + group.to + 1) / 2)}
            y={H - 10}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="rgb(255 255 255/.75)"
          >
            {group.month}
          </text>
        ))}
      </svg>
      <figcaption className="text-[clamp(.7rem,1.6vh,.95rem)] text-mute">
        ≈ read from the Multica weekly chart · the dashed last week was still open
      </figcaption>
    </figure>
  );
}
