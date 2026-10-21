# Plan 007: Accent-hover and error colors come from two shared tokens with recorded contrast

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 149b340..HEAD -- src/app.css src/lib/components/toggle-button/Demo.svelte src/lib/components/toolbar/Demo.svelte src/lib/components/alert/Demo.svelte src/lib/components/badge/Demo.svelte src/lib/components/number-input/Demo.svelte src/lib/components/textarea/Demo.svelte`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P3 | S | LOW | none (stacked after 006 only to keep one linear branch) | tech-debt | commit `149b340`, 2026-10-21 |

## Why this matters

`src/app.css` defines color tokens (`--color-*`) and records their contrast ratios, because this site teaches accessible components. Two colors bypass the tokens. The accent hover `#194fae` is copied in 3 places. The error red has drifted into two values: `#b42318` in alert and badge, and `#c4002b` in number-input and textarea. So the error state looks different from demo to demo, and none of these hard-coded values has a recorded contrast check. Two tokens fix both problems.

## Current state

- `src/app.css:2-17` (`:root` tokens; the comment style for contrast notes is `/* on --color-bg: 7.0:1 */`):
  ```css
  :root {
  	--color-bg: #ffffff;
  	--color-surface: #f6f7f9;
  	--color-text: #1b1d22;
  	--color-muted: #555b66; /* on --color-bg: 7.0:1 */
  	--color-border: #d3d7de;
  	--color-accent: #1f5fd1; /* on #fff: 5.9:1 */
  	--color-accent-text: #ffffff;
  	--color-focus-inner: #ffd43d;
  	--color-focus-outer: #000000;
  	--radius: 6px;
  	...
  ```
- `src/app.css:74-76`:
  ```css
  .btn-primary:hover {
  	background: #194fae;
  }
  ```
- `src/lib/components/toggle-button/Demo.svelte:36-38` and `src/lib/components/toolbar/Demo.svelte:103-105` (identical):
  ```css
  	[aria-pressed='true']:hover {
  		background: #194fae;
  	}
  ```
- `src/lib/components/alert/Demo.svelte:35`: `border: 1px solid #b42318;` (the same rule also has `background: #fef3f2;` and `color: #8a1c12;`, which are tints specific to this alert; leave them).
- `src/lib/components/badge/Demo.svelte:41`: `background: #b42318;` (with `color: #fff;`).
- `src/lib/components/number-input/Demo.svelte:49`: `border-color: #c4002b;` (inside `input:invalid`).
- `src/lib/components/textarea/Demo.svelte:57`: `color: #c4002b;` (inside `.over`).
- Contrast ratios, computed with the WCAG relative-luminance formula: `#b42318` on `#ffffff` = 6.57:1; `#ffffff` on `#b42318` = 6.57:1; `#b42318` on `#f6f7f9` (`--color-surface`, the demo stage background) = 6.13:1; `#ffffff` on `#194fae` = 7.58:1.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install (fresh worktree only) | `pnpm install --frozen-lockfile` | exit 0 |
| Checks | `pnpm check` | exit 0 |
| Build | `pnpm build` | exit 0, `✔ done` |

If `pnpm` on PATH fails with a vite-plus "Failed to resolve package manager" error, use a standalone pnpm binary (one from `which -a pnpm` that is not under `vite-plus`).

## Scope

**In scope**: `src/app.css`, and `Demo.svelte` in `toggle-button`, `toolbar`, `alert`, `badge`, `number-input`, `textarea`.

**Out of scope** (do NOT touch):
- Decorative colors that stay local on purpose: avatar, carousel, card, skeleton, and alert's `#fef3f2` / `#8a1c12` tint.
- Adding dark mode or any other token. `app.css:16` sets `color-scheme: light` deliberately.

## Git workflow

- Branch: `advisor/007-color-tokens`
- One commit, imperative subject + bullet body, e.g. `Add accent-hover and danger color tokens`.
- Do NOT push or open a PR.

## Steps

### Step 1: Add the tokens

In `src/app.css` `:root`, after `--color-accent-text`, add:

```css
	--color-accent-hover: #194fae; /* #fff on it: 7.6:1 */
	--color-danger: #b42318; /* on --color-bg: 6.6:1, on --color-surface: 6.1:1, #fff on it: 6.6:1 */
```

Change `.btn-primary:hover { background: #194fae; }` to `background: var(--color-accent-hover);`.

**Verify**: `grep -c '#194fae' src/app.css` → `1` (only the token definition).

### Step 2: Use the tokens in the demos

- toggle-button and toolbar: `background: #194fae;` → `background: var(--color-accent-hover);`
- alert: `border: 1px solid #b42318;` → `border: 1px solid var(--color-danger);`
- badge: `background: #b42318;` → `background: var(--color-danger);`
- number-input: `border-color: #c4002b;` → `border-color: var(--color-danger);`
- textarea: `color: #c4002b;` → `color: var(--color-danger);`

**Verify**: `grep -rn '#194fae\|#b42318\|#c4002b' src/` → exactly 2 lines, both in `src/app.css` (the token definitions). `pnpm check` → exit 0. `pnpm build` → exit 0.

## Test plan

- Visual only. The greps above are the regression check. Plan 008's axe run covers contrast in the rendered output.

## Done criteria

- [ ] `grep -rn '#194fae\|#b42318\|#c4002b' src/ | grep -v 'src/app.css' | wc -l` → `0`
- [ ] `grep -c -- '--color-danger\|--color-accent-hover' src/app.css` ≥ `3`
- [ ] `pnpm check` and `pnpm build` exit 0
- [ ] Modified files ⊆ in-scope list
- [ ] `plans/README.md` status row updated (unless your reviewer maintains it)

## STOP conditions

- Any of the 7 hard-coded values is not at the line excerpted, or appears in additional files (report them, don't replace them).
- `pnpm check` reports a warning.

## Maintenance notes

- New demos should use `--color-danger` for error states and `--color-accent-hover` for accent hovers. Plan 009 writes this into `CLAUDE.md`.
- If a token value changes, recompute the contrast comment. Ratios use the WCAG 2 relative-luminance formula.
