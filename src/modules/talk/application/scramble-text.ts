const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&*+=<>/";

/**
 * Decoding effect: the first `progress` share of the letters is real, the rest is noise.
 * Spaces are never scrambled, so the line breaks stay stable.
 */
export function scrambleText(text: string, progress: number, random: () => number): string {
  const chars = [...text];
  const revealed = Math.floor(Math.min(1, Math.max(0, progress)) * chars.length);
  return chars
    .map((char, index) =>
      char === " " || index < revealed
        ? char
        : (GLYPHS[Math.floor(random() * GLYPHS.length)] ?? char),
    )
    .join("");
}
