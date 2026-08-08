# CLIPIN implementation

The `src/clipin` application is a dedicated CLIPIN workspace layer built on the existing React/Vite application foundation.

## Product capabilities

The workspace includes:

- Center stage facial tracking
- One-click animated subtitles
- Unlimited high-quality 1080p exports
- Vertical, square, and horizontal aspect ratios
- Advanced editing and cropping
- Brand presets with logos and overlays

## Dedicated tool pages

- `/app/clipmaker` — Short clip maker
- `/app/ideate` — Unlimited video ideas
- `/app/script/write` — Script writer
- `/app/script/outline` — Script outline
- `/app/script/rewrite` — Rewrite script of any video
- `/app/optimise/title` — Video title
- `/app/optimise/description` — Video description
- `/app/optimise/chapters` — Video chapters
- `/app/optimise/tags` — Video tags
- `/app/hooks` — Hook generator
- `/app/monetise` — Earnings calculator
- `/app/deals` — Brand deal estimator
- `/app/schedule` — Publishing hub
- `/app/history` — History
- `/app/analytics` — Analytics
- `/app/more` — Account/tools

## Reference implementation

The functional patterns were adapted from the existing Popcornopolis React application rather than copied as product content. The source application uses React Router, route-aware loading, Context state, local storage, Tailwind, and reusable interaction CSS. The CLIPIN layer intentionally uses its own content and information architecture.
