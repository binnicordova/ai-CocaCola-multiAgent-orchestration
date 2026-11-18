import type { Metadata, Viewport } from "next";
import { getTalk } from "@/modules/talk/composition";
import "./globals.css";

const talk = getTalk.execute();

export const metadata: Metadata = {
  title: `Ever watched five S1 tickets land at once? · ${talk.title} · ${talk.presenter.name}`,
  description: talk.description,
  // Internal talk with real names and ticket IDs: keep it out of search engines.
  robots: { index: false, follow: false },
  icons: { icon: "data:," },
};

export const viewport: Viewport = { themeColor: "#0a0a0b" };

// Marks the document as scripted and decides, before first paint, whether the intro plays.
const BOOT_SCRIPT = `(function(d){d.classList.add('js');try{if(!sessionStorage.getItem('splash')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('splash-on')}catch(e){}})(document.documentElement)`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static boot script, no user input */}
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
