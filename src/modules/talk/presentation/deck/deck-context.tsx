"use client";

import { createContext, useContext } from "react";

export interface LightboxItem {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
}

interface DeckApi {
  /** False while the intro splash plays: scenes wait before revealing. */
  readonly ready: boolean;
  readonly openLightbox: (item: LightboxItem) => void;
}

export const DeckContext = createContext<DeckApi | null>(null);

export function useDeck(): DeckApi {
  const api = useContext(DeckContext);
  if (!api) throw new Error("useDeck must be used inside <Deck>");
  return api;
}
