import { cn, cssVars } from "./styles";

interface RevealProps {
  readonly children: React.ReactNode;
  /** Position in the scene's reveal order (delays the entrance). */
  readonly step?: number;
  readonly as?: "div" | "p" | "figure" | "ol";
  readonly className?: string;
}

const BASE =
  "transition duration-[800ms] ease-keynote js:translate-y-[26px] js:opacity-0 js:group-data-[in]/scene:translate-y-0 js:group-data-[in]/scene:opacity-100";

/** The answer lands after the question: fades in with a beat of delay. */
export function Reveal({ children, step = 0, as: Tag = "div", className }: RevealProps) {
  return (
    <Tag
      data-reveal=""
      className={cn(BASE, className)}
      style={{
        transitionDelay: "calc(.75s + var(--i) * .14s)",
        ...cssVars({ "--i": Math.min(step, 8) }),
      }}
    >
      {children}
    </Tag>
  );
}
