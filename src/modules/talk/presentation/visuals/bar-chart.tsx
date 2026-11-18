import { cn } from "../ui/styles";
import { GROW_X, stagger } from "./anim";

export interface BarItem {
  readonly label: string;
  readonly value: number;
  /** What is printed at the end of the bar. */
  readonly display: string;
  /** The bar the audience should look at. */
  readonly hot?: boolean;
  /** Share of the total, 0 to 100: turns a count into proportion. */
  readonly share?: number;
}

/** Horizontal bars that grow in; the hot one glows in the brand colour. */
export function BarChart({
  items,
  labelWidth = "11rem",
}: {
  readonly items: readonly BarItem[];
  readonly labelWidth?: string;
}) {
  const max = Math.max(...items.map((item) => item.value));
  const hasShare = items.some((item) => item.share !== undefined);

  return (
    <ul className="grid w-full gap-[clamp(.6rem,2vh,1.3rem)]">
      {items.map((item, position) => (
        <li
          key={item.label}
          className="grid items-center gap-x-4"
          style={{
            gridTemplateColumns: `minmax(0,${labelWidth}) 1fr auto${hasShare ? " 3.2rem" : ""}`,
          }}
        >
          <span
            className={cn(
              "text-[clamp(.85rem,2.1vh,1.2rem)] text-soft",
              item.hot && "font-semibold text-ink",
            )}
          >
            {item.label}
          </span>
          <span className="h-[clamp(1rem,3.4vh,2.2rem)] overflow-hidden rounded-full bg-white/[.06]">
            <span
              data-v=""
              className={cn(
                "block h-full rounded-full",
                item.hot ? "bg-brand shadow-[0_0_28px_rgb(232_33_46/.65)]" : "bg-white/35",
                GROW_X,
              )}
              style={stagger(position, { width: `${(item.value / max) * 100}%` })}
            />
          </span>
          <b
            className={cn(
              "min-w-[3.5ch] text-right text-[clamp(1rem,2.6vh,1.6rem)] tabular-nums",
              item.hot ? "text-brand-hi" : "text-soft",
            )}
          >
            {item.display}
          </b>
          {hasShare && (
            <span
              className={cn(
                "text-right text-[clamp(.8rem,2vh,1.1rem)] tabular-nums",
                item.hot ? "font-semibold text-brand-hi" : "text-mute",
              )}
            >
              {item.share}%
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
