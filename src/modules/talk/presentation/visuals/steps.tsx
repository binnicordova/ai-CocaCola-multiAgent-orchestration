import { cn } from "../ui/styles";
import { POP, stagger } from "./anim";

export interface StepItem {
  readonly icon: string;
  readonly title: string;
  readonly hint?: string;
  readonly hot?: boolean;
}

/** A numbered row of icon steps joined by arrows. */
export function Steps({ items }: { readonly items: readonly StepItem[] }) {
  return (
    <ol className="flex w-full items-stretch gap-[clamp(.4rem,1.2vw,1rem)] max-md:flex-col">
      {items.map((item, position) => (
        <li
          key={item.title}
          className="flex flex-1 items-center gap-[clamp(.4rem,1.2vw,1rem)] max-md:flex-col"
        >
          <div
            data-v=""
            className={cn(
              "flex h-full w-full flex-col items-center justify-center rounded-2xl border p-[clamp(.7rem,2.2vh,1.5rem)] text-center",
              item.hot
                ? "border-brand bg-brand/10 shadow-[0_0_40px_rgb(232_33_46/.25)]"
                : "border-line bg-surface",
              POP,
            )}
            style={stagger(position)}
          >
            <span className="text-[clamp(1.8rem,6vh,3.6rem)] leading-none">{item.icon}</span>
            <b className="mt-[1vh] text-[clamp(1rem,2.8vh,1.7rem)] leading-tight">{item.title}</b>
            {item.hint && (
              <span className="mt-1 text-[clamp(.8rem,1.9vh,1.1rem)] text-mute">{item.hint}</span>
            )}
          </div>
          {position < items.length - 1 && (
            <span
              aria-hidden="true"
              className="text-[clamp(1rem,3vh,2rem)] text-brand max-md:rotate-90"
            >
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
