# Plan 005: Search engines can pair each English page with its Japanese twin and find every page

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 149b340..HEAD -- vite.config.ts "src/routes/[lang=lang]/+layout.svelte" src/routes/sitemap.xml static/robots.txt`
> Plan 002 adds an `$effect` to `src/routes/[lang=lang]/+layout.svelte`; that change is expected. Any other difference from the excerpts below is a STOP condition.

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P2 | S | LOW | plans/002-language-switch-sync.md (same layout file) | bug (SEO) | commit `149b340`, 2026-10-21 |

## Why this matters

The site (https://oekazuma.github.io/ui-component-lab/) is a bilingual field guide: 45 components × 2 languages = 90 detail pages, plus `/en/` and `/ja/` index pages. People mostly arrive by searching for a component name. Today the built HTML has no `<link rel="alternate" hreflang>`, no canonical link and no sitemap. Search engines can't tell that `/en/components/tabs/` and `/ja/components/tabs/` are translations of each other, so they may show the wrong language or treat the pages as near-duplicates. `static/robots.txt` is published at `/ui-component-lab/robots.txt`, but crawlers only read `/robots.txt` at the host root (`oekazuma.github.io/robots.txt`), which this repo does not control. The file does nothing and suggests otherwise.

## Current state

- `vite.config.ts` (whole file):
  ```ts
  import adapter from '@sveltejs/adapter-static';
  import { sveltekit } from '@sveltejs/kit/vite';
  import { defineConfig } from 'vite';

  export default defineConfig({
  	plugins: [
  		sveltekit({
  			compilerOptions: { ... },
  			adapter: adapter(),
  			paths: {
  				// GitHub Pages のプロジェクトサイト（https://oekazuma.github.io/ui-component-lab/）
  				base: '/ui-component-lab',
  				// 404.html は任意の階層の URL で返されるため、相対パスだと _app/ を解決できない
  				relative: false
  			}
  		})
  	]
  });
  ```
  SvelteKit 3.1 supports `paths.origin` ("since 3.0"). Its type doc says: *"This is also used as the value of `url.origin` during prerendering (when unset, it defaults to `http://sveltekit-prerender`)"*. Setting it makes `page.url.origin` and `event.url.origin` the real origin at build time.
- `src/routes/[lang=lang]/+layout.svelte`: the script computes
  ```ts
  	let other = $derived(params.lang === 'en' ? 'ja' : 'en');
  	// 同じページの別言語版。pathname は base を含むのでそのまま使える
  	let otherHref = $derived(page.url.pathname.replace(`/${params.lang}/`, `/${other}/`));
  ```
  (After plan 002 there is also an `$effect` setting `document.documentElement.lang`.) The markup has no `<svelte:head>` today. `page` is imported from `$app/state`.
- `src/lib/paths.ts`, the existing path helpers. Reuse them; don't hand-build paths:
  ```ts
  import { resolve } from '$app/paths';
  import type { Lang } from './types';

  // resolve() は末尾スラッシュを付けないため、trailingSlash: 'always' の正規 URL に揃える
  export const homePath = (lang: Lang) => `${resolve('/[lang=lang]', { lang })}/`;

  export const componentPath = (lang: Lang, id: string) =>
  	`${resolve('/[lang=lang]/components/[id]', { lang, id })}/`;
  ```
  In SvelteKit 3, `base` is **not** exported from `$app/paths`; use `resolve('/')` for the site root.
- `src/lib/registry.ts` exports `entries` (array of `{ data, demo }`, `data.id` is the component id). `src/lib/types.ts` exports `langs = ['en', 'ja'] as const`.
- `src/routes/+layout.ts`: `export const prerender = true; export const trailingSlash = 'always';`. Layout options do not apply to `+server.ts` endpoints, so the endpoint must export its own `prerender`.
- Precedent for a non-trailing-slash file: `src/routes/404/+page.ts` exports `trailingSlash = 'never'` so the output is `404.html`.
- `static/robots.txt`: three lines, allow-all. Published at `/ui-component-lab/robots.txt`.
- The root page `src/routes/+page.svelte` redirects by browser language to `/en/` or `/ja/`. It is the natural `x-default`.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install (fresh worktree only) | `pnpm install --frozen-lockfile` | exit 0 |
| Checks | `pnpm check` | exit 0, 0 errors and 0 warnings, `ok` lines |
| Build | `pnpm build` | exit 0, `✔ done` |

If `pnpm` on PATH fails with a vite-plus "Failed to resolve package manager" error, use `/Users/oe.kazuma/Library/pnpm/bin/pnpm`.

## Scope

**In scope**:
- `vite.config.ts` (add `origin` to `paths`)
- `src/routes/[lang=lang]/+layout.svelte` (add `<svelte:head>` and the derived values it needs)
- `src/routes/sitemap.xml/+server.ts` (create)
- `static/robots.txt` (delete)

**Out of scope** (do NOT touch):
- `src/routes/+page.svelte` and `src/routes/404/*`: no alternates there.
- The language switch link and the `$effect` from plan 002.
- Titles and descriptions (`<title>` is set per page already).

## Git workflow

- Branch: `advisor/005-seo-hreflang-sitemap`
- One commit, imperative subject + bullet body (see `git log`), e.g. `Add hreflang alternates, canonical links and a sitemap`.
- Do NOT push or open a PR.

## Steps

### Step 1: Set the production origin

In `vite.config.ts`, inside `paths`, add (keep the existing comments):

```ts
				// prerender 時の url.origin。hreflang・canonical・sitemap は絶対 URL が必要
				origin: 'https://oekazuma.github.io',
```

**Verify**: `pnpm check` → exit 0.

### Step 2: Emit alternates and canonical in the language layout

In `src/routes/[lang=lang]/+layout.svelte`:

1. Import `resolve` from `$app/paths` and `langs` from `#lib/types.js` (match the existing `#lib/...js` import style).
2. Add derived values. The path for language `l` is the current pathname with `/${params.lang}/` replaced by `/${l}/`, which is the same trick `otherHref` uses:
   ```ts
   	// 検索エンジンに英日の対応を伝える。絶対 URL が必要なので prerender 時の origin（vite.config.ts の paths.origin）を使う
   	let hrefIn = $derived((l: string) => page.url.origin + page.url.pathname.replace(`/${params.lang}/`, `/${l}/`));
   	let root = $derived(`${page.url.origin}${resolve('/')}`.replace(/\/?$/, '/'));
   ```
   (`resolve('/')` may or may not end in `/`; the replace normalizes it to one trailing slash. Simpler equivalent code is fine as long as the Verify output matches.)
3. Add before `<header>`:
   ```svelte
   <svelte:head>
   	<link rel="canonical" href={hrefIn(params.lang)} />
   	{#each langs as l (l)}
   		<link rel="alternate" hreflang={l} href={hrefIn(l)} />
   	{/each}
   	<link rel="alternate" hreflang="x-default" href={root} />
   </svelte:head>
   ```

**Verify**: `pnpm build` → exit 0, then
`grep -o '<link rel="\(canonical\|alternate\)"[^>]*>' build/ja/components/tabs/index.html` prints exactly these four tags (attribute order may differ):
```
<link rel="canonical" href="https://oekazuma.github.io/ui-component-lab/ja/components/tabs/">
<link rel="alternate" hreflang="en" href="https://oekazuma.github.io/ui-component-lab/en/components/tabs/">
<link rel="alternate" hreflang="ja" href="https://oekazuma.github.io/ui-component-lab/ja/components/tabs/">
<link rel="alternate" hreflang="x-default" href="https://oekazuma.github.io/ui-component-lab/">
```
And `grep -c 'sveltekit-prerender' build/en/index.html` → `0`.

### Step 3: Prerender a sitemap

Create `src/routes/sitemap.xml/+server.ts`:

```ts
import { componentPath, homePath } from '#lib/paths.js';
import { entries } from '#lib/registry.js';
import { langs } from '#lib/types.js';
import type { RequestHandler } from './$types';

export const prerender = true;

// GitHub Pages ではホスト直下の robots.txt を置けないため、この sitemap は Search Console から登録する
export const GET: RequestHandler = ({ url }) => {
	const paths = langs.flatMap((lang) => [
		homePath(lang),
		...entries.map(({ data }) => componentPath(lang, data.id))
	]);
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `<url><loc>${url.origin}${p}</loc></url>`).join('\n')}
</urlset>
`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
```

**Verify**: `pnpm build` → exit 0; `ls build/sitemap.xml` exists; `grep -c '<loc>' build/sitemap.xml` → `92`; `grep -c 'https://oekazuma.github.io/ui-component-lab/ja/components/tabs/' build/sitemap.xml` → `1`.

If the build fails because of the root `trailingSlash = 'always'`, or writes `build/sitemap.xml/index.html` instead of `build/sitemap.xml`, add `export const trailingSlash = 'never';` to the endpoint (same idea as `src/routes/404/+page.ts`) and rebuild. If that is rejected too, STOP.

### Step 4: Remove the inert robots.txt

`git rm static/robots.txt`.

**Verify**: `pnpm build` → exit 0; `ls build/robots.txt` → "No such file".

## Test plan

- The grep checks in Steps 2–3 are the tests. Plan 008 (Playwright) may later assert the alternates on one page.

## Done criteria

- [ ] `pnpm check` exits 0; `pnpm build` exits 0
- [ ] Step 2 grep prints the 4 expected tags for `build/ja/components/tabs/index.html`
- [ ] `grep -c '<loc>' build/sitemap.xml` → `92`
- [ ] `static/robots.txt` deleted
- [ ] Modified files ⊆ in-scope list
- [ ] `plans/README.md` status row updated (unless your reviewer maintains it)

## STOP conditions

- `paths.origin` is rejected by the config validation (would mean the installed Kit differs from 3.1).
- `page.url.origin` in the prerendered HTML is still `http://sveltekit-prerender` after Step 1.
- The sitemap cannot be emitted as `build/sitemap.xml` even with `trailingSlash = 'never'`.
- The layout file differs from the excerpt in ways other than plan 002's `$effect`.

## Maintenance notes

- After deploy, the maintainer should submit `https://oekazuma.github.io/ui-component-lab/sitemap.xml` in Google Search Console. robots.txt cannot point to it on a project sub-path.
- `paths.origin` is also SvelteKit's trusted origin for CSRF checks on form posts. The site has no forms, so this is harmless. Revisit it if the site ever moves to a custom domain.
- New top-level sections outside `[lang=lang]` need their own alternates.
