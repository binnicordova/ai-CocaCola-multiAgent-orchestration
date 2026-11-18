"use client";

import { useEffect } from "react";
import { cssVars } from "../ui/styles";

const LOG = [
  { text: "# FA-4889 · one Jira ticket comes in", tone: "" },
  { text: "✓ Delivery Analyst   reads the ticket, plans", tone: "ok" },
  { text: "✓ Mobile Engineer    builds, opens the PR", tone: "ok" },
  { text: "✓ Cloud Engineer     reads CloudWatch", tone: "ok" },
  { text: "✓ Code Reviewer      reviews every PR", tone: "ok" },
  { text: "✓ QA Engineer        attaches the evidence", tone: "ok" },
  { text: "→ Binni              approves and merges", tone: "human" },
] as const;

const FALLBACK_MS = 5000;

interface SplashProps {
  readonly onFinish: () => void;
}

/** Intro: step into the workspace. Click, any key or the end of the animation finishes it. */
export function Splash({ onFinish }: SplashProps) {
  useEffect(() => {
    window.addEventListener("keydown", onFinish);
    const timer = window.setTimeout(onFinish, FALLBACK_MS);
    return () => {
      window.removeEventListener("keydown", onFinish);
      window.clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: decorative intro, keyboard skip is global
    // biome-ignore lint/a11y/useKeyWithClickEvents: any key skips, handled on window
    <div
      className="splash"
      aria-hidden="true"
      onClick={onFinish}
      onAnimationEnd={(event) => {
        if (event.animationName === "splash-out") onFinish();
      }}
    >
      <div className="splash-win">
        <div className="splash-bar">
          <i />
          <i />
          <i />
        </div>
        <pre className="splash-log">
          {LOG.map((line, order) => (
            <span key={line.text} className={line.tone} style={cssVars({ "--n": order })}>
              {line.text}
            </span>
          ))}
        </pre>
      </div>
      <span className="splash-hint">Click or press any key to skip</span>
    </div>
  );
}
