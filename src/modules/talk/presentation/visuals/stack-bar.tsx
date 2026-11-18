import { cn } from "../ui/styles";
import { GROW_X, stagger } from "./anim";

export interface Segment {
  readonly label: string;
  readonly value: number;
  readonly className: string;
}

/** One bar split into segments, with its own legend. */
export function StackBar({ segments }: { readonly segments: readonly Segment[] }) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  return (
    <div className="w-full">
      <div className="flex h-[clamp(1.2rem,4vh,2.6rem)] gap-1 overflow-hidden rounded-full">
        {segments.map((segment, position) => (
          <span
            key={segment.label}
            data-v=""
            className={cn("block h-full", segment.className, GROW_X)}
            style={stagger(position, { width: `${(segment.value / total) * 100}%` })}
          />
        ))}
      </div>
      <ul className="mt-[1.2vh] flex flex-wrap gap-x-4 gap-y-1 text-[clamp(.75rem,1.8vh,1.05rem)] text-soft">
        {segments.map((segment) => (
          <li key={segment.label} className="flex items-center gap-1.5">
            <i className={cn("size-2.5 rounded-full", segment.className)} />
            <b className="text-ink tabular-nums">{segment.value}</b> {segment.label}{" "}
            <span className="text-mute tabular-nums">
              {Math.round((segment.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
