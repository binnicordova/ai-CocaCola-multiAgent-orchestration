"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "./use-reduced-motion";

const TILT_DEGREES = { x: 10, y: 6 };

const reset = (element: HTMLElement | null) => {
  element?.style.setProperty("--rx", "0deg");
  element?.style.setProperty("--ry", "0deg");
};

/** One delegated listener: pointer-lit cards (`data-lift`) and the tilting strip (`data-tilt`). */
export function usePointerEffects() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    let tilted: HTMLElement | null = null;

    const onMove = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;

      const lift = event.target.closest<HTMLElement>("[data-lift]");
      if (lift) {
        const box = lift.getBoundingClientRect();
        lift.style.setProperty("--mx", `${event.clientX - box.left}px`);
        lift.style.setProperty("--my", `${event.clientY - box.top}px`);
      }

      if (reduced) return;
      const tilt = event.target.closest<HTMLElement>("[data-tilt]");
      if (tilted && tilted !== tilt) reset(tilted);
      tilted = tilt;
      if (tilt) {
        const box = tilt.getBoundingClientRect();
        const px = (event.clientX - box.left) / box.width - 0.5;
        const py = (event.clientY - box.top) / box.height - 0.5;
        tilt.style.setProperty("--ry", `${px * TILT_DEGREES.y}deg`);
        tilt.style.setProperty("--rx", `${-py * TILT_DEGREES.x}deg`);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);
}
