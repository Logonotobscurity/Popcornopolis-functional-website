# CLIPIN Design System

This document defines the CLIPIN implementation layer derived from the audited visual system. The Popcornopolis repository is used as a functional reference only: routing, loading, state/context, hover transitions, progress patterns, and interaction conventions are adapted; Popcornopolis content and commerce information architecture are not carried into CLIPIN.

## 1. Design principles

- Preserve CLIPIN information architecture and content.
- Use the audited numerical tokens as the canonical visual system.
- Do not reproduce Popcornopolis page content, product taxonomy, or branding.
- Keep interaction behavior reusable and framework-level.
- Prefer CSS/Tailwind tokens over one-off values.
- Desktop target: 1180px content width with 30px outer gutter.
- Responsive layouts must collapse naturally below 768px.

## 2. Color tokens

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#FAF1EB` | application background |
| `--color-primary` | `#613223` | primary text/actions |
| `--color-accent` | `#FED455` | CTA/highlight/active indicator |
| `--color-blue` | `#84C4EC` | secondary information accent |
| `--color-red` | `#E22733` | error/destructive/progress state |
| `--color-orange` | `#E7730D` | secondary emphasis |
| `--color-white` | `#FFFFFF` | surfaces/contrast |
| `--color-ink` | `#412015` | dark control borders |
| `--color-soft` | `#F8EBE2` | secondary surface |

## 3. Typography

- `Faro`: display and primary editorial headings.
- `Turbinado`: expressive accent/display moments.
- `Sofia Pro`: labels, navigation, controls, inputs and supporting UI.

Recommended scale:

```text
Display: 64px / 1.0
H1:      48px / 1.05
H2:      36px / 1.1
H3:      28px / 1.15
Body:    16px / 1.5
Small:   14px / 1.4
Label:   12px / 1.2
```

## 4. Layout tokens

```css
--container-max: 1180px;
--page-gutter: 30px;
--section-gap: 64px;
--grid-gap: 24px;
--card-radius: 25px;
--pill-radius: 9999px;
--organic-radius: 120px;
```

## 5. Component geometry

### Buttons

- Primary CTA: accent background, primary text.
- Pill CTA: `9999px` radius.
- Standard button: `12px` vertical / `20px` horizontal minimum padding.
- Hover transition: `0.3s ease`.
- Featured CTA may use the audited yellow halo shadow.

### Cards

```css
border-radius: 25px;
background: #FFFFFF;
```

Featured cards may use:

```css
box-shadow: 0 0 0 10px rgba(254, 212, 85, .22);
```

Secondary highlight:

```css
box-shadow: 0 0 0 5px rgba(254, 212, 85, .22);
```

### Inputs

- Full-width URL/context controls.
- Pill treatment for primary URL input.
- `25px` radius for standard form cards.
- Focus ring uses `--color-accent`.

### Organic media

Use `120px` asymmetric corner treatment only for hero/featured media. It is not a universal card radius.

## 6. CLIPIN page shell

```text
AppShell
├── Header
├── MainContainer
│   └── PageContent
└── BottomNavigation (mobile)
```

Main container:

```css
width: min(calc(100% - 60px), 1180px);
margin-inline: auto;
```

## 7. Component tree

```text
src/
├── app/
│   ├── App.jsx
│   ├── router.jsx
│   └── layouts/
│       ├── AppLayout.jsx
│       └── AuthLayout.jsx
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── BottomNav.jsx
│   │   └── PageContainer.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   ├── Textarea.jsx
│   │   ├── Card.jsx
│   │   ├── Pill.jsx
│   │   ├── Modal.jsx
│   │   ├── Progress.jsx
│   │   └── Loader.jsx
│   ├── clipmaker/
│   │   ├── ClipMakerForm.jsx
│   │   ├── ClipResults.jsx
│   │   ├── ClipCard.jsx
│   │   ├── ClipDetail.jsx
│   │   └── ManualTrim.jsx
│   ├── hub/
│   │   ├── ToolHub.jsx
│   │   ├── ToolSection.jsx
│   │   └── RecentHistory.jsx
│   ├── scripting/
│   │   └── ScriptTool.jsx
│   ├── ideation/
│   │   ├── VideoIdeas.jsx
│   │   └── HookGenerator.jsx
│   ├── optimise/
│   │   ├── TitleGenerator.jsx
│   │   ├── DescriptionGenerator.jsx
│   │   ├── ChaptersGenerator.jsx
│   │   └── TagsGenerator.jsx
│   ├── monetise/
│   │   ├── EarningsCalculator.jsx
│   │   └── BrandDealEstimator.jsx
│   └── schedule/
│       ├── PublishingHub.jsx
│       └── ScheduledItem.jsx
├── context/
│   └── ClipinContext.jsx
├── hooks/
│   ├── useRouteLoading.js
│   ├── useLocalStorage.js
│   └── useClipin.js
├── lib/
│   ├── api.js
│   ├── animations.js
│   └── formatters.js
├── styles/
│   ├── tokens.css
│   └── globals.css
└── main.jsx
```

## 8. Routes

```text
/onboarding
/login
/signup
/
/app/clipmaker
/app/clipmaker/results
/app/ideate
/app/hooks
/app/script/write
/app/script/outline
/app/script/rewrite
/app/optimise/title
/app/optimise/description
/app/optimise/chapters
/app/optimise/tags
/app/monetise
/app/deals
/app/schedule
/app/history
/app/analytics
/app/more
```

## 9. Functional behavior adapted from the reference repository

The reference application uses React Router, a route-aware loading layer, Context state, localStorage-backed state, and small CSS transition utilities. These patterns are retained conceptually for CLIPIN.

### Route loading

On location change:

1. Set loading state.
2. Scroll viewport to top.
3. Release loading state after the transition window.
4. Render the active route.

CLIPIN should use the existing reference behavior as a starting point, but replace its 800ms hard-coded delay with a tokenized value.

### Persistent state

Use a CLIPIN context with:

```js
{
  user,
  session,
  clips,
  history,
  scheduledItems,
  credits,
  creditsTotal,
  setUser,
  setSession,
  setClips,
  setHistory,
  setScheduledItems
}
```

Persist only safe client state in localStorage. Authentication tokens should not be treated as ordinary UI state.

### Interaction primitives

Adapt the reference repository's:

- route-aware loading
- hover reveal
- underline expansion
- directional icon movement
- image hover scale
- progress indicators
- custom checkbox/radio visuals
- transition timing

Do not carry over shopping/cart behavior.

## 10. Motion tokens

```css
--motion-fast: 0.2s;
--motion-default: 0.3s;
--motion-slow: 0.4s;
--motion-ease: ease;
```

Respect `prefers-reduced-motion`.

## 11. Accessibility

- Every input has a visible or programmatically associated label.
- Keyboard focus must remain visible.
- Buttons use semantic `<button>` elements.
- Navigation uses semantic links.
- Loading state exposes `aria-busy`.
- Errors are announced through an appropriate live region.
- Do not depend on color alone for status.

## 12. Tailwind mapping

```js
colors: {
  cream: '#FAF1EB',
  brown: '#613223',
  yellow: '#FED455',
  blue: '#84C4EC',
  red: '#E22733',
  orange: '#E7730D',
  ink: '#412015',
  soft: '#F8EBE2',
},
maxWidth: {
  content: '1180px',
},
spacing: {
  gutter: '30px',
  section: '64px',
},
borderRadius: {
  card: '25px',
  organic: '120px',
  pill: '9999px',
},
boxShadow: {
  halo: '0 0 0 10px rgba(254, 212, 85, .22)',
  haloSm: '0 0 0 5px rgba(254, 212, 85, .22)',
},
transitionDuration: {
  DEFAULT: '300ms',
},
```

## 13. Implementation rule

Build CLIPIN as a new product layer. The Popcornopolis repository is a functional/reference source, not a content template. Existing source behavior should be selectively adapted rather than copied wholesale.
