"use client";

import { type RefObject, useCallback, useEffect, useRef, useState } from "react";
import { currentSceneIndex, moveSceneIndex } from "../../application/scene-navigation";
import type { SceneId } from "../../domain/scene";
import { usePrefersReducedMotion } from "./use-reduced-motion";

const READING_LINE = 0.4;

interface Options {
  readonly ids: readonly SceneId[];
  readonly progressRef: RefObject<HTMLElement | null>;
  /** Keyboard navigation is paused while the splash or the lightbox is open. */
  readonly keyboardEnabled: boolean;
}

/** Tracks the current scene and progress, and handles dot clicks and keyboard navigation. */
export function useDeckNavigation({ ids, progressRef, keyboardEnabled }: Options) {
  const reduced = usePrefersReducedMotion();
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => {
      const max = root.scrollHeight - window.innerHeight;
      progressRef.current?.style.setProperty("--p", String(max > 0 ? window.scrollY / max : 0));
      const offsets = ids.map((id) => document.getElementById(id)?.offsetTop ?? 0);
      const index = currentSceneIndex(offsets, window.scrollY + window.innerHeight * READING_LINE);
      currentRef.current = index;
      setCurrent(index);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, progressRef]);

  /** Portal transition: the next scene opens from where you clicked. */
  const jump = useCallback(
    (index: number, x = window.innerWidth / 2, y = window.innerHeight / 2) => {
      const target = document.getElementById(ids[index] ?? "");
      if (!target) return;
      if (reduced || !document.startViewTransition) {
        target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
        return;
      }
      const root = document.documentElement;
      root.style.setProperty("--px", `${x}px`);
      root.style.setProperty("--py", `${y}px`);
      root.style.scrollBehavior = "auto";
      const transition = document.startViewTransition(() =>
        target.scrollIntoView({ behavior: "auto" }),
      );
      transition.finished.finally(() => {
        root.style.scrollBehavior = "";
      });
    },
    [ids, reduced],
  );

  useEffect(() => {
    if (!keyboardEnabled) return;
    const step = (delta: number) => {
      const next = moveSceneIndex(currentRef.current, delta, ids.length);
      if (next !== currentRef.current) jump(next);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const forward = event.key === "ArrowRight" || event.key === "PageDown";
      const back = event.key === "ArrowLeft" || event.key === "PageUp";
      if (forward || (event.key === " " && !event.shiftKey)) {
        event.preventDefault();
        step(1);
      } else if (back || (event.key === " " && event.shiftKey)) {
        event.preventDefault();
        step(-1);
      } else if (event.key === "f" || event.key === "F") {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen?.();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [ids.length, jump, keyboardEnabled]);

  return { current, jump };
}
