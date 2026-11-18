"use client";

import Image from "next/image";
import type { Evidence } from "../../domain/evidence";
import { useDeck } from "../deck/deck-context";
import { RichText } from "./rich-text";
import { cn, cssVars } from "./styles";

interface ShotProps {
  readonly evidence: Evidence;
  /** Cap the image height (portrait memes). */
  readonly compact?: boolean;
  readonly slim?: boolean;
  /** Skip the top margin when the figure sits inside a grid. */
  readonly inGrid?: boolean;
  readonly priority?: boolean;
  /** Fit inside a slide: capped to the stage height, no caption. */
  readonly fit?: boolean;
}

/** A piece of evidence: opens in the lightbox, optionally with a spotlight on the key detail. */
export function Shot({ evidence, compact, slim, inGrid, priority, fit }: ShotProps) {
  const { openLightbox } = useDeck();
  const { highlight } = evidence;

  return (
    <figure
      className={cn(
        !inGrid && !fit && "mt-[1.4rem]",
        slim && "max-w-[900px]",
        fit && "w-fit max-w-full",
      )}
    >
      <button
        type="button"
        data-zoom=""
        onClick={() =>
          openLightbox({
            src: evidence.src,
            alt: evidence.alt,
            caption: evidence.caption.replaceAll("*", ""),
          })
        }
        className="relative block w-full cursor-zoom-in overflow-hidden rounded-[14px] border border-line bg-surface transition hover:-translate-y-0.5 hover:border-brand/70 focus-visible:-translate-y-0.5 focus-visible:border-brand/70"
      >
        <Image
          src={evidence.src}
          alt={evidence.alt}
          width={evidence.width}
          height={evidence.height}
          sizes="(min-width: 1240px) 1240px, 100vw"
          priority={priority}
          className={cn(
            "h-auto w-full",
            compact && "mx-auto max-h-[min(60vh,520px)] w-auto",
            fit && "max-h-[44vh] w-auto max-w-full",
          )}
        />
        {highlight && (
          <i
            data-hl=""
            style={cssVars({
              "--x": `${highlight.x}%`,
              "--y": `${highlight.y}%`,
              "--w": `${highlight.width}%`,
              "--h": `${highlight.height}%`,
            })}
          />
        )}
      </button>
      {!fit && (
        <figcaption className="mt-[.6rem] text-[.88rem] leading-[1.4] text-mute">
          <RichText>{evidence.caption}</RichText>
        </figcaption>
      )}
    </figure>
  );
}
