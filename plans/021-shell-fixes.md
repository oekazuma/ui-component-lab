# Plan 021: サイトの検索が日本語入力の変換を横取りせず、目次とテーマボタンが今の状態を示す

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 8ba0ef9..HEAD -- src/lib/SearchPalette.svelte src/lib/ThemeToggle.svelte src/lib/registry.ts src/routes/+page.svelte 'src/routes/[lang=lang]/components/[id]/+page.svelte' tests/search.spec.ts tests/layout.spec.ts tests/theme.spec.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P1 | S | LOW | none | bug | `8ba0ef9`（2026-11-02） |

## Why this matters

このサイトは英日の 2 言語で、日本語の名前でも部品を探せる。ところがヘッダーの検索（`SearchPalette.svelte`）は、日本語入力の変換中に押した Enter と ↑↓ を自分の操作として処理する。たとえば「もだる」と打って変換を確定する Enter を押すと、その瞬間に 1 件目の部品のページへ移ってしまう。Chromium で再現済み。サイトのデモ（combobox、command-palette）はすでに同じ問題を避けており、サイト自身の検索だけが抜けている。

ほかに小さな不具合が 4 つある。

- 詳細ページの目次は、下のほうの「似た部品との違い」から別の部品へ移ると、新しいページの先頭にいるのに「出典」を指したままになる（再現済み）
- テーマボタンは、OS が途中でダークに切り替わると `aria-pressed` が古いままになる。最初の 1 回のクリックでは見た目が変わらない
- 一覧の並び順を決める `localeCompare` に locale を渡していないので、プリレンダーとブラウザで順番が変わることがある（チェコ語などでは「ch」が「h」のあとに並ぶ）
- ルートページの「日本語」のリンクに `lang="ja"` がない

## Current state

- `src/lib/SearchPalette.svelte:57-73`（検索欄の keydown と、検索を開くショートカット）:

```ts
	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault();
			move(active + (e.key === 'ArrowDown' ? 1 : -1));
		} else if (e.key === 'Enter' && results[active]) {
			e.preventDefault();
			choose(results[active].data);
		}
	}

	// どのページからでも開けるよう、ショートカットだけは window で常に受け付ける。
	// 修飾キー付きにするのは、1 文字のショートカットだと WCAG 2.1.4（文字キーのショートカット）に当たるため
	function onWindowKeydown(e: KeyboardEvent) {
		if (e.key.toLowerCase() !== 'k' || !(e.metaKey || e.ctrlKey) || e.altKey || e.shiftKey) return;
```

  `onkeydown` は `<input role="combobox" ... {onkeydown}>` に付いている。

- 手本は `src/lib/components/combobox/Demo.svelte:47-51`。同じガードを使う。

```ts
	// APG「Editable Combobox With List Autocomplete」のキー操作に合わせる
	function onkeydown(e: KeyboardEvent) {
		// 日本語入力の変換中の ↓ や Enter は IME の操作なので横取りしない。
		// Safari は変換を確定する Enter で isComposing が false になるため、keyCode 229 も見る
		if (e.isComposing || e.keyCode === 229) return;
```

- テストの手本は `tests/keyboard.spec.ts:104-122`。Playwright では IME の変換を再現できないので、`isComposing: true` を付けた keydown を `dispatchEvent` で送っている。

```ts
// Playwright では IME の変換を再現できないため、変換中を示す isComposing を付けた keydown を送る
test('combobox: arrow keys and Enter during IME composition are left to the IME', async ({ page }) => {
	...
	await input.dispatchEvent('keydown', { key: 'Enter', isComposing: true, bubbles: true });
	await expect(input).toHaveValue('ap');
```

- 検索のテストは `tests/search.spec.ts`。冒頭は次のとおり。

```ts
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { componentIds } from './component-ids';

const shortcut = process.platform === 'darwin' ? 'Meta+k' : 'Control+k';

test('search: the shortcut opens the search, and Enter opens the chosen component', async ({ page }) => {
	await page.goto('ja/components/tabs/');
	await page.waitForLoadState('networkidle');
	await page.keyboard.press(shortcut);
	const dialog = page.getByRole('dialog', { name: '名前で検索' });
	...
	const input = dialog.getByRole('combobox');
```

- 詳細ページの目次の追跡は `src/routes/[lang=lang]/components/[id]/+page.svelte:38-63`。

```ts
	// 画面の上 3 割に入った見出しを「今読んでいる節」とする。
	// ponytail: 上へ戻るときは見出しが上端の帯に入るまで前の節のまま。気になるなら見出しの位置をスクロールごとに比べる
	let current = $state('');
	// 最後の節の見出しは、ページの終わりまでスクロールしても上の帯に届かないことがある。本文の終わりが見えたら最後の節とする
	let atEnd = $state(false);
	let end: HTMLElement;
	let shown = $derived(atEnd ? toc.at(-1) : current);
	$effect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) current = e.target.id;
			},
			{ rootMargin: '0px 0px -70% 0px' }
		);
		for (const id of toc) {
			const heading = document.getElementById(id);
			if (heading) observer.observe(heading);
		}
		const endObserver = new IntersectionObserver(([e]) => (atEnd = e.isIntersecting));
		endObserver.observe(end);
		return () => {
			observer.disconnect();
			endObserver.disconnect();
		};
	});
```

  SvelteKit は詳細ページから詳細ページへの移動でこのコンポーネントを作り直さず、使い回す。`toc` は `data` から作る `$derived` なので、移動するとこの `$effect` は作り直される。ただし `current` と `atEnd` は前のページの値のまま残る。目次のリンクは `aria-current={id === shown ? 'location' : undefined}`。関連部品のリンクは「似た部品との違い」節（`<section aria-labelledby="related">`）の中の `<a href={componentPath(lang, r.id)}>`。

- 目次のテストは `tests/layout.spec.ts:36-52`。

```ts
test('toc: marks the last section once the page is scrolled to the end', async ({ page }) => {
	await page.goto('ja/components/carousel/');
	await page.waitForLoadState('networkidle');
	await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
	const toc = page.getByRole('navigation', { name: 'このページの内容' });
	await expect(toc.getByRole('link', { name: '出典' })).toHaveAttribute('aria-current', 'location');
	await expect(toc.locator('[aria-current]')).toHaveCount(1);
});
```

- `src/lib/ThemeToggle.svelte:1-20`。

```ts
	let { label }: { label: string } = $props();

	// 表示前の色は app.html のスクリプトが data-theme で決める。prerender の時点では OS の設定が分からないので、ここでは描画後に読み直す
	let dark = $state(false);
	$effect(() => {
		const chosen = document.documentElement.dataset.theme;
		dark = chosen ? chosen === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
	});

	function toggle() {
		dark = !dark;
		const theme = dark ? 'dark' : 'light';
		document.documentElement.dataset.theme = theme;
		try {
			localStorage.setItem('theme', theme);
		} catch {
			// 保存できない環境（プライベートブラウズなど）では、このページを開いている間だけ切り替わる
		}
	}
```

  利用者が選んでいなければ（`data-theme` がなければ）CSS は OS の設定に従う（`src/app.css` の `@media (prefers-color-scheme: dark) { :root:not([data-theme='light']) {...} }`）。

- `src/lib/registry.ts:26-33`。

```ts
export const entries = Object.entries(dataModules)
	.map(([path, data]) => {
		...
	})
	.sort((a, b) => a.data.names.en.localeCompare(b.data.names.en));
```

- `src/routes/+page.svelte:15-18`（JS がないときに言語を選ばせるリンク。`<html lang>` は `en`）。

```svelte
	<ul>
		<li><a href={homePath('en')} hreflang="en">English</a></li>
		<li><a href={homePath('ja')} hreflang="ja">日本語</a></li>
	</ul>
```

  手本は `src/routes/404/+page.svelte:20` の `<a href={homePath('ja')} hreflang="ja" lang="ja">`。

- CLAUDE.md の約束事
  - コメントは日本語で、処理の説明ではなく理由を書く。インデントはタブ、文字列はシングルクォート、末尾カンマなし
  - イベントリスナーを document や window に付けるのは、ポップアップが開いている間だけ。`$effect` で付けて、片付けの関数で外す。常設してよいのは toast の `<svelte:window>` と、検索を開くショートカットだけ。`matchMedia` の `MediaQueryList` は document でも window でもないので、`$effect` で付けて片付けで外せばよい

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `pnpm install --frozen-lockfile` | exit 0 |
| Check | `pnpm check` | exit 0 |
| Build | `pnpm build` | exit 0 |
| E2E（一部） | `pnpm exec playwright test tests/search.spec.ts tests/layout.spec.ts tests/theme.spec.ts` | 全件 passed（先に `pnpm build`） |
| E2E（全部） | `pnpm test:e2e` | 全件 passed |

## Scope

**In scope**:
- `src/lib/SearchPalette.svelte`
- `src/lib/ThemeToggle.svelte`
- `src/lib/registry.ts`（`localeCompare` の 1 行だけ）
- `src/routes/+page.svelte`
- `src/routes/[lang=lang]/components/[id]/+page.svelte`（目次の `$effect` だけ）
- `tests/search.spec.ts`、`tests/layout.spec.ts`、`tests/theme.spec.ts`

**Out of scope**:
- `registry.ts` のそのほかの部分。チャンクの分割は別の計画（024）で扱う
- 目次の `ponytail:` コメントにある「上へ戻るときの遅れ」。意図して簡略にしている
- デモ（`src/lib/components/**`）

## Git workflow

- Branch: `advisor/021-shell-fixes`
- コミットメッセージは英語の命令形で 1 文、接頭辞なし（例: `Leave keys to the IME while the combobox input is composing`）。直すものごとに 1 コミットでよい
- push や PR は作らない

## Steps

### Step 1: 検索欄で、変換中のキーを IME に任せる

`SearchPalette.svelte` の `onkeydown` の先頭に、combobox と同じガードを足す。コメントも同じ理由を書く。

```ts
	function onkeydown(e: KeyboardEvent) {
		// 日本語入力の変換中の ↑↓ や Enter は IME の操作なので横取りしない。
		// Safari は変換を確定する Enter で isComposing が false になるため、keyCode 229 も見る
		if (e.isComposing || e.keyCode === 229) return;
```

同じファイルの `onWindowKeydown` の 1 行目は、`e.key` が undefined の keydown（Chrome で自動入力の候補を選んだときなど）で例外になる。`e.key?.toLowerCase() !== 'k'` に変える。

**Verify**: `pnpm check` → exit 0。

### Step 2: 検索の IME のテストを足す

`tests/search.spec.ts` に次のテストを足す。手本は `tests/keyboard.spec.ts` の combobox の IME のテスト。

```ts
// Playwright では IME の変換を再現できないため、変換中を示す isComposing を付けた keydown を送る
test('search: arrow keys and Enter during IME composition are left to the IME', async ({ page }) => {
	await page.goto('ja/');
	await page.waitForLoadState('networkidle');
	await page.keyboard.press(shortcut);
	const dialog = page.getByRole('dialog', { name: '名前で検索' });
	const input = dialog.getByRole('combobox');
	await input.fill('もだる');
	const active = await input.getAttribute('aria-activedescendant');

	await input.dispatchEvent('keydown', { key: 'ArrowDown', isComposing: true, bubbles: true });
	await expect(input).toHaveAttribute('aria-activedescendant', active!);
	await input.dispatchEvent('keydown', { key: 'Enter', isComposing: true, bubbles: true });
	await input.dispatchEvent('keydown', { key: 'Enter', keyCode: 229, bubbles: true });
	await expect(dialog).toBeVisible();
	await expect(page).toHaveURL(/\/ja\/$/);
});
```

**Verify**: `pnpm build && pnpm exec playwright test tests/search.spec.ts` → 全件 passed（5 件）。Step 1 の変更を一時的に外すとこのテストが落ちることも確かめ、確かめたら戻す。

### Step 3: 別の部品へ移ったら、目次の「今読んでいる節」を消す

目次の `$effect` の先頭（`const observer = ...` の前）で、前のページの値を消す。

```ts
	$effect(() => {
		// 関連部品のリンクなどで別の部品へ移っても、このコンポーネントは作り直されず値が残る。
		// 新しいページの節は監視を始めた時点で決め直す
		current = '';
		atEnd = false;
		const observer = new IntersectionObserver(
```

`$effect` は `toc` を読んでいるので、移動のたびに作り直される。`current` と `atEnd` には書き込むだけで読まないので、この `$effect` がそれらに依存することはない。

**Verify**: `pnpm check` → exit 0。

### Step 4: 目次のテストを足す

`tests/layout.spec.ts` の目次のテストのあとに、次のテストを足す。

```ts
test('toc: moving to a similar component from the bottom does not keep the old section marked', async ({ page }) => {
	await page.goto('en/components/button/');
	await page.waitForLoadState('networkidle');
	await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
	const toc = page.getByRole('navigation', { name: 'On this page' });
	await expect(toc.getByRole('link', { name: 'Sources' })).toHaveAttribute('aria-current', 'location');
	await page.locator('section[aria-labelledby="related"] a').first().click();
	await page.waitForURL((url) => !url.pathname.endsWith('/components/button/'));
	await expect(toc.getByRole('link', { name: 'Sources' })).not.toHaveAttribute('aria-current');
});
```

**Verify**: `pnpm build && pnpm exec playwright test tests/layout.spec.ts` → 全件 passed。Step 3 の変更を一時的に外すと、このテストが落ちることも確かめ、確かめたら戻す。

### Step 5: テーマボタンが今の配色を読んでから切り替える

`ThemeToggle.svelte` を次の形にする。

1. 今の配色を返す関数を 1 つ作り、`$effect` と `toggle()` の両方で使う。

```ts
	// 選んだ値（data-theme）を優先し、なければ OS の設定に従う（app.css のダークモードの条件と同じ）
	const os = () => matchMedia('(prefers-color-scheme: dark)');
	const isDark = () => {
		const chosen = document.documentElement.dataset.theme;
		return chosen ? chosen === 'dark' : os().matches;
	};
```

2. `$effect` で `dark = isDark()` とし、OS の設定が変わったときにも `dark = isDark()` を呼ぶ。`os()` の `MediaQueryList` に `change` のリスナーを付けて、片付けで外す。
3. `toggle()` の 1 行目を `dark = !isDark();` にする。

**Verify**: `pnpm check` → exit 0。

### Step 6: テーマのテストを足す

`tests/theme.spec.ts` に次のテストを足す。

```ts
test('theme: the button follows an OS switch while the page is open', async ({ page }) => {
	await page.emulateMedia({ colorScheme: 'light' });
	await page.goto('en/');
	await page.waitForLoadState('networkidle');
	const button = page.getByRole('button', { name: 'Dark mode' });
	await expect(button).toHaveAttribute('aria-pressed', 'false');
	await page.emulateMedia({ colorScheme: 'dark' });
	await expect(button).toHaveAttribute('aria-pressed', 'true');
	await button.click();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
	await expect(button).toHaveAttribute('aria-pressed', 'false');
});
```

**Verify**: `pnpm build && pnpm exec playwright test tests/theme.spec.ts` → 全件 passed。

### Step 7: 並び順の locale と、ルートページの `lang`

1. `src/lib/registry.ts` の並べ替えを `a.data.names.en.localeCompare(b.data.names.en, 'en')` にする。英語の名前を英語の規則で並べる。どのブラウザの言語設定でも、プリレンダーと同じ順になる。
2. `src/routes/+page.svelte` の「日本語」のリンクに `lang="ja"` を足す（404 ページと同じ）。

**Verify**: `pnpm check && pnpm build && pnpm test:e2e` → すべて exit 0、e2e は全件 passed。

## Test plan

- `tests/search.spec.ts` に変換中のキーのテストを 1 件足す（Step 2）
- `tests/layout.spec.ts` に、関連部品へ移ったあとの目次のテストを 1 件足す（Step 4）
- `tests/theme.spec.ts` に、OS の切り替えに追従するテストを 1 件足す（Step 6）
- 足したテストは、直す前のコードでは落ちることを確かめる（Step 2 と Step 4）

## Done criteria

- [ ] `grep -n "e.isComposing || e.keyCode === 229" src/lib/SearchPalette.svelte` → 1 行
- [ ] `grep -n "e.key?.toLowerCase()" src/lib/SearchPalette.svelte` → 1 行
- [ ] `grep -n "localeCompare(b.data.names.en, 'en')" src/lib/registry.ts` → 1 行
- [ ] `grep -n 'hreflang="ja" lang="ja"' src/routes/+page.svelte` → 1 行
- [ ] 新しいテスト 3 件（`IME composition are left to the IME` の search 版、`does not keep the old section marked`、`follows an OS switch`）がある
- [ ] `pnpm check`、`pnpm build`、`pnpm test:e2e` がすべて exit 0
- [ ] `git status` で、In scope 以外のファイルが変わっていない

## STOP conditions

- Step 2 または Step 4 のテストが、直す前のコードでも通る（テストが問題をとらえていない）
- Step 3 のあと、既存の目次のテスト（`marks the section being read`、`marks the last section once the page is scrolled to the end`）が落ち、`current` を消す位置を変えても直らない
- `tests/layout.spec.ts` の新しいテストで、`button` の関連部品のリンクが見つからない（`button/data.ts` の `related` が空になっている）
- 「Current state」の抜粋と実際のコードが違う

## Maintenance notes

- 検索欄にキー操作を足すときは、Step 1 のガードより下に書く。
- 目次の `$effect` がほかの `$state` を読むようになると、Step 3 の書き込みとの間でループしうる。読むものを足すときは注意する。
- テーマの判定は `app.css`、`app.html` のスクリプト、`ThemeToggle.svelte` の 3 か所が同じ条件を持つ。条件を変えるときは 3 か所をそろえる。
