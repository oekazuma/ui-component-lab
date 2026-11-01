# Plan 029: 主な見て回り方、SEO の出力、開いた状態のポップアップが、テストで守られる

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 8ba0ef9..HEAD -- tests`
> 021、022、023、027 は `tests/` にテストを足している。足されたテストは残し、この計画の Step で触る既存のテストが「Current state」の抜粋と違えば STOP。

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P2 | M | LOW | 020、021、022、023、024（テストを足す計画のあと。024 のあとの構成で確かめる） | tests | `8ba0ef9`（2026-11-02） |

## Why this matters

CI は e2e が通ると main を公開する。いまのテストには、壊れても CI が通ってしまう穴がある。

- 一覧のカテゴリの絞り込み（一覧の主な見て回り方）を確かめるテストがない
- sitemap、canonical と hreflang、404.html、ルートの言語の振り分けを確かめるテストがない。設定（`paths.origin`、`trailingSlash`）を変えると、検索エンジンに間違った URL が出る
- axe は、ポップアップがすべて閉じた初期状態しか見ていない。名前のないリストボックスなど、アクセシビリティの誤りは開いた状態に出やすい
- 文書にあるキーのうち、押していないものがある（toast の Esc、split-button のメニュー、tree-view の ↑↓ と Home / End、combobox の ↓ と Enter による選択、メニューの Home / End）
- 保存したテーマを、描画の前に当てるスクリプト（`src/app.html`）のテストが、スクリプトを消しても通る
- 手で並べた一覧（Thumb を持つ部品、カテゴリの数）が、部品を足すと黙ってずれる
- 落ちることのない確かめ方がいくつかある

同じ axe の呼び出しが 4 か所に写してあり、WCAG のタグの一覧がずれうる。

## Current state

- テストは Playwright（`tests/*.spec.ts`）。`playwright.config.ts` の `baseURL` は `http://localhost:4180/ui-component-lab/`。`vite preview` で `build/` を配る（先に `pnpm build`）。
- デモを開くヘルパーは `tests/open-demo.ts` の `openDemo(page, path)`。DemoFrame（`role="group"`、名前は `Demo: …`）を返す。部品の id の一覧は `tests/component-ids.ts` の `componentIds`（`src/lib/components/` を `readdirSync` で読む）。
- axe の呼び出しは、次の形が 4 か所にある（`tests/a11y.spec.ts` に 2 か所、`tests/theme.spec.ts`、`tests/search.spec.ts`）。

```ts
		const { violations } = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
			.analyze();
		expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
```

  `tests/theme.spec.ts` は、ダークモードで `['ja/', 'en/components/alert/', 'ja/components/badge/', 'en/components/alert-dialog/']` を回す。`tests/a11y.spec.ts` はすでに全部品の `en/components/<id>/` をダークモードで回しているので、`en/components/alert/` と `en/components/alert-dialog/` は重複している。

- 開いた状態にするモーダルなデモの一覧は、`tests/dialog-frame.spec.ts` の `demos`（drawer、hamburger-menu、modal、alert-dialog、command-palette）。それぞれ `path`、開くボタンの名前 `open`、`role`、ダイアログの名前 `name` を持つ。
- 一覧のカテゴリの絞り込みは `src/routes/[lang=lang]/+page.svelte`。見た目はピルだが中身はネイティブのラジオボタンで、`<fieldset>`（`<legend class="visually-hidden">` が en は `Category`）の中に「All」と 7 つのカテゴリがある。選んだカテゴリは `src/lib/filter.svelte.ts` のモジュールの状態に置かれ、詳細ページへ移って戻っても残る。カテゴリの名前は `src/lib/i18n.ts` の `categoryNames`（en は `Action`、`Input`、`Navigation`、`Disclosure`、`Overlay`、`Feedback`、`Data display`）。カードは `ul.grid > li.card`。
- `tests/thumbs.spec.ts` の `opened` は、Thumb を持つ部品の英語名を手で並べた配列（023 のあとは Skeleton を含む 13 件）。カードは `card(page, en)` で、見出しのリンクの名前の正規表現で探している。
- `tests/components-json.spec.ts` の最後は `expect(json.categories).toHaveLength(7);`。カテゴリの一覧は `src/lib/types.ts` の `categories`。
- `tests/polish.spec.ts` の 1 つ目のテストは、対応表の索引のリンクの文字を並べ、並べ替えた結果と比べる。リンクが 1 つもなくても `[]` と `[]` で通る。
- `tests/thumbs.spec.ts` の 2 つ目のテストは、サムネイルの中の文字のある要素の左端の最小値を `Math.min(...)` で取る。文字のある要素がないと `Infinity` になり、確かめずに通る。
- `tests/theme.spec.ts` の 1 つ目のテストは、ボタンでダークにしたあと再読み込みし、`html` の `data-theme` が `dark` になるのを待つ。`toHaveAttribute` は待ちながら繰り返すので、`src/app.html` の描画前のスクリプトを消しても、あとから `ThemeToggle.svelte` が付ければ通る。描画前のスクリプトは `localStorage` の `theme` を読み、`dark` か `light` なら `document.documentElement.dataset.theme` に入れる。
- SEO の出力は次のとおり。
  - `build/sitemap.xml` は、言語（en、ja）ごとに、一覧、`systems/`、`skill/`、全部品の詳細ページを `<url><loc>…</loc></url>` で並べる。数は 2 ×（3 + 部品数）
  - 各ページの `<link rel="canonical">` と、`<link rel="alternate" hreflang="en|ja|x-default">` は `https://oekazuma.github.io/ui-component-lab/...` の絶対 URL で、末尾はスラッシュ。x-default は `https://oekazuma.github.io/ui-component-lab/`
  - `build/404.html` は `<meta name="robots" content="noindex">` を持ち、JS と CSS を `/ui-component-lab/_app/` からの絶対パスで読む
  - ルート（`/ui-component-lab/`）は、`navigator.languages` に `ja` で始まるものがあれば `/ja/` へ、なければ `/en/` へ `location.replace` する
- 時間で動くテストのうち、実時間の短い窓に頼るものは次のとおり。
  - `tests/keyboard.spec.ts` の feed のテスト（`feed: Page Down / Page Up move by article, ...`）は、続きの読み込み中（400 ms）の `aria-busy="true"` を見ている
  - `tests/demos.spec.ts` の progress bar のテスト（`progress bar: starts indeterminate, ...`）は、最初の 1 秒の「値なし」を見ている

  同じファイルの toast と skeleton のテストは `page.clock` を使っている（例: `await page.clock.install();` のあと `openDemo`、`await page.clock.fastForward(5000);`）。これを手本にする。
- キーの文書は各部品の `src/lib/components/<id>/data.ts` の `keyboard`。テストを書く前に読み、文書どおりの動きを確かめる。

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `pnpm install --frozen-lockfile` | exit 0 |
| Check | `pnpm check` | exit 0（`tests/` も型検査される） |
| Build | `pnpm build` | exit 0 |
| E2E（1 ファイル） | `pnpm exec playwright test tests/<file>.spec.ts` | 全件 passed |
| E2E（全部） | `pnpm test:e2e` | 全件 passed |

## Scope

**In scope**:
- `tests/axe.ts`（新規）、`tests/seo.spec.ts`（新規）
- `tests/a11y.spec.ts`、`tests/theme.spec.ts`、`tests/search.spec.ts`、`tests/list.spec.ts`、`tests/keyboard.spec.ts`、`tests/demos.spec.ts`、`tests/thumbs.spec.ts`、`tests/components-json.spec.ts`、`tests/polish.spec.ts`、`tests/dialog-frame.spec.ts`

**Out of scope**:
- `src/` のすべて。テストを足して不具合が見つかっても、この計画では直さない（STOP して報告）
- `playwright.config.ts`（020 が触った）
- WebKit や Firefox のプロジェクトの追加

## Git workflow

- Branch: `advisor/029-test-gaps`
- コミットメッセージは英語の命令形で 1 文、接頭辞なし（例: `Add Playwright with axe and keyboard specs, fix badge ja label`）。Step ごとに 1 コミット
- push や PR は作らない

## Steps

### Step 1: axe の呼び出しを 1 つにまとめる

`tests/axe.ts` を作る。

```ts
import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';

// 検査する WCAG の水準は 1 か所で決める。写しが増えると、一部だけ水準が違ってしまう
export async function expectNoAxeViolations(page: Page) {
	const { violations } = await new AxeBuilder({ page })
		.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
		.analyze();
	expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
}
```

4 か所の呼び出しを `await expectNoAxeViolations(page);` に置き換え、使わなくなった `AxeBuilder` の import を消す。`tests/theme.spec.ts` のダークモードの一覧から、`a11y.spec.ts` と重なる `'en/components/alert/'` と `'en/components/alert-dialog/'` を外す。

**Verify**: `grep -rn "new AxeBuilder" tests | wc -l` → `1`（`tests/axe.ts` だけ）。`pnpm check` → exit 0。

### Step 2: 開いた状態のポップアップを axe で調べる

`tests/a11y.spec.ts` に、開いた状態で axe を回すテストを足す。ライトとダークの両方で回す。

1. モーダルなデモは、`tests/dialog-frame.spec.ts` の `demos` を `export` して使う（`dialog-frame.spec.ts` の `const demos` を `export const demos` にする）。開くボタンを押し、ダイアログが見えてから `expectNoAxeViolations(page)`。
2. ほかに、次のポップアップを開いて調べる。開き方は、それぞれの `data.ts` の `keyboard` と、`tests/keyboard.spec.ts` の既存のテストを読んで決める。
   - menu（メニューボタンを押す）
   - combobox（入力欄に `a` などを入れて候補を出す）
   - popover（開くボタンを押す）
   - tooltip（ボタンにフォーカスする）
   - context-menu（ファイルにフォーカスして `Shift+F10`）
   - menubar（最初の項目で `ArrowDown` を押してサブメニューを開く）
   - select は `<select>` なので対象外

一覧の形の例を示す。

```ts
// 開いた状態に出る誤り（名前のないリスト、コントラストなど）は、閉じた初期状態の検査では見つからない
const popups = [
	{ path: 'en/components/menu/', open: async (demo: Locator) => { /* ... */ } },
	...
];
for (const scheme of ['light', 'dark'] as const)
	for (const p of popups)
		test(`no axe violations with the popup open (${scheme}): ${p.path}`, async ({ page }) => {
			await page.emulateMedia({ colorScheme: scheme });
			const demo = await openDemo(page, p.path);
			await p.open(demo, page);
			await expectNoAxeViolations(page);
		});
```

**Verify**: `pnpm build && pnpm exec playwright test tests/a11y.spec.ts -g "popup open"` → 全件 passed。axe の違反が見つかったら、直さずに STOP し、違反の一覧を報告する。

### Step 3: カテゴリの絞り込みのテストを足す

`tests/list.spec.ts` に足す。

```ts
test('list: a category shows only its components, stays chosen after visiting one, and All brings back every card', async ({ page }) => {
	await page.goto('en/');
	await page.waitForLoadState('networkidle');
	const cards = page.locator('ul.grid > li.card');
	await expect(cards).toHaveCount(componentIds.length);
	const category = page.getByRole('group', { name: 'Category' });
	await category.getByRole('radio', { name: 'Overlay' }).check();
	const overlay = await cards.count();
	expect(overlay).toBeGreaterThan(0);
	expect(overlay).toBeLessThan(componentIds.length);

	await cards.first().getByRole('link').click();
	await page.goBack();
	await expect(category.getByRole('radio', { name: 'Overlay' })).toBeChecked();
	await expect(cards).toHaveCount(overlay);

	await category.getByRole('radio', { name: 'All' }).check();
	await expect(cards).toHaveCount(componentIds.length);
});
```

`componentIds` を `./component-ids` から import する。カテゴリの件数が正しいかは、`components.json` から数えた件数と比べてもよい（`request.get('components.json')` で `category === 'overlay'` の数）。比べる場合は、Overlay の件数がそれと一致することを確かめる。

**Verify**: `pnpm build && pnpm exec playwright test tests/list.spec.ts` → 全件 passed。

### Step 4: SEO の出力のテストを足す

`tests/seo.spec.ts` を作り、次の 4 件を書く。

1. `sitemap.xml` を `request.get('sitemap.xml')` で取り、`<loc>` の数が `2 * (3 + componentIds.length)` で、どれも `https://oekazuma.github.io/ui-component-lab/` で始まり `/` で終わる
2. `ja/components/modal/` を開き、`link[rel="canonical"]` の `href` が `https://oekazuma.github.io/ui-component-lab/ja/components/modal/`、`link[rel="alternate"][hreflang="en"]` が `.../en/components/modal/`、`[hreflang="ja"]` が `.../ja/components/modal/`、`[hreflang="x-default"]` が `https://oekazuma.github.io/ui-component-lab/`
3. `request.get('404.html')` の本文に `noindex` が含まれ、`/ui-component-lab/_app/` を含む
4. 日本語のブラウザでルートを開くと `/ja/` へ移る。`test.use({ locale: 'ja-JP' })` は 1 ファイル全体に効くので、このテストだけ `browser.newContext({ locale: 'ja-JP', baseURL: ... })` で別のコンテキストを作る。`baseURL` は `playwright.config.ts` と同じ値を使う（`test.info().project.use.baseURL`）。英語（`en-US`）では `/en/` へ移ることも確かめる

**Verify**: `pnpm build && pnpm exec playwright test tests/seo.spec.ts` → 4 件 passed。

### Step 5: 描画前のテーマのスクリプトを確かめる

`tests/theme.spec.ts` に足す。アプリの JS を止めた状態で読み込み、描画前のスクリプトだけで `data-theme` が入ることを見る。

```ts
test('theme: the saved theme is applied before the app starts', async ({ page }) => {
	await page.goto('ja/');
	await page.evaluate(() => localStorage.setItem('theme', 'dark'));
	// アプリの JS を止めても付いていれば、app.html の描画前のスクリプトが付けている
	await page.route('**/_app/**/*.js', (route) => route.abort());
	await page.reload();
	expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe('dark');
});
```

もう 1 件、OS がダークで、保存した値が `light` のときに `data-theme` が `light` になり、背景が白（`rgb(255, 255, 255)`）であることを確かめる。

**Verify**: `pnpm build && pnpm exec playwright test tests/theme.spec.ts` → 全件 passed。`src/app.html` の `<script>` を一時的に消して `pnpm build` し直すと、1 件目が落ちることを確かめる。確かめたら戻して、もう一度 `pnpm build` する。

### Step 6: 押していなかった文書のキーを押す

`tests/keyboard.spec.ts` に足す。どのテストも、その部品の `data.ts` の `keyboard` の文と同じ動きを確かめる。

1. toast: Undo の付いたトーストを出し、`Escape` で消え、フォーカスが出したボタン（Archive）に戻る。ボタンの名前は `tests/demos.spec.ts` の toast のテストを読んで合わせる
2. split-button: メニューを開くボタンにフォーカスし、`data.ts` に書かれたキーで開き、`Home` と `End` で最初と最後の項目へ移り、`Escape` で閉じてフォーカスが開いたボタンに戻る
3. tree view: 既存のテストに続けて、または別のテストで、`ArrowDown` と `ArrowUp` で見えている次・前の項目へ、`Home` と `End` で最初と最後の見えている項目へ移る
4. combobox: 入力欄にフォーカスし、`ArrowDown` を 2 回、`Enter` で 2 つ目の候補が入力欄に入り、候補が閉じる（`aria-expanded="false"`）。`Alt+ArrowDown` では候補が開くが、どれも選ばれない（`aria-activedescendant` がない）
5. menu: 既存の矢印キーのテストに、`Home` と `End` で最初と最後の項目へ移る確かめを足す

**Verify**: `pnpm build && pnpm exec playwright test tests/keyboard.spec.ts` → 全件 passed。文書と違う動きが見つかったら、直さずに STOP して報告する。

### Step 7: 実時間の短い窓に頼るテストを、時計を止めて書き直す

`tests/keyboard.spec.ts` の feed のテストと、`tests/demos.spec.ts` の progress bar のテストの冒頭で、`openDemo` の前に `await page.clock.install();` を呼ぶ。読み込み中や「値なし」の状態を確かめてから、`await page.clock.fastForward(<ms>)` で時間を進めて、次の状態を確かめる。進める量は、`feed/Demo.svelte` と `progress-bar/Demo.svelte` の `setTimeout` や `setInterval` の値を読んで決める。progress bar の `{ timeout: 10_000 }` は、時間を進める形にしたら外す。

**Verify**: `pnpm build && pnpm exec playwright test tests/keyboard.spec.ts tests/demos.spec.ts -g "feed|progress bar" --repeat-each 5` → 全件 passed。

### Step 8: 手で並べた一覧を、ソースから作る

1. `tests/thumbs.spec.ts` の `opened` を消し、`src/lib/components/` の中で `Thumb.svelte` を持つディレクトリを `readdirSync` と `existsSync` で集める。カードは `page.locator('li.card', { has: page.locator(`a[href$="/components/${id}/"]`) })` で探す。`card(page, en)` は、ほかのテストが使っていれば残す。
2. `tests/components-json.spec.ts` の `toHaveLength(7)` を、`src/lib/types.ts` から import した `categories` の長さと比べる形にする（`import { categories } from '../src/lib/types.ts';`）。

**Verify**: `pnpm check && pnpm build && pnpm exec playwright test tests/thumbs.spec.ts tests/components-json.spec.ts` → 全件 passed。

### Step 9: 落ちることのない確かめ方を直す

1. `tests/polish.spec.ts` の 1 つ目のテストで、並べ替えと比べる前に `expect(names.length).toBeGreaterThan(1)` を確かめる。
2. `tests/thumbs.spec.ts` の余白のテストで、文字のある要素が 1 つもないサムネイルも見出しの名前を返して落とす（`if (!text.length) return [名前]`）。そうしたサムネイルが実際にあれば STOP して報告する。

**Verify**: `pnpm build && pnpm exec playwright test tests/polish.spec.ts tests/thumbs.spec.ts` → 全件 passed。

### Step 10: 全体を確かめる

**Verify**: `pnpm check && pnpm build && pnpm test:e2e` → すべて exit 0、全件 passed。

## Test plan

この計画そのものがテストの追加。新しいテストは、開いた状態の axe（モーダル 5 件とポップアップ 6 件、それぞれライトとダーク）、カテゴリの絞り込み、SEO の 4 件、描画前のテーマ 2 件、キー操作 5 件。描画前のテーマのテストは、スクリプトを消すと落ちることを確かめる（Step 5）。

## Done criteria

- [ ] `grep -rn "new AxeBuilder" tests | wc -l` → `1`
- [ ] `test -f tests/seo.spec.ts` が成功し、4 件のテストがある
- [ ] `grep -n "popup open" tests/a11y.spec.ts` → 1 行以上
- [ ] `grep -n "toHaveLength(7)" tests/components-json.spec.ts` → 0 行
- [ ] `grep -n "^const opened" tests/thumbs.spec.ts` → 0 行
- [ ] Step 7 の `--repeat-each 5` が全件 passed
- [ ] `pnpm check`、`pnpm build`、`pnpm test:e2e` がすべて exit 0
- [ ] `git status` で、`tests/` 以外のファイルが変わっていない

## STOP conditions

- 新しいテストで、サイトやデモの不具合（axe の違反、文書と違うキーの動き、文字のないサムネイル）が見つかった。直さずに、何が起きたかを報告する
- `page.clock` を使うと、デモの動きが変わってテストが書けない
- 既存のテストの意図を変えないと、新しいテストが書けない

## Maintenance notes

- WCAG の水準を変えるときは `tests/axe.ts` の 1 か所を直す。
- 開いて使う部品を足したら、`tests/a11y.spec.ts` の `popups` に開き方を足す。
- sitemap の数は、一覧・対応表・案内のページを増やすと変わる。`3` をページの数に合わせる。
