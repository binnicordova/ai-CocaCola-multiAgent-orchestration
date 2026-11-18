export interface TextPart {
  readonly text: string;
  readonly emphasis: boolean;
}

/** Splits `plain *emphasised* plain` into parts, so captions stay plain strings in the domain. */
export function splitEmphasis(source: string): TextPart[] {
  return source
    .split("*")
    .map((text, index) => ({ text, emphasis: index % 2 === 1 }))
    .filter((part) => part.text !== "");
}
