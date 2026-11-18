"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { Scene as SceneData } from "../../domain/scene";
import { useDeck } from "../deck/deck-context";
import { cn } from "./styles";
import { Eyebrow } from "./typography";

const SceneEnteredContext = createContext(false);

/** True once the scene has scrolled into view: headings and reveals start from here. */
export const useSceneEntered = () => useContext(SceneEnteredContext);

interface SceneProps {
  readonly scene: SceneData;
  readonly variant?: "default" | "hero" | "finale";
  /** The finale reveals its own eyebrow. */
  readonly showEyebrow?: boolean;
  readonly children: React.ReactNode;
}

const VARIANT_BACKGROUND = {
  default: "",
  hero: "bg-[radial-gradient(60%_50%_at_80%_10%,rgb(232_33_46/.22),transparent_70%)]",
  finale: "bg-[radial-gradient(55%_45%_at_15%_90%,rgb(232_33_46/.2),transparent_70%)]",
} as const;

export function Scene({ scene, variant = "default", showEyebrow = true, children }: SceneProps) {
  const { ready } = useDeck();
  const ref = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!ready || entered || !element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ready, entered]);

  return (
    <section
      ref={ref}
      id={scene.id}
      data-variant={variant}
      data-in={entered ? "" : undefined}
      className={cn(
        "group/scene relative flex min-h-dvh flex-col border-t border-line px-[clamp(1.1rem,4vw,3.5rem)] pt-[clamp(4.2rem,9vh,6.5rem)] pb-[clamp(1rem,3.5vh,2.5rem)] first:border-t-0 lg:h-dvh lg:snap-start lg:overflow-hidden",
        VARIANT_BACKGROUND[variant],
      )}
    >
      <SceneEnteredContext.Provider value={entered}>
        <div className="mx-auto flex min-h-0 w-full max-w-[1400px] flex-1 flex-col">
          {showEyebrow && <Eyebrow>{scene.eyebrow}</Eyebrow>}
          {children}
        </div>
      </SceneEnteredContext.Provider>
    </section>
  );
}
