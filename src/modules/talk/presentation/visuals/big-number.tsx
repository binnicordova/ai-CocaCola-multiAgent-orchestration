import type { Metric } from "../../domain/metric";
import { Odometer } from "../ui/odometer";
import { cn } from "../ui/styles";

interface BigNumberProps {
  readonly metric: Metric;
  /** Three to five words. */
  readonly label: string;
  readonly size?: "xl" | "lg" | "md";
  readonly hot?: boolean;
}

const SIZE = {
  xl: "text-[clamp(4rem,min(11vw,22vh),12rem)]",
  lg: "text-[clamp(3rem,min(7vw,14vh),8rem)]",
  md: "text-[clamp(2.2rem,min(4.5vw,9vh),5rem)]",
} as const;

/** A number the whole room can read: rolls up when the slide enters. */
export function BigNumber({ metric, label, size = "lg", hot }: BigNumberProps) {
  return (
    <div>
      <b
        className={cn(
          "block leading-none font-bold tracking-[-.045em] tabular-nums",
          SIZE[size],
          hot && "text-brand-hi",
        )}
      >
        <Odometer metric={metric} />
      </b>
      <span className="mt-[.8vh] block text-[clamp(.9rem,2.3vh,1.4rem)] leading-tight text-mute">
        {label}
      </span>
    </div>
  );
}
