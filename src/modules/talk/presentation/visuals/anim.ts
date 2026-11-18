import type { CSSProperties } from "react";

/*
 * Entrance animations for generated visuals. All of them wait for the scene to enter
 * (`group-data-[in]/scene`) and are neutralised by `[data-v]` under reduced motion and print.
 */

export const GROW_X =
  "origin-left transition-transform duration-1000 ease-keynote js:scale-x-0 js:group-data-[in]/scene:scale-x-100";

export const POP =
  "transition duration-700 ease-keynote js:scale-75 js:opacity-0 js:group-data-[in]/scene:scale-100 js:group-data-[in]/scene:opacity-100";

export const RISE =
  "transition duration-700 ease-keynote js:translate-y-4 js:opacity-0 js:group-data-[in]/scene:translate-y-0 js:group-data-[in]/scene:opacity-100";

/** For SVG paths with `pathLength={1}`: the stroke draws itself. */
export const DRAW =
  "transition-[stroke-dashoffset] duration-[1800ms] ease-keynote [stroke-dasharray:1] js:[stroke-dashoffset:1] js:group-data-[in]/scene:[stroke-dashoffset:0]";

/** Fade only, for fills and labels. */
export const FADE =
  "transition-opacity duration-1000 ease-keynote js:opacity-0 js:group-data-[in]/scene:opacity-100";

const BASE_DELAY_S = 0.7;
const STEP_S = 0.14;

/** Staggers the n-th element of a visual after the question has landed. */
export const stagger = (position: number, extra: CSSProperties = {}): CSSProperties => ({
  transitionDelay: `${(BASE_DELAY_S + position * STEP_S).toFixed(2)}s`,
  ...extra,
});
