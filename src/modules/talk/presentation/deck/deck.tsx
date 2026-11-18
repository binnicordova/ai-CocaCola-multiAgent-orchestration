"use client";

import { type RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Scene } from "../../domain/scene";
import { DeckContext, type LightboxItem } from "./deck-context";
import { Lightbox } from "./lightbox";
import { Splash } from "./splash";
import { useDeckNavigation } from "./use-deck-navigation";
import { usePointerEffects } from "./use-pointer-effects";

interface DeckProps {
  readonly scenes: readonly Scene[];
  readonly children: React.ReactNode;
}

const SPLASH_KEY = "splash";

/** Client shell: splash, progress, scene dots, keyboard navigation and the image viewer. */
export function Deck({ scenes, children }: DeckProps) {
  const [ready, setReady] = useState(false);
  const [splashing, setSplashing] = useState(false);
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);
  const progressRef = useRef<HTMLElement>(null);
  const ids = useMemo(() => scenes.map((scene) => scene.id), [scenes]);

  useEffect(() => {
    // The inline head script decides whether the intro plays (once per session, not on reduced motion).
    if (document.documentElement.classList.contains("splash-on")) setSplashing(true);
    else setReady(true);
  }, []);

  const finishSplash = useCallback(() => {
    try {
      sessionStorage.setItem(SPLASH_KEY, "1");
    } catch {
      // private mode: the intro may play again, which is harmless
    }
    document.documentElement.classList.remove("splash-on");
    setSplashing(false);
    setReady(true);
  }, []);

  const { current, jump } = useDeckNavigation({
    ids,
    progressRef,
    keyboardEnabled: ready && !lightbox,
  });
  usePointerEffects();

  const api = useMemo(() => ({ ready, openLightbox: setLightbox }), [ready]);

  return (
    <DeckContext.Provider value={api}>
      <a
        href="#main"
        className="absolute top-0 -left-[999px] z-[100] bg-white px-4 py-2.5 text-black focus:left-0"
      >
        Skip to content
      </a>
      <Progress ref={progressRef} />
      <header
        data-chrome
        className="pointer-events-none fixed inset-x-0 top-[3px] z-50 flex items-center justify-between gap-4 bg-gradient-to-b from-bg/90 to-transparent px-[clamp(1rem,3vw,2.5rem)] py-3.5 text-[.78rem] text-mute"
      >
        <span className="pointer-events-auto font-semibold tracking-[.14em] whitespace-nowrap uppercase">
          Multi-Agent AI Development
        </span>
        <nav aria-label="Scenes" className="pointer-events-auto max-md:hidden">
          <ul className="m-0 flex list-none gap-[.45rem] p-0">
            {scenes.map((scene, index) => (
              <li key={scene.id}>
                <a
                  href={`#${scene.id}`}
                  title={scene.title}
                  aria-label={`Scene ${index + 1}: ${scene.title}`}
                  aria-current={index === current ? "true" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    jump(index, event.clientX, event.clientY);
                  }}
                  className="block size-[.55rem] rounded-full bg-white/20 transition hover:scale-150 aria-[current=true]:scale-[1.4] aria-[current=true]:bg-brand"
                >
                  <span className="sr-only">{scene.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span
          aria-hidden="true"
          className="pointer-events-auto whitespace-nowrap max-[980px]:hidden"
        >
          <kbd>←</kbd> <kbd>→</kbd> navigate · <kbd>F</kbd> fullscreen
        </span>
      </header>
      <main id="main">{children}</main>
      {splashing && <Splash onFinish={finishSplash} />}
      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
    </DeckContext.Provider>
  );
}

function Progress({ ref }: { ref: RefObject<HTMLElement | null> }) {
  return (
    <div data-chrome aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px]">
      <i
        ref={ref as RefObject<HTMLElement>}
        className="block h-full origin-left scale-x-[var(--p,0)] bg-brand"
      />
    </div>
  );
}
