# Plan 022: ステップナビゲーション、メガメニュー、Back to top のデモでフォーカスが失われない

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 8ba0ef9..HEAD -- src/lib/components/stepper src/lib/components/mega-menu src/lib/components/back-to-top src/lib/components/checkbox tests/keyboard.spec.ts tests/demos.spec.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P1 | S | LOW | none | bug | `8ba0ef9`（2026-11-02） |

## Why this matters

このサイトは、UI 部品の名前と動きを、デモを触って覚えてもらうためのもの。キー操作の手本を見せるデモが、押したボタンや選んだリンクを消してフォーカスを `<body>` に落としている（3 つとも Chromium で再現済み）。キーボードや読み上げの利用者は、ページの先頭からたどり直すことになる（WCAG 2.4.3 フォーカス順序）。

- ステップナビゲーション: 済んだ段階のボタンを押すと、そのボタンが `<span>` に置き換わる
- メガメニュー: パネル内のリンクを選ぶとパネルが閉じ、選んだリンクが見えなくなる
- Back to top: ボタンにフォーカスがある状態で Home キーなどで上へ戻ると、ボタンが `display: none` になる

あわせて、チェックボックスのデモは、エラーの属性が DOM に入る前にフォーカスを移している。フォーカスした瞬間の読み上げに「無効」とエラーの文が入らないことがある。

## Current state

約束事（CLAUDE.md より）は次のとおり。

- デモの挙動を変えたら、同じコミットで `data.ts` の `keyboard` と `behavior` を直す。独自のキー操作を変えたときは `tests/keyboard.spec.ts` も直す
- 文言は `{ en, ja }` の両方を書き、同じ内容にする。日本語の説明文は です・ます で書く。デモ固有の挙動は「このデモでは…」「In this demo, …」と書く
- コメントは日本語で、処理の説明ではなく理由を書く。インデントはタブ、文字列はシングルクォート、末尾カンマなし
- id は `$props.id()` から作る（固定の id は一覧ページで衝突する）

### ステップナビゲーション

`src/lib/components/stepper/Demo.svelte:71-95`。

```svelte
				{#if i <= furthest && i !== current && !submitted}
					<button type="button" class="header" onclick={() => (current = i)}>{@render header()}</button>
				{:else}
					<span class="header">{@render header()}</span>
				{/if}
			</li>
		{/each}
	</ol>
	{#if submitted}
		<p class="heading" tabindex="-1" {@attach (el) => el.focus()}>{text[lang].submitted}</p>
	{:else}
		<div class="status" aria-live="polite">
			<p class="heading">{text[lang].heading(current + 1, text[lang].steps[current])}</p>
			{#if current === optional}<p class="hint">{text[lang].optional}</p>{/if}
		</div>
```

`current = i` にした時点で、押したボタンは `{:else}` の `<span>` に置き換わる。`text.en.heading` は `` (n, name) => `Step ${n} of 4: ${name}` ``。

`src/lib/components/stepper/data.ts` の該当箇所は次のとおり。

- `behavior` の 3 つ目（en）: `'In this demo, every step already reached is a button, so you can go back to a finished step and return. The current step and steps not yet reached are plain text.'`
- 同（ja）: `'このデモでは、一度たどり着いた段階はボタンになり、終わった段階へ戻ってまた先へ進めます。現在の段階とまだたどり着いていない段階はただの文字です。'`
- `keyboard` の `Enter / Space`（en）: `'On a step button, goes to that step. Also presses Back, Next and Submit.'`
- 同（ja）: `'段階のボタンでは、その段階へ移ります。「戻る」「次へ」「申請する」もこのキーで押します。'`

### メガメニュー

`src/lib/components/mega-menu/Demo.svelte:60-63` と `:77-87`。

```ts
	let open = $state<number | null>(0);
	let went = $state('');
	let nav: HTMLElement;
	let buttons: HTMLButtonElement[] = $state([]);
```

```svelte
{#snippet link(name: string, className?: string)}
	<!-- デモなので移動はせず、行き先を表示する（href は prerender の存在チェックを通すため nav を指す） -->
	<a
		href="#{uid}"
		class={className}
		onclick={(e) => {
			e.preventDefault();
			went = name;
			open = null;
		}}>{name}</a
	>
{/snippet}
```

パネルは `<div id="{uid}-panel-{i}" class="panel" hidden={open !== i}>` で、リンクはすべて開いているパネルの中にある。Esc の処理（同ファイルの `nav` の `onkeydown`）は、閉じる前に `buttons[open].focus()` を呼んでいる。これと同じ順にする。

`src/lib/components/mega-menu/data.ts` の `behavior` の最後（en）は `'In this demo, the first panel starts open. The panel pushes the content below it down instead of covering the page, and choosing a link shows where it would go instead of leaving the page. Moving between the section names with the arrow keys, which the APG lists as optional, is left out.'`。ja は `'このデモでは、最初のパネルを開いた状態で始めます。パネルはページに重ねず、下の内容を押し下げて開きます。リンクを選ぶと、ページを移らずに行き先を表示します。APG で任意とされている、矢印キーでカテゴリ名の間を移る機能は省いています。'`。

### Back to top

`src/lib/components/back-to-top/Demo.svelte:41-80`（抜粋）。

```svelte
	let box: HTMLElement;
	let title: HTMLElement;
	let scrolled = $state(false);
...
<div
	bind:this={box}
	class="box"
	role="region"
	aria-label={text[lang].article}
	tabindex="0"
	onscroll={() => (scrolled = box.scrollTop > box.clientHeight / 2)}
>
	...
	<button
		type="button"
		class="btn"
		hidden={!scrolled}
		onclick={() => {
			box.scrollTop = 0;
			title.focus({ preventScroll: true });
		}}
	>
```

`.btn[hidden] { display: none; }` で消える。ボタンにフォーカスがあるとき Home キーを押すと、ブラウザが枠を先頭へスクロールし、ボタンが消えてフォーカスが `<body>` へ落ちる。

`src/lib/components/back-to-top/data.ts` の `behavior` の最後（en）は `'In this demo, the box itself can take focus, so with focus in the box, Home and End also scroll it to the start and the end.'`、ja は `'このデモでは枠そのものにもフォーカスでき、枠にフォーカスがあるときは Home キーと End キーでも先頭と末尾へスクロールします。'`。

### チェックボックス

`src/lib/components/checkbox/Demo.svelte:57-80`（抜粋）。

```svelte
	<form
		novalidate
		onsubmit={(e) => {
			e.preventDefault();
			submitted = true;
			sent = agreed;
			if (!agreed) termsBox.focus();
		}}
	>
		<label>
			<input
				type="checkbox"
				aria-invalid={error}
				aria-describedby={error ? `${uid}-error` : undefined}
				bind:this={termsBox}
```

`error` は `submitted` から作る `$derived`。Svelte 5 は DOM の更新を後でまとめて行うので、`focus()` の時点ではまだ `aria-invalid` が付いていない。手本は `src/lib/components/empty-state/Demo.svelte:38-43`。

```ts
	// 押したボタンは空の状態ごと消えるので、次に使う検索欄へフォーカスを移す
	async function create() {
		projects = text[lang].samples;
		await tick();
		search?.focus();
	}
```

### テスト

キー操作のテストは `tests/keyboard.spec.ts`。デモを開くヘルパーは `tests/open-demo.ts` の `openDemo(page, path)` で、DemoFrame（`role="group"`）を返す。書き方の例（`tests/keyboard.spec.ts` のメガメニュー）は次のとおり。

```ts
test('mega menu: Escape closes the panel and returns focus to its button', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/mega-menu/');
```

既存の `tests/demos.spec.ts:294-315`（stepper）、`:802-817`（mega menu）、`:877-892`（back to top）、`:605-621`（checkbox）は変えずに通ること。

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `pnpm install --frozen-lockfile` | exit 0 |
| Check | `pnpm check` | exit 0 |
| Build | `pnpm build` | exit 0 |
| E2E（一部） | `pnpm exec playwright test tests/keyboard.spec.ts tests/demos.spec.ts` | 全件 passed（先に `pnpm build`） |
| E2E（全部） | `pnpm test:e2e` | 全件 passed |

## Scope

**In scope**:
- `src/lib/components/stepper/Demo.svelte`、`src/lib/components/stepper/data.ts`
- `src/lib/components/mega-menu/Demo.svelte`、`src/lib/components/mega-menu/data.ts`
- `src/lib/components/back-to-top/Demo.svelte`、`src/lib/components/back-to-top/data.ts`
- `src/lib/components/checkbox/Demo.svelte`
- `tests/keyboard.spec.ts`

**Out of scope**:
- 共通の部品（`src/lib/DemoFrame.svelte`、`src/lib/ActionMenu.svelte`）
- ほかのデモ。一覧のサムネイル（`Thumb.svelte`）
- `tests/demos.spec.ts`（既存のテストは変えない）

## Git workflow

- Branch: `advisor/022-demo-focus`
- コミットメッセージは英語の命令形で 1 文、接頭辞なし（例: `Keep the tooltip open across the gap and while the button has focus`）。部品ごとに 1 コミット
- push や PR は作らない

## Steps

### Step 1: ステップナビゲーションで、段階のボタンを押したら見出しへフォーカスを移す

1. `<p class="heading">`（`{:else}` 側、`aria-live` の中のもの）に `tabindex="-1"` と `bind:this={heading}` を付け、`let heading: HTMLElement;` を宣言する。
2. 段階のボタンの `onclick` を、`current = i` のあとに `heading.focus()` を呼ぶ形にする。`<p>` は残るので（文字だけが変わる）、`tick()` は要らない。ボタンが消える理由をコメントに書く（例: `押したボタンは現在の段階になって文字に変わるので、移った段階の見出しへフォーカスを移す`）。
3. `stepper/data.ts` の `behavior` の 3 つ目に、次の文を足す。en `' Pressing a step button moves focus to the heading of that step, because the button turns into plain text.'`、ja `'段階のボタンを押すと、そのボタンは文字に変わるので、移った段階の見出しへフォーカスを移します。'`（どちらも既存の文の後ろに続ける）。
4. `keyboard` の `Enter / Space` の action を、en `'On a step button, goes to that step and moves focus to its heading. Also presses Back, Next and Submit.'`、ja `'段階のボタンでは、その段階へ移り、見出しへフォーカスを移します。「戻る」「次へ」「申請する」もこのキーで押します。'` にする。

**Verify**: `pnpm check` → exit 0。

### Step 2: ステップナビゲーションのキー操作のテストを足す

`tests/keyboard.spec.ts` に足す。

```ts
test('stepper: Enter on a finished step goes to it and moves focus to its heading', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/stepper/');
	await demo.getByRole('button', { name: 'Next' }).click();
	const applicant = demo.getByRole('button', { name: /^Applicant/ });
	await applicant.focus();
	await page.keyboard.press('Enter');
	await expect(demo.getByText('Step 1 of 4: Applicant')).toBeFocused();
});
```

**Verify**: `pnpm build && pnpm exec playwright test tests/keyboard.spec.ts -g stepper` → 1 passed。Step 1 の 1〜2 を一時的に外すと落ちることを確かめ、戻す。

### Step 3: メガメニューで、リンクを選んだらカテゴリ名へフォーカスを戻す

1. `link` の snippet の `onclick` を、`went = name;` のあと、`open = null;` の前に `buttons[open!].focus();` を呼ぶ形にする。理由をコメントに書く（例: `選んだリンクはパネルごと隠れるので、Esc と同じくカテゴリ名へフォーカスを戻してから閉じる`）。`open` が null のときにリンクが押されることはない（隠れたパネルのリンクは押せない）。
2. `mega-menu/data.ts` の `behavior` の最後の文の「choosing a link shows where it would go instead of leaving the page」を、en `choosing a link shows where it would go instead of leaving the page, closes the panel and returns focus to its section name` にする。ja の「リンクを選ぶと、ページを移らずに行き先を表示します。」は「リンクを選ぶと、ページを移らずに行き先を表示し、パネルを閉じてカテゴリ名へフォーカスを戻します。」にする。

**Verify**: `pnpm check` → exit 0。

### Step 4: メガメニューのテストを足す

`tests/keyboard.spec.ts` のメガメニューのテストのあとに足す。

```ts
test('mega menu: Enter on a link shows where it goes, closes the panel and returns focus to its button', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/mega-menu/');
	const living = demo.getByRole('button', { name: 'Living' });
	const link = demo.getByRole('link', { name: 'All about living' });
	await link.focus();
	await page.keyboard.press('Enter');
	await expect(living).toBeFocused();
	await expect(living).toHaveAttribute('aria-expanded', 'false');
	await expect(demo.getByRole('status')).toContainText('All about living');
});
```

**Verify**: `pnpm build && pnpm exec playwright test tests/keyboard.spec.ts -g "mega menu"` → すべて passed。Step 3 の 1 を一時的に外すと新しいテストが落ちることを確かめ、戻す。

### Step 5: Back to top で、フォーカスのあるボタンが消えるときは枠へフォーカスを移す

1. ボタンに `bind:this={button}` を付け、`let button: HTMLButtonElement;` を宣言する。
2. 枠の `onscroll` を関数にして、`scrolled` が false になるときにボタンにフォーカスがあれば、枠へフォーカスを移す。

```ts
	// ボタンにフォーカスがあるまま Home キーなどで上へ戻ると、ボタンが消えてフォーカスがページの先頭へ落ちる。
	// 消える前に、矢印キーでそのままスクロールを続けられる枠へフォーカスを移す
	function onscroll() {
		scrolled = box.scrollTop > box.clientHeight / 2;
		if (!scrolled && document.activeElement === button) box.focus({ preventScroll: true });
	}
```

  `onscroll={onscroll}` ではなく、Svelte の省略形 `{onscroll}` で渡す。

3. `back-to-top/data.ts` の `behavior` の最後の文の後ろに、en `' If the button has focus when it hides, focus moves to the box.'`、ja `'ボタンにフォーカスがあるまま消えるときは、枠へフォーカスを移します。'` を足す。

**Verify**: `pnpm check` → exit 0。

### Step 6: Back to top のテストを足す

```ts
test('back to top: Home with focus on the button scrolls to the start and keeps focus in the box', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/back-to-top/');
	const article = demo.getByRole('region', { name: 'Article' });
	const button = demo.getByRole('button', { name: 'Back to top', exact: true });
	await button.focus();
	await page.keyboard.press('Home');
	await expect(button).toBeHidden();
	await expect(article).toBeFocused();
});
```

**Verify**: `pnpm build && pnpm exec playwright test tests/keyboard.spec.ts -g "back to top"` → 1 passed。Step 5 の 2 を一時的に外すと落ちることを確かめ、戻す。

### Step 7: チェックボックスで、エラーが DOM に入ってからフォーカスを移す

1. `import { tick } from 'svelte';` を足す。
2. `onsubmit` を `async` にし、`if (!agreed) termsBox.focus();` を次の形にする。

```ts
			// aria-invalid とエラーの文は次の描画で入る。先にフォーカスすると、読み上げにエラーが入らないことがある
			if (!agreed) {
				await tick();
				termsBox.focus();
			}
```

`e.preventDefault()` は `await` より前に置いたままにする（後ろにすると送信が止まらない）。

3. `tests/keyboard.spec.ts` に足す。フォーカスした瞬間の `aria-invalid` を記録して確かめる。

```ts
test('checkbox: the terms checkbox is already marked invalid when Apply moves focus to it', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/checkbox/');
	const terms = demo.getByRole('checkbox', { name: 'I agree to the terms of use' });
	await terms.evaluate((el) =>
		el.addEventListener('focus', () => (el.dataset.invalidOnFocus = String(el.getAttribute('aria-invalid'))), { once: true })
	);
	await demo.getByRole('button', { name: 'Apply' }).click();
	await expect(terms).toBeFocused();
	await expect(terms).toHaveAttribute('data-invalid-on-focus', 'true');
});
```

**Verify**: `pnpm build && pnpm exec playwright test tests/keyboard.spec.ts -g checkbox` → 1 passed。Step 7 の 2 を一時的に外すと落ちることを確かめ、戻す。

### Step 8: 全体を確かめる

**Verify**: `pnpm check && pnpm build && pnpm test:e2e` → すべて exit 0、e2e は全件 passed（既存の `tests/demos.spec.ts` の stepper、mega menu、back to top、checkbox のテストも通る）。

## Test plan

- `tests/keyboard.spec.ts` に 4 件足す（stepper、mega menu、back to top、checkbox）
- どれも、直す前のコードでは落ちることを確かめる（Step 2、4、6、7）
- 既存の `tests/demos.spec.ts` のテストは変えずに通す

## Done criteria

- [ ] `grep -n "heading.focus()" src/lib/components/stepper/Demo.svelte` → 1 行
- [ ] `grep -n "buttons\[open!\].focus()" src/lib/components/mega-menu/Demo.svelte` → 1 行
- [ ] `grep -n "box.focus({ preventScroll: true })" src/lib/components/back-to-top/Demo.svelte` → 1 行
- [ ] `grep -n "await tick()" src/lib/components/checkbox/Demo.svelte` → 1 行
- [ ] 3 つの `data.ts` で、en と ja の両方が直っている（`grep -n "moves focus to its heading" src/lib/components/stepper/data.ts` → 1 行、`grep -n "returns focus to its section name" src/lib/components/mega-menu/data.ts` が 2 行以上、`grep -n "focus moves to the box" src/lib/components/back-to-top/data.ts` → 1 行）
- [ ] `tests/keyboard.spec.ts` に新しいテストが 4 件ある
- [ ] `pnpm check`、`pnpm build`、`pnpm test:e2e` がすべて exit 0
- [ ] `git status` で、In scope 以外のファイルが変わっていない

## STOP conditions

- 新しいテストのどれかが、直す前のコードでも通る
- 一覧ページ（`/en/`）のサムネイルで、このデモが例外を出す（`pnpm test:e2e` の一覧のテストや a11y のテストが落ちる）
- `pnpm check` が a11y の警告（`--fail-on-warnings`）で落ち、`svelte-ignore` を足さないと直らない。足すなら CLAUDE.md の規則どおり 1 行上に理由を書くが、どの警告かを NOTES に書いて報告する
- 「Current state」の抜粋と実際のコードが違う

## Maintenance notes

- 押した要素が消える操作を足すときは、消える前にフォーカスの移り先を決める。このリポジトリでは、移り先の見出しに `tabindex="-1"` を付けて `focus()` するのが定番（stepper の申請後、back-to-top のタイトル）。
- ステップナビゲーションの見出しは `aria-live` の中にある。フォーカスと読み上げが重なって二度読まれると報告があれば、見出しを live region の外へ出すことを検討する。
