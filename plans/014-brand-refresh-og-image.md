# Plan 014: New flask logo, new tagline, and an OG image

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat d1179e2..HEAD -- src/lib/assets src/lib/i18n.ts README.md CLAUDE.md src/routes/+layout.ts static src/lib/components/number-input/data.ts`
> Any change is a STOP condition.

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P2 | S | LOW | plans/013-svelte-meta-tags.md (stack on branch `advisor/013-svelte-meta-tags` @ `d1179e2`) | direction (maintainer request) | commit `d1179e2`, 2026-10-21 |

## Why this matters

The maintainer refreshed the brand together with the OG image:

- Logo — a lab flask (the site is a "Lab") with a UI toggle switch inside, replacing the plain toggle.
- Tagline — the maintainer does not want the word 「図鑑」 (field guide). The new copy is a question to the reader.
- OG image — a 1200×630 card with the logo, name and tagline. Shared links then show a large preview (`summary_large_image`).

The maintainer approved all three as drafts. The image and the SVG are ready-made files. Copy them, don't redraw them.

## Current state

- Ready-made assets (read-only; copy them):
  - `/Users/oe.kazuma/localRepo/oss/ui-component-lab/.claude/worktrees/improve-deep-863007/plans/assets/og.png`: 1200×630 PNG, about 43 KB, approved.
  - `/Users/oe.kazuma/localRepo/oss/ui-component-lab/.claude/worktrees/improve-deep-863007/plans/assets/make-og.mjs`: the script that rendered it with `@resvg/resvg-js` and macOS Hiragino fonts. For reference only. **Do not add it or resvg to the repo.**
- `src/lib/assets/logo.svg` today (the old toggle logo). It is used as the favicon (`src/routes/+layout.svelte`), in the header (`src/routes/[lang=lang]/+layout.svelte`), and in `README.md` (`<img src="src/lib/assets/logo.svg" …>`):
  ```svg
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="UI Component Lab">
  	<rect width="64" height="64" rx="14" fill="#1f5fd1"/>
  	<rect x="10" y="21" width="44" height="22" rx="11" fill="#fff"/>
  	<circle cx="43" cy="32" r="7.5" fill="#1f5fd1"/>
  </svg>
  ```
- Old tagline / 「図鑑」 occurrences (all must change):
  - `src/lib/i18n.ts:7` `tagline: 'A field guide to UI components: names, looks, and behavior you can try in place.',`
  - `src/lib/i18n.ts:38` `tagline: 'UIコンポーネントの名前・見た目・挙動を、その場で触って確かめられる図鑑です。',`
  - `README.md:7` `<p align="center">A field guide to UI components. Learn their names and try how they behave, right on the page.<br>English and Japanese.</p>`
  - `CLAUDE.md:3` begins `UI コンポーネントの名前と挙動を英日で引ける図鑑。`
  - `src/lib/components/number-input/data.ts:62` (ja) contains `この図鑑の Stepper は`
- `tagline` feeds the home page `<p class="tagline">` and its meta description. Plan 013 made it `definePageMetaTags({ … description: t(params.lang).tagline })` in `src/routes/[lang=lang]/+page.ts`.
- `src/routes/+layout.ts` after plan 013:
  ```ts
  export const load = () =>
  	defineBaseMetaTags({
  		titleTemplate: `%s | ${siteName}`,
  		openGraph: { type: 'website', siteName },
  		twitter: { cardType: 'summary' }
  	});
  ```
  (plus the `prerender` / `trailingSlash` exports and imports). `vite.config.ts` sets `paths.origin: 'https://oekazuma.github.io'`, so `url.origin` in a load is the real origin at prerender. `asset()` from `$app/paths` returns a base-prefixed path for files in `static/` (e.g. `/ui-component-lab/og.png`).
- svelte-meta-tags `openGraph.images` is `{ url, width?, height?, alt?, type?, secureUrl? }[]`. `twitter.image` / `twitter.imageAlt` are separate fields and do **not** fall back to the OG image, so set both.
- English strings in data and i18n use the typographic apostrophe `’`.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install (fresh worktree only) | `pnpm install --frozen-lockfile` | exit 0 |
| Checks | `pnpm check` | exit 0, 0 errors / 0 warnings, three `ok` lines |
| Build | `pnpm build` | exit 0, `✔ done` |

If `pnpm` on PATH fails with a vite-plus "Failed to resolve package manager" error, use `/Users/oe.kazuma/Library/pnpm/bin/pnpm` (with `--store-dir "$TMPDIR/pnpm10-store/v10"` for install). Do not run `pnpm test:e2e` inside the Claude sandbox; Chromium can't launch there.

## Scope

**In scope**: `src/lib/assets/logo.svg`, `static/og.png` (create), `src/routes/+layout.ts`, `src/lib/i18n.ts` (the two `tagline` values), `README.md` (line 7), `CLAUDE.md` (line 3), `src/lib/components/number-input/data.ts` (line 62, ja only).

**Out of scope**: any other copy, colors and tokens, page layouts, the OG generation script.

## Git workflow

- Branch: `advisor/014-brand-refresh` created from `advisor/013-svelte-meta-tags` (`d1179e2`).
- One commit, e.g. `Refresh logo and tagline, add an OG image`.
- Do NOT push.

## Steps

### Step 1: Logo

Replace `src/lib/assets/logo.svg` with exactly this (tabs; keep `role` and `aria-label`):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="UI Component Lab">
	<rect width="64" height="64" rx="14" fill="#1f5fd1"/>
	<rect x="23" y="8" width="18" height="5" rx="2.5" fill="#fff"/>
	<path d="M26 12 H38 V26 L51 47.5 A4.5 4.5 0 0 1 47.1 54 H16.9 A4.5 4.5 0 0 1 13 47.5 L26 26 Z" fill="#fff"/>
	<rect x="20" y="40" width="24" height="10" rx="5" fill="#1f5fd1"/>
	<circle cx="39" cy="45" r="3.4" fill="#fff"/>
</svg>
```

This is the same drawing as `plans/assets/logo-a.svg`, with the `<g fill>` wrapper flattened into per-shape `fill`.

### Step 2: Tagline and 「図鑑」

- `src/lib/i18n.ts` en: `tagline: 'What’s that UI called? Learn the name and the behavior by trying it.',`
- `src/lib/i18n.ts` ja: `tagline: 'そのUI、なんて名前？ 呼び方と動きを、触って覚えよう。',`
- `README.md:7`: `<p align="center">What’s that UI called? Learn the name and the behavior by trying it.<br>English and Japanese.</p>`
- `CLAUDE.md:3`: replace 「UI コンポーネントの名前と挙動を英日で引ける図鑑。」 with 「UIコンポーネントの名前と動きを、英日で試して確かめられるサイト。」 and keep the rest of the line.
- `number-input/data.ts:62` (ja): 「この図鑑の Stepper は」 → 「このサイトの Stepper は」 (en unchanged; it already says "Here").

**Verify**: `git grep -n '図鑑\|field guide' -- . ':!plans' ':!pnpm-lock.yaml'` → no output.

### Step 3: OG image

1. `cp /Users/oe.kazuma/localRepo/oss/ui-component-lab/.claude/worktrees/improve-deep-863007/plans/assets/og.png static/og.png`
2. `src/routes/+layout.ts`: make `load` take `{ url }`, and add the image:
   ```ts
   import { asset } from '$app/paths';
   …
   // OG 画像は絶対 URL が必要。prerender 時の url.origin は vite.config.ts の paths.origin
   export const load: LayoutLoad = ({ url }) => {
   	const image = new URL(asset('og.png'), url.origin).href;
   	const alt = siteName;
   	return defineBaseMetaTags({
   		titleTemplate: `%s | ${siteName}`,
   		openGraph: { type: 'website', siteName, images: [{ url: image, width: 1200, height: 630, alt }] },
   		twitter: { cardType: 'summary_large_image', image, imageAlt: alt }
   	});
   };
   ```
   (`import type { LayoutLoad } from './$types';`.) If `asset` is not exported by the installed `$app/paths`, STOP.

**Verify**: `pnpm check` → exit 0 with three `ok`. `pnpm build` → exit 0. Then:
- `ls -la build/og.png` → exists, about 43 KB
- `grep -io '<meta [^>]*\(og:image\|twitter:image\|twitter:card\)[^>]*>' build/en/components/tabs/index.html` shows:
  - `og:image` = `https://oekazuma.github.io/ui-component-lab/og.png`
  - `og:image:width` 1200 and `og:image:height` 630
  - `og:image:alt` `UI Component Lab`
  - `twitter:card` = `summary_large_image`
  - `twitter:image` with the same URL
  - `twitter:image:alt`
- `grep -o '<p class="tagline[^>]*>[^<]*' build/ja/index.html` → contains 「そのUI、なんて名前？」
- `grep -c 'aria-label="UI Component Lab"' src/lib/assets/logo.svg` → 1

## Test plan

- Build greps above. The a11y spec (`tests/a11y.spec.ts`) covers the home pages with the new tagline and logo when the maintainer runs `pnpm test:e2e`.

## Done criteria

- [ ] `pnpm check` and `pnpm build` exit 0
- [ ] No 「図鑑」 or "field guide" outside `plans/`
- [ ] OG / Twitter image tags as listed; `build/og.png` exists
- [ ] Modified files ⊆ in-scope list

## STOP conditions

- Drift since `d1179e2` in the in-scope paths.
- `asset` missing from `$app/paths`, or `og:image` renders a relative URL.
- `plans/assets/og.png` is missing or not 1200×630 (`file plans/assets/og.png` should report `1200 x 630`).

## Maintenance notes

- To change the OG image, re-render it with `plans/assets/make-og.mjs`. That needs `@resvg/resvg-js` in a scratch directory and the macOS Hiragino fonts. Keep the copy in sync with `tagline`.
- The tagline appears in four places: i18n (en/ja), README, and the OG image. Change them together.
