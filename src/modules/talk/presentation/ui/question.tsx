"use client";

import { useEffect, useRef, useState } from "react";
import { scrambleText } from "../../application/scramble-text";
import { usePrefersReducedMotion } from "../deck/use-reduced-motion";
import { useSceneEntered } from "./scene";
import { cn } from "./styles";

const BASE = "text-balance font-bold tracking-[-.035em]";
const SIZE = "mb-[1.5vh] max-w-[30ch] text-[clamp(1.8rem,min(4.4vw,7.6vh),4.6rem)] leading-[1.03]";
const REVEAL =
  "transition duration-700 ease-keynote js:translate-y-[18px] js:opacity-0 js:group-data-[in]/scene:translate-y-0 js:group-data-[in]/scene:opacity-100";

const MAX_DECODE_MS = 1500;

interface QuestionProps {
  readonly children: string;
  /** The closing statement skips the decode and uses the katana cut instead. */
  readonly variant?: "decode" | "finale";
}

/** The question that opens every scene: letters resolve out of noise, the real text never leaves the DOM. */
export function Question({ children: text, variant = "decode" }: QuestionProps) {
  const entered = useSceneEntered();
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const [shown, setShown] = useState(text);
  const finale = variant === "finale";

  useEffect(() => {
    const element = ref.current;
    if (!entered || reduced || finale || !element) return;

    element.style.minHeight = `${element.offsetHeight}px`;
    const duration = Math.min(MAX_DECODE_MS, 600 + text.length * 12);
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setShown(scrambleText(text, progress, Math.random));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else element.style.minHeight = "";
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      element.style.minHeight = "";
      setShown(text);
    };
  }, [entered, reduced, finale, text]);

  return (
    <h2
      ref={ref}
      data-q=""
      data-finale-q={finale ? "" : undefined}
      className={cn(BASE, SIZE, finale ? "max-w-[18ch]" : REVEAL)}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
    </h2>
  );
}
