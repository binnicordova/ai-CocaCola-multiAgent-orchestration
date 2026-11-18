import type { Metric } from "../../domain/metric";
import { Odometer } from "../ui/odometer";
import { cn } from "../ui/styles";
import { DRAW } from "./anim";

interface DonutProps {
  /** 0 to 1. */
  readonly fraction: number;
  readonly metric: Metric;
  readonly label: string;
}

/** A ring that draws itself, with the number inside. */
export function Donut({ fraction, metric, label }: DonutProps) {
  return (
    <div className="relative mx-auto aspect-square h-[clamp(7rem,21vh,14rem)] max-w-full">
      <svg viewBox="0 0 120 120" className="size-full" aria-hidden="true" focusable="false">
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="rgb(255 255 255 / .08)"
          strokeWidth="12"
        />
        <g transform="rotate(-90 60 60)">
          <circle
            data-v=""
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth="12"
            strokeLinecap="round"
            pathLength={1}
            className={cn(DRAW, "drop-shadow-[0_0_8px_rgb(232_33_46/.7)]")}
            style={{ transitionDelay: ".8s", strokeDasharray: `${fraction} 1` }}
          />
        </g>
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <b className="text-[clamp(1.6rem,5.5vh,3.4rem)] leading-none tabular-nums">
          <Odometer metric={metric} />
        </b>
        <span className="mt-1 text-[clamp(.7rem,1.7vh,1rem)] text-mute">{label}</span>
      </div>
    </div>
  );
}
