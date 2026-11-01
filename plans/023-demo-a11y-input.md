# Plan 023: デモの読み上げの名前と入力の受け付けが、説明どおりになる

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 8ba0ef9..HEAD -- src/lib/components/one-time-code src/lib/components/card src/lib/components/mobile-menu src/lib/components/radio src/lib/components/skeleton tests/demos.spec.ts tests/thumbs.spec.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P2 | S | LOW | 022（同じ `tests/keyboard.spec.ts` は触らないが、022 のあとに並べる） | bug | `8ba0ef9`（2026-11-02） |

## Why this matters

デモは部品の手本として見られる。次の 5 つは、手本としての説明と実際の動きや読み上げがずれている。

1. ワンタイムコード: パソコンで日本語入力をオンにしたまま「１２３４５６」（全角）と打つと、「6桁の数字で入力してください」のエラーになる。説明は「6桁の数字なら何でも通ります」。JavaScript の `\d` は半角の数字にしか当たらない
2. カード: 2 枚のカードの「保存」ボタンが同じ名前で、ボタンの一覧で聞くとどのカードのものか分からない
3. モバイルメニュー: CSS の `::after` で出している「›」「+」「−」が、リンクや開閉ボタンの名前に入る（「サービス プラス」のように読まれうる）。開閉の状態は `<details>` がすでに伝えている
4. ラジオボタン: キー操作の表に「どれも選ばれていなければ最初の選択肢へ入る」とあるが、Shift + Tab で入ったときは最後の選択肢に入る（Chrome と Firefox のネイティブの動き）
5. スケルトン: タイマーを `onMount` で始めている（CLAUDE.md は `$effect` の片付けで止める決まり）。一覧のサムネイルでも 1.5 秒後に読み込み後の姿へ変わるので、一覧のカードでスケルトンが見えない

## Current state

約束事（CLAUDE.md より）は次のとおり。

- デモの挙動を変えたら、同じコミットで `data.ts` の `keyboard` と `behavior` を直す
- 文言は `{ en, ja }` の両方を書き、同じ内容にする。日本語の説明文は です・ます。デモ固有の挙動は「このデモでは…」「In this demo, …」
- タイマーは `$effect` の片付けで止める（例: `src/lib/components/toast/Demo.svelte`）
- `Thumb.svelte`（任意）は、一覧で開いた状態などの静止した絵を出すためのもの。props と文言はデモと同じ形にし、ルートに `data-preview` を付ける。状態、イベント、`$effect`、id、ARIA、`<dialog>`、アニメーションは使わない（例: `src/lib/components/tooltip/Thumb.svelte`）
- 色は `src/app.css` の `--color-*` トークンを使う
- コメントは日本語で、処理の説明ではなく理由を書く。インデントはタブ、文字列はシングルクォート、末尾カンマなし

### ワンタイムコード

`src/lib/components/one-time-code/Demo.svelte:31-36`。

```ts
	// 届いたままの形で貼り付けられるよう、空白とハイフンは入力させてから取り除く
	let digits = $derived(value.replace(/[\s-]/g, ''));
	let error = $derived(
		!submitted ? '' : !digits ? text[lang].empty : digits.length !== length || /\D/.test(digits) ? text[lang].wrong : ''
	);
```

`one-time-code/data.ts` の `behavior` に、en `'Spaces and hyphens are allowed and removed before checking, so a code can be entered the way it appears in the message.'`、ja `'空白やハイフンも受け付けて確かめる前に取り除くので、届いたままの形でコードを入力できます。'` がある。

### カード

`src/lib/components/card/Demo.svelte:33-48`（抜粋）。

```svelte
			<article aria-labelledby="{uid}-title-{i}">
				...
					<h3 id="{uid}-title-{i}"><a href="#{uid}" onclick={(e) => e.preventDefault()}>{card.title}</a></h3>
				...
						<button type="button" class="btn" aria-pressed={saved[i]} onclick={() => (saved[i] = !saved[i])}>
							<span aria-hidden="true">{saved[i] ? '★' : '☆'}</span>
							{text[lang].save}
						</button>
```

既存のテスト（`tests/demos.spec.ts:66` 付近）は `demo.getByRole('button', { name: 'Save' })` でボタンを探す。名前を変えるとこのテストが壊れるので、名前は「Save」のまま、`aria-describedby` でカードの見出しを説明として結ぶ。

### モバイルメニュー

`src/lib/components/mobile-menu/Demo.svelte:124-149`（抜粋）。

```css
	/* リンクと開閉で形の違うアイコンを使う（DADS モバイルメニューの使い方: 向きだけの違いにしない） */
	a::after {
		content: '›';
		...
	}
	summary::after {
		content: '+';
		...
	}

	details[open] > summary::after {
		content: '−';
	}
```

CSS の `content` には、読み上げ用の代わりの文字を `/` の後ろに書ける（`content: '›' / '';` で、読み上げでは空になる）。古いブラウザはこの書き方の宣言を丸ごと無視するので、前に通常の `content` を残して上書きさせる。

### ラジオボタン

`src/lib/components/radio/data.ts` の `keyboard` の 1 行目。

```ts
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves into the group (to the chosen option, or to the first one if none is chosen) and out of it.',
				ja: 'グループ（選ばれている選択肢、どれも選ばれていなければ最初の選択肢）へ入ったり、グループから出たりします。'
			}
		},
```

デモ（`radio/Demo.svelte`）はどれも選ばれていない状態で始まる。

### スケルトン

`src/lib/components/skeleton/Demo.svelte:24-62`（抜粋）。

```ts
	let loading = $state(true);
	let timer: ReturnType<typeof setTimeout>;

	function load() {
		loading = true;
		clearTimeout(timer);
		timer = setTimeout(() => (loading = false), 1500);
	}

	onMount(() => {
		load();
		return () => clearTimeout(timer);
	});
```

読み込み中の見た目（`{#if loading}` の中）は次のとおり。

```svelte
		{#if loading}
			<span class="bone image" aria-hidden="true"></span>
			<span class="bone avatar" aria-hidden="true"></span>
			<span class="lines" aria-hidden="true">
				<span class="bone line short"></span>
				<span class="bone line"></span>
			</span>
```

`.bone` は `animation: shimmer 1.2s linear infinite` で光が流れる。`.demo`、`.profile`、`.image`、`.avatar`、`.lines`、`.bone`、`.line`、`.short` の CSS は同じファイルの `<style>` にある。

一覧のサムネイルのテストは `tests/thumbs.spec.ts`。`opened` という配列に、Thumb を持つ部品の英語名が手で並んでいる（現在 12 件）。

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `pnpm install --frozen-lockfile` | exit 0 |
| Check | `pnpm check` | exit 0 |
| Build | `pnpm build` | exit 0 |
| E2E（一部） | `pnpm exec playwright test tests/demos.spec.ts tests/thumbs.spec.ts` | 全件 passed（先に `pnpm build`） |
| E2E（全部） | `pnpm test:e2e` | 全件 passed |

## Scope

**In scope**:
- `src/lib/components/one-time-code/Demo.svelte`、`src/lib/components/one-time-code/data.ts`
- `src/lib/components/card/Demo.svelte`、`src/lib/components/card/data.ts`
- `src/lib/components/mobile-menu/Demo.svelte`
- `src/lib/components/radio/data.ts`
- `src/lib/components/skeleton/Demo.svelte`、`src/lib/components/skeleton/Thumb.svelte`（新規）
- `tests/demos.spec.ts`（テストを足すだけ。既存のテストは変えない）
- `tests/thumbs.spec.ts`（`opened` に Skeleton を足すだけ）

**Out of scope**:
- ほかのデモ、共通の部品（`src/lib/*.svelte`）
- `tests/keyboard.spec.ts`（022 が触る）

## Git workflow

- Branch: `advisor/023-demo-a11y-input`
- コミットメッセージは英語の命令形で 1 文、接頭辞なし（例: `Show an error message for out-of-range numbers in the number input demo`）。部品ごとに 1 コミット
- push や PR は作らない

## Steps

### Step 1: ワンタイムコードで全角の数字と記号を受け付ける

1. `digits` を、NFKC で全角を半角にそろえてから空白とハイフンを取り除く形にする。日本語入力の長音記号「ー」（U+30FC）も、ハイフンのつもりで打たれるので取り除く。

```ts
	// 届いたままの形で貼り付けられるよう、空白とハイフンは入力させてから取り除く。
	// 日本語入力のまま打った全角の数字や記号も通すため、先に NFKC で半角にそろえる（「ー」はハイフンのつもりで打たれる）
	let digits = $derived(value.normalize('NFKC').replace(/[\s\-ー]/g, ''));
```

2. `one-time-code/data.ts` の上の `behavior` の文を、en `'Spaces and hyphens are allowed and removed before checking, so a code can be entered the way it appears in the message. Full-width digits typed with a Japanese input method are accepted too.'`、ja `'空白やハイフンも受け付けて確かめる前に取り除くので、届いたままの形でコードを入力できます。日本語入力のまま打った全角の数字も受け付けます。'` にする。

**Verify**: `pnpm check` → exit 0。

### Step 2: ワンタイムコードのテストを足す

`tests/demos.spec.ts` の one-time code のテスト（`one-time code: one field takes a pasted code with a space`）のあとに足す。ボタンと欄の名前は既存のテストと同じものを使う（en の欄は `Security code`、ボタンは `Continue`、通ったときの文は `Code accepted`）。既存のテストを読んで、通ったことの確かめ方（`getByRole('status')` など）をそろえる。

```ts
test('one-time code: full-width digits and a long vowel mark typed with a Japanese input method are accepted', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/one-time-code/');
	await demo.getByRole('textbox', { name: 'Security code' }).fill('１２３ー４５６');
	await demo.getByRole('button', { name: 'Continue' }).click();
	await expect(demo.getByText('Code accepted')).toBeVisible();
});
```

**Verify**: `pnpm build && pnpm exec playwright test tests/demos.spec.ts -g "one-time code"` → すべて passed。Step 1 の 1 を一時的に外すと新しいテストが落ちることを確かめ、戻す。

### Step 3: カードの「保存」ボタンに、どのカードのものかを説明として結ぶ

1. ボタンに `aria-describedby="{uid}-title-{i}"` を足す。名前は「保存」のまま。理由をコメントに書く（例: `同じ「保存」が並ぶので、ボタンの一覧で聞いてもどのカードのものか分かるよう、見出しを説明として結ぶ`）。
2. `card/data.ts` の `behavior` に、en `'In this demo, each Save button is described by its card’s heading with `aria-describedby`, so a list of buttons still tells which card each one belongs to.'`、ja `'このデモでは、各カードの「保存」ボタンに `aria-describedby` でカードの見出しを結び、ボタンの一覧で聞いてもどのカードのものか分かるようにしています。'` を 1 行足す（既存の行の最後に）。

**Verify**: `pnpm check` → exit 0。

### Step 4: カードのテストを足す

```ts
test('card: each Save button is described by its card heading', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/card/');
	await expect(demo.getByRole('button', { name: 'Save' }).first()).toHaveAccessibleDescription('Weekend in Kyoto');
	await expect(demo.getByRole('button', { name: 'Save' }).nth(1)).toHaveAccessibleDescription('Market breakfast in Hakodate');
});
```

**Verify**: `pnpm build && pnpm exec playwright test tests/demos.spec.ts -g "card:"` → すべて passed。

### Step 5: モバイルメニューの記号を読み上げから外す

`mobile-menu/Demo.svelte` の 3 つの `content` を、それぞれ通常の宣言のあとに代わりの文字が空の宣言を重ねる形にする。

```css
	a::after {
		content: '›';
		/* 記号は見た目だけ。代わりの文字を空にして名前に入れない（対応していないブラウザは上の行を使う） */
		content: '›' / '';
```

`summary::after` の `'+'` と、`details[open] > summary::after` の `'−'` も同じ形にする（コメントは最初の 1 か所でよい）。

**Verify**: `pnpm check` → exit 0。

### Step 6: モバイルメニューのテストを足す

`tests/demos.spec.ts` の既存の mobile menu のテストを読み、リンクと開閉ボタンの名前を 1 つずつ選ぶ。それらの accessible name に「›」「+」「−」が入らないことを確かめるテストを足す。例を示す（`<名前>` は既存のテストやデモの `text.en` から選ぶ）。

```ts
test('mobile menu: the icons drawn with CSS are not part of the names', async ({ page }) => {
	const demo = await openDemo(page, 'en/components/mobile-menu/');
	await expect(demo.getByRole('link', { name: '<リンクの名前>', exact: true })).toBeVisible();
	const summary = demo.locator('summary').first();
	await expect(summary).not.toHaveAccessibleName(/[+−›]/);
	await summary.click();
	await expect(summary).not.toHaveAccessibleName(/[+−›]/);
});
```

**Verify**: `pnpm build && pnpm exec playwright test tests/demos.spec.ts -g "mobile menu"` → すべて passed。Step 5 を一時的に外すと新しいテストが落ちることを確かめ、戻す。

### Step 7: ラジオボタンの Shift + Tab の説明を直す

`radio/data.ts` の `Tab / Shift + Tab` の action を、en `'Moves into the group and out of it. Focus goes to the chosen option; if none is chosen, Tab goes to the first option and Shift + Tab to the last.'`、ja `'グループへ入ったり、グループから出たりします。選ばれている選択肢へ入り、どれも選ばれていなければ、Tab キーでは最初、Shift + Tab では最後の選択肢へ入ります。'` にする。

続けて、`tests/demos.spec.ts` に、Shift + Tab で入ると最後の選択肢にフォーカスが来ることを確かめるテストを足す。グループの後ろにあるフォーカスできる要素（デモの枠のリセットボタン `Reset` など）にフォーカスしてから `Shift+Tab` を押し、最後の radio に `toBeFocused()` を確かめる。グループの後ろの要素は、`radio/Demo.svelte` を読んで決める。

**Verify**: `pnpm build && pnpm exec playwright test tests/demos.spec.ts -g radio` → すべて passed。最後の選択肢に来ないときは STOP（説明を直す前提が違う）。

### Step 8: スケルトンのタイマーを `$effect` に移し、一覧用の絵を足す

1. `skeleton/Demo.svelte` の `onMount` を `$effect` に置き換え、`import { onMount } from 'svelte';` を消す。

```ts
	$effect(() => {
		load();
		return () => clearTimeout(timer);
	});
```

  `load()` は `loading` に書き込むだけで読まないので、この `$effect` が何度も動くことはない。動いてしまうときは STOP。

2. `src/lib/components/skeleton/Thumb.svelte` を作る。読み込み中の静止した絵にする。ルートに `data-preview` を付け、props は `let { lang }: { lang: Lang } = $props();`。状態、イベント、`$effect`、id、ARIA、アニメーションは使わない。`<span class="bone ...">` の並びはデモの `{#if loading}` の中と同じにし、CSS はデモの `.demo`、`.profile`、`.image`、`.avatar`、`.lines`、`.bone`、`.line`、`.short` から `animation` を除いて写す。ボタンは `<span class="btn">{text[lang].reload}</span>` で見た目だけ置く（tooltip/Thumb.svelte と同じやり方）。文言は `reload` だけを持つ `const text = { en: { reload: 'Reload' }, ja: { reload: '再読み込み' } };` にする。冒頭に理由のコメントを 1 行書く（例: `一覧のサムネイル専用の、読み込み中の静止した絵。デモは 1.5 秒で読み込み後の姿に変わり、一覧ではスケルトンが見えないため`）。
3. `tests/thumbs.spec.ts` の `opened` の配列に、スケルトンの英語名（`skeleton/data.ts` の `names.en`）を足す。配列の並び順の決まりがあれば、それに従う。

**Verify**: `pnpm check && pnpm build && pnpm exec playwright test tests/thumbs.spec.ts` → すべて passed。

### Step 9: 全体を確かめる

**Verify**: `pnpm check && pnpm build && pnpm test:e2e` → すべて exit 0、e2e は全件 passed。

## Test plan

- `tests/demos.spec.ts` に 4 件足す（one-time code の全角、card の説明、mobile menu の名前、radio の Shift + Tab）
- `tests/thumbs.spec.ts` の `opened` に Skeleton を足す
- one-time code と mobile menu のテストは、直す前のコードでは落ちることを確かめる

## Done criteria

- [ ] `grep -n "normalize('NFKC')" src/lib/components/one-time-code/Demo.svelte` → 1 行
- [ ] `grep -n 'aria-describedby="{uid}-title-{i}"' src/lib/components/card/Demo.svelte` → 1 行
- [ ] `grep -c "/ ''" src/lib/components/mobile-menu/Demo.svelte` → `3`
- [ ] `grep -n "Shift + Tab to the last" src/lib/components/radio/data.ts` → 1 行
- [ ] `grep -n "onMount" src/lib/components/skeleton/Demo.svelte` → 0 行
- [ ] `src/lib/components/skeleton/Thumb.svelte` があり、`grep -nE "\\$state|\\$effect|onclick|aria-|animation" src/lib/components/skeleton/Thumb.svelte` → 0 行、`grep -n "data-preview" src/lib/components/skeleton/Thumb.svelte` → 1 行
- [ ] `pnpm check`、`pnpm build`、`pnpm test:e2e` がすべて exit 0
- [ ] `git status` で、In scope 以外のファイルが変わっていない

## STOP conditions

- 新しいテストが、直す前のコードでも通る（one-time code、mobile menu）
- Step 7 で、Shift + Tab で入ったときに最後の選択肢へ来ない
- Step 8 の `$effect` が何度も動く、または一覧ページで例外が出る
- 既存のテストを変えないと通らない
- 「Current state」の抜粋と実際のコードが違う

## Maintenance notes

- `Thumb.svelte` を持つ部品を増やしたら、`tests/thumbs.spec.ts` の `opened` にも足す（029 で自動にする予定）。
- スケルトンのデモの見た目（骨の形）を変えたら、Thumb も合わせる。
