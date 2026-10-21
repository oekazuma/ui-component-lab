# Plan 010: Add an "Alert dialog" component readers can try

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat f32e56a..HEAD -- src/lib/components/alert src/lib/components/modal CLAUDE.md`
> Any change is a STOP condition.

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P2 | S | LOW | none (plans 001–009 are merged into `main`) | direction | commit `f32e56a`, 2026-10-21 |

## Why this matters

UI Component Lab is a bilingual (en/ja) field guide to UI components, each with a live demo. Two pages already mention the alert dialog in their text, but readers can't try one: `alert/data.ts:63` and `modal/data.ts:62`. The difference between an alert, a modal and an alert dialog is a classic naming confusion, so readers should be able to try the third one. The demo reuses the native `<dialog>` approach of `modal/Demo.svelte` with `role="alertdialog"`.

## Current state

Read `CLAUDE.md` at the repo root first. It is the conventions guide (Japanese). The rules that matter here:
- A component is `src/lib/components/<id>/data.ts` + `Demo.svelte`, registered automatically.
- `data.ts` is `export default { ... } satisfies ComponentData;`. Every text is `{ en, ja }` and both say the same thing.
- `related` must be reciprocal. `pnpm check` runs `src/lib/data.check.ts`, which enforces this, unique keys, https URLs and ISO `checkedAt`.
- Demo ids come from `$props.id()`. No permanent document/window listeners. Use the color tokens (`--color-danger` exists).
- Code comments are Japanese and explain *why*.

Exemplar to copy: `src/lib/components/modal/Demo.svelte` (whole file, ~95 lines). It uses `dialog.showModal()`, a `<form method="dialog">` with `value="cancel"` / `value="confirm"` buttons, `returnValue` reset before opening, and a `<p role="status">` showing the result. The data exemplar is `src/lib/components/modal/data.ts`.

The related links to change (exact text at `f32e56a`):
- `src/lib/components/alert/data.ts` `related` has:
  ```ts
  		{
  			id: 'modal',
  			diff: {
  				en: 'An alert informs without interrupting; an alert dialog (a kind of modal) stops the user until they respond.',
  				ja: 'アラートは作業を中断させずに知らせ、アラートダイアログ（モーダルの一種）は応答するまで作業を止める。'
  			}
  		}
  ```
- `src/lib/components/modal/data.ts` `related` has:
  ```ts
  		{
  			id: 'alert',
  			diff: {
  				en: 'An alert dialog (a kind of modal) stops the user until they respond; an alert informs without interrupting.',
  				ja: 'アラートダイアログ（モーダルの一種）は応答するまで作業を止め、アラートは作業を中断させずに知らせる。'
  			}
  		},
  ```
  Both describe the *alert dialog*, so this pair moves to alert ↔ alert-dialog, and a new modal ↔ alert-dialog pair is added.
- `CLAUDE.md` says 「一覧ページでは 45 個のデモが同時に描画される」. The count goes stale with this plan, so remove the number.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install (fresh worktree only) | `pnpm install --frozen-lockfile` | exit 0 |
| Checks | `pnpm check` | exit 0, 0 errors / 0 warnings, two `ok` lines |
| Build | `pnpm build` | exit 0, `✔ done` |
| E2E (outside the sandbox only) | `pnpm build && pnpm test:e2e` | all pass |

If `pnpm` on PATH fails with a vite-plus "Failed to resolve package manager" error, use a standalone pnpm binary (one from `which -a pnpm` that is not under `vite-plus`) (with `--store-dir "$TMPDIR/pnpm10-store/v10"` for install). Headless Chromium cannot launch inside the Claude sandbox, so leave `test:e2e` to the maintainer.

## Scope

**In scope**:
- `src/lib/components/alert-dialog/data.ts`, `src/lib/components/alert-dialog/Demo.svelte` (create)
- `src/lib/components/alert/data.ts`, `src/lib/components/modal/data.ts` (`related` only)
- `CLAUDE.md` (the one 45 sentence)

**Out of scope**: `modal/Demo.svelte` (unchanged on purpose: a modal demo stays a modal), every other component, tests.

## Git workflow

- Branch: `advisor/010-alert-dialog` from `origin/main` (`f32e56a`).
- One commit, imperative subject + bullet body (see `git log`), e.g. `Add Alert dialog component`.
- Do NOT push.

## Steps

### Step 1: `Demo.svelte`

Copy `modal/Demo.svelte` to `alert-dialog/Demo.svelte` and change it as follows.
- `text`:
  ```ts
  	const text = {
  		en: {
  			open: 'Discard changes…',
  			title: 'Discard unsaved changes?',
  			body: 'Your edits to this note will be lost.',
  			cancel: 'Keep editing',
  			confirm: 'Discard',
  			result: { cancel: 'Kept editing', confirm: 'Discarded' }
  		},
  		ja: {
  			open: '変更を破棄…',
  			title: '保存していない変更を破棄しますか？',
  			body: 'このメモへの編集内容は失われます。',
  			cancel: '編集を続ける',
  			confirm: '破棄',
  			result: { cancel: '編集を続けます', confirm: '破棄しました' }
  		}
  	};
  ```
- On `<dialog>`, add `role="alertdialog"`. Keep `aria-labelledby` and `aria-describedby`; an alert dialog needs both. Add a Japanese comment above it, e.g. `<!-- role="alertdialog" で、開いたときにタイトルと本文が警告として読み上げられる -->`.
- Keep the buttons in this order: cancel ("Keep editing") first, confirm second. `showModal()` focuses the first focusable element, so focus lands on the least destructive button. Say so in a comment next to `open()`. **Do not use the `autofocus` attribute**: Svelte warns about it (`a11y_autofocus`), and `pnpm check` fails on warnings.
- Confirm button: `class="btn danger"` instead of `btn btn-primary`. Add a style:
  ```css
  	.danger {
  		border-color: var(--color-danger);
  		background: var(--color-danger);
  		color: #fff;
  	}
  ```
  (`#fff` on `--color-danger` is 6.6:1.) A hover style is not needed.

**Verify**: `pnpm check` → exit 0. At this point `data.check.ts` will fail (no data.ts yet), so read only the svelte-check part, or do Step 2 first.

### Step 2: `data.ts`

Create `src/lib/components/alert-dialog/data.ts`:

```ts
import type { ComponentData } from '#lib/types.js';

export default {
	id: 'alert-dialog',
	category: 'overlay',
	names: { en: 'Alert dialog', ja: 'アラートダイアログ' },
	aliases: [],
	summary: {
		en: 'A modal dialog that interrupts the user with an urgent message and waits for a response.',
		ja: '緊急のメッセージで作業を中断させ、応答を待つモーダルダイアログ。'
	},
	appearance: {
		en: 'Looks like a modal dialog: a box over a dimmed page with a short title, a message and two buttons, one of them for the risky action.',
		ja: 'モーダルダイアログと同じく、暗くした背景の上に箱が出る。短いタイトルと本文、危険な操作のボタンを含む2つのボタンを持つ。'
	},
	behavior: [
		{
			en: 'It has role="alertdialog", so screen readers announce its title and message as soon as it opens.',
			ja: 'role="alertdialog" を持ち、開くとスクリーンリーダーがタイトルと本文をすぐに読み上げる。'
		},
		{
			en: 'When it opens, focus goes to the least destructive button; in this demo, “Keep editing”.',
			ja: '開くと、最も安全なボタンにフォーカスが移る。このデモでは「編集を続ける」。'
		},
		{
			en: 'Like any modal, the page behind cannot be used until it closes, and focus then returns to the button that opened it.',
			ja: '他のモーダルと同じく、閉じるまで背後のページは使えず、閉じると開いたボタンにフォーカスが戻る。'
		}
	],
	keyboard: [
		{ key: 'Tab / Shift + Tab', action: { en: 'Moves between the dialog’s buttons.', ja: 'ダイアログ内のボタンの間を移動する。' } },
		{ key: 'Enter / Space', action: { en: 'Activates the focused button.', ja: 'フォーカス中のボタンを押す。' } },
		{
			key: 'Esc',
			action: {
				en: 'Closes the dialog as if “Keep editing” was chosen.',
				ja: '「編集を続ける」を選んだのと同じ扱いで閉じる。'
			}
		}
	],
	usage: [
		{
			en: 'Use it only for urgent messages that need a decision, such as confirming an action that cannot be undone.',
			ja: '取り消せない操作の確認など、判断が必要な緊急のメッセージにだけ使う。'
		}
	],
	related: [
		{
			id: 'modal',
			diff: {
				en: 'An alert dialog is a modal for an urgent message that needs a response; screen readers announce it as an alert.',
				ja: 'アラートダイアログは応答が必要な緊急のメッセージ用のモーダルで、スクリーンリーダーには警告として伝わる。'
			}
		},
		{
			id: 'alert',
			diff: {
				en: 'An alert dialog stops the user until they respond; an alert informs without interrupting.',
				ja: 'アラートダイアログは応答するまで作業を止め、アラートは作業を中断させずに知らせる。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Alert and Message Dialogs Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/',
			checkedAt: '2026-10-21'
		},
		{
			label: 'MDN: ARIA alertdialog role',
			url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alertdialog_role',
			checkedAt: '2026-10-21'
		}
	]
} satisfies ComponentData;
```

`aliases: []` is intentional. No design-system name could be verified when this plan was written.

### Step 3: Rewire `related`

1. `alert/data.ts`: change the `id: 'modal'` entry to `id: 'alert-dialog'` with the diff
   `en: 'An alert informs without interrupting; an alert dialog stops the user until they respond.'`
   `ja: 'アラートは作業を中断させずに知らせ、アラートダイアログは応答するまで作業を止める。'`
2. `modal/data.ts`: replace the `id: 'alert'` entry (first in `related`) with
   ```ts
   		{
   			id: 'alert-dialog',
   			diff: {
   				en: 'A modal is any dialog that blocks the page; an alert dialog is the kind used for an urgent message that needs a response.',
   				ja: 'モーダルは背後のページを止めるダイアログ全般で、アラートダイアログはそのうち応答が必要な緊急のメッセージに使うもの。'
   			}
   		},
   ```
3. `CLAUDE.md`: change 「一覧ページでは 45 個のデモが同時に描画されるため」 to 「一覧ページではすべてのデモが同時に描画されるため」.

**Verify**: `pnpm check` → exit 0 with two `ok` lines (data.check passes, so the related links are reciprocal). `pnpm build` → exit 0. `ls build/en/components/alert-dialog/index.html build/ja/components/alert-dialog/index.html` → both exist. `grep -c 'role="alertdialog"' build/en/components/alert-dialog/index.html` → 1.

### Step 4: Manual check (only if you have a browser tool)

`pnpm preview --port 4185 --strictPort`, open `/ui-component-lab/en/components/alert-dialog/`, click "Discard changes…". Expected: focus is on "Keep editing", Esc closes with status "Kept editing", and choosing "Discard" shows "Discarded". Skip if you have no browser tool, and say so.

## Test plan

- `data.check.ts` covers the data. The existing `tests/a11y.spec.ts` scans `/en/` and `/ja/`, which now include the new demo (closed state), when the maintainer runs `pnpm test:e2e`.

## Done criteria

- [ ] `pnpm check` and `pnpm build` exit 0
- [ ] `build/{en,ja}/components/alert-dialog/index.html` exist
- [ ] `git grep -n "id: 'modal'" src/lib/components/alert/data.ts` → no output
- [ ] Modified files ⊆ in-scope list

## STOP conditions

- The excerpts don't match (drift).
- `pnpm check` reports an a11y warning on the new demo that can't be fixed without changing the design above.
- `data.check.ts` reports anything other than the expected passes.

## Maintenance notes

- The two source URLs were not opened when this plan was written: the reviewer's browser was refused access to w3.org and developer.mozilla.org. The maintainer should open both before merging. If either is wrong, fix the URL and keep `checkedAt` as the date it was actually confirmed.
- If a verified design-system name is found later (e.g. an "Alert Dialog" component in a design system already used in `aliases`), add it, using one of the source names listed in `src/lib/data.check.ts` once plan 012 lands.
