# Plan 008: CI runs axe on the rendered pages and keyboard checks on the custom widgets

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 149b340..HEAD -- package.json pnpm-lock.yaml tsconfig.json .gitignore .github/workflows/deploy.yml`
> Plans 001 and 006 change `package.json` and `deploy.yml`, and those changes are expected. Confirm that the `check` script contains `data.check.ts` and that the `uses:` lines are SHA-pinned. If not, STOP: the dependencies are not applied.

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P2 | M | LOW-MED | plans/001, 002, 003, 006 | tests | commit `149b340`, 2026-10-21 |

## Why this matters

This site exists to show correct, accessible UI components. Today nothing checks the *rendered* pages: ARIA validity, color contrast and duplicate ids are not checked, and neither is whether a demo still answers its documented keys. `svelte-check` sees only static markup. The home page (`/en/`, `/ja/`) mounts all 45 demos, so an axe scan of 2 index pages plus 2 detail pages covers every demo's initial DOM. Nearly all keyboard behavior is native (dialog, select, range input). Custom key handling lives in a few demos: tabs, toolbar, tree-view, combobox, tooltip, toast, and the shared `ActionMenu` used by menu and split-button. Plans 002 and 003 fixed bugs there that had no regression test. This plan adds the smallest useful browser layer: Playwright + `@axe-core/playwright`, run in CI after the build.

## Current state

- `package.json` scripts after plan 001 include:
  `"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --fail-on-warnings && node src/lib/search.check.ts && node src/lib/data.check.ts"`, plus `dev`, `build`, `preview`, `prepare`, `check:watch`. devDependencies: `@sveltejs/adapter-static`, `@sveltejs/kit`, `@sveltejs/vite-plugin-svelte`, `svelte`, `svelte-check`, `typescript`, `vite`, all with caret ranges.
- No test runner is installed. `@playwright/test` latest is `1.64.1`, which needs Chromium revision `1248`. `@axe-core/playwright` latest is `4.14.0`.
- `pnpm preview` serves the built `build/` at `http://localhost:4173/ui-component-lab/` (Vite preview default port 4173; `paths.base` is `/ui-component-lab`). The tests use port 4180 with `--strictPort` and never reuse an existing server, because a stray `vite preview` from another checkout on 4173 would otherwise be tested by mistake.
- `tsconfig.json` after plan 001, which added `@types/node` and the `types` line:
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
  Change only `include`. Keep `types` as is: Node types make `process.env.CI` in the config typecheck.
- `.gitignore` has `node_modules`, `/.svelte-kit`, `/build`, etc. and no Playwright entries.
- `.github/workflows/deploy.yml` `build` job steps after plan 006: checkout, pnpm/action-setup, setup-node (Node 24, `cache: pnpm`), `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm build`, then the push-only Pages steps. All `uses:` are SHA-pinned with `# vN` comments.
- Demo DOM facts the keyboard specs rely on (verified in source):
  - Menu demo (`/en/components/menu/`): trigger button text "Actions", items "Rename", "Duplicate", "Move to trash" with `role="menuitem"`, status `<p role="status">` shows `Chosen: <item>`.
  - Tooltip demo (`/en/components/tooltip/`): button "Copy link" with `aria-describedby` → `role="tooltip"` element. Visibility is the `visible` class on the tooltip (`class:visible`).
  - Combobox demo (`/en/components/combobox/`): `<input role="combobox">`, `aria-expanded`, listbox `role="listbox"` with `hidden` when collapsed.
  - Tabs demo (`/en/components/tabs/`): `role="tab"` buttons "Profile", "Notifications", "Security". Automatic activation: arrow keys move focus and set `aria-selected="true"`.
  - Language switch: header link with `hreflang` (`a[hreflang="ja"]` on en pages); `document.documentElement.lang` must follow it (plan 002).
  - Each demo is inside `DemoFrame`: `<div class="frame" role="group" aria-label="Demo: <name>">`. On detail pages there is exactly one.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install (fresh worktree only) | `pnpm install --frozen-lockfile` | exit 0 |
| Add deps | `pnpm add -D @playwright/test@^1.64.1 @axe-core/playwright@^4.14.0` | exit 0, lockfile updated |
| Browser | `pnpm exec playwright install chromium` | exit 0 (no-op if revision 1248 is cached in `~/Library/Caches/ms-playwright`) |
| Build | `pnpm build` | exit 0 |
| E2E | `pnpm test:e2e` | all tests pass |
| Checks | `pnpm check` | exit 0 |

If `pnpm` on PATH fails with a vite-plus "Failed to resolve package manager" error, use `/Users/oe.kazuma/Library/pnpm/bin/pnpm`. If it complains about the store location, pass `--store-dir "$TMPDIR/pnpm10-store/v10"`. If `playwright install` cannot download (blocked network) and revision 1248 is not cached, STOP.

## Scope

**In scope**:
- `package.json` (devDependencies + `test:e2e` script), `pnpm-lock.yaml` (via `pnpm add` only)
- `playwright.config.ts` (create)
- `tests/a11y.spec.ts`, `tests/keyboard.spec.ts` (create)
- `tsconfig.json` (`include` only)
- `.gitignore` (Playwright output dirs)
- `.github/workflows/deploy.yml` (two new steps in the `build` job)
- `src/lib/components/badge/Demo.svelte` (line 8, the ja `unread` text only) and `src/lib/components/badge/data.ts` (line 27, the matching ja example). Step 0 only.

Revision (2026-10-21, after the first execution attempt):
1. Headless Chromium cannot launch inside the macOS sandbox the executor runs in (`bootstrap_check_in ... Permission denied (1100)`), so `pnpm test:e2e` cannot run there. The reviewer ran axe 4.14.0 (the version `@axe-core/playwright` 4.14.0 uses) by hand against the merged build in a desktop browser, with the same tags on the same 4 pages. `/en/`, `/en/components/tabs/` and `/ja/components/modal/` had 0 violations. `/ja/` had exactly one: `label-content-name-mismatch` (WCAG 2.5.3) on the badge demo button. Its visible text is 「通知」 plus 「3」, but its name is 「通知 未読3件」, which does not contain 「通知 3」. The reviewer confirmed that 「通知 3件の未読」 clears it. Step 0 applies that fix.
2. When `pnpm test:e2e` cannot launch a browser, still write every spec. Make sure `pnpm check` typechecks them, commit, and report that the run is unverified. The maintainer runs `pnpm build && pnpm test:e2e` outside the sandbox, or CI does on the PR.

**Out of scope** (do NOT touch):
- Any file under `src/`. **If axe reports violations, do not fix them here**; see STOP conditions.
- Firefox/WebKit projects. Chromium only, which keeps CI time and download size small.
- Hand-written specs for every component. Only the cases listed in Step 4.

## Git workflow

- Branch: `advisor/008-a11y-e2e-tests`
- Commits: (a) deps + config + specs, (b) CI step. Imperative subject + bullet body.
- Do NOT push or open a PR.

## Steps

### Step 0: Fix the one existing axe violation (badge ja label)

In `src/lib/components/badge/Demo.svelte` line 8, change
`ja: { label: '通知', unread: (n: number) => \`通知 未読${n}件\` }` to
`ja: { label: '通知', unread: (n: number) => \`通知 ${n}件の未読\` }`.
Update the matching example in `src/lib/components/badge/data.ts` line 27: 「通知 未読3件」 becomes 「通知 3件の未読」. Leave the en text unchanged.

**Verify**: `grep -c '件の未読' src/lib/components/badge/Demo.svelte src/lib/components/badge/data.ts` → `1` each; `pnpm check` → exit 0.

### Step 1: Install the tools

`pnpm add -D @playwright/test@^1.64.1 @axe-core/playwright@^4.14.0`, then `pnpm exec playwright install chromium`.

**Verify**: `node -e "const p=require('./package.json');console.log(!!p.devDependencies['@playwright/test'], !!p.devDependencies['@axe-core/playwright'])"` → `true true`.

### Step 2: Config, scripts, ignores, tsconfig

`playwright.config.ts`:

```ts
import { defineConfig } from '@playwright/test';

// ビルド済みの build/ を vite preview で配信して確かめる（pnpm build を先に実行する）
export default defineConfig({
	testDir: 'tests',
	use: { baseURL: 'http://localhost:4180/ui-component-lab/' },
	webServer: {
		command: 'vite preview --port 4180 --strictPort',
		url: 'http://localhost:4180/ui-component-lab/en/',
		// 別のブランチの preview を誤って使い回さないよう、既存のサーバーは使わない
		reuseExistingServer: false
	}
});
```

`package.json` scripts: add `"test:e2e": "playwright test"`.

`.gitignore`: add a block:
```
# Playwright
/test-results
/playwright-report
```

`tsconfig.json` `include` → `["src", "tests", "vite.config.ts", "playwright.config.ts"]`, so `pnpm check` typechecks the specs.

**Verify**: `pnpm check` → exit 0.

### Step 3: `tests/a11y.spec.ts`

```ts
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// 一覧ページは全デモを描画するので、一覧2つと詳細2つで全デモの初期状態を見られる
for (const path of ['en/', 'ja/', 'en/components/tabs/', 'ja/components/modal/']) {
	test(`no axe violations: ${path}`, async ({ page }) => {
		await page.goto(path);
		const { violations } = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
			.analyze();
		expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
	});
}
```

**Verify**: `pnpm build && pnpm test:e2e tests/a11y.spec.ts` → 4 passed. If any test fails with violations, **STOP** (see below) and include the printed list in your report.

### Step 4: `tests/keyboard.spec.ts`

Regression tests for the custom keyboard code fixed in plans 002 and 003. Scope each locator to the demo frame (`page.getByRole('group', { name: /^Demo:/ })`) so header links don't match. Write these cases. Each is a few lines of `page.keyboard.press` plus `expect(...).toHaveAttribute` / `toBeFocused` / `toHaveText`:

1. tabs, `en/components/tabs/`: focus "Profile", press ArrowRight → "Notifications" focused and `aria-selected="true"`. Press End → "Security" selected. Press Home → "Profile" selected.
2. menu Shift+Tab, `en/components/menu/`: focus "Actions", press Enter → first menuitem focused. Press Shift+Tab → "Actions" focused and `aria-expanded="false"`.
3. menu click: click "Actions", click "Duplicate" → status text `Chosen: Duplicate`, and the menu (`role="menu"`) hidden.
4. tooltip Esc after hover, `en/components/tooltip/`: hover "Copy link" → tooltip has class `visible`. Press Escape with nothing focused (`page.keyboard.press('Escape')`) → class `visible` gone.
5. combobox Esc on no match, `en/components/combobox/`: fill `zzz`, press Escape → input value `''` and `aria-expanded="false"`.
6. language switch, `en/components/menu/`: open the menu, choose "Rename", click `a[hreflang="ja"]` → URL contains `/ja/components/menu/`, `document.documentElement.lang === 'ja'`, and the demo's status line is empty (`toHaveText('')`).

**Verify**: `pnpm test:e2e` → all tests pass (4 a11y + 6 keyboard = 10).

### Step 5: Run them in CI

In `.github/workflows/deploy.yml` `build` job, insert after `- run: pnpm build`:

```yaml
      - run: pnpm exec playwright install --with-deps chromium

      - run: pnpm test:e2e
```

These run on PRs and pushes, before the push-only Pages steps. Keep the blank-line spacing used between steps.

**Verify**: `grep -n 'test:e2e\|playwright install' .github/workflows/deploy.yml` → 2 lines, both after the `pnpm build` line.

## Test plan

- The specs themselves. Before committing, check that each keyboard spec actually fails without its fix. For one case is enough: temporarily revert the plan 003 combobox Escape change (`git stash push -m tmp-008 -- src/lib/components/combobox/Demo.svelte` is **not** allowed, because the stash is shared). Instead, edit the line by hand, run spec 5, see it fail, then `git checkout -- src/lib/components/combobox/Demo.svelte`. Report the failing output.

## Done criteria

- [ ] `pnpm check` exits 0 (specs typecheck)
- [ ] `pnpm build && pnpm test:e2e` → 10 passed
- [ ] `deploy.yml` has the two new steps after `pnpm build`
- [ ] `git status --short` shows no `test-results/` or `playwright-report/`
- [ ] Modified files ⊆ in-scope list
- [ ] `plans/README.md` status row updated (unless your reviewer maintains it)

## STOP conditions

- axe reports violations on any page. Report every `id: targets` line. Don't fix `src/`, don't disable rules, and don't add `.exclude()`. The reviewer will turn them into a follow-up plan.
- A keyboard spec fails on the current code (not on a deliberate revert). That means plan 002 or 003 is not applied or regressed. Report which.
- Chromium revision 1248 cannot be installed or found.
- `pnpm add` changes the version of any existing dependency in the lockfile (check `git diff pnpm-lock.yaml` for changes outside the new packages' trees).

## Maintenance notes

- Adding a component adds its demo to `/en/` and `/ja/`, so the a11y spec covers it automatically.
- When a demo with custom key handling changes, extend `tests/keyboard.spec.ts` in the same PR.
- `@playwright/test` bumps from Dependabot (plan 006) change the required Chromium revision. CI downloads it, so nothing else needs to change.
