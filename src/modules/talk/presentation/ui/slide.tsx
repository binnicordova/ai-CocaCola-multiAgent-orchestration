import { Reveal } from "./reveal";
import { RichText } from "./rich-text";
import { cn } from "./styles";

/** The visual area of a slide: takes all the room between the question and the takeaway. */
export function Stage({
  children,
  className,
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
}) {
  return (
    <div className={cn("flex min-h-0 flex-1 items-center justify-center py-[1.5vh]", className)}>
      {children}
    </div>
  );
}

/** One line to remember. `*word*` is highlighted. */
export function Takeaway({ children }: { readonly children: string }) {
  return (
    <Reveal
      as="p"
      step={7}
      className="mt-[1.5vh] border-l-4 border-brand pl-4 text-[clamp(1.15rem,3.2vh,2rem)] leading-tight font-semibold tracking-[-.015em] text-balance"
    >
      <RichText>{children}</RichText>
    </Reveal>
  );
}

/** Small mono source line, kept out of the way of the visual. */
export function SourceTag({ children }: { readonly children: React.ReactNode }) {
  return <p className="mt-[1vh] text-[clamp(.7rem,1.7vh,.9rem)] text-mute">{children}</p>;
}
