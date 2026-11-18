import { cn } from "../ui/styles";
import { POP, stagger } from "./anim";

export interface TileItem {
  readonly icon: string;
  readonly title: string;
  readonly hint?: string;
}

/** Icon tiles: one idea each, three words or fewer. */
export function TileGrid({
  items,
  columns = 4,
}: {
  readonly items: readonly TileItem[];
  readonly columns?: 2 | 3 | 4;
}) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 xl:grid-cols-4" }[
    columns
  ];
  return (
    <ul className={cn("grid w-full gap-[clamp(.6rem,2vh,1.2rem)]", cols)}>
      {items.map((item, position) => (
        <li
          key={item.title}
          data-v=""
          className={cn(
            "rounded-2xl border border-line bg-surface p-[clamp(.9rem,2.6vh,1.7rem)]",
            POP,
          )}
          style={stagger(position)}
        >
          <span className="text-[clamp(1.8rem,5.5vh,3.2rem)] leading-none">{item.icon}</span>
          <b className="mt-[1vh] block text-[clamp(1.05rem,3vh,1.8rem)] leading-tight">
            {item.title}
          </b>
          {item.hint && (
            <span className="mt-1 block text-[clamp(.85rem,2vh,1.15rem)] text-mute">
              {item.hint}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/** A small rounded label. */
export function Chip({
  children,
  hot,
}: {
  readonly children: React.ReactNode;
  readonly hot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[clamp(.85rem,2.1vh,1.2rem)]",
        hot ? "border-brand bg-brand/15 text-brand-hi" : "border-line bg-white/[.04] text-soft",
      )}
    >
      {children}
    </span>
  );
}
