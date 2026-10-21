# Plan 012: A "names by design system" index page, backed by normalized alias sources

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat f32e56a..HEAD -- src/lib/components/meter src/lib/components/slider src/lib/components/select src/lib/data.check.ts src/lib/paths.ts "src/routes/[lang=lang]/+page.svelte" src/routes/sitemap.xml tests/a11y.spec.ts`
> Plans 010 and 011 are merged into your base first. They do not touch these paths, so any change here is a STOP condition.

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P2 | M | LOW | plans/010-alert-dialog.md, plans/011-demo-source-view.md (both edit `i18n.ts` / `CLAUDE.md`; run this on top of them) | direction | commit `f32e56a`, 2026-10-21 |

## Why this matters

UI Component Lab (bilingual en/ja) records what other design systems call each component, in `aliases[]` (`{ name, source, url }`). There are 79 aliases across 18 `source` strings. The data answers questions like "what does Carbon or DADS call this?", but only one component page at a time. The maintainer chose to (1) normalize the `source` names and lock them with a check, and (2) add an index page per language that lists, for each design system, its names and the matching component here.

## Current state

- `source` strings at `f32e56a` (count, string):
  ```
  20 デジタル庁デザインシステム   15 Carbon Design System   9 Ant Design   6 React Aria
   3 WAI-ARIA APG   3 MUI   3 Apple Human Interface Guidelines   2 Open UI
   2 GOV.UK Design System   2 Bootstrap   1 Material Design 3   1 HTML
   1 HTML (<meter>)   1 HTML (<input type="range">)   1 Fluent UI React v9
   1 Carbon Design System (custom-styled variant)   1 Atlassian Design System   1 Angular Material
  ```
  The three to normalize:
  - `src/lib/components/meter/data.ts`: `{ name: 'Gauge', source: 'HTML (<meter>)', url: '…/Elements/meter' }` (multi-line object)
  - `src/lib/components/slider/data.ts`: `{ name: 'Range', source: 'HTML (<input type="range">)', url: '…/input/range' }` (multi-line)
  - `src/lib/components/select/data.ts:9`: `{ name: 'Dropdown', source: 'Carbon Design System (custom-styled variant)', url: 'https://carbondesignsystem.com/components/dropdown/usage/' }`
  
  After normalization there are exactly **15** sources.
- `src/lib/data.check.ts`: a Node script (run by `pnpm check`) that loads every `data.ts` and pushes messages into `errors`. It contains a loop that checks URLs are https:
  ```ts
  	for (const url of [...d.sources.map((s) => s.url), ...d.aliases.map((a) => a.url)])
  		if (!url.startsWith('https://')) errors.push(`${d.id}: non-https url ${url}`);
  ```
- `src/lib/paths.ts`:
  ```ts
  import { resolve } from '$app/paths';
  import type { Lang } from './types';

  // resolve() は末尾スラッシュを付けないため、trailingSlash: 'always' の正規 URL に揃える
  export const homePath = (lang: Lang) => `${resolve('/[lang=lang]', { lang })}/`;

  export const componentPath = (lang: Lang, id: string) =>
  	`${resolve('/[lang=lang]/components/[id]', { lang, id })}/`;
  ```
  `resolve` is typed by route id, so the new route must exist before `systemsPath` typechecks.
- Route conventions to copy: `src/routes/[lang=lang]/+page.ts` (whole file):
  ```ts
  import { langs } from '#lib/types.js';
  import type { EntryGenerator } from './$types';

  export const entries: EntryGenerator = () => langs.map((lang) => ({ lang }));
  ```
  Use `src/routes/[lang=lang]/components/[id]/+page.svelte` for page structure: `<svelte:head>` title `X | {siteName}` plus meta description, `<section aria-labelledby>` with `h2`, a `table` with `th scope="col"`, and scoped `<style>` with `var(--color-*)` tokens. `src/lib/registry.ts` exports `entries` (`{ data, demo }[]`, sorted by English name).
- Home page `src/routes/[lang=lang]/+page.svelte` has `<p class="tagline">{ui.tagline}</p>` right before `<search class="filters">`.
- `src/routes/sitemap.xml/+server.ts` builds `paths` as `langs.flatMap((lang) => [homePath(lang), ...entries.map(({ data }) => componentPath(lang, data.id))])`.
- `tests/a11y.spec.ts` loops over `['en/', 'ja/', 'en/components/tabs/', 'ja/components/modal/']`.
- The language switch (`[lang=lang]/+layout.svelte`) swaps `/en/` ↔ `/ja/` in the pathname, and the layout emits hreflang alternates, so a new page under `[lang=lang]` gets both for free.
- `CLAUDE.md` `### data.ts` has the line 「…別名の `source` は `デジタル庁デザインシステム` と書く」.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install (fresh worktree only) | `pnpm install --frozen-lockfile` | exit 0 |
| Checks | `pnpm check` | exit 0, 0 errors / 0 warnings, `ok` lines |
| Build | `pnpm build` | exit 0, `✔ done` |

If `pnpm` on PATH fails with a vite-plus "Failed to resolve package manager" error, use `/Users/oe.kazuma/Library/pnpm/bin/pnpm` (with `--store-dir "$TMPDIR/pnpm10-store/v10"` for install). `pnpm test:e2e` cannot run in the Claude sandbox. Update the spec and leave the run to the maintainer.

## Scope

**In scope**:
- `src/lib/components/{meter,slider,select}/data.ts` (the `source` string only)
- `src/lib/data.check.ts`
- `src/lib/paths.ts`, `src/lib/i18n.ts`
- `src/routes/[lang=lang]/systems/+page.ts`, `+page.svelte` (create)
- `src/routes/[lang=lang]/+page.svelte` (one link)
- `src/routes/sitemap.xml/+server.ts`
- `tests/a11y.spec.ts` (two paths)
- `CLAUDE.md` (one line)

**Out of scope**: adding a `note` field to `aliases` (losing "custom-styled variant" is accepted: Carbon's own Dropdown page explains it), alias names, adding aliases, the header/nav layout.

## Git workflow

- Branch: `advisor/012-design-system-index`, on top of the merged 010 + 011 branches (your dispatcher tells you how).
- Commits: (a) normalize + check, (b) index page + links + sitemap + spec + CLAUDE.md.
- Do NOT push.

## Steps

### Step 1: Normalize the three sources

- meter: `source: 'HTML (<meter>)'` → `source: 'HTML'`
- slider: `source: 'HTML (<input type="range">)'` → `source: 'HTML'`
- select: `source: 'Carbon Design System (custom-styled variant)'` → `source: 'Carbon Design System'`

**Verify**: `git grep -h -o "source: '[^']*'" -- 'src/lib/components/*/data.ts' | sort -u | wc -l` → `15`.

### Step 2: Lock the list in `data.check.ts`

Above the `for (const d of all)` loop, add:

```ts
// 別名の source はこの一覧から選ぶ。表記がそろっていないとデザインシステム別の索引で別物として並ぶ
const designSystems = [
	'デジタル庁デザインシステム',
	'Carbon Design System',
	'Ant Design',
	'React Aria',
	'WAI-ARIA APG',
	'MUI',
	'Apple Human Interface Guidelines',
	'Open UI',
	'GOV.UK Design System',
	'Bootstrap',
	'Material Design 3',
	'HTML',
	'Fluent UI React v9',
	'Atlassian Design System',
	'Angular Material'
];
```

Inside the loop, next to the https check:

```ts
	for (const a of d.aliases)
		if (!designSystems.includes(a.source)) errors.push(`${d.id}: unknown alias source ${a.source}`);
```

**Verify**: `pnpm check` → exit 0. Negative test (do not commit): temporarily set meter's source back to `'HTML (<meter>)'`, run `node src/lib/data.check.ts`, and expect a throw containing `meter: unknown alias source`. Revert with `git checkout -- src/lib/components/meter/data.ts` only if Step 1 was already committed. Otherwise re-apply the Step 1 edit by hand and confirm `git diff src/lib/components/meter/data.ts` shows only the intended change.

Commit (a).

### Step 3: The index page

1. Create `src/routes/[lang=lang]/systems/+page.ts` with the same `entries` generator as `src/routes/[lang=lang]/+page.ts`.
2. `src/lib/paths.ts`: add
   ```ts
   export const systemsPath = (lang: Lang) => `${resolve('/[lang=lang]/systems', { lang })}/`;
   ```
3. `src/lib/i18n.ts`: add these keys to **both** languages.
   - `en`:
     - `systems: 'Names by design system'`
     - `systemsLead: 'What each design system calls the components in this guide. Components with no other known name are not listed.'`
     - `nameInSystem: 'Name in the system'`
     - `componentHere: 'Component in this guide'`
   - `ja`:
     - `systems: 'デザインシステム別の呼び名'`
     - `systemsLead: 'このサイトの部品を、各デザインシステムが何と呼んでいるかの一覧。ほかの呼び名が見つかっていない部品は載せていない。'`
     - `nameInSystem: 'そのシステムでの呼び名'`
     - `componentHere: 'このサイトでの部品'`
4. `src/routes/[lang=lang]/systems/+page.svelte`:
   ```svelte
   <script lang="ts">
   	import { componentPath, homePath } from '#lib/paths.js';
   	import { siteName, t } from '#lib/i18n.js';
   	import { entries } from '#lib/registry.js';
   	import type { PageProps } from './$types';

   	let { params }: PageProps = $props();
   	let lang = $derived(params.lang);
   	let ui = $derived(t(lang));

   	// 別名をデザインシステムごとにまとめる。件数の多い順、同数なら名前順
   	let systems = $derived(
   		Object.entries(
   			Object.groupBy(
   				entries.flatMap(({ data }) => data.aliases.map((alias) => ({ alias, data }))),
   				({ alias }) => alias.source
   			)
   		)
   			.map(([name, rows]) => ({
   				name,
   				rows: rows!.toSorted((a, b) => a.data.names[lang].localeCompare(b.data.names[lang], lang))
   			}))
   			.toSorted((a, b) => b.rows.length - a.rows.length || a.name.localeCompare(b.name))
   	);
   </script>
   ```
   Markup, following the detail page's patterns:
   - `<svelte:head>` with `<title>{ui.systems} | {siteName}</title>` and `<meta name="description" content={ui.systemsLead} />`
   - `<p class="back"><a href={homePath(lang)}>← {ui.backToList}</a></p>`
   - `<h1>{ui.systems}</h1>` and `<p class="lead">{ui.systemsLead}</p>`
   - `{#each systems as s, i (s.name)}` →
     `<section aria-labelledby="sys-{i}"><h2 id="sys-{i}">{s.name}</h2><table>`
     with `<thead><tr><th scope="col">{ui.nameInSystem}</th><th scope="col">{ui.componentHere}</th></tr></thead>`
     and `<tbody>` rows `{#each s.rows as { alias, data } (data.id + alias.name)}<tr><td><a href={alias.url}>{alias.name}</a></td><td><a href={componentPath(lang, data.id)}>{data.names[lang]}</a></td></tr>{/each}`
   - Styles: copy `.back`, `section`, `h2`, `table`, `th, td` from the detail page's `<style>`. Add `.lead { color: var(--color-muted); }`.

   If `Object.groupBy` or `toSorted` cause a type error, check `lib` in the generated tsconfig and STOP. Do not add a polyfill or a helper library.

**Verify**: `pnpm check` → exit 0. `pnpm build` → exit 0. `ls build/en/systems/index.html build/ja/systems/index.html` → both exist. `grep -o '<h2' build/en/systems/index.html | wc -l` → `15` (prerendered HTML may sit on one line, so count matches, not lines).

### Step 4: Link it, list it, test it

- Home page: insert after `<p class="tagline">{ui.tagline}</p>`:
  `<p class="systems-link"><a href={systemsPath(lang)}>{ui.systems}</a></p>` (import `systemsPath` from `#lib/paths.js`). Add the style `.systems-link { margin: -1rem 0 1.5rem; }`. The tagline has `margin: 0 0 1.5rem`, so this keeps the gap even.
- Sitemap: add `systemsPath(lang)` after `homePath(lang)` in the `paths` array.
- `tests/a11y.spec.ts`: add `'en/systems/'` and `'ja/systems/'` to the path list.
- `CLAUDE.md`: in `### data.ts`, change 「別名の `source` は `デジタル庁デザインシステム` と書く」 to 「別名の `source` は `src/lib/data.check.ts` の `designSystems` にある名前から選ぶ（DADS は `デジタル庁デザインシステム`）。新しいデザインシステムを足すときは一覧にも加える」.

**Verify**: `pnpm check` → exit 0; `pnpm build` → exit 0. `grep -c '<loc>' build/sitemap.xml` equals 2 × (the number of directories in `src/lib/components` + 2). Check with `echo $(( 2 * ($(ls src/lib/components | wc -l) + 2) ))`. `grep -c 'systems/' build/en/index.html` → ≥ 1.

Commit (b).

## Test plan

- `data.check.ts` enforces the source list, and the Step 2 negative test proves it.
- `tests/a11y.spec.ts` now scans both index pages, when the maintainer runs `pnpm test:e2e`.

## Done criteria

- [ ] 15 distinct alias sources; `pnpm check` and `pnpm build` exit 0
- [ ] `build/{en,ja}/systems/index.html` exist with 15 `<h2>` each
- [ ] Sitemap `<loc>` count = 2 × (components + 2)
- [ ] Modified files ⊆ in-scope list

## STOP conditions

- Drift in the in-scope paths beyond the merged 010 and 011.
- The source count after Step 1 is not 15, which would mean someone added a source since the plan was written. Report the new strings.
- `Object.groupBy` / `toSorted` are not available in the configured TypeScript `lib`.

## Maintenance notes

- A new design system needs two edits: the alias and the `designSystems` list. The check makes that explicit.
- Eight components have no aliases, and the page's lead sentence says so.
