"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { LightboxItem } from "./deck-context";

interface LightboxProps {
  readonly item: LightboxItem | null;
  readonly onClose: () => void;
}

export function Lightbox({ item, onClose }: LightboxProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (item && !element.open) element.showModal();
    if (!item && element.open) element.close();
  }, [item]);

  return (
    <dialog
      ref={dialog}
      aria-label="Image viewer"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
      className="m-auto max-h-[94vh] max-w-[96vw] bg-transparent p-0 text-ink backdrop:bg-black/90"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="fixed top-2 right-4 cursor-pointer border-0 bg-transparent px-3 py-1 text-[2.4rem] leading-none text-white"
      >
        ×
      </button>
      {item && (
        <>
          <Image
            src={item.src}
            alt={item.alt}
            width={1800}
            height={1100}
            sizes="96vw"
            quality={90}
            className="mx-auto h-auto max-h-[84vh] w-auto max-w-[96vw] rounded-[10px]"
          />
          <p className="mt-3 text-center text-sm text-mute">{item.caption}</p>
        </>
      )}
    </dialog>
  );
}
