"use client";

import { useState } from "react";
import { cn } from "./styles";

const LANGUAGES = [
  { id: "en", label: "EN", src: "/assets/multi-agents-en.mp4" },
  { id: "es", label: "ES", src: "/assets/multi-agents-es.mp4" },
] as const;

/** The 96-second vertical cut of the talk. Nothing downloads until the viewer presses play. */
export function CutVideo() {
  const [language, setLanguage] = useState<(typeof LANGUAGES)[number]>(LANGUAGES[0]);

  return (
    <figure className="flex h-full min-h-0 flex-col items-center gap-[1vh]">
      {/* biome-ignore lint/a11y/useMediaCaption: the cut has burned-in captions and no audio-only content */}
      <video
        key={language.id}
        controls
        playsInline
        preload="none"
        poster="/assets/multi-agents-poster.jpg"
        aria-label="Multi AI Agents: the 96-second cut of the talk"
        className="aspect-[9/16] min-h-0 flex-1 rounded-2xl border border-line bg-black object-contain"
      >
        <source src={language.src} type="video/mp4" />
      </video>
      <figcaption className="flex items-center gap-2 text-[clamp(.7rem,1.6vh,.9rem)] text-mute">
        96 s ·
        {LANGUAGES.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={option.id === language.id}
            onClick={() => setLanguage(option)}
            className={cn(
              "rounded-full border px-2 py-0.5 font-semibold",
              option.id === language.id
                ? "border-brand bg-brand/15 text-brand-hi"
                : "border-line hover:border-brand/60",
            )}
          >
            {option.label}
          </button>
        ))}
      </figcaption>
    </figure>
  );
}
