# Plan 026: data.ts の書き方の約束事を `pnpm check` が守らせる

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 8ba0ef9..HEAD -- src/lib/data.check.ts src/lib/components/number-input/data.ts src/lib/components/stepper/data.ts`
> 025 は number-input の `keyboard`、stepper の引用符を変えている。`data.check.ts` に差分があれば「Current state」と見比べ、合わなければ STOP。

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P2 | S | LOW | 025（先に文言を直さないと、この検査が落ちる） | tests | `8ba0ef9`（2026-11-02） |

## Why this matters

CLAUDE.md の「data.ts」の約束事のうち、いくつかは人の目でしか守られておらず、025 で直したずれ（「なし。」で始まらない行、`Home` と `End` が別の行、主語が相手の部品になった `diff`、英語の `"…"`）は、部品を足すたびに戻ってくる。CLAUDE.md は「データの約束事の検査は `src/lib/data.check.ts` に足す」と決めているので、そこに足す。あわせて、`data.ts` が `#lib` から型以外を import すると `data.check.ts`（Node が直接読む）が分かりにくいエラーで落ちる、という隠れた制約も検査にする。

## Current state

- `src/lib/data.check.ts` は `pnpm check` の中で `node src/lib/data.check.ts` として動く。全部品の `data.ts` を読み、`errors` に文字列を積み、最後に `if (errors.length) throw new Error(errors.join('\n'));`。部品ごとのループは次の形（抜粋）。

```ts
const dir = new URL('./components/', import.meta.url);
const all: ComponentData[] = [];
for (const id of readdirSync(dir)) {
	all.push((await import(new URL(`${id}/data.ts`, dir).href)).default);
}
const byId = new Map(all.map((d) => [d.id, d]));
const errors: string[] = [];
...
for (const d of all) {
	...
	if (!d.keyboard.length) errors.push(`${d.id}: keyboard is empty`);
	...
	// 英日の両方を埋める（Text 型は空文字を防げない）
	const texts = [
		d.names,
		d.summary,
		d.appearance,
		...d.behavior,
		...d.keyboard.map((k) => k.action),
		...(d.usage ?? []),
		...(d.misuse ?? []).flatMap((m) => [m.pattern, m.harm, m.instead]),
		...(d.related ?? []).map((r) => r.diff),
		...(d.variations ?? []).flatMap((v) => [v.name, v.description])
	];
	for (const t of texts) if (!t.en.trim() || !t.ja.trim()) errors.push(`${d.id}: empty text`);
	...
}

if (errors.length) throw new Error(errors.join('\n'));
console.log('ok');
```

  検査ごとに、何を守らせるかの理由を 1 行のコメントで書いている（例: `// 文中のコードは `…` で囲む（CodeText.svelte）。閉じ忘れると以降がすべてコードとして表示される`）。

- CLAUDE.md の約束事（「data.ts」より）は次のとおり。
  - キーの表記は Enter → Space、↑ → ↓、← → → の順にする。対になる操作は `Home / End` のように 1 行にまとめる
  - キー操作がない部品は `key: '—'` の行を置き、動作に「なし。」から始まる説明を書く（en は `None.` で始まる。10 部品すべてがこの形）
  - `related` の `diff` は自分の側を主語にした一文にする
- 025 のあとの `diff` で、自分の部品名（`names.en` から ` (…)` を除いたもの、`names.ja` から `（…）` を除いたもの）で始まらないのは次のとおり。どれも自分の側が主語なので、許す呼び方として一覧に入れる。

| 部品 | en の書き出し | ja の書き出し |
|---|---|---|
| link | `An ordinary link` | `ふつうのリンク` |
| modal | `A modal`（`names.en` は `Modal (Dialog)`） | `モーダル`（`names.ja` は `モーダルダイアログ`） |
| one-time-code | `A one-time code` | `確認コード` |
| select | （名前どおり） | `セレクト`（`names.ja` は `セレクトボックス`） |
| tabs | `A tab` | （名前どおり） |
| textarea | `A text area` | （名前どおり） |

- number-input と stepper の間の 2 つの `diff` は、Apple の呼び方の説明で始まっていて、自分の側が主語になっていない。この計画で書き直す（Step 3）。今の文は次のとおり。
  - `number-input/data.ts`（stepper へ）en `'Some systems (such as Apple) call the − / + buttons of a number input a “stepper”. Here, stepper means the step indicator of a multi-page procedure.'`、ja `'Apple などは数値入力の − / + ボタンを「Stepper」と呼びます。このサイトの Stepper は、複数画面の手続きの段階を示すステップナビゲーションのことです。'`
  - `stepper/data.ts`（number-input へ）en `'Apple’s “stepper” is the − / + control of a number input, not a step indicator.'`、ja `'Apple の「Stepper」は数値入力の − / + の部品で、段階の表示ではありません。'`
- 全部品の `data.ts` は `import type { ComponentData } from '#lib/types.js';` で始まる。`package.json` の `imports` は `"#lib/*": "./src/lib/*"` なので、Node が読むと `#lib/types.js` は存在しない `.js` ファイルを指す。`import type` は Node が消すので動いている。

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `pnpm install --frozen-lockfile` | exit 0 |
| データの検査だけ | `node src/lib/data.check.ts` | `ok` |
| Check | `pnpm check` | exit 0 |
| Build / E2E | `pnpm build && pnpm test:e2e` | 全件 passed |

## Scope

**In scope**:
- `src/lib/data.check.ts`
- `src/lib/components/number-input/data.ts`、`src/lib/components/stepper/data.ts`（Step 3 の 2 つの `diff` だけ）

**Out of scope**:
- ほかの `data.ts`。検査が落ちる部品が見つかったら、直さずに STOP（025 の取りこぼしなので報告する）
- 「In this demo」の書き出しの検査。スキルの側で扱う（027）
- 日本語の文が です・ます で終わるかの検査（言い回しが多く、誤検知が多い）

## Git workflow

- Branch: `advisor/026-data-check-rules`
- コミットメッセージは英語の命令形で 1 文、接頭辞なし（例: `Lock the alias source list in data.check`）。1 コミットでよい
- push や PR は作らない

## Steps

### Step 1: キー操作がない行と、`Home / End` の検査を足す

部品ごとのループの中に足す。

```ts
	// キー操作がない部品は「なし。」で始め、何もしないことをはっきり書く
	for (const k of d.keyboard)
		if (k.key === '—' && !(k.action.en.startsWith('None.') && k.action.ja.startsWith('なし。')))
			errors.push(`${d.id}: a '—' keyboard row starts with "None." / "なし。"`);
	// 対になるキーは 1 行にまとめる（Home / End）。別の行にすると表が長くなり、対であることが見えにくい
	if (d.keyboard.some((k) => k.key === 'Home') && d.keyboard.some((k) => k.key === 'End'))
		errors.push(`${d.id}: write Home and End on one row as 'Home / End'`);
```

**Verify**: `node src/lib/data.check.ts` → `ok`。

### Step 2: 英語の引用符の検査を足す

`texts` を作ったあとに足す。バッククォートの中（コード）は除く。

```ts
	// 英語の文の引用符は “ ” にそろえる。コードの中の " は HTML の書き方なので除く
	for (const t of texts)
		if (t.en.replace(/`[^`]*`/g, '').includes('"')) errors.push(`${d.id}: use “ ” instead of " in ${t.en}`);
```

**Verify**: `node src/lib/data.check.ts` → `ok`。

### Step 3: number-input と stepper の `diff` を、自分の側を主語にして書き直す

| ファイル | | 新しい文 |
|---|---|---|
| `number-input/data.ts`（stepper へ） | en | `A number input’s − / + buttons are what some systems (such as Apple) call a “stepper”; on this site, the stepper is the step indicator of a multi-page procedure.` |
| | ja | `数値入力の − / + ボタンは、Apple などが「Stepper」と呼ぶものです。このサイトの Stepper は、複数画面の手続きの段階を示すステップナビゲーションのことです。` |
| `stepper/data.ts`（number-input へ） | en | `A stepper here is a step indicator, not the − / + control of a number input that Apple calls a “stepper”.` |
| | ja | `ステップナビゲーションは段階の表示で、Apple が「Stepper」と呼ぶ数値入力の − / + の部品とは別のものです。` |

アポストロフィは ’（U+2019）、引用符は “ ” を使う。

**Verify**: `node src/lib/data.check.ts` → `ok`。

### Step 4: `diff` の主語の検査を足す

ファイルの上のほう（`designSystems` の近く）に、名前以外の呼び方の一覧を置く。

```ts
// diff は自分の側を主語にする。部品名のほかに、文の書き出しで使ってよい呼び方
const subjects: Record<string, { en?: string[]; ja?: string[] }> = {
	link: { en: ['ordinary link'], ja: ['ふつうのリンク'] },
	modal: { en: ['modal'], ja: ['モーダル'] },
	'one-time-code': { en: ['one-time code'], ja: ['確認コード'] },
	select: { ja: ['セレクト'] },
	tabs: { en: ['tab'] },
	textarea: { en: ['text area'] }
};
```

部品ごとのループの中に足す。

```ts
	const enNames = [d.names.en.replace(/ \(.*\)$/, '').toLowerCase(), ...(subjects[d.id]?.en ?? [])];
	const jaNames = [d.names.ja.replace(/（.*）$/, ''), ...(subjects[d.id]?.ja ?? [])];
	for (const r of d.related ?? []) {
		const en = r.diff.en.toLowerCase().replace(/^(a|an|the) /, '');
		if (!enNames.some((n) => en.startsWith(n))) errors.push(`${d.id}: diff to ${r.id} must start with ${d.names.en} (en)`);
		if (!jaNames.some((n) => r.diff.ja.startsWith(n))) errors.push(`${d.id}: diff to ${r.id} must start with ${d.names.ja} (ja)`);
	}
```

**Verify**: `node src/lib/data.check.ts` → `ok`。落ちたら、出たメッセージをそのまま NOTES に書いて STOP（一覧を広げて通さない）。

### Step 5: `data.ts` が `#lib` から型だけを import しているかの検査を足す

ファイルの先頭の import に `readFileSync` を足し、部品を読むループの中で、ソースを文字列として確かめる。

```ts
	// この検査は Node が data.ts を直接読む。#lib/types.js は .ts の実体を指さないので、import type 以外は読み込みで落ちる
	const source = readFileSync(new URL(`${id}/data.ts`, dir), 'utf8');
	if (/^import (?!type )[^;]*from '#lib\//m.test(source)) errors.push(`${id}: data.ts may import only types from #lib`);
```

`errors` の宣言が部品を読むループより後ろにあるときは、宣言を前へ移す。読み込み自体が落ちる場合（型以外の import があると `import()` が例外を出す）にもこのメッセージが出るよう、ソースの検査を `await import(...)` より前に置き、検査に引っかかった部品は `import` しない。

**Verify**: `node src/lib/data.check.ts` → `ok`。

### Step 6: 新しい検査が実際に落ちることを確かめる

次を 1 つずつ一時的に試し、`node src/lib/data.check.ts` が該当のメッセージで落ちることを確かめてから、`git checkout -- <file>` で戻す。

1. `src/lib/components/badge/data.ts` の `None.` を `Nothing.` に変える → `'—' keyboard row` のメッセージ
2. `src/lib/components/slider/data.ts` の `key: 'Home / End'` の行を `Home` と `End` の 2 行に分ける → `Home and End on one row`
3. `src/lib/components/toast/data.ts` の en の文のどこかに `"x"` を入れる → `use “ ” instead of "`
4. `src/lib/components/button/data.ts` の toggle-button への `diff` の en を `A toggle button keeps…` で始める → `diff to toggle-button must start with Button (en)`
5. `src/lib/components/divider/data.ts` の 1 行目を `import { categories, type ComponentData } from '#lib/types.js';` に変える → `may import only types from #lib`

**Verify**: 5 回とも期待のメッセージで落ち、最後に `git status --short src/lib/components` が空（すべて戻した）。

### Step 7: 全体を確かめる

**Verify**: `pnpm check && pnpm build && pnpm test:e2e` → すべて exit 0。

## Test plan

`data.check.ts` そのものが検査なので、Step 6 で、新しい 5 つの検査がそれぞれ違反を見つけることを確かめる。e2e は壊れていないことの確認だけ。

## Done criteria

- [ ] `node src/lib/data.check.ts` → `ok`
- [ ] Step 6 の 5 つの違反が、それぞれ期待のメッセージで落ちた（NOTES に 5 つのメッセージを書く）
- [ ] `pnpm check`、`pnpm build`、`pnpm test:e2e` がすべて exit 0
- [ ] `git status` で、In scope 以外のファイルが変わっていない

## STOP conditions

- Step 1、2、4、5 のどれかで、025 で直したはずの部品やほかの部品が引っかかる（直さずに、出たメッセージを報告する）
- Step 6 の違反のどれかが、検査で見つからない
- 「Current state」の抜粋と実際のコードが違う

## Maintenance notes

- 部品を足して `diff` の検査に落ちたら、まず文を自分の側を主語にして書き直す。省略した呼び方（「モーダル」など）を使いたいときだけ `subjects` に足す。
- CLAUDE.md の「data.ts」の節に、ここで機械的に確かめるようになった約束事を書き足す必要はない（CLAUDE.md にはすでに書いてある）。
