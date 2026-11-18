import Image from "next/image";
import { cn, cssVars } from "./styles";

export type Mood = "idle" | "tired" | "working" | "cheer";

interface CharacterProps {
  readonly src: string;
  readonly alt?: string;
  readonly mood?: Mood;
  /** Offsets the loop so a crowd never breathes in unison. */
  readonly phase?: number;
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly size?: number;
}

/**
 * A character that is alive: the body breathes, bobs or hops while the face leans on its own beat.
 * Purely decorative motion (runs only once the scene has entered; silenced for reduced motion).
 */
export function Character({
  src,
  alt = "",
  mood = "idle",
  phase = 0,
  className,
  style,
  size = 360,
}: CharacterProps) {
  return (
    <span
      className={cn("alive", `alive-${mood}`, className)}
      style={{ ...cssVars({ "--ph": phase }), ...style }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="alive-face size-full rounded-full object-cover"
      />
    </span>
  );
}
