# Plan 002: Switching language updates `<html lang>` and remounts every demo

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 149b340..HEAD -- src/lib/DemoFrame.svelte "src/routes/[lang=lang]/+layout.svelte"`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P1 | S | LOW | plans/001-verification-baseline.md (for `pnpm check`) | bug (a11y) | commit `149b340`, 2026-10-21 |

## Why this matters

The site has English and Japanese versions of every page (`/ui-component-lab/en/...`, `/ui-component-lab/ja/...`). The header's language link is a normal `<a>`, so SvelteKit's client router handles it: the same route stays mounted and only `params.lang` changes. Two things go wrong:

1. `<html lang>` is written only at prerender time (`src/hooks.server.ts`), so after switching, the document still says the old language. Screen readers then read Japanese text with an English voice, or the reverse. Verified in a browser during the audit: on `/ja/components/tabs/`, clicking the switch leads to `/en/components/tabs/` with `document.documentElement.lang === 'ja'`.
2. Demo components are not remounted, so any demo that stored a translated string in `$state` keeps showing the old language. For example, menu shows 「選んだ操作: Rename」 after you pick "Rename" and then switch to ja. select and listbox store the option text, so after switching, the status line and the control disagree. breadcrumb, split-button and tree-view have the same problem.

Both are fixed with one line each, and the client-side navigation is kept. That matters because the home page's search box and category filter survive a language switch today. Adding `data-sveltekit-reload` to the link would also fix both, but it forces a full reload and wipes those filters. **Do not use that approach.**

## Current state

- `src/lib/DemoFrame.svelte` wraps every demo (home grid and detail page). Lines 12–20:
  ```svelte
  	// key を変えてデモを作り直すことで、各デモに個別のリセット処理を書かずに初期状態へ戻す
  	let generation = $state(0);
  </script>

  <div class="frame" role="group" aria-label={label}>
  	<div class="stage">
  		{#key generation}
  			<Demo {lang} />
  		{/key}
  	</div>
  ```
  The Reset button does `generation++`. `lang` is a prop: `let { demo: Demo, lang, label }: { demo: Component<{ lang: Lang }>; lang: Lang; label: string } = $props();`
- `src/routes/[lang=lang]/+layout.svelte` (full script, lines 1–13):
  ```svelte
  <script lang="ts">
  	import { homePath } from '#lib/paths.js';
  	import { page } from '$app/state';
  	import { siteName, t } from '#lib/i18n.js';
  	import logo from '#lib/assets/logo.svg';
  	import type { LayoutProps } from './$types';

  	let { children, params }: LayoutProps = $props();

  	let other = $derived(params.lang === 'en' ? 'ja' : 'en');
  	// 同じページの別言語版。pathname は base を含むのでそのまま使える
  	let otherHref = $derived(page.url.pathname.replace(`/${params.lang}/`, `/${other}/`));
  </script>
  ```
  Line 19 is the switch link: `<a href={otherHref} hreflang={other} lang={other}>{t(params.lang).switchLang}</a>`.
- `src/hooks.server.ts` sets `<html lang>` during prerender by replacing `%lang%` in `src/app.html`. **Keep it**; prerendered HTML must still ship the right value. The installed Svelte (5.57.2) has no `<svelte:html>` element, so a client-side `$effect` is the way to update it.
- Conventions: Svelte 5 runes, tabs, single quotes, Japanese comments explaining *why*.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install (fresh worktree only) | `pnpm install --frozen-lockfile` | exit 0 |
| Checks | `pnpm check` | exit 0, 0 errors and 0 warnings, `ok` lines |
| Build | `pnpm build` | exit 0, `✔ done` |
| Preview (manual check) | `pnpm preview` | serves `http://localhost:4173/ui-component-lab/` |

If `pnpm` on PATH fails with a vite-plus "Failed to resolve package manager" error, use a standalone pnpm binary (one from `which -a pnpm` that is not under `vite-plus`).

## Scope

**In scope**:
- `src/lib/DemoFrame.svelte`
- `src/routes/[lang=lang]/+layout.svelte`

**Out of scope** (do NOT touch):
- `src/hooks.server.ts`, `src/app.html`: still needed for prerendered HTML.
- Individual `src/lib/components/*/Demo.svelte` files. Storing indexes instead of strings there would also work, but the single DemoFrame change covers every demo, including future ones.
- The switch link's attributes. Do not add `data-sveltekit-reload`.

## Git workflow

- Branch: `advisor/002-language-switch-sync`
- One commit, imperative subject + bullet body (see `git log`), e.g. `Sync html lang and remount demos on language switch`.
- Do NOT push or open a PR.

## Steps

### Step 1: Remount demos when the language changes

In `src/lib/DemoFrame.svelte`, change `{#key generation}` to:

```svelte
		{#key `${lang}-${generation}`}
```

and update the comment above `generation` so it also explains the language part, e.g.:

```ts
	// key を変えてデモを作り直すことで、各デモに個別のリセット処理を書かずに初期状態へ戻す。
	// 言語切替はクライアント側の遷移でデモが残るため、lang もキーに含めて前の言語の状態を捨てる
```

Use a template string, not an array: an array would be a new object on every evaluation.

**Verify**: `pnpm check` → exit 0.

### Step 2: Keep `<html lang>` in sync on client navigation

In `src/routes/[lang=lang]/+layout.svelte`, add after the `otherHref` line:

```ts
	// <html lang> は prerender 時に hooks.server.ts が入れる。言語切替はクライアント側の遷移なので、ここで追従させる
	$effect(() => {
		document.documentElement.lang = params.lang;
	});
```

**Verify**: `pnpm check` → exit 0; `pnpm build` → exit 0; `grep -o '<html lang="[a-z]*"' build/ja/index.html build/en/components/tabs/index.html` → `lang="ja"` and `lang="en"` respectively (prerender is unchanged).

### Step 3: Manual behavior check (only if you have a browser tool)

Run `pnpm preview` and open `http://localhost:4173/ui-component-lab/en/components/menu/`. Open the menu demo, choose "Rename", click 日本語 in the header. Expected: the status line under the demo is empty (the demo was remounted), and `document.documentElement.lang` is `ja`. On `/ui-component-lab/en/`, type `tab` in the search box, then switch language. Expected: the filtered list survives the switch (the query is still `tab`).

If you have no browser tool, skip this step and say so in your report. The reviewer will run it.

## Test plan

- No automated browser tests exist yet (plan 008 adds Playwright later). Verification is the build and grep in Step 2, plus the manual check in Step 3.

## Done criteria

- [ ] `grep -n 'key `${lang}-${generation}`' src/lib/DemoFrame.svelte` matches one line
- [ ] `grep -n 'document.documentElement.lang = params.lang' "src/routes/[lang=lang]/+layout.svelte"` matches one line
- [ ] `pnpm check` exits 0; `pnpm build` exits 0
- [ ] Only the two in-scope files are modified (`git diff --stat <base>`)
- [ ] `plans/README.md` status row updated (unless your reviewer maintains it)

## STOP conditions

- `DemoFrame.svelte` no longer has `{#key generation}`, or the layout no longer computes `otherHref` as excerpted.
- `pnpm check` reports a warning about the `$effect` (for example a `state_referenced_locally` warning). Report the exact message.
- The prerendered `<html lang>` values change after the build.

## Maintenance notes

- If Svelte adds `<svelte:html lang={...}>`, the `$effect` and the `%lang%` hook can both be replaced by it.
- The cost of the key change is that switching language resets every demo's state. That is intended: Reset does the same thing.
- Any new top-level layout outside `[lang=lang]` that renders language-specific content would need the same `$effect`.
