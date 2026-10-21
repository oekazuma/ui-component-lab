# Plan 013: All head metadata comes from svelte-meta-tags, adding Open Graph and Twitter cards

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat a9a67b2..HEAD -- src/routes src/app.d.ts package.json`
> Any change is a STOP condition.

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P2 | M | LOW | none | direction (maintainer request) | commit `a9a67b2`, 2026-10-21 |

## Why this matters

The maintainer asked to adopt [svelte-meta-tags](https://github.com/oekazuma/svelte-meta-tags), their own library. Today head metadata is hand-written in six places: `<title>` and `description` in each page, and canonical and hreflang in the language layout. There are no Open Graph or Twitter card tags, so links to the site shared on social media or chat show no title or description. After this plan, one `<MetaTags>` in the root layout renders everything. Pages declare only their title and description through the library's recommended `defineBaseMetaTags` / `definePageMetaTags` / `deepMerge` pattern. The 404 page also gets `noindex`.

## Current state

### The library (svelte-meta-tags 5.0.3, read from the published package)

- Peer dependency is `svelte ^5.0.0` (the repo has 5.57). Exports: `MetaTags`, `JsonLd`, `deepMerge`, `defineBaseMetaTags`, `definePageMetaTags`, and types including `MetaTagsProps`.
- `MetaTagsProps` (all optional): `title`, `titleTemplate` (`%s` is replaced by `title`), `robots` (default `'index,follow'`; `false` omits it), `description`, `canonical`, `languageAlternates: { hrefLang, href }[]`, `twitter: { cardType, ... }`, `openGraph: { url, type, title, description, locale, siteName, images, ... }`, `additionalMetaTags`, `additionalLinkTags`, `keywords`.
- Fallbacks inside `MetaTags` (so pages need not repeat values):
  - `og:title` falls back to the templated title.
  - `og:description` falls back to `description`.
  - `og:url` falls back to `canonical`.
  - `twitter:title` / `twitter:description` fall back to the OG values, then to the page values.
  - Twitter tags render only when a `twitter` object is passed.
  - OG tags render only when `openGraph` is passed.
- `defineBaseMetaTags(obj)` returns `{ baseMetaTags }`; `definePageMetaTags(obj)` returns `{ pageMetaTags }`.
- `deepMerge(target, source)` merges objects recursively. `undefined` values in `source` keep the target's value, and arrays are replaced.
- Documented pattern: base tags in `+layout.ts` load, page tags in `+page.ts` load, and in `+layout.svelte`: `const metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags))` then `<MetaTags {...metaTags} />`.

### This repo (at `a9a67b2`)

- `src/routes/+layout.ts`: `export const prerender = true; export const trailingSlash = 'always';` (no load).
- `src/routes/+layout.svelte`: imports `../app.css` and the logo; its `<svelte:head>` only has `<link rel="icon" href={logo} />`; renders `{@render children()}`.
- `src/routes/[lang=lang]/+layout.svelte` (script excerpt):
  ```ts
  	import { homePath } from '#lib/paths.js';
  	import { resolve } from '$app/paths';
  	import { page } from '$app/state';
  	import { siteName, t } from '#lib/i18n.js';
  	import logo from '#lib/assets/logo.svg';
  	import { langs } from '#lib/types.js';
  	...
  	// 検索エンジンに英日の対応を伝える。絶対 URL が必要なので prerender 時の origin（vite.config.ts の paths.origin）を使う
  	let hrefIn = $derived(
  		(l: string) => page.url.origin + page.url.pathname.replace(`/${params.lang}/`, `/${l}/`)
  	);
  	let root = $derived(`${page.url.origin}${resolve('/')}`.replace(/\/?$/, '/'));
  ```
  and markup:
  ```svelte
  <svelte:head>
  	<link rel="canonical" href={hrefIn(params.lang)} />
  	{#each langs as l (l)}
  		<link rel="alternate" hreflang={l} href={hrefIn(l)} />
  	{/each}
  	<link rel="alternate" hreflang="x-default" href={root} />
  </svelte:head>
  ```
  It also has `otherHref` and the `$effect` that sets `document.documentElement.lang`. **Keep both.**
- Page heads to replace:
  | File | Current head |
  |---|---|
  | `src/routes/+page.svelte` (root language chooser) | `<title>{siteName}</title>` |
  | `src/routes/404/+page.svelte` | `<title>404 \| {siteName}</title>` |
  | `src/routes/[lang=lang]/+page.svelte` (home) | `<title>{siteName}</title>` + `<meta name="description" content={ui.tagline} />` |
  | `src/routes/[lang=lang]/components/[id]/+page.svelte` | `<title>{data.names[lang]} \| {siteName}</title>` + description `data.summary[lang]` |
  | `src/routes/[lang=lang]/systems/+page.svelte` | `<title>{ui.systems} \| {siteName}</title>` + description `ui.systemsLead` |
- Existing `+page.ts` files: `src/routes/404/+page.ts` (only `trailingSlash = 'never'`), `src/routes/[lang=lang]/+page.ts` and `systems/+page.ts` (only the `entries` generator), and `components/[id]/+page.ts` (a `load` returning `{ entry, source }`). The root has **no** `+page.ts`.
- `siteName` and `t(lang)` come from `src/lib/i18n.ts` (`t(lang).tagline`, `t(lang).systems`, `t(lang).systemsLead`). `langs` comes from `src/lib/types.ts`.
- `src/app.d.ts` has an empty `namespace App` with commented-out interfaces.
- `vite.config.ts` sets `paths.origin: 'https://oekazuma.github.io'`, so `page.url.origin` is the real origin at prerender.
- Conventions: `CLAUDE.md` (Japanese). Comments are Japanese and explain *why*. `#lib/*.js` imports from routes. All dependencies live in `devDependencies` (static site).

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install (fresh worktree only) | `pnpm install --frozen-lockfile` | exit 0 |
| Add the library | `pnpm add -D svelte-meta-tags@^5.0.3` | exit 0, lockfile updated |
| Checks | `pnpm check` | exit 0, 0 errors / 0 warnings, three `ok` lines |
| Build | `pnpm build` | exit 0, `✔ done` |
| E2E (outside the sandbox only) | `pnpm build && pnpm test:e2e` | all pass |

If `pnpm` on PATH fails with a vite-plus "Failed to resolve package manager" error, use a standalone pnpm binary (one from `which -a pnpm` that is not under `vite-plus`) (with `--store-dir "$TMPDIR/pnpm10-store/v10"` for install and add). Headless Chromium cannot launch inside the Claude sandbox.

## Scope

**In scope**:
- `package.json`, `pnpm-lock.yaml` (via `pnpm add` only)
- `src/app.d.ts`
- `src/routes/+layout.ts`, `src/routes/+layout.svelte`
- `src/routes/+page.ts` (create), `src/routes/+page.svelte`
- `src/routes/404/+page.ts`, `src/routes/404/+page.svelte`
- `src/routes/[lang=lang]/+layout.svelte`
- `src/routes/[lang=lang]/+page.ts`, `+page.svelte`
- `src/routes/[lang=lang]/components/[id]/+page.ts`, `+page.svelte`
- `src/routes/[lang=lang]/systems/+page.ts`, `+page.svelte`
- `CLAUDE.md` (one line)

**Out of scope**: `src/hooks.server.ts` / `app.html` (`<html lang>` handling stays), the sitemap, `JsonLd` (not requested), OG images (the site has no raster image; `summary` cards work without one), page body markup.

## Git workflow

- Branch: `advisor/013-svelte-meta-tags` from `origin/main` (`a9a67b2`).
- Commits: (a) add dependency + base/layout wiring, (b) pages switch to page tags. Imperative subject + bullet body.
- Do NOT push.

## Steps

### Step 1: Install

`pnpm add -D svelte-meta-tags@^5.0.3`.

**Verify**: `node -e "console.log(require('./package.json').devDependencies['svelte-meta-tags'])"` → `^5.0.3` (or a newer 5.x caret). The `git diff pnpm-lock.yaml` adds `svelte-meta-tags` and `schema-dts` and changes no existing version.

### Step 2: Types for page data

In `src/app.d.ts`, replace `// interface PageData {}` with:
```ts
		interface PageData {
			pageMetaTags?: Readonly<import('svelte-meta-tags').MetaTagsProps>;
		}
```

### Step 3: Base tags and the single `<MetaTags>`

`src/routes/+layout.ts`, keep the two exports and add:
```ts
import { defineBaseMetaTags } from 'svelte-meta-tags';
import { siteName } from '#lib/i18n.js';

// 全ページ共通のメタタグ。各ページは +page.ts の definePageMetaTags で title と description だけを渡す
export const load = () =>
	defineBaseMetaTags({
		titleTemplate: `%s | ${siteName}`,
		openGraph: { type: 'website', siteName },
		twitter: { cardType: 'summary' }
	});
```

`src/routes/+layout.svelte`: render one `<MetaTags>`. Language pages add their URL-based tags here: canonical, hreflang alternates, and og:locale. Pages outside `[lang=lang]` (root chooser, 404) have no `params.lang` and get none.
```svelte
<script lang="ts">
	import '../app.css';
	import logo from '#lib/assets/logo.svg';
	import { langs } from '#lib/types.js';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { MetaTags, deepMerge, type MetaTagsProps } from 'svelte-meta-tags';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	// 英日の対応（hreflang）と canonical は URL から決まるので、ページではなくここで足す。
	// 絶対 URL が必要なので prerender 時の origin（vite.config.ts の paths.origin）を使う
	let urlTags = $derived.by((): MetaTagsProps => {
		const lang = page.params.lang;
		if (!lang) return {};
		const hrefIn = (l: string) =>
			page.url.origin + page.url.pathname.replace(`/${lang}/`, `/${l}/`);
		return {
			canonical: hrefIn(lang),
			languageAlternates: [
				...langs.map((l) => ({ hrefLang: l, href: hrefIn(l) })),
				{ hrefLang: 'x-default', href: `${page.url.origin}${resolve('/')}`.replace(/\/?$/, '/') }
			],
			openGraph: { locale: lang === 'ja' ? 'ja_JP' : 'en_US' }
		};
	});
	let metaTags = $derived(deepMerge(deepMerge(data.baseMetaTags, urlTags), page.data.pageMetaTags));
</script>

<svelte:head>
	<link rel="icon" href={logo} />
</svelte:head>

<MetaTags {...metaTags} />

{@render children()}
```
(Adapt only if the types require it; e.g. if `page.params.lang` is not typed on the root layout, read it as `(page.params as { lang?: string }).lang`. Keep the logic as shown.)

`src/routes/[lang=lang]/+layout.svelte`: delete the `<svelte:head>…</svelte:head>` block. Delete `hrefIn`, `root` and their comment. Delete the imports that become unused (`resolve`, `langs`). Keep `otherHref`, the `$effect`, the header and the main.

**Verify**: `pnpm check` → exit 0.

### Step 4: Pages declare title and description

Remove every `<svelte:head>` block listed in the table above. Remove `siteName` imports that become unused. Then add a `load` to each page's `+page.ts`:

| File | Load |
|---|---|
| `src/routes/+page.ts` (create) | `export const load = () => definePageMetaTags({ title: siteName, titleTemplate: '%s' });` |
| `src/routes/404/+page.ts` (keep `trailingSlash`) | `export const load = () => definePageMetaTags({ title: '404', robots: 'noindex' });` |
| `src/routes/[lang=lang]/+page.ts` (keep `entries`) | `export const load: PageLoad = ({ params }) => definePageMetaTags({ title: siteName, titleTemplate: '%s', description: t(params.lang).tagline });` |
| `src/routes/[lang=lang]/systems/+page.ts` (keep `entries`) | `export const load: PageLoad = ({ params }) => definePageMetaTags({ title: t(params.lang).systems, description: t(params.lang).systemsLead });` |
| `src/routes/[lang=lang]/components/[id]/+page.ts` | in the existing `load`, return `{ entry, source, ...definePageMetaTags({ title: entry.data.names[params.lang], description: entry.data.summary[params.lang] }) }` |

The home and root pages set `titleTemplate: '%s'` so their title stays "UI Component Lab", not "UI Component Lab | UI Component Lab". Imports: `definePageMetaTags` from `'svelte-meta-tags'`, `siteName` / `t` from `'#lib/i18n.js'`, and `PageLoad` from `'./$types'`, where a typed load is shown.

**Verify**: `pnpm check` → exit 0. `pnpm build` → exit 0.

### Step 5: Check the rendered heads

Prerendered HTML may be on one line, so count matches with `grep -o … | wc -l`, not `grep -c`. Attribute names may be emitted as `hrefLang`; HTML treats them case-insensitively, so use `grep -io`.

```sh
f=build/ja/components/tabs/index.html
grep -o '<title>[^<]*</title>' $f
grep -io '<meta [^>]*>' $f | grep -i 'og:\|twitter:\|description\|robots'
grep -io '<link rel="canonical"[^>]*>' $f | wc -l
grep -io '<link rel="alternate"[^>]*>' $f
```

Expected for that file:
- exactly one `<title>タブ | UI Component Lab</title>`
- `og:title` with the same text, `og:description` = the tabs ja summary, `og:url` = `https://oekazuma.github.io/ui-component-lab/ja/components/tabs/`, `og:locale` = `ja_JP`, `og:type` = `website`, `og:site_name` = `UI Component Lab`
- `twitter:card` = `summary`, plus `twitter:title` and `twitter:description`
- one `description` meta and `robots` = `index,follow`
- exactly 1 canonical
- 3 alternates: en, ja and x-default (`https://oekazuma.github.io/ui-component-lab/`)

Also check:
- `grep -o '<title>[^<]*</title>' build/en/index.html` → `<title>UI Component Lab</title>`
- `grep -o '<title>[^<]*</title>' build/en/systems/index.html` → `<title>Names by design system | UI Component Lab</title>`
- `grep -io '<meta name="robots"[^>]*>' build/404.html` → content `noindex`
- `grep -o '<title>[^<]*</title>' build/404.html` → `<title>404 | UI Component Lab</title>`
- `grep -io 'rel="canonical"' build/index.html | wc -l` → `0` (the root chooser has no `params.lang`)
- For every built HTML file, the count of `<title>` is 1:
  `for f in $(find build -name '*.html'); do n=$(grep -o '<title>' $f | wc -l | tr -d ' '); [ "$n" = 1 ] || echo "$f $n"; done` → no output

Commit (b). Then add a line to `CLAUDE.md` at the end of the `## コードの約束事` list:
`- \`<title>\` やメタタグは各ページの +page.ts で \`definePageMetaTags\` に title と description を渡す。<svelte:head> には書かない（svelte-meta-tags がルートのレイアウトでまとめて出す）`
(Fold this into commit (b), or make a small commit (c).)

## Test plan

- The greps in Step 5 cover title de-duplication, OG/Twitter output, canonical/hreflang parity with before, and 404 noindex.
- `tests/keyboard.spec.ts` (language switch) and `tests/a11y.spec.ts` still apply. The maintainer runs `pnpm build && pnpm test:e2e` outside the sandbox.

## Done criteria

- [ ] `pnpm check` (three `ok`) and `pnpm build` exit 0
- [ ] `git grep -n '<svelte:head>' -- src/routes` lists only `src/routes/+layout.svelte` (the favicon)
- [ ] Step 5 expectations hold, including one `<title>` per HTML file
- [ ] Modified files ⊆ in-scope list

## STOP conditions

- `pnpm add` changes an existing package's version or needs a peer that isn't satisfied.
- `MetaTags` output differs from the fallbacks described above (e.g. no `og:url` despite `canonical`). Report what was rendered.
- Any page ends up with zero or two `<title>` elements and the cause is not an obvious leftover `<svelte:head>`.

## Maintenance notes

- New pages: add a `load` returning `definePageMetaTags({ title, description })` in their `+page.ts`. Do not write `<svelte:head>`.
- An OG image needs a raster file (e.g. 1200×630 PNG) in `static/` and `openGraph.images` in the base tags. That was deliberately left out.
- Client-side navigation updates the tags through `page.data`. The language switch keeps working as before.
