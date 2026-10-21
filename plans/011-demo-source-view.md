# Plan 011: Each component page can show its demo's source code, without comments

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat f32e56a..HEAD -- "src/routes/[lang=lang]/components/[id]" src/lib/i18n.ts package.json CLAUDE.md tests`
> Any change is a STOP condition.

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P2 | M | LOW | none (plans 001–009 are merged into `main`) | direction | commit `f32e56a`, 2026-10-21 |

## Why this matters

UI Component Lab (bilingual en/ja) promises "learn their names and try how they behave". Each demo is a small, correct WAI-ARIA implementation, which is the most useful part for developers, but readers can't see the code. The maintainer decided:

- Show the source on both language versions.
- Show it **without comments**. Code comments in this repo are Japanese, and they are for maintainers.
- Do **not** delete comments from the files. `CLAUDE.md` requires comments that explain *why*.

So comments are stripped at display time.

## Current state

- `src/routes/[lang=lang]/components/[id]/+page.ts` (whole file):
  ```ts
  import { error } from '@sveltejs/kit';
  import { entries as components, getEntry } from '#lib/registry.js';
  import { langs } from '#lib/types.js';
  import type { EntryGenerator, PageLoad } from './$types';

  export const entries: EntryGenerator = () =>
  	langs.flatMap((lang) => components.map(({ data }) => ({ lang, id: data.id })));

  export const load: PageLoad = ({ params }) => {
  	const entry = getEntry(params.id);
  	if (!entry) error(404);
  	return { entry };
  };
  ```
- `src/routes/[lang=lang]/components/[id]/+page.svelte`: the script has `let { data: page, params }: PageProps = $props();` (`page` is the load data; `data` is the component's `ComponentData`). Right after the header comes:
  ```svelte
  <section aria-labelledby="demo">
  	<h2 id="demo" class="visually-hidden">{ui.demo}</h2>
  	<DemoFrame {demo} {lang} label="{ui.demo}: {data.names[lang]}" />
  </section>
  ```
  Other sections follow the pattern `<section aria-labelledby="x"><h2 id="x">{ui.x}</h2>…</section>`, and the page's `<style>` block styles `section`, `h2`, `kbd` and so on.
- `src/lib/i18n.ts`: `const ui = { en: { ... }, ja: { ... } } satisfies ...`. Every key must exist in **both** languages, since `t(lang).key` is typed from both.
- `package.json` `check` script (exact):
  `"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --fail-on-warnings && node src/lib/search.check.ts && node src/lib/data.check.ts",`
  `pnpm check` fails on any Svelte a11y **warning**.
- Self-check style to copy: `src/lib/search.check.ts`, a plain Node script that throws on failure and prints `ok`. Node 24 strips types natively. Files under `src/lib` that plain Node imports must not use Vite-only features such as `import.meta.glob`.
- Comment shapes in the 45+ `Demo.svelte` files:
  - full-line `// …` in scripts
  - full-line `<!-- … -->`, five of them **spanning several lines** (divider, file-upload, pagination, stepper, textarea)
  - `<!-- svelte-ignore … -->`
  - `/* … */` in styles

  There are **no** trailing `// …` comments after code on the same line. Strings contain URLs such as `'https://…'`, so a naive `//` removal would break them.
- Playwright specs live in `tests/` (`a11y.spec.ts` uses `@axe-core/playwright`; `keyboard.spec.ts` shows the style). They run with `pnpm build && pnpm test:e2e`, which **cannot run inside the Claude sandbox** (Chromium can't launch). Write the spec, typecheck it with `pnpm check`, and leave the run to the maintainer.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install (fresh worktree only) | `pnpm install --frozen-lockfile` | exit 0 |
| Strip check alone | `node src/lib/strip-comments.check.ts` | `ok` |
| Checks | `pnpm check` | exit 0, 0 errors / 0 warnings, three `ok` lines |
| Build | `pnpm build` | exit 0, `✔ done` |

If `pnpm` on PATH fails with a vite-plus "Failed to resolve package manager" error, use `/Users/oe.kazuma/Library/pnpm/bin/pnpm` (with `--store-dir "$TMPDIR/pnpm10-store/v10"` for install).

## Scope

**In scope**:
- `src/lib/strip-comments.ts`, `src/lib/strip-comments.check.ts` (create)
- `src/routes/[lang=lang]/components/[id]/+page.ts`, `+page.svelte`
- `src/lib/i18n.ts` (two keys per language)
- `package.json` (`check` script only)
- `tests/source.spec.ts` (create)
- `CLAUDE.md` (one line at the end of the `### Demo.svelte` section)

**Out of scope**: any `Demo.svelte` (do not delete comments), `registry.ts`, syntax highlighting (plain `<pre>` is enough; adding a highlighter dependency is not wanted).

## Git workflow

- Branch: `advisor/011-demo-source-view` from `origin/main` (`f32e56a`).
- One or two commits, imperative subject + bullet body.
- Do NOT push.

## Steps

### Step 1: The comment stripper and its check

`src/lib/strip-comments.ts`:

```ts
/**
 * 詳細ページで見せるデモのソースから、行全体のコメントを取り除く。
 * コメントは保守用の日本語なので読者には見せない（ファイルからは消さない）。
 * 文字列中の "https://" を壊さないよう、// は行頭のものだけを対象にする
 */
export const stripComments = (src: string) =>
	src
		// (?:(?!-->)[\s\S])* は終わりの記号をまたがない。行の途中に続くコードを次のコメントまで巻き込まないため
		.replace(/^[ \t]*<!--(?:(?!-->)[\s\S])*-->[ \t]*\r?\n/gm, '')
		.replace(/^[ \t]*\/\*(?:(?!\*\/)[\s\S])*\*\/[ \t]*\r?\n/gm, '')
		.replace(/^[ \t]*\/\/.*\r?\n/gm, '')
		.replace(/[ \t]*<!--(?:(?!-->)[\s\S])*-->/g, '')
		.trim() + '\n';
```

Do not "simplify" these to lazy `[\s\S]*?`. With a lazy match, a comment followed by code on the same line makes the full-line rule's match run on to the *next* comment, and it deletes the code in between.

`src/lib/strip-comments.check.ts`, in the same style as `search.check.ts`:

```ts
// コメント除去の最小チェック: node src/lib/strip-comments.check.ts
import { stripComments } from './strip-comments.ts';

const input = [
	'<script lang="ts">',
	'\t// 理由のコメント',
	"\tconst url = 'https://example.com';",
	'</script>',
	'',
	'<!-- 1行のコメント -->',
	'<!-- svelte-ignore a11y_no_static_element_interactions -->',
	'<div>',
	'\t<!-- 複数行の',
	'\t     コメント -->',
	'\t<p>text</p>',
	'</div>',
	'',
	'<style>',
	'\t/* CSS のコメント */',
	'\tp { margin: 0; }',
	'</style>',
	''
].join('\n');

const expected = [
	'<script lang="ts">',
	"\tconst url = 'https://example.com';",
	'</script>',
	'',
	'<div>',
	'\t<p>text</p>',
	'</div>',
	'',
	'<style>',
	'\tp { margin: 0; }',
	'</style>',
	''
].join('\n');

const actual = stripComments(input);
if (actual !== expected) throw new Error(`unexpected output:\n${actual}`);
console.log('ok');
```

Append ` && node src/lib/strip-comments.check.ts` to the end of the `check` script in `package.json`.

**Verify**: `node src/lib/strip-comments.check.ts` → `ok`. If it fails, fix `stripComments` (not the expected text) and report what you changed.

Then sweep the real demos once and confirm no comment survives:

```sh
node --input-type=module -e "import { readdirSync, readFileSync } from 'node:fs'; import { stripComments } from './src/lib/strip-comments.ts'; for (const id of readdirSync('src/lib/components')) { const out = stripComments(readFileSync('src/lib/components/' + id + '/Demo.svelte', 'utf8')); if (/<!--|\/\*|^\s*\/\//m.test(out)) console.log('LEFT', id); } console.log('swept')"
```

Expected: only `swept`. If any `LEFT` line appears, inspect that file. If its comment shape is not covered by the rules above, STOP and report it.

### Step 2: Load the source in the detail route

In `+page.ts`, add the import and a lazy raw glob, and return `source`:

```ts
import { stripComments } from '#lib/strip-comments.js';

// デモのソースはページごとの遅延チャンクにして、一覧ページの読み込みに含めない
const sources = import.meta.glob<string>('/src/lib/components/*/Demo.svelte', {
	query: '?raw',
	import: 'default'
});

export const load: PageLoad = async ({ params }) => {
	const entry = getEntry(params.id);
	if (!entry) error(404);
	const source = stripComments(await sources[`/src/lib/components/${params.id}/Demo.svelte`]());
	return { entry, source };
};
```

**Verify**: `pnpm check` → exit 0.

### Step 3: Show it on the page

`i18n.ts`: add `source: 'Source code'` and `showSource: 'Show Demo.svelte'` to `en`, and `source: 'ソースコード'` and `showSource: 'Demo.svelte を表示'` to `ja`.

`+page.svelte`: insert right after the demo section:

```svelte
<section aria-labelledby="source">
	<h2 id="source">{ui.source}</h2>
	<details>
		<summary>{ui.showSource}</summary>
		<pre><code>{page.source}</code></pre>
	</details>
</section>
```

Style, in the page's `<style>`:
```css
	pre {
		margin: 0.5rem 0 0;
		padding: 0.75rem 1rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-surface);
		font-size: 0.8125rem;
		line-height: 1.5;
		white-space: pre-wrap;
		tab-size: 2;
	}

	summary {
		cursor: pointer;
	}
```

`white-space: pre-wrap` is deliberate. It wraps long lines instead of scrolling them. A scrolling `<pre>` would need `tabindex="0"` for keyboard users (axe `scrollable-region-focusable`), and Svelte warns about a tabindex on a non-interactive element, which fails `pnpm check`.

**Verify**: `pnpm check` → exit 0. `pnpm build` → exit 0. Then:
- `grep -c 'role="tablist"' build/en/components/tabs/index.html` → ≥ 2 (the demo, plus the escaped source shown as `role=&quot;tablist&quot;`, which may not match; if it shows `1`, also run `grep -c 'role=&quot;tablist&quot;' build/en/components/tabs/index.html` → ≥ 1)
- `grep -c '自動アクティベーション' build/en/components/tabs/index.html` → `0` (the Japanese comment in tabs/Demo.svelte is stripped)
- `grep -c 'svelte-ignore' build/en/components/tooltip/index.html` → `0`

### Step 4: E2E spec (write only)

`tests/source.spec.ts`:

```ts
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('source: shows the demo code without comments', async ({ page }) => {
	await page.goto('en/components/tabs/');
	await page.waitForLoadState('networkidle');
	await page.getByText('Show Demo.svelte').click();
	const code = page.locator('details pre');
	await expect(code).toBeVisible();
	await expect(code).toContainText('role="tablist"');
	await expect(code).not.toContainText('自動アクティベーション');

	const { violations } = await new AxeBuilder({ page })
		.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
		.analyze();
	expect(violations.map((v) => v.id)).toEqual([]);
});
```

**Verify**: `pnpm check` → exit 0 (the spec typechecks). Do not try to run `pnpm test:e2e` inside the sandbox.

### Step 5: CLAUDE.md

Add this line at the end of the `### Demo.svelte` list, right after the line that begins with 「デモの挙動を変えたら」:

`- 詳細ページのソース表示では、行全体のコメントが除かれる（\`src/lib/strip-comments.ts\`）。読者に伝えたい説明は data.ts に書く`

**Verify**: `grep -c 'strip-comments' CLAUDE.md` → `1`.

## Test plan

- `strip-comments.check.ts` covers the stripping rules. The Step 1 sweep covers every real demo.
- `tests/source.spec.ts` checks the rendered behavior and a11y, when the maintainer runs it.

## Done criteria

- [ ] `pnpm check` exits 0 with three `ok` lines
- [ ] `pnpm build` exits 0; the Step 3 greps match
- [ ] The Step 1 sweep prints only `swept`
- [ ] No `Demo.svelte` is modified (`git diff --stat` shows none)
- [ ] Modified files ⊆ in-scope list

## STOP conditions

- Drift in the in-scope files.
- A `Demo.svelte` has a comment shape the stripper can't handle safely.
- `pnpm check` reports an a11y warning from the new markup.

## Maintenance notes

- If a demo ever adds a trailing `// …` comment after code, it will be shown. Keep comments on their own line. That is already the repo's style.
- The source chunk loads lazily per detail page. The home page's bundle does not grow.
