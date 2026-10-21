# Plan 004: Component pages describe exactly what their demos do, with consistent key labels and complete sources

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 149b340..HEAD -- src/lib/components/*/data.ts "src/routes/[lang=lang]/components/[id]/+page.svelte"`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P2 | M | LOW | plans/001-verification-baseline.md (its `data.check.ts` must exist: merging keyboard rows changes `{#each}` keys) | docs (content) | commit `149b340`, 2026-10-21 |

## Why this matters

This is a bilingual field guide to UI components. Every page has a keyboard table, a behavior list and sources, all in `src/lib/components/<id>/data.ts`, next to a live demo. Readers trust the table to match the demo. The audit found 9 places where the text and the demo disagree, a few cross-references that use names the site doesn't use, two sources cited in text but not listed, one design-system page used without the attribution its terms require, and key labels written several different ways for the same keys. Finally, components with no keyboard interaction show a dash inside `<kbd>`, which looks like a key. All changes are text, except one template line.

## Current state

### Data file shape and rules

Each `data.ts` is `export default { ... } satisfies ComponentData;` (schema `src/lib/types.ts`). Every user-visible string is a `Text` object `{ en: '...', ja: '...' }`. **Both languages are required and must say the same thing.** Strings use single quotes; apostrophes inside English strings are the typographic `’` (e.g. `'tag’s button'`), never `\'`. Style for ja: plain form (〜する／〜になる), full-width punctuation 「」。、.

`keyboard` rows are `{ key: string, action: Text }`. `key` is also the `{#each}` key on the detail page, so it must be unique within a component. `pnpm check` runs `node src/lib/data.check.ts`, which enforces this, added by plan 001.

Sources are `{ label, url, checkedAt: 'YYYY-MM-DD' }`. Sources from the Digital Agency Design System (DADS, `https://design.digital.go.jp/...`) must use the label `デジタル庁デザインシステムウェブサイト「<page name>」をもとに作成`; `data.check.ts` enforces this too.

### Key label convention to apply (this plan establishes it)

- Enter before Space: `Enter / Space`.
- ↑ before ↓; ← before →.
- When two keys do symmetric things, use one row (`Home / End`), not two.
- `Tab / Shift + Tab` with spaces around `+`.
- `—` means "no keyboard interaction" (11 components use it; keep those rows).

### Exact current text (verified at `149b340`)

1. `src/lib/components/accordion/data.ts:35-36`
   ```ts
   			key: 'Tab / Shift + Tab',
   			action: { en: 'Moves between headings and content.', ja: '見出しと内容の間を移動する。' }
   ```
   The demo's panels contain only plain text, so Tab never enters content.
2. `src/lib/components/breadcrumb/data.ts:19-22`
   ```ts
   		{
   			en: 'Each name except the last links to that level of the site.',
   			ja: '最後以外の名前は、それぞれの階層のページへのリンクになっている。'
   		},
   ```
   The demo renders the last crumb as a link with `aria-current="page"` (as the APG example does).
3. `src/lib/components/combobox/data.ts` `keyboard` lists ↓, ↑, Alt + ↓, Enter, Esc. The demo also handles ←, →, Home, End (they remove the highlight, per APG). That is missing from the table.
4. `src/lib/components/split-button/data.ts:47-53`
   ```ts
   		{
   			key: '↓ / ↑',
   			action: {
   				en: 'On the arrow, opens the menu. In the menu, moves between items.',
   				ja: '矢印ではメニューを開く。メニュー内では項目を移動する。'
   			}
   		},
   ```
   The shared menu (`src/lib/ActionMenu.svelte`) opens on the first item with ↓ and on the last with ↑, and handles Home/End in the menu. Neither is documented.
5. `src/lib/components/tag/data.ts:30` (behavior) and `:39` (keyboard)
   ```ts
   			en: 'After removing a tag, this demo moves focus to the next tag’s button so keyboard users do not lose their place.',
   ...
   				en: 'Removes the tag and moves focus to the next one.',
   ```
   When the last tag is removed, the demo focuses the *previous* tag. The ja text (「隣のタグ」) is already correct.
6. `src/lib/components/pagination/data.ts:37-40`
   ```ts
   		{
   			key: 'Enter',
   			action: { en: 'Goes to the focused page.', ja: 'フォーカス中のページへ移動する。' }
   		}
   ```
   The demo uses `<button>`s (its own behavior text says so), so Space works too.
7. `src/lib/components/modal/data.ts:35-41`
   ```ts
   			key: 'Tab / Shift + Tab',
   			action: {
   				en: 'Moves between focusable elements inside the dialog only.',
   				ja: 'ダイアログ内の要素の間だけを移動する。'
   			}
   ```
   Native `showModal()` makes the page inert, but Tab can still reach the browser's own UI (address bar).
8. `src/lib/components/listbox/data.ts:37-42` and `src/lib/components/select/data.ts:49-55`, the `A–Z` row:
   ```ts
   			key: 'A–Z',
   			action: {
   				en: 'Jumps to an option starting with the typed characters.',   // listbox; select says "character"
   				ja: '入力した文字で始まる選択肢へ移る。'                           // select: '…選択肢に移る。'
   			}
   ```
   Native `<select>` typeahead only matches raw key presses, not IME input. The ja demos' options are all katakana or kanji, so the row cannot be tried on the ja page.
9. `src/lib/components/select/data.ts:43`: `key: 'Space / Enter',` (convention says `Enter / Space`).
10. `src/lib/components/button/data.ts:31-33`
    ```ts
    		{ key: 'Tab', action: { en: 'Moves focus to the button.', ja: 'ボタンにフォーカスを移す。' } },
    		{ key: 'Enter', action: { en: 'Activates the button.', ja: 'ボタンを実行する。' } },
    		{ key: 'Space', action: { en: 'Activates the button.', ja: 'ボタンを実行する。' } }
    ```
11. `src/lib/components/toggle-button/data.ts:31-32`
    ```ts
    		{ key: 'Space', action: { en: 'Presses or releases the button.', ja: 'ボタンを押す・戻す。' } },
    		{ key: 'Enter', action: { en: 'Presses or releases the button.', ja: 'ボタンを押す・戻す。' } }
    ```
12. `src/lib/components/tabs/data.ts:45-46`
    ```ts
    		{ key: 'Home', action: { en: 'Moves to the first tab.', ja: '最初のタブへ移る。' } },
    		{ key: 'End', action: { en: 'Moves to the last tab.', ja: '最後のタブへ移る。' } }
    ```
    The demo also *selects* the tab on Home/End (automatic activation).
13. `src/lib/components/progress-bar/data.ts:52`: en `'Do not use it to show progress through the steps of a form. Use step navigation for that.'`. The site's en name for that component is "Stepper".
14. `src/lib/components/stepper/data.ts:65`: en `'For a short wait such as loading, use a progress indicator. For moving between pages in a sequence, use pagination.'`. The en name is "Progress bar".
15. `src/lib/components/text-field/data.ts:73-74`, the `related` → `search-field` diff, is identical to the one in `search-field/data.ts:65-66`. It is written from the search field's side:
    ```ts
    				en: 'A search field is a text field for search terms, usually with a search button and a search landmark.',
    				ja: '検索ボックスは検索語を入れるためのテキストフィールドで、検索ボタンや検索のランドマークが付くことが多い。'
    ```
16. `src/lib/components/toolbar/data.ts:60-61`, the `related` → `toggle-button` diff, is identical to `toggle-button/data.ts:52-53`, written from the toggle button's side:
    ```ts
    				en: 'A toggle button is one on/off button; a toolbar groups several buttons and moves between them with arrow keys.',
    				ja: 'トグルボタンはオンとオフを切り替える1つのボタンで、ツールバーは複数のボタンをまとめて矢印キーで行き来させる。'
    ```
17. `src/lib/components/toast/data.ts:42-43`, the `related` → `alert` diff:
    ```ts
    				en: 'A toast floats over the page and disappears on its own; an alert stays in the page content until the problem is fixed.',
    				ja: 'トーストはページの上に浮かんで自動で消え、アラートは問題が解決するまでページの中に残る。'
    ```
    It contradicts `alert/data.ts:48`, which says an alert may be closable.
18. Missing sources. All three URLs below were confirmed to exist on 2026-10-21.
    - `file-upload/data.ts:47` usage cites "WCAG 2.2, 2.5.7 Dragging Movements" but no WCAG source is listed. URL: `https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html` (title "Understanding Success Criterion 2.5.7: Dragging Movements").
    - `stepper/data.ts:94` makes a claim about Apple's "Stepper" without an Apple source. URL: `https://developer.apple.com/design/human-interface-guidelines/steppers` (title "Steppers").
    - `tag/data.ts:59` usage ("Do not tell them apart by color alone") comes from DADS 「チップラベル」 (`https://design.digital.go.jp/dads/components/chip-label/`, which says 色だけで意味を伝えない). Only 「チップタグ」 is in `sources` (`tag/data.ts:84-86`), so the chip-label attribution is missing.
19. `src/routes/[lang=lang]/components/[id]/+page.svelte:88`
    ```svelte
    				<tr><td><kbd>{k.key}</kbd></td><td>{k.action[lang]}</td></tr>
    ```
    For the 11 `key: '—'` rows this renders `<kbd>—</kbd>`.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install (fresh worktree only) | `pnpm install --frozen-lockfile` | exit 0 |
| Checks (includes data.check.ts) | `pnpm check` | exit 0, 0 errors and 0 warnings, two `ok` lines |
| Build | `pnpm build` | exit 0, `✔ done` |

If `pnpm` on PATH fails with a vite-plus "Failed to resolve package manager" error, use `/Users/oe.kazuma/Library/pnpm/bin/pnpm`.

## Scope

**In scope** (only these files):
- `src/lib/components/{accordion,breadcrumb,combobox,split-button,tag,pagination,modal,listbox,select,button,toggle-button,tabs,progress-bar,stepper,text-field,toolbar,toast,file-upload}/data.ts`
- `src/routes/[lang=lang]/components/[id]/+page.svelte` (line 88 only)

**Out of scope** (do NOT touch):
- Any `Demo.svelte`: this plan makes text match the demos, not the other way round.
- `search-field/data.ts`, `toggle-button/data.ts`'s `related` entry, `alert/data.ts`: their side of each pair is already correct.
- `file-upload` alias URL vs source URL (`/file-upload/` vs `/file-upload/usage/`). This is intentional: the alias links the component's overview, and the source links the page the text came from.
- Category assignments (`category:` fields). The audit flagged them as a judgment call for the maintainer.
- Any other key label variation not listed here (e.g. slider's separate `Home` / `End` rows mean min/max and stay; radio's and slider's arrow pairs differ on purpose).

## Git workflow

- Branch: `advisor/004-data-text-accuracy`
- Two commits: (a) behavior/keyboard accuracy + notation + template, (b) sources and cross-references. Imperative subject + bullet body (see `git log`).
- Do NOT push or open a PR.

## Steps

Each replacement below is exact. Keep surrounding formatting: tabs, and one-line rows stay one line.

### Step 1: Keyboard and behavior text that disagrees with the demos

1. accordion Tab row action →
   `{ en: 'Moves between the headings, and into any focusable elements inside open sections.', ja: '見出しの間を移動する。開いた項目の中にフォーカスできる要素があれば、そこにも移る。' }`
2. breadcrumb behavior[0] →
   `en: 'Each name links to that level of the site; the last one is the current page.'`
   `ja: 'それぞれの名前はその階層のページへのリンクで、最後の名前は今いるページを示す。'`
3. combobox: append a row after the `Esc` row:
   ```ts
   		{
   			key: '← / → / Home / End',
   			action: {
   				en: 'Moves the text cursor and removes the highlight from the suggestions.',
   				ja: '入力欄の中でカーソルを動かし、候補の選択を外す。'
   			}
   		}
   ```
4. split-button: replace the `'↓ / ↑'` row with:
   ```ts
   		{
   			key: '↑ / ↓',
   			action: {
   				en: 'On the arrow, opens the menu: ↓ focuses the first item, ↑ the last. In the menu, moves between items.',
   				ja: '矢印では、↓ で最初の項目、↑ で最後の項目にフォーカスしてメニューを開く。メニュー内では項目を移動する。'
   			}
   		},
   		{
   			key: 'Home / End',
   			action: { en: 'In the menu, moves to the first / last item.', ja: 'メニュー内で最初・最後の項目へ移る。' }
   		},
   ```
5. tag: behavior line 30 en →
   `'After removing a tag, this demo moves focus to the next tag’s button (or the previous one if it was the last) so keyboard users do not lose their place.'`
   keyboard line 39 en → `'Removes the tag and moves focus to the next one (or the previous one if it was the last).'`
   Leave both ja strings unchanged: 「隣のタグ」 already covers both directions.
6. pagination: replace the `Enter` row with:
   ```ts
   		{
   			key: 'Enter / Space',
   			action: {
   				en: 'Goes to the focused page. Space works because this demo uses buttons; page links respond to Enter only.',
   				ja: 'フォーカス中のページへ移動する。このデモはボタンなので Space でも動く。ページへのリンクの場合は Enter だけで動く。'
   			}
   		}
   ```
7. modal Tab row action →
   `{ en: 'Moves between the dialog’s controls. The page behind cannot be reached, though focus may move to the browser’s own controls.', ja: 'ダイアログ内の要素の間を移動する。背後のページには移らないが、ブラウザ自体の操作部分には移ることがある。' }`
8. listbox and select `A–Z` row action, the same text in both files →
   `{ en: 'Jumps to an option starting with the typed letter. It matches typed letters only, not IME input.', ja: '入力した英字で始まる選択肢へ移る。日本語入力（IME）では働かないため、日本語版のデモの選択肢では試せない。' }`

**Verify**: `pnpm check` → exit 0.

### Step 2: Key label notation

1. select: `key: 'Space / Enter'` → `key: 'Enter / Space'` (action unchanged).
2. button: replace the `Enter` and `Space` rows with one row:
   `{ key: 'Enter / Space', action: { en: 'Activates the button.', ja: 'ボタンを実行する。' } }`
3. toggle-button: replace the `Space` and `Enter` rows with one row:
   `{ key: 'Enter / Space', action: { en: 'Presses or releases the button.', ja: 'ボタンを押す・戻す。' } }`
4. tabs: replace the `Home` and `End` rows with one row:
   `{ key: 'Home / End', action: { en: 'Moves to the first / last tab and selects it.', ja: '最初・最後のタブへ移って選択する。' } }`

**Verify**: `pnpm check` → exit 0. `grep -rn "key: 'Space / Enter'\|key: '↓ / ↑'" src/lib/components` → no output.

### Step 3: Don't render the "no keyboard" dash as a key

In `src/routes/[lang=lang]/components/[id]/+page.svelte`, change line 88 to:

```svelte
				<tr><td>{#if k.key === '—'}—{:else}<kbd>{k.key}</kbd>{/if}</td><td>{k.action[lang]}</td></tr>
```

**Verify**: `pnpm build` → exit 0; `grep -c '<kbd>—</kbd>' build/en/components/alert/index.html` → `0`; `grep -c '<kbd>Tab</kbd>' build/en/components/tabs/index.html` → `1` or more.

Commit (a) here.

### Step 4: Cross-references use the site's own names and are written from the owning side

1. progress-bar usage en (line 52) → `'Do not use it to show progress through the steps of a form. Use a stepper for that.'` (ja unchanged).
2. stepper usage en (line 65) → `'For a short wait such as loading, use a progress bar. For moving between pages in a sequence, use pagination.'` (ja unchanged).
3. text-field `related` → `search-field` diff →
   `en: 'A text field takes any short text; a search field is one made for search terms, usually with a search button and a search landmark.'`
   `ja: 'テキストフィールドは短い文字列全般に使う。検索ボックスは検索語のための形で、検索ボタンや検索のランドマークが付くことが多い。'`
4. toolbar `related` → `toggle-button` diff →
   `en: 'A toolbar groups several buttons and moves between them with arrow keys; a toggle button is a single on/off button that can sit inside one.'`
   `ja: 'ツールバーは複数のボタンをまとめて矢印キーで行き来させる。トグルボタンはオンとオフを切り替える1つのボタンで、ツールバーの中に置くこともある。'`
5. toast `related` → `alert` diff →
   `en: 'A toast floats over the page and disappears on its own; an alert sits in the page content and stays until it is no longer needed or the user closes it.'`
   `ja: 'トーストはページの上に浮かんで自動で消え、アラートはページの中に置かれ、不要になるか利用者が閉じるまで残る。'`

**Verify**: `pnpm check` → exit 0.

### Step 5: Add the missing sources

Append to each file's `sources` array (keep existing entries and order; add at the end):

- `file-upload/data.ts`:
  ```ts
  		{
  			label: 'WCAG 2.2: Understanding SC 2.5.7 Dragging Movements',
  			url: 'https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html',
  			checkedAt: '2026-10-21'
  		}
  ```
- `stepper/data.ts`:
  ```ts
  		{
  			label: 'Apple Human Interface Guidelines: Steppers',
  			url: 'https://developer.apple.com/design/human-interface-guidelines/steppers',
  			checkedAt: '2026-10-21'
  		}
  ```
- `tag/data.ts`:
  ```ts
  		{
  			label: 'デジタル庁デザインシステムウェブサイト「チップラベル」をもとに作成',
  			url: 'https://design.digital.go.jp/dads/components/chip-label/',
  			checkedAt: '2026-10-21'
  		}
  ```

**Verify**: `pnpm check` → exit 0 (the DADS label regex and the https check pass); `pnpm build` → exit 0.

Commit (b) here.

## Test plan

- `node src/lib/data.check.ts` (inside `pnpm check`) guards key uniqueness, bilingual non-empty text, DADS labels and dates for every edit here.
- Spot check rendered output: `grep -c 'Home / End' build/en/components/tabs/index.html` → ≥ 1; `grep -c 'chip-label' build/ja/components/tag/index.html` → ≥ 1.

## Done criteria

- [ ] `pnpm check` exits 0 (two `ok` lines)
- [ ] `pnpm build` exits 0
- [ ] `grep -rn "key: 'Space / Enter'\|key: '↓ / ↑'\|Use step navigation\|use a progress indicator\|until the problem is fixed" src/lib/components` → no output
- [ ] `grep -c '<kbd>—</kbd>' build/en/components/divider/index.html` → `0`
- [ ] Modified files are a subset of the in-scope list (`git diff --stat <base>`)
- [ ] `plans/README.md` status row updated (unless your reviewer maintains it)

## STOP conditions

- Any "Exact current text" excerpt does not match the live file. Report which one, and do not adapt the wording on your own.
- `data.check.ts` does not exist (plan 001 not applied). Stop before Step 2.
- `pnpm check` fails with a duplicate-key error after Step 2. Report the component and key.
- You find another text/demo mismatch not listed. Note it in your report, and don't fix it.

## Maintenance notes

- The key label convention in "Current state" should be written into `CLAUDE.md` (plan 009) so new components follow it.
- When a demo changes behavior, its `data.ts` keyboard and behavior rows must change in the same commit. Reviewers should check both files together.
- `checkedAt` means the date someone actually opened the source. Do not bulk-update dates.
