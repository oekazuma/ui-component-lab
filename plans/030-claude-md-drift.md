# Plan 030: CLAUDE.md と README の規則が、今のコードと一致する

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 8ba0ef9..HEAD -- CLAUDE.md README.md src/lib/ActionMenu.svelte src/lib/components/drawer src/lib/components/hamburger-menu src/lib/components/command-palette/Thumb.svelte src/lib/components/modal/Thumb.svelte tests/dialog-frame.spec.ts`
> 024 は CLAUDE.md の 15 行目と 32 行目を書き換え、「コードの約束事」に 1 行足している。029 は `tests/dialog-frame.spec.ts` の `demos` を `export` にしている。これら以外の差分があれば STOP。

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P3 | S | LOW | 024、026、029（同じ CLAUDE.md と `tests/dialog-frame.spec.ts` を触る） | docs | `8ba0ef9`（2026-11-02） |

## Why this matters

このリポジトリでは、エージェントが CLAUDE.md の規則を読んで部品を足す。規則と実際のコードが食い違っていると、規則どおりに書いたエージェントが既存のコードと違うものを作るか、動いているコードを書き換えてしまう。

- import の規則は「`src/lib` の中では相対パス」だが、デモと Thumb の 79 ファイルはすべて `#lib` を使っている
- モーダルなデモの中身の箱に `overflow: auto` を付けない、という規則の手本に挙げた `drawer/Demo.svelte` が、`overflow: auto` を付けている（`hamburger-menu/Demo.svelte` も）
- `data.ts` が `#lib` から import できるのは型だけ（026 で検査にした）だが、CLAUDE.md に書いていない
- 色の規則は「トークンを使う」だが、影とモーダルの背景の半透明の黒（`rgb(0 0 0 / …)`）は 20 か所ほどで直に書かれている。これはダークモードでも読めるので、規則のほうに例外として書く

あわせて、古くなったコメント（`ActionMenu.svelte` の「45 個のデモ」、Thumb の「デモの ::backdrop と同じ」）と、README の部品の足し方の抜けを直す。

## Current state

- CLAUDE.md の「## コードの約束事」の 1 行目は ``routes と data.ts からは `#lib/*.js` で import し、`src/lib` の中では相対パスを使う。`src/params.ts` はビルド時に Node が直接読むので `#lib` を使わない``。実際は、`src/lib/components/*/Demo.svelte` と `Thumb.svelte` は `import type { Lang } from '#lib/types.js';` や `import ActionMenu from '#lib/ActionMenu.svelte';` のように `#lib` を使い、`src/lib` 直下の共通のモジュール（`SearchPalette.svelte`、`i18n.ts` など）は `./i18n` のような相対パスを使う。
- CLAUDE.md の「### Demo.svelte」のモーダルの行は ``モーダルなデモ（`<dialog>` の `showModal()`）は、`<dialog>` に `class="in-frame"`（`src/app.css`）を付け、中身を子要素に入れて、デモの枠に重ねて出す。画面全体に出ると、どのデモの動きかが分かりにくいため。中身の箱に `overflow: auto` を付けると、開いたときのフォーカスが箱に移るので付けず、収まらないときはデモの高さを広げる（例: `drawer/Demo.svelte`、`modal/Demo.svelte`）``。
- `src/lib/components/drawer/Demo.svelte` の `.panel`（`<dialog class="in-frame">` の直下の箱）は `overflow: auto;` を持ち、`.demo` は `min-height: 15rem;`。`src/lib/components/hamburger-menu/Demo.svelte` の `.panel` も `overflow: auto;` を持ち、`.demo` は `min-height: 17rem;`。どちらの箱にも「閉じる」ボタンがある。Chromium で確かめると、開いたときのフォーカスは今も「Close」ボタンに移る。それでも規則に合わせて外し、開いたときのフォーカスをテストで固定する。
- CLAUDE.md の「### Demo.svelte」の色の行は ``色は `src/app.css` のトークン（`--color-*`）を使う。ダークモードではトークンの値が切り替わるので、色を直に書くとダークモードで読めなくなる。…``。
- `src/lib/ActionMenu.svelte:65` は `// 開いている間だけ、メニューの外を押したら閉じる（45 個のデモが同じページにあるので常設しない）`。部品は今 67 個。
- `drawer/Thumb.svelte:28`、`hamburger-menu/Thumb.svelte:33`、`modal/Thumb.svelte:28` は `<!-- 暗くする色はデモの ::backdrop と同じにする。トークンはどれもダークモードで明るい色に変わり、背景が暗くならないため -->`、`command-palette/Thumb.svelte:51` は `/* デモの ::backdrop と同じ黒の半透明。ダークモードでも背後を暗く沈める */`。今のデモは `::backdrop` を透明にし（`src/app.css` の `dialog.in-frame::backdrop { background: transparent; }`）、`dialog.in-frame` 自身の `background: rgb(0 0 0 / 0.4)` で枠の中を暗くしている。
- `tests/dialog-frame.spec.ts` は、5 つのモーダルなデモ（drawer、hamburger-menu、modal、alert-dialog、command-palette）が枠の中に出ることと、暗い部分のクリックで閉じることを確かめている。開いたときのフォーカスの位置は確かめていない。`openInFrame(page, d)` は `[demo, button]` を返す。
- README.md の「## Adding a component」は ``Create `src/lib/components/<id>/` with two files.`` で始まり、`data.ts` と `Demo.svelte` だけを挙げ、最後は ``Then run `pnpm check` and `pnpm build`.``。「## Development」は `pnpm install` と `pnpm dev` だけ。`package.json` は `engines.node` が `>=24`、`packageManager` が `pnpm@10.34.7`、`.npmrc` は `engine-strict=true`。
- 約束事: コメントは日本語で、理由を書く。README は英語。docs には経緯を書かず、今の仕様だけを書く。

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `pnpm install --frozen-lockfile` | exit 0 |
| Check | `pnpm check` | exit 0 |
| Build / E2E | `pnpm build && pnpm exec playwright test tests/dialog-frame.spec.ts` | 全件 passed |
| E2E（全部） | `pnpm test:e2e` | 全件 passed |

## Scope

**In scope**:
- `CLAUDE.md`、`README.md`
- `src/lib/ActionMenu.svelte`（コメント 1 行）
- `src/lib/components/drawer/Demo.svelte`、`src/lib/components/hamburger-menu/Demo.svelte`（`.panel` の `overflow` と、必要なら `.demo` の `min-height`）
- `src/lib/components/drawer/Thumb.svelte`、`hamburger-menu/Thumb.svelte`、`modal/Thumb.svelte`、`command-palette/Thumb.svelte`（コメントだけ）
- `tests/dialog-frame.spec.ts`

**Out of scope**:
- 影や背景の `rgb(0 0 0 / …)` をトークンに置き換えること（規則に例外として書く）
- import の書き方を規則に合わせて書き換えること（規則を実際に合わせる）

## Git workflow

- Branch: `advisor/030-claude-md-drift`
- コミットメッセージは英語の命令形で 1 文、接頭辞なし（例: `Document conventions in CLAUDE.md and README`）。2〜3 コミットでよい
- push や PR は作らない

## Steps

### Step 1: import の規則を実際に合わせる

「## コードの約束事」の 1 行目を次にする。

```text
- routes、data.ts、`src/lib/components/` の中のファイルからは `#lib/*.js` で import する。`src/lib` 直下の共通のモジュールどうしは相対パスを使う。`src/params.ts` はビルド時に Node が直接読むので `#lib` を使わない
```

「### data.ts」の節の最後に、次の 1 行を足す。

```text
- `#lib` から import できるのは型だけ（`import type`）。`src/lib/data.check.ts` が data.ts を Node で直接読み、`#lib/types.js` は .ts の実体を指さないため（`data.check.ts` が確かめる）
```

### Step 2: 影と背景の色の例外を書く

「### Demo.svelte」の色の行の最後に、次の 1 文を足す。

```text
影（`box-shadow`）と、モーダルの背景を暗くする半透明の黒（`rgb(0 0 0 / …)`）は、ライトでもダークでも背景を暗く沈めるだけなので、直に書いてよい（`src/app.css` の `dialog.in-frame` も同じ）
```

### Step 3: ドロワーとハンバーガーメニューの箱から `overflow: auto` を外す

1. 2 つのデモの `.panel` から `overflow: auto;` を消す。
2. `pnpm build` のあと、詳細ページ（`en/components/drawer/` と `en/components/hamburger-menu/`）で開いた状態の中身が枠に収まっているかを、`tests/dialog-frame.spec.ts` を流して確かめる（Step 4 のテストでも確かめる）。はみ出すなら、CLAUDE.md の規則どおり `.demo` の `min-height` を広げる。広げた値と理由を NOTES に書く。

### Step 4: 開いたときのフォーカスをテストで固定する

`tests/dialog-frame.spec.ts` に足す。開いたあと、フォーカスがダイアログの中の `button` か入力欄にあり、ダイアログの中身の箱そのものではないことを確かめる。

```ts
for (const d of demos) {
	test(`${d.name}: focus moves to a control inside it when it opens`, async ({ page }) => {
		await openInFrame(page, d);
		const dialog = page.getByRole(d.role, { name: d.name });
		const focused = await dialog.evaluate((el) => {
			const a = document.activeElement;
			return a && el.contains(a) ? a.tagName : null;
		});
		expect(['BUTTON', 'INPUT']).toContain(focused);
	});
}
```

あわせて、ダイアログの中身がダイアログの枠の外にはみ出していないこと（中身の箱の `scrollHeight` が `clientHeight` 以下）を確かめてもよい。

**Verify**: `pnpm build && pnpm exec playwright test tests/dialog-frame.spec.ts` → 全件 passed。

### Step 5: 古くなったコメントを直す

1. `src/lib/ActionMenu.svelte:65` の `（45 個のデモが同じページにあるので常設しない）` を `（ページに多くのデモが並ぶので常設しない）` にする。
2. 4 つの Thumb の「デモの ::backdrop と同じ」を「デモの `dialog.in-frame` の背景（`src/app.css`）と同じ」にする。理由の後半（トークンはダークモードで明るくなる、など）はそのまま残す。

### Step 6: README の部品の足し方と開発の準備を補う

1. 「## Development」の `pnpm install` の前に、`Requires Node.js 24 or later and pnpm (enable it with `corepack enable`).` を 1 行足す。
2. 「## Adding a component」の箇条書きに、`- `Thumb.svelte` (optional): a still picture of the opened state for the list page, for components that open (menus, dialogs, toasts). See CLAUDE.md.` を足す。`with two files` は `with two files (and an optional third)` にする。
3. 最後の文を ``Then run `pnpm check`, and `pnpm build && pnpm test:e2e` (Playwright with axe).`` にする。

### Step 7: 全体を確かめる

**Verify**: `pnpm check && pnpm build && pnpm test:e2e` → すべて exit 0。

## Test plan

`tests/dialog-frame.spec.ts` に、開いたときのフォーカスのテストを 5 件（デモごと）足す。ほかは文書とコメントの変更。

## Done criteria

- [ ] `grep -n "src/lib/components/\` の中のファイルからは" CLAUDE.md` → 1 行
- [ ] `grep -n "import type" CLAUDE.md` → 1 行以上
- [ ] `grep -n "rgb(0 0 0" CLAUDE.md` → 1 行
- [ ] `grep -n "overflow: auto" src/lib/components/drawer/Demo.svelte src/lib/components/hamburger-menu/Demo.svelte` → 0 行
- [ ] `grep -rn "::backdrop と同じ" src/lib/components` → 0 行
- [ ] `grep -n "45 個" src/lib/ActionMenu.svelte` → 0 行
- [ ] `grep -n "Thumb.svelte" README.md` → 1 行以上
- [ ] `pnpm check`、`pnpm build`、`pnpm test:e2e` がすべて exit 0
- [ ] `git status` で、In scope 以外のファイルが変わっていない

## STOP conditions

- Step 3 で `overflow: auto` を外すと、`min-height` を 24rem より広げないと中身が収まらない（デモの形を考え直す必要がある）
- Step 4 のテストが、`overflow: auto` を外す前のコードで落ちる（そのときは規則の理由どおりの不具合が起きていたことになるので、そのまま報告する）
- 「Current state」の抜粋と実際のファイルが違う

## Maintenance notes

- CLAUDE.md に例として挙げるファイルは、規則を守っているものにする。規則を変えたら、例のファイルも見直す。
- モーダルなデモを足したら、`tests/dialog-frame.spec.ts` の `demos` に足すと、枠に収まることと開いたときのフォーカスの両方が確かめられる。
