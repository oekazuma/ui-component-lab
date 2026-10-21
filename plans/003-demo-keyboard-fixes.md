# Plan 003: Menu, tooltip, combobox and toast demos handle Esc, Tab and clicks as their pages document

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 149b340..HEAD -- src/lib/ActionMenu.svelte src/lib/components/tooltip/Demo.svelte src/lib/components/combobox/Demo.svelte src/lib/components/toast/Demo.svelte`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P1 | S | LOW | plans/001-verification-baseline.md | bug (a11y) | commit `149b340`, 2026-10-21 |

## Why this matters

This site teaches how UI components behave. Each component page has a keyboard table (in `src/lib/components/<id>/data.ts`) and a live demo (`Demo.svelte`). The core promise is that the demo does what the table says, following the WAI-ARIA Authoring Practices (APG). The audit found four demos where it does not:

1. Tooltip — Esc only works when keyboard focus is inside the tooltip's wrapper. A tooltip opened by mouse hover cannot be dismissed with Esc, which fails WCAG 1.4.13 (Content on Hover or Focus).
2. **Menu / Split button** (shared `ActionMenu.svelte`): Shift+Tab from a menu item moves focus to the trigger but leaves the menu open with `aria-expanded="true"`, and Esc on the trigger then does nothing. In Safari, and in Firefox on macOS, a mouse click on a menu item likely closes the menu without running the item. Those browsers don't focus buttons on mousedown, so `focusout` fires with `relatedTarget === null`, and the code treats null as "focus left the menu".
3. Combobox — Type something that matches nothing (e.g. `zzz`) and press Esc. The field clears, but the full suggestion list pops open instead of staying closed. And after Tab away and back, ↓ resumes from the old highlighted option instead of the first.
4. Toast — a page-wide Esc listener dismisses the toast on *any* Esc. That includes Esc used to close another demo's menu, or to cancel Japanese IME composition in a text field. The home page shows all 45 demos at once, so these collide.

## Current state

General constraint: the home page (`src/routes/[lang=lang]/+page.svelte`) mounts **all 45 demos at once**. Demos must not leave permanent document- or window-level listeners. The fixes below add document listeners only while a popup is open, inside an `$effect` whose cleanup removes them. This replaces the tooltip's broken element-level handler and fixes the toast's always-on window listener.

### `src/lib/ActionMenu.svelte` (shared by `menu` and `split-button` demos)

Lines 21–57 and 60–80 today:

```svelte
	const uid = $props.id();
	let open = $state(false);
	let button: HTMLButtonElement;
	let menu: HTMLUListElement;

	const menuItems = () => [...menu.querySelectorAll<HTMLElement>('[role="menuitem"]')];

	async function show(index: number) {
		open = true;
		await tick();
		menuItems().at(index)?.focus();
	}

	function close() {
		open = false;
		button.focus();
	}

	function onButtonKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault();
			show(e.key === 'ArrowDown' ? 0 : -1);
		}
	}

	function onMenuKeydown(e: KeyboardEvent) {
		const els = menuItems();
		const i = els.indexOf(document.activeElement as HTMLElement);
		const target = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: -1 }[e.key];
		if (target !== undefined) {
			e.preventDefault();
			els.at(target % els.length)?.focus();
		} else if (e.key === 'Escape') {
			e.preventDefault();
			close();
		}
	}
</script>

<div
	class="menu-wrap"
	onfocusout={(e) => {
		// Tab やメニュー外のクリックでフォーカスが外へ出たら閉じる
		if (!e.currentTarget.contains(e.relatedTarget as Node | null)) open = false;
	}}
>
	<button
		bind:this={button}
		...
		onclick={() => (open ? (open = false) : show(0))}
		onkeydown={onButtonKeydown}
	>
```

The documented behavior (`src/lib/components/menu/data.ts`): "Pressing Esc, pressing Tab, or clicking outside closes the menu without running anything." and "Choosing an item runs that action and closes the menu."

### `src/lib/components/tooltip/Demo.svelte` lines 11–27

```svelte
	const uid = $props.id();
	let visible = $state(false);
</script>

<!-- APG Tooltip（作業中のパターン）: フォーカスかホバーで表示し、Esc で消す。ツールチップ自体はフォーカスを受けない -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	class="wrap"
	onmouseenter={() => (visible = true)}
	onmouseleave={() => (visible = false)}
	onfocusin={() => (visible = true)}
	onfocusout={() => (visible = false)}
	onkeydown={(e) => e.key === 'Escape' && (visible = false)}
>
```

Note: the `svelte-ignore a11y_no_static_element_interactions` comment is there because of the mouse/focus handlers on a `<span>`. Removing `onkeydown` does not remove the need for it. Keep it, unless `pnpm check` then reports the ignore as unused. In that case, remove it.

### `src/lib/components/combobox/Demo.svelte`

Lines 56–59 (inside `onkeydown`'s `switch`):
```ts
			case 'Escape':
				if (expanded) open = false;
				else value = '';
				active = -1;
				break;
```
Line 87: `onblur={() => (open = false)}`
Relevant derived state (lines 24–27): `suggestions` filters options by `value`, and an empty `value` matches all 10. `expanded = open && suggestions.length > 0`. Assigning `value` from code does not fire `oninput`.

### `src/lib/components/toast/Demo.svelte` line 23

```svelte
<svelte:window onkeydown={(e) => e.key === 'Escape' && (shown = false)} />
```

`ActionMenu` calls `e.preventDefault()` when it handles Esc, so `!e.defaultPrevented` is enough to skip Esc that another widget already handled. `e.isComposing` is true while an IME is composing.

Conventions: Svelte 5 runes, `$effect` returning a cleanup function (existing example: `src/lib/components/toast/Demo.svelte:20` `$effect(() => () => clearTimeout(timer));`), tabs, single quotes, short Japanese comments explaining *why*.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install (fresh worktree only) | `pnpm install --frozen-lockfile` | exit 0 |
| Checks | `pnpm check` | exit 0, 0 errors and 0 warnings, `ok` lines |
| Build | `pnpm build` | exit 0, `✔ done` |
| Preview (manual check) | `pnpm preview` | serves `http://localhost:4173/ui-component-lab/` |

If `pnpm` on PATH fails with a vite-plus "Failed to resolve package manager" error, use `/Users/oe.kazuma/Library/pnpm/bin/pnpm`.

## Scope

**In scope**:
- `src/lib/ActionMenu.svelte`
- `src/lib/components/tooltip/Demo.svelte`
- `src/lib/components/combobox/Demo.svelte`
- `src/lib/components/toast/Demo.svelte`

**Out of scope** (do NOT touch):
- Any `data.ts` (keyboard-table wording is plan 004).
- `src/lib/components/menu/Demo.svelte` and `split-button/Demo.svelte`. They just use `ActionMenu`.
- Styles. Behavior changes only.

## Git workflow

- Branch: `advisor/003-demo-keyboard-fixes`
- One commit per component is fine, or one commit total. Imperative subject + bullet body (see `git log`).
- Do NOT push or open a PR.

## Steps

### Step 1: ActionMenu closes on Tab / Shift+Tab, on Esc from the trigger, and on outside pointer presses

In `src/lib/ActionMenu.svelte`:

1. Add `let wrap: HTMLDivElement;` next to `button` / `menu`, and `bind:this={wrap}` on the `.menu-wrap` div.
2. In `onMenuKeydown`, add a branch: on `e.key === 'Tab'`, set `open = false` **without** `preventDefault` (focus must still move).
3. In `onButtonKeydown`, add: on `e.key === 'Escape' && open`, `e.preventDefault(); open = false;`.
4. Replace the `onfocusout` logic so a **null** `relatedTarget` no longer closes the menu:
   ```svelte
   	onfocusout={(e) => {
   		// Tab で外の要素へ移ったら閉じる。Safari はクリックでボタンにフォーカスしないため relatedTarget が null になる。null では閉じず、外側のクリックは下の pointerdown で扱う
   		if (e.relatedTarget && !wrap.contains(e.relatedTarget as Node)) open = false;
   	}}
   ```
5. Add, in the script, an effect that listens for outside presses only while open:
   ```ts
   	// 開いている間だけ、メニューの外を押したら閉じる（45 個のデモが同じページにあるので常設しない）
   	$effect(() => {
   		if (!open) return;
   		const onpointerdown = (e: PointerEvent) => {
   			if (!wrap.contains(e.target as Node)) open = false;
   		};
   		document.addEventListener('pointerdown', onpointerdown);
   		return () => document.removeEventListener('pointerdown', onpointerdown);
   	});
   ```

**Verify**: `pnpm check` → exit 0.

### Step 2: Tooltip Esc works however it was opened

In `src/lib/components/tooltip/Demo.svelte`:

1. Remove `onkeydown={(e) => e.key === 'Escape' && (visible = false)}` from the `.wrap` span.
2. Add to the script:
   ```ts
   	// ホバーで出たときはフォーカスが別の場所にあるため、表示中だけ document で Esc を受ける（WCAG 1.4.13）
   	$effect(() => {
   		if (!visible) return;
   		const onkeydown = (e: KeyboardEvent) => {
   			if (e.key === 'Escape') visible = false;
   		};
   		document.addEventListener('keydown', onkeydown);
   		return () => document.removeEventListener('keydown', onkeydown);
   	});
   ```
3. Update the HTML comment above the span only if it no longer matches (it says Esc hides the tooltip, which is still true).

**Verify**: `pnpm check` → exit 0 (if it reports the `svelte-ignore` as unused, remove that ignore line and re-run).

### Step 3: Combobox Esc never opens the list; blur resets the highlight

In `src/lib/components/combobox/Demo.svelte`:

1. Change the Escape case to:
   ```ts
   			case 'Escape':
   				// 閉じているときだけ入力欄を空にする。空にすると全候補が一致するため、open も必ず落とす
   				if (!expanded) value = '';
   				open = false;
   				active = -1;
   				break;
   ```
2. Change `onblur={() => (open = false)}` to:
   ```svelte
   		onblur={() => {
   			open = false;
   			active = -1;
   		}}
   ```

**Verify**: `pnpm check` → exit 0.

### Step 4: Toast ignores Esc that another widget handled, or that an IME is using

In `src/lib/components/toast/Demo.svelte`, change line 23 to:

```svelte
<!-- トーストはフォーカスを受けないので window で Esc を受ける。他の部品が処理済みの Esc と IME 変換中の Esc は無視する -->
<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape' && shown && !e.defaultPrevented && !e.isComposing) shown = false;
	}}
/>
```

**Verify**: `pnpm check` → exit 0; `pnpm build` → exit 0.

### Step 5: Manual behavior check (only if you have a browser tool)

`pnpm preview`, then on `http://localhost:4173/ui-component-lab/en/`:

| Demo | Do | Expected |
|---|---|---|
| Menu | Click "Actions", press Shift+Tab | Menu hidden, focus on "Actions", `aria-expanded="false"` |
| Menu | Click "Actions", click "Duplicate" | Status reads "Chosen: Duplicate", menu closes |
| Menu | Click "Actions", click empty page area | Menu closes |
| Menu | Click "Actions" twice | Menu open, then closed (not reopened) |
| Tooltip | Hover "Copy link" (focus elsewhere), press Esc | Tooltip hidden |
| Combobox | Type `zzz`, press Esc | Field empty, list stays hidden, `aria-expanded="false"` |
| Combobox | ↓ ↓ ↓, Tab away, Tab back, ↓ | First suggestion highlighted |
| Toast | Show toast, open Menu, press Esc | Menu closes, toast stays |

If you have no browser tool, skip this and say so. The reviewer will run it.

## Test plan

- No browser test infrastructure exists yet (plan 008 adds Playwright + axe). The table in Step 5 is the regression checklist. Plan 008's maintainer may turn rows of it into specs.

## Done criteria

- [ ] `grep -n "onkeydown" src/lib/components/tooltip/Demo.svelte` shows no handler on the `.wrap` span (only the one inside `$effect`)
- [ ] `grep -n "addEventListener('pointerdown'" src/lib/ActionMenu.svelte` matches, and a matching `removeEventListener` exists
- [ ] `grep -n "e.relatedTarget &&" src/lib/ActionMenu.svelte` matches
- [ ] `grep -n "isComposing" src/lib/components/toast/Demo.svelte` matches
- [ ] `pnpm check` exits 0; `pnpm build` exits 0
- [ ] Only the 4 in-scope files are modified
- [ ] `plans/README.md` status row updated (unless your reviewer maintains it)

## STOP conditions

- Any excerpt above does not match the live file.
- `pnpm check` reports a new warning you cannot resolve by removing an unused `svelte-ignore`.
- Fixing a demo seems to require editing `menu/Demo.svelte`, `split-button/Demo.svelte` or any `data.ts`.

## Maintenance notes

- Pattern now in use: a document or window listener exists only while a popup is open (`$effect` with cleanup). The toast's `<svelte:window>` is the one permanent listener, guarded as above. New demos should follow the same pattern; plan 009 writes it into `CLAUDE.md`.
- If Popover API (`popover` attribute) is adopted for `ActionMenu` later, its native light dismiss replaces the pointerdown effect.
- A reviewer should check in Safari that clicking a menu item runs it. That was the unverified part of the audit.
