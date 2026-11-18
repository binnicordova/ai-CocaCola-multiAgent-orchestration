# Multi-Agent AI Development: keynote site

Internal Coca-Cola Andina talk by Binni Cordova. Next.js (App Router) · TypeScript strict · Tailwind v4 · Biome · Vitest.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run check    # typecheck + biome + tests
npm run build && npm start
```

Keys: ←/→ navigate, F fullscreen. The intro plays once per session.

## Layout (DDD)

```
src/app/                      routing only (layout, page, css)
src/modules/talk/
  domain/                     Talk aggregate, Metric, Evidence, Source, Scene (pure)
  application/                GetTalk use case, navigation, text helpers
  infrastructure/             static content + TalkRepository implementation
  presentation/               deck shell, UI primitives, one component per scene
  composition.ts              composition root
```

## Note

Contains real names and ticket IDs and is `noindex`. Keep it internal; do not host publicly.
