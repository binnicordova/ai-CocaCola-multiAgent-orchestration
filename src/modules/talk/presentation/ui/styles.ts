import type { CSSProperties } from "react";

type CssVars = Record<`--${string}`, string | number>;

/** Typed bridge for CSS custom properties in inline styles. */
export const cssVars = (vars: CssVars): CSSProperties => vars as CSSProperties;

export const cn = (...parts: (string | false | null | undefined)[]): string =>
  parts.filter(Boolean).join(" ");
