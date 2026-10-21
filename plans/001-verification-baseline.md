# Plan 001: `pnpm check` fails on a11y warnings, runs the search self-check, and validates component data

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 149b340..HEAD -- package.json src/lib/search.check.ts src/lib/registry.ts src/lib/types.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P1 | S | LOW | none | tests | commit `149b340`, 2026-10-21 |

## Why this matters

This repo is a bilingual (en/ja) field guide to UI components. Its whole value is that each interactive demo is accessible and that each component's `data.ts` is accurate. Today the only automated gate is `svelte-check` (types), and it does **not** fail on Svelte's a11y compiler warnings. The one existing self-check (`src/lib/search.check.ts`, for Japanese search normalization) is never run by anything. Component data conventions (unique list keys, two-way `related` links, the attribution label required by the Digital Agency Design System (DADS) terms, ISO dates, both languages filled) are not checked anywhere. One of them can crash a page: the detail page renders keyed `{#each}` blocks whose keys come from the data, and Svelte throws `each_key_duplicate` **in production builds too** during hydration. Prerender does not catch it. After this plan, `pnpm check` (already run by CI on every PR) catches all of these.

## Current state

- `package.json:10` — the check script:
  ```json
  "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
  "check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch"
  ```
- `.github/workflows/deploy.yml` runs `pnpm check` then `pnpm build` on every PR and push to `main`. You do not need to touch it.
- `src/lib/search.check.ts` — the existing self-check style to copy (plain Node script, `throw` on failure, prints `ok`):
  ```ts
  // 表記ゆれ正規化の最小チェック: node src/lib/search.check.ts
  import { normalize } from './search.ts';

  for (const [input, expected] of [
  	['ﾓｰﾀﾞﾙ', 'もだる'],
  	...
  ]) {
  	if (normalize(input) !== expected) throw new Error(`${input} -> ${normalize(input)}`);
  }
  console.log('ok');
  ```
  It runs under Node 24's built-in TypeScript type stripping (no flags needed; verified: `node src/lib/search.check.ts` prints `ok`).
- Component data lives in `src/lib/components/<id>/data.ts` (45 directories). Each file is:
  ```ts
  import type { ComponentData } from '#lib/types.js';

  export default {
  	id: 'tabs',
  	...
  } satisfies ComponentData;
  ```
  The only import is `import type`, which type stripping erases, so plain `node` can `import()` these files. (Verified during the audit: a script using `readdirSync` + dynamic `import()` of every `data.ts` ran cleanly under Node 24.)
- `src/lib/types.ts` — the schema. `Text = Record<'en' | 'ja', string>`. Fields: `id`, `category`, `names: Text`, `aliases: {name, source, url}[]`, `summary: Text`, `appearance: Text`, `behavior: Text[]`, `keyboard: {key, action: Text}[]`, `variations?: {name: Text, description: Text}[]`, `usage?: Text[]`, `related?: {id, diff: Text}[]`, `sources: {label, url, checkedAt}[]`.
- `src/lib/registry.ts:5-31` loads data with Vite's `import.meta.glob` and already throws at build time if `id` ≠ directory name, `Demo.svelte` is missing, or a `related` id does not exist. **Do not add checks to `registry.ts`**: it is in the client bundle and runs on every page load. `import.meta.glob` does not exist in plain Node, so the new script must use `readdirSync`.
- The keyed `{#each}` blocks on the detail page `src/routes/[lang=lang]/components/[id]/+page.svelte` use these keys (each must be unique **within one component's array**):
  | Array | Key expression (line) |
  |---|---|
  | `aliases` | `alias.name + alias.source` (47) |
  | `variations` | `v.name.en` (63) |
  | `behavior` | `b.en` (74) |
  | `keyboard` | `k.key` (87) |
  | `usage` | `u.en` (98) |
  | `related` | `r.id` (109) |
  | `sources` | `s.url` (122) |
- DADS attribution convention: every source whose `url` starts with `https://design.digital.go.jp/` has a `label` exactly matching `デジタル庁デザインシステムウェブサイト「<page name>」をもとに作成` (31/31 conform today; example `src/lib/components/tabs/data.ts:89`).
- All 124 `checkedAt` values today are `'2026-10-20'` (ISO `YYYY-MM-DD`).
- Every `related` link is reciprocal today (if A lists B, B lists A).
- Today `svelte-check` reports `0 errors, 0 warnings`, so `--fail-on-warnings` breaks nothing. The 5 existing intentional suppressions are `<!-- svelte-ignore ... -->` comments with a Japanese reason on the line above (e.g. `src/lib/components/combobox/Demo.svelte:91-92`).
- Code style: tabs, single quotes, no trailing commas, Japanese code comments.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install (fresh worktree only) | `pnpm install --frozen-lockfile` | exit 0 |
| Typecheck + all checks | `pnpm check` | exit 0; svelte-check `0 errors and 0 warnings`; then `ok` lines from the Node checks |
| Data check alone | `node src/lib/data.check.ts` | prints `ok`, exit 0 |
| Search check alone | `node src/lib/search.check.ts` | prints `ok`, exit 0 |
| Build | `pnpm build` | exit 0, ends with `✔ done` |

If `pnpm` on PATH fails with a vite-plus "Failed to resolve package manager" error, use a standalone pnpm binary (one from `which -a pnpm` that is not under `vite-plus`) instead (same version, 10.34.7). If `node_modules` is missing and install is impossible offline, `node_modules/.bin/svelte-kit sync && node_modules/.bin/svelte-check --tsconfig ./tsconfig.json --fail-on-warnings` is equivalent to the svelte-check part.

## Scope

**In scope** (the only files you should modify):
- `package.json` (the `check` script line, plus the `@types/node` devDependency added by `pnpm add`)
- `pnpm-lock.yaml` (via `pnpm add` only)
- `tsconfig.json` (`compilerOptions.types` only)
- `src/lib/data.check.ts` (create)

Revision (2026-10-21, after the first execution attempt): svelte-check type-checks `src/lib/data.check.ts`, and `import ... from 'node:fs'` fails with "Cannot find name 'node:fs'" because the repo has no `@types/node`. The generated `$app/tsconfig` also sets `"types": ["$app/types"]`, so installed `@types` packages are not picked up automatically. Step 1b below adds Node types properly. Plan 008's `playwright.config.ts` needs them too (`process.env`). Do not use `@ts-expect-error` / `@ts-nocheck` / `--ignore`.

**Out of scope** (do NOT touch):
- `src/lib/registry.ts` — client-side; checks there cost every page load.
- Any `data.ts` file — this plan only adds the guard. If the guard fails on current data, that is a STOP condition, not something to fix here.
- `.github/workflows/deploy.yml` — it already runs `pnpm check`.
- `check:watch` script — leave as is (warnings shouldn't kill a watch session).

## Git workflow

- Branch: `advisor/001-verification-baseline`
- One commit. Message style matches `git log`: imperative subject, bullet body, e.g.
  ```
  Fail check on warnings and validate component data
  - ...
  ```
- Do NOT push or open a PR.

## Steps

### Step 1: Create `src/lib/data.check.ts`

A plain Node script in the style of `search.check.ts`. Header comment in Japanese, e.g. `// コンポーネントデータの約束事のチェック: node src/lib/data.check.ts`.

Shape (adapt, keep it short — no framework, no helper modules):

```ts
// コンポーネントデータの約束事を確かめる: node src/lib/data.check.ts
// registry.ts はクライアントでも動くため、ビルド時にだけ要る検査はここに置く
import { readdirSync } from 'node:fs';
import type { ComponentData } from './types.ts';

const dir = new URL('./components/', import.meta.url);
const all: ComponentData[] = [];
for (const id of readdirSync(dir)) {
	all.push((await import(new URL(`${id}/data.ts`, dir).href)).default);
}
const byId = new Map(all.map((d) => [d.id, d]));
const errors: string[] = [];

for (const d of all) {
	// 詳細ページの {#each} のキーと同じ式。重複すると本番でもハイドレーションで落ちる
	const keyed: [string, string[]][] = [
		['aliases', d.aliases.map((a) => a.name + a.source)],
		['variations', (d.variations ?? []).map((v) => v.name.en)],
		['behavior', d.behavior.map((b) => b.en)],
		['keyboard', d.keyboard.map((k) => k.key)],
		['usage', (d.usage ?? []).map((u) => u.en)],
		['related', (d.related ?? []).map((r) => r.id)],
		['sources', d.sources.map((s) => s.url)]
	];
	for (const [field, keys] of keyed)
		if (new Set(keys).size !== keys.length) errors.push(`${d.id}: duplicate key in ${field}`);

	if (!d.behavior.length) errors.push(`${d.id}: behavior is empty`);
	if (!d.keyboard.length) errors.push(`${d.id}: keyboard is empty`);
	if (!d.sources.length) errors.push(`${d.id}: sources is empty`);

	for (const r of d.related ?? [])
		if (!byId.get(r.id)?.related?.some((back) => back.id === d.id))
			errors.push(`${d.id}: related ${r.id} does not link back`);

	for (const s of d.sources) {
		if (!/^\d{4}-\d{2}-\d{2}$/.test(s.checkedAt) || Number.isNaN(Date.parse(s.checkedAt)))
			errors.push(`${d.id}: bad checkedAt ${s.checkedAt}`);
		if (s.url.startsWith('https://design.digital.go.jp/') &&
			!/^デジタル庁デザインシステムウェブサイト「.+」をもとに作成$/.test(s.label))
			errors.push(`${d.id}: DADS source needs the attribution label`);
	}
	for (const url of [...d.sources.map((s) => s.url), ...d.aliases.map((a) => a.url)])
		if (!url.startsWith('https://')) errors.push(`${d.id}: non-https url ${url}`);

	// 英日の両方を埋める（Text 型は空文字を防げない）
	const texts = [d.names, d.summary, d.appearance, ...d.behavior, ...d.keyboard.map((k) => k.action),
		...(d.usage ?? []), ...(d.related ?? []).map((r) => r.diff),
		...(d.variations ?? []).flatMap((v) => [v.name, v.description])];
	for (const t of texts) if (!t.en.trim() || !t.ja.trim()) errors.push(`${d.id}: empty text`);
}

if (errors.length) throw new Error(errors.join('\n'));
console.log('ok');
```

Notes:
- `readdirSync` returns only the 45 component directories (verify with `ls src/lib/components`). If a non-directory entry exists there, STOP.
- Importing `./types.ts` with `import type` is erased by Node; keep it type-only.
- Top-level `await` is fine (`package.json` has `"type": "module"`).
- Do not add a staleness warning for old `checkedAt`; it is out of scope.

**Verify**: `node src/lib/data.check.ts` → prints `ok`, exit 0.

**Verify the guard actually fires** (do not commit this): temporarily change `src/lib/components/tabs/data.ts` so its `keyboard` has two rows with `key: 'Home'` (e.g. change the `End` row's key to `'Home'`), run `node src/lib/data.check.ts` → must throw with `tabs: duplicate key in keyboard`. Then revert: `git checkout -- src/lib/components/tabs/data.ts` and confirm `git status --short` shows no change to that file.

### Step 1b: Give TypeScript the Node types

1. `pnpm add -D @types/node@^24` (CI runs Node 24; latest 24.x was 24.19.2 on 2026-10-21).
2. In `tsconfig.json`, add `"types": ["$app/types", "node"]` to `compilerOptions`. Keep `$app/types`: the generated base config lists it, and overriding `types` replaces the array instead of merging it. Result:
   ```json
   {
   	"extends": "$app/tsconfig",
   	"compilerOptions": {
   		"strict": true,
   		"types": ["$app/types", "node"]
   	},
   	"include": ["src", "vite.config.ts"]
   }
   ```

**Verify**: `pnpm exec svelte-kit sync && pnpm exec svelte-check --tsconfig ./tsconfig.json --fail-on-warnings` → 0 errors and 0 warnings. If adding Node types causes new errors in existing `src/` files (for example, a `setTimeout` result assigned to `number`), STOP and report them. Do not edit those files.

### Step 2: Chain everything into `check`

Edit `package.json` so the `check` line becomes exactly:

```json
"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --fail-on-warnings && node src/lib/search.check.ts && node src/lib/data.check.ts",
```

Leave `check:watch` unchanged.

**Verify**: `pnpm check` → exit 0; output contains `0 errors and 0 warnings` (or the machine format `0 ERRORS 0 WARNINGS`) followed by two `ok` lines.

### Step 3: Confirm the build is unaffected

`src/lib/data.check.ts` must not be pulled into the app bundle (nothing imports it).

**Verify**: `pnpm build` → exit 0, ends with `✔ done`; `grep -rl "data.check" build/ | wc -l` → `0`.

## Test plan

- The new script *is* the test. Its negative case is exercised manually in Step 1 (duplicate keyboard key must throw).
- Pattern: `src/lib/search.check.ts` (throw + `console.log('ok')`). No vitest — none is installed and none is needed.

## Done criteria

- [ ] `node src/lib/data.check.ts` prints `ok`
- [ ] `pnpm check` exits 0 and its script contains `--fail-on-warnings`, `node src/lib/search.check.ts` and `node src/lib/data.check.ts`
- [ ] `pnpm build` exits 0
- [ ] `git diff --stat 149b340` (or against your base) lists only `package.json`, `pnpm-lock.yaml`, `tsconfig.json` and `src/lib/data.check.ts`; the lockfile diff adds only `@types/node` (and its `undici-types` dependency) and changes no existing package version
- [ ] `plans/README.md` status row updated (unless your reviewer maintains it)

## STOP conditions

- `node src/lib/data.check.ts` reports errors on the **unmodified** data — report the full error list; do not edit data files.
- `pnpm check` reports any svelte-check warning after adding `--fail-on-warnings` — report it; do not add `svelte-ignore` comments.
- Node cannot `import()` a `data.ts` (e.g. a syntax error about types) — report the Node version (`node -v`) and the error.
- The `check` script in `package.json` does not match the excerpt above.

## Maintenance notes

- New conventions for component data should be added to `data.check.ts`, not to `registry.ts`.
- If the detail page changes an `{#each}` key expression, update the matching entry in the `keyed` list in `data.check.ts`.
- Later plans (keyboard-label normalization, plan 004) merge rows and change `k.key` values; this check is what makes that safe.
