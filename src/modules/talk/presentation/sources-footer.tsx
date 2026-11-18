import type { Source } from "../domain/source";

export function SourcesFooter({ sources }: { readonly sources: readonly Source[] }) {
  return (
    <footer className="border-t border-line px-[clamp(1.1rem,4vw,3rem)] py-10 text-[.82rem] text-mute">
      <div className="mx-auto max-w-[1040px]">
        <h2 className="mb-3 text-[.78rem] font-semibold tracking-[.18em] text-brand-hi uppercase">
          Sources &amp; further reading
        </h2>
        <ul className="mb-5 grid list-disc gap-[.35rem] pl-[1.1rem]">
          {sources.map((source) => (
            <li key={source.url}>
              {source.publisher} ·{" "}
              <a
                href={source.url}
                rel="noopener"
                className="text-ink decoration-brand underline-offset-2"
              >
                {source.title}
              </a>{" "}
              ({source.note}).
            </li>
          ))}
        </ul>
        <p>
          Evidence screenshots are real and in Spanish, as the team works. Agent figures: Multica
          workspace API, Aug 11 – Nov 12, 2026. Internal presentation. Built with the{" "}
          <a
            href="https://github.com/Ayoubhm07/katana-forge"
            rel="noopener"
            className="text-ink decoration-brand underline-offset-2"
          >
            Katana Forge
          </a>{" "}
          doctrine.
        </p>
      </div>
    </footer>
  );
}
