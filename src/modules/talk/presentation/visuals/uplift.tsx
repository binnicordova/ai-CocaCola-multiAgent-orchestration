import type { Metric } from "../../domain/metric";
import { Odometer } from "../ui/odometer";
import { cn } from "../ui/styles";
import { FADE, POP, stagger } from "./anim";

interface UpliftProps {
  readonly base: { readonly label: string; readonly value: number };
  readonly boosted: { readonly label: string; readonly value: number };
  readonly gain: Metric;
}

/** Two columns on one scale. The gap between them is the story, so it gets a bracket and the number. */
export function Uplift({ base, boosted, gain }: UpliftProps) {
  const percent = (value: number) => `${((value / boosted.value) * 100).toFixed(1)}%`;
  const bars = [
    { ...base, hot: false },
    { ...boosted, hot: true },
  ] as const;

  return (
    <div className="relative h-[clamp(13rem,44vh,27rem)] w-full">
      <div className="absolute inset-x-0 top-0 bottom-9 flex items-stretch justify-center gap-[clamp(1.5rem,6vw,5rem)]">
        {bars.map((bar, position) => (
          <div key={bar.label} className="relative w-1/3 max-w-[14rem]">
            <b
              data-v=""
              className={cn(
                "absolute inset-x-0 text-center text-[clamp(1.2rem,3.4vh,2.2rem)] leading-none tabular-nums",
                bar.hot ? "text-brand-hi" : "text-soft",
                FADE,
              )}
              style={stagger(position * 3 + 3, {
                bottom: `calc(${percent(bar.value)} + .4rem)`,
              })}
            >
              {Math.round(bar.value)}
            </b>
            <div
              data-v=""
              className={cn(
                "absolute inset-x-0 bottom-0 origin-bottom rounded-t-xl transition-transform duration-[1400ms] ease-keynote js:scale-y-0 js:group-data-[in]/scene:scale-y-100",
                bar.hot
                  ? "bg-gradient-to-t from-brand/60 to-brand shadow-[0_0_40px_rgb(232_33_46/.5)]"
                  : "bg-white/25",
              )}
              style={{ height: percent(bar.value), transitionDelay: `${0.7 + position * 0.5}s` }}
            />
          </div>
        ))}
        <div
          data-v=""
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-[14%] border-t-2 border-dashed border-white/40",
            FADE,
          )}
          style={stagger(7, { bottom: percent(base.value) })}
        />
        <div
          data-v=""
          className={cn(
            "absolute left-1/2 z-10 -translate-x-1/2 translate-y-1/2 rounded-full border border-brand bg-surface px-4 py-1 text-[clamp(1.1rem,3.4vh,2.2rem)] font-bold text-brand-hi tabular-nums shadow-[0_0_30px_rgb(232_33_46/.4)]",
            POP,
          )}
          style={stagger(8, { bottom: percent(base.value) })}
        >
          ↑ +<Odometer metric={gain} />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-center gap-[clamp(1.5rem,6vw,5rem)]">
        {bars.map((bar) => (
          <span
            key={bar.label}
            className="w-1/3 max-w-[14rem] text-center text-[clamp(.8rem,2vh,1.2rem)] text-soft"
          >
            {bar.label}
          </span>
        ))}
      </div>
    </div>
  );
}
