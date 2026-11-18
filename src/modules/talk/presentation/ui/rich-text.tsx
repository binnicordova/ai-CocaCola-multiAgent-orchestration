import { splitEmphasis } from "../../application/split-emphasis";

/** Renders a `*marked*` string with the accent colour on the starred phrases. */
export function RichText({ children }: { readonly children: string }) {
  return splitEmphasis(children).map((part) =>
    part.emphasis ? <em key={part.text}>{part.text}</em> : part.text,
  );
}
