# Plan 024: 全部品のデータとデモを、すべてのページに読み込ませない

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 8ba0ef9..HEAD -- src/lib/registry.ts src/lib/search.ts src/lib/search.check.ts src/lib/SearchPalette.svelte src/lib/data.check.ts 'src/routes/[lang=lang]' src/routes/components.json src/routes/sitemap.xml CLAUDE.md`
> 021 は `registry.ts` の `localeCompare` の 1 行と `SearchPalette.svelte` の keydown を変えている。それ以外の差分があれば、「Current state」と見比べ、合わなければ STOP。

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P2 | M | MED | 021（同じ `SearchPalette.svelte` と `registry.ts` を触るので、そのあと） | perf | `8ba0ef9`（2026-11-02） |

## Why this matters

`src/lib/registry.ts` は、67 部品すべての `data.ts`、`Demo.svelte`、`Thumb.svelte` を `eager: true` で読み込む。これをヘッダーの検索（`SearchPalette.svelte`）が import していて、検索は `/en/` と `/ja/` 以下の全ページのレイアウトにある。そのため、一覧、詳細、対応表、スキルの案内のどのページも、gzip で 184 KB（展開後 620 KB）のチャンクを 1 つ読み込んで解析する。中身の約 75% は全部品の英日の本文。検索から詳細ページに来た人に要るのは、その部品 1 つのデータとデモ、それと検索用の名前の一覧（数 KB）だけ。

以前の監査（`plans/README.md` の「Findings considered and rejected」）は、45 部品・57 KB の時点で「部品数がおよそ倍になったら、データを `+page.server.ts` へ移す」と見送っていた。いまは 67 部品で 3 倍超の 184 KB になったので、その見直しを行う。

## Current state

- `src/lib/registry.ts`（全文、021 適用後）:

```ts
import type { Component } from 'svelte';
import type { ComponentData, Lang } from './types';

// 1コンポーネント = src/lib/components/<id>/ に data.ts と Demo.svelte を置くだけで登録される
const dataModules = import.meta.glob<ComponentData>('./components/*/data.ts', {
	eager: true,
	import: 'default'
});
const demoModules = import.meta.glob<Component<{ lang: Lang }>>('./components/*/Demo.svelte', {
	eager: true,
	import: 'default'
});

// 開いて使う部品は、閉じた状態のデモではサムネイルにきっかけのボタンしか写らない。
// そうした部品は Thumb.svelte を置くと、一覧ではデモの代わりにそれ（開いた状態の絵）を出す
const thumbModules = import.meta.glob<Component<{ lang: Lang }>>('./components/*/Thumb.svelte', {
	eager: true,
	import: 'default'
});

const dirOf = (path: string) => path.split('/')[2];
const thumbs = new Map(Object.entries(thumbModules).map(([path, thumb]) => [dirOf(path), thumb]));

const demos = new Map(Object.entries(demoModules).map(([path, demo]) => [dirOf(path), demo]));

export const entries = Object.entries(dataModules)
	.map(([path, data]) => {
		const demo = demos.get(dirOf(path));
		if (data.id !== dirOf(path)) throw new Error(`id "${data.id}" does not match ${path}`);
		if (!demo) throw new Error(`Demo.svelte is missing for ${data.id}`);
		return { data, demo, thumb: thumbs.get(data.id) };
	})
	.sort((a, b) => a.data.names.en.localeCompare(b.data.names.en, 'en'));

for (const { data } of entries) {
	for (const r of data.related ?? []) {
		if (!entries.some((e) => e.data.id === r.id))
			throw new Error(`related id "${r.id}" in ${data.id} does not exist`);
	}
}

export const getEntry = (id: string) => entries.find((e) => e.data.id === id);
```

  最後の `related` の検査は、`src/lib/data.check.ts:52-54`（相手から張り返していなければエラー。相手がいなければ当然張り返していない）と重なっている。

- `registry.ts` を import しているファイルと、使っている値。

| ファイル | 使う値 |
|---|---|
| `src/lib/SearchPalette.svelte:6` | `entries` の `data.id`、`data.names`、`data.category`、`data.aliases[].name`（`search.ts` の `matches`、`matchedAlias` を通して） |
| `src/routes/[lang=lang]/+page.svelte:4`（一覧） | `entries` の `data.id`、`names`、`summary`、`category`、`aliases[].name`、`demo`、`thumb` |
| `src/routes/[lang=lang]/components/[id]/+page.ts:3` | `entries`（prerender の `entries` 関数）、`getEntry` |
| `src/routes/[lang=lang]/components/[id]/+page.svelte:7` | `getEntry`（関連部品の名前を引く） |
| `src/routes/[lang=lang]/systems/+page.svelte:5` | `entries` の `data.id`、`names`、`aliases`（`name`、`source`、`url`） |
| `src/routes/components.json/+server.ts:4` | `entries` の `data` 全部 |
| `src/routes/sitemap.xml/+server.ts:2` | `entries` の `data.id` |

- 詳細ページの `+page.ts`（全文）:

```ts
import { error } from '@sveltejs/kit';
import { definePageMetaTags } from 'svelte-meta-tags';
import { entries as components, getEntry } from '#lib/registry.js';
import { langs } from '#lib/types.js';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	langs.flatMap((lang) => components.map(({ data }) => ({ lang, id: data.id })));

export const load: PageLoad = ({ params }) => {
	const entry = getEntry(params.id);
	if (!entry) error(404);
	return {
		entry,
		...definePageMetaTags({
			title: entry.data.names[params.lang],
			description: entry.data.summary[params.lang]
		})
	};
};
```

- 詳細ページの `+page.svelte:10-19`:

```ts
	let { data: page, params }: PageProps = $props();
	let lang = $derived(params.lang);
	let { data, demo } = $derived(page.entry);
	let ui = $derived(t(lang));
	let related = $derived(
		(data.related ?? []).flatMap((r) => {
			const entry = getEntry(r.id);
			return entry ? [{ ...r, names: entry.data.names }] : [];
		})
	);
```

  テンプレートでは `related` の各要素の `r.id`、`r.names[lang]`、`r.diff[lang]` を使う。

- 一覧の `+page.ts` と対応表の `+page.ts` は、どちらも `definePageMetaTags` を返すだけ（例: 一覧は `export const load: PageLoad = ({ params }) => definePageMetaTags({ title: siteName, titleTemplate: '%s', description: t(params.lang).tagline });`）。
- 一覧の `+page.svelte:72-79`:

```svelte
	{#each shown as { data, demo: Demo, thumb: Thumb } (data.id)}
		<li class="card">
			<div class="thumb" inert>
				<div class="thumb-inner" {@attach fit}>
					{#if Thumb}<Thumb {lang} />{:else}<Demo {lang} />{/if}
```

  `shown` は `entries.filter(({ data }) => !filter.category || data.category === filter.category)`。`cardAliases(d: ComponentData)` は `d.names` と `d.aliases.map((a) => a.name)` を使う。

- `src/lib/search.ts` の `matches(data: ComponentData, query)` と `matchedAlias(data: ComponentData, query)` は、`data.id`、`data.names.en`、`data.names.ja`、`data.aliases[].name` だけを読む。`src/lib/search.check.ts` は `{ id, names, aliases } as ComponentData` を渡して確かめている。
- `src/routes/[lang=lang]/+layout.svelte` は `<SearchPalette lang={params.lang} />` を置いている。`[lang=lang]` には `+layout.ts` も `+layout.server.ts` もない。ルートの `src/routes/+layout.ts` は `prerender = true` と `trailingSlash = 'always'` を出し、メタタグの既定値を返す。
- CLAUDE.md の関係する行は次の 2 つ。
  - 15 行目: `` `src/lib/components/<id>/` に `data.ts` と `Demo.svelte` を置くと、`src/lib/registry.ts` が自動で登録する。 ``
  - 32 行目: `` データの約束事の検査は `src/lib/data.check.ts` に足す。`registry.ts` はクライアントでも動くので、検査を増やさない ``
- 約束事（CLAUDE.md より）: routes と data.ts からは `#lib/*.js` で import し、`src/lib` の中では相対パス。コメントは日本語で理由を書く。インデントはタブ、シングルクォート、末尾カンマなし。

## 方針

SvelteKit の決まりを使う。

1. 全部品のデータは、サーバーだけで読むモジュール `src/lib/server/components.ts` に移す。`src/lib/server/` のモジュールをクライアントのコードが import すると、SvelteKit がビルドを止めるので、うっかり戻ることがない。
2. ページが要るデータは `+page.server.ts`（と `[lang=lang]/+layout.server.ts`）の `load` で、要る形に削って返す。プリレンダーでは、この戻り値が各ページの HTML と `__data.json` に JSON で入る。
3. デモと Thumb は、`eager` なしの `import.meta.glob` で部品ごとのチャンクにし、`+page.ts`（ユニバーサルの `load`）で要るものだけを `await` する。

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `pnpm install --frozen-lockfile` | exit 0 |
| Check | `pnpm check` | exit 0 |
| Build | `pnpm build` | exit 0 |
| E2E | `pnpm test:e2e` | 全件 passed |
| チャンクの大きさ | `for f in $(ls -S build/_app/immutable/chunks/*.js \| head -5); do echo "$f $(wc -c < $f) $(gzip -c $f \| wc -c)"; done` | ファイル名、展開後、gzip のバイト数 |

## Scope

**In scope**:
- `src/lib/registry.ts`（削除）
- `src/lib/server/components.ts`（新規）
- `src/lib/demos.ts`（新規）
- `src/lib/search.ts`、`src/lib/search.check.ts`
- `src/lib/SearchPalette.svelte`
- `src/lib/data.check.ts`（1 行目付近のコメントだけ）
- `src/routes/[lang=lang]/+layout.server.ts`（新規）、`src/routes/[lang=lang]/+layout.svelte`
- `src/routes/[lang=lang]/+page.server.ts`（新規）、`+page.ts`、`+page.svelte`（一覧）
- `src/routes/[lang=lang]/components/[id]/+page.server.ts`（新規）、`+page.ts`、`+page.svelte`
- `src/routes/[lang=lang]/systems/+page.server.ts`（新規）、`+page.ts`、`+page.svelte`
- `src/routes/components.json/+server.ts`、`src/routes/sitemap.xml/+server.ts`
- `CLAUDE.md`（15 行目と 32 行目だけ）

**Out of scope**:
- デモ（`src/lib/components/**`）、`DemoFrame.svelte`、`tests/**`。既存のテストは変えずに通す
- `components.json` の形（`ComponentsJson` の `version`）。中身は 1 バイトも変えない
- `skill` のページ（`registry.ts` を使っていない）

## Git workflow

- Branch: `advisor/024-split-registry`
- コミットメッセージは英語の命令形で 1 文、接頭辞なし（例: `Count the search results from the component directories`）。Step 1〜7 は途中でビルドが壊れるので、全部終えて 1 コミットにする
- push や PR は作らない

## Steps

### Step 0: 今の大きさを記録する

`pnpm build` のあと、上の「チャンクの大きさ」のコマンドを実行し、結果を NOTES 用に控える（いまは先頭が約 620,000 / 184,000 バイト）。あわせて `grep -rl 'Snackbar' build/_app/immutable | wc -l` を控える（いまは 1 以上。`Snackbar` は toast の別名で、データにだけ出てくる語）。

### Step 1: サーバーだけで読むデータのモジュールを作る

`src/lib/server/components.ts` を作る。中身は今の `registry.ts` のデータの部分で、デモは読み込まず、ファイルがあるかだけを確かめる。

```ts
import type { ComponentData } from '../types';

// 1コンポーネント = src/lib/components/<id>/ に data.ts と Demo.svelte を置くだけで登録される。
// 全部品の英日の本文は大きいので、サーバー（プリレンダー）だけで読み、ページには load で要る分だけを渡す
const dataModules = import.meta.glob<ComponentData>('../components/*/data.ts', {
	eager: true,
	import: 'default'
});
// eager なしの glob は中身を読み込まないので、Demo.svelte があるかを確かめるのに使う
const demoPaths = new Set(Object.keys(import.meta.glob('../components/*/Demo.svelte')).map((p) => p.split('/')[2]));

export const components = Object.entries(dataModules)
	.map(([path, data]) => {
		const dir = path.split('/')[2];
		if (data.id !== dir) throw new Error(`id "${data.id}" does not match ${path}`);
		if (!demoPaths.has(dir)) throw new Error(`Demo.svelte is missing for ${data.id}`);
		return data;
	})
	.sort((a, b) => a.names.en.localeCompare(b.names.en, 'en'));

export const getComponent = (id: string) => components.find((d) => d.id === id);
```

`path` は `'../components/<id>/data.ts'` の形なので、`split('/')[2]` が `<id>` になる。`related` の検査は `data.check.ts` にあるので写さない。

### Step 2: デモと Thumb を部品ごとに読み込むモジュールを作る

`src/lib/demos.ts` を作る。

```ts
import type { Component } from 'svelte';
import type { Lang } from './types';

type Demo = Component<{ lang: Lang }>;

// eager にしないと、部品ごとに別のチャンクになり、ページは要るものだけを読み込む
const demoModules = import.meta.glob<Demo>('./components/*/Demo.svelte', { import: 'default' });
// 開いて使う部品は、閉じた状態のデモではサムネイルにきっかけのボタンしか写らない。
// そうした部品は Thumb.svelte を置くと、一覧ではデモの代わりにそれ（開いた状態の絵）を出す
const thumbModules = import.meta.glob<Demo>('./components/*/Thumb.svelte', { import: 'default' });

export const loadDemo = (id: string) => demoModules[`./components/${id}/Demo.svelte`]();

// 一覧のサムネイル。Thumb があればそれを、なければデモを使う
export const loadThumb = (id: string) =>
	(thumbModules[`./components/${id}/Thumb.svelte`] ?? demoModules[`./components/${id}/Demo.svelte`])();
```

**Verify**: `pnpm exec svelte-kit sync && pnpm exec tsc --noEmit -p tsconfig.json 2>&1 | grep -c "src/lib/demos.ts\|src/lib/server/components.ts"` → `0`（新しい 2 つのファイルに型エラーがない。ほかのファイルのエラーはこの時点では無視してよい）。

### Step 3: 検索をデータの一部だけで動くようにする

1. `src/lib/search.ts` の 2 つの関数の引数の型を、使うものだけにする。

```ts
/** 検索に要る分だけ。ページへ渡す量を減らすため、全データではなくこれを渡す */
export type SearchItem = Pick<ComponentData, 'id' | 'names' | 'category'> & { aliases: { name: string }[] };
```

   `matches(data: SearchItem, query: string)`、`matchedAlias(data: SearchItem, query: string)` にする。中身は変えない。`ComponentData` はそのまま `SearchItem` として渡せる。

2. `src/lib/search.check.ts` の `as ComponentData` を `satisfies SearchItem` に変え、`category: 'feedback'` を足す（`SearchItem` は `category` を要るため）。import も `SearchItem` に変える。
3. `src/routes/[lang=lang]/+layout.server.ts` を作る。

```ts
import { components } from '#lib/server/components.js';
import type { SearchItem } from '#lib/search.js';
import type { LayoutServerLoad } from './$types';

// ヘッダーの検索は全ページにあるので、全データではなく名前と別名だけを渡す
export const load: LayoutServerLoad = () => ({
	searchItems: components.map(
		({ id, names, category, aliases }): SearchItem => ({ id, names, category, aliases: aliases.map(({ name }) => ({ name })) })
	)
});
```

4. `src/routes/[lang=lang]/+layout.svelte` で `data` を受け取り、`<SearchPalette lang={params.lang} items={data.searchItems} />` にする（`let { children, params, data }: LayoutProps = $props();`）。
5. `SearchPalette.svelte` で `import { entries } from './registry';` を消し、props に `items: SearchItem[]` を足す。`entries.filter((e) => e.data.category === c).map((e) => item(e.data))` は `items.filter((d) => d.category === c).map(item)`、`entries.filter((e) => matches(e.data, query)).map((e) => item(e.data))` は `items.filter((d) => matches(d, query)).map(item)` にする。`item` の引数の型と `choose(data: ...)` の型は `SearchItem` にし、`ComponentData` の import を外す。テンプレートが使う `data.names`、`data.id`、`data.category` は `SearchItem` にある。

### Step 4: 詳細ページ

1. `src/routes/[lang=lang]/components/[id]/+page.server.ts` を作る。

```ts
import { error } from '@sveltejs/kit';
import { components, getComponent } from '#lib/server/components.js';
import { langs } from '#lib/types.js';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => langs.flatMap((lang) => components.map(({ id }) => ({ lang, id })));

export const load: PageServerLoad = ({ params }) => {
	const data = getComponent(params.id);
	if (!data) error(404);
	// 関連部品はリンクの文字に名前だけを使う
	const related = (data.related ?? []).flatMap((r) => {
		const other = getComponent(r.id);
		return other ? [{ ...r, names: other.names }] : [];
	});
	return { data, related };
};
```

2. `+page.ts` を、サーバーの値にデモとメタタグを足す形にする。

```ts
import { definePageMetaTags } from 'svelte-meta-tags';
import { loadDemo } from '#lib/demos.js';
import type { PageLoad } from './$types';

// デモは Svelte のコンポーネントで JSON にできないので、サーバーの load ではなくここで読み込む
export const load: PageLoad = async ({ data, params }) => ({
	...data,
	demo: await loadDemo(params.id),
	...definePageMetaTags({ title: data.data.names[params.lang], description: data.data.summary[params.lang] })
});
```

3. `+page.svelte` の冒頭を直す。`import { getEntry } from '#lib/registry.js';` を消し、次の形にする（`page` の名前はそのまま）。

```ts
	let { data: page, params }: PageProps = $props();
	let lang = $derived(params.lang);
	let { data, demo, related } = $derived(page);
```

   それまでの `let related = $derived(...)` のブロックは消す。テンプレートは変えない（`related` の要素は `id`、`diff`、`names` を持つ）。

### Step 5: 一覧ページ

1. `src/routes/[lang=lang]/+page.server.ts` を作る。カードに要る分だけを返す。

```ts
import { components } from '#lib/server/components.js';
import type { PageServerLoad } from './$types';

// カードに出す分だけを渡す。本文（挙動やキー操作など）は詳細ページでだけ使う
export const load: PageServerLoad = () => ({
	cards: components.map(({ id, category, names, summary, aliases }) => ({
		id,
		category,
		names,
		summary,
		aliases: aliases.map(({ name }) => ({ name }))
	}))
});
```

2. `+page.ts` を、サムネイルを読み込んでから返す形にする。今の `definePageMetaTags(...)` は残す。

```ts
// 一覧はすべてのサムネイルを最初から描くので、全部読み込んでから表示する（部品ごとのチャンクを並行して読む）
export const load: PageLoad = async ({ data, params }) => {
	const thumbs = Object.fromEntries(await Promise.all(data.cards.map(async ({ id }) => [id, await loadThumb(id)] as const)));
	return { ...data, thumbs, ...definePageMetaTags({ title: siteName, titleTemplate: '%s', description: t(params.lang).tagline }) };
};
```

3. `+page.svelte` を直す。`import { entries } from '#lib/registry.js';` と `type ComponentData` の import を消し、`let { data, params }: PageProps = $props();` で受け取る。`shown` は `data.cards.filter((c) => !filter.category || c.category === filter.category)` にし、`cardAliases` の引数の型は `(typeof data.cards)[number]` にする。`{#each}` は次の形にする。キーは `card.id` のまま。

```svelte
	{#each shown as card (card.id)}
		{@const Thumb = data.thumbs[card.id]}
		<li class="card">
			<div class="thumb" inert>
				<div class="thumb-inner" {@attach fit}>
					<Thumb {lang} />
```

   それまでの `{#if Thumb}<Thumb {lang} />{:else}<Demo {lang} />{/if}` は、`loadThumb` が選ぶので 1 つになる。カードの中の `data.id`、`data.names`、`data.summary` は `card.` に変える。`data` という名前がページの props と重なるので、`{#each}` の中で `data.` を残さないこと。

### Step 6: 対応表、components.json、sitemap

1. `src/routes/[lang=lang]/systems/+page.server.ts` を作り、`{ rows: components.map(({ id, names, aliases }) => ({ id, names, aliases })) }` を返す。`+page.ts` は `({ data, params }) => ({ ...data, ...definePageMetaTags({...今のまま...}) })` にする。`+page.svelte` は `entries.flatMap(({ data }) => data.aliases.map(...))` を `page.rows.flatMap((data) => data.aliases.map((alias) => ({ alias, data })))` のように、props から受け取った値で書き換える（props の名前は既存の書き方に合わせ、`let { data: page, params }: PageProps = $props();` にする）。
2. `src/routes/components.json/+server.ts` は `import { components } from '#lib/server/components.js';` にし、`entries.map(({ data }) => ({ ...data, urls: ... }))` を `components.map((data) => ({ ...data, urls: ... }))` にする。
3. `src/routes/sitemap.xml/+server.ts` も同じく `components.map(({ id }) => componentPath(lang, id))` にする。
4. `src/lib/registry.ts` を消す。

**Verify**: `grep -rn "registry" src` → `src/lib/data.check.ts` のコメントの 1 件だけ。`pnpm check` → exit 0。

### Step 7: コメントと CLAUDE.md を直す

1. `src/lib/data.check.ts` の 2 行目 `// registry.ts はクライアントでも動くため、ビルド時にだけ要る検査はここに置く` を、`// 検査はページの表示と分けてここに置く（src/lib/server/components.ts はプリレンダーのたびに動くため、重い検査を増やさない）` にする。
2. CLAUDE.md の 15 行目の `src/lib/registry.ts` を `src/lib/server/components.ts`（データ）と `src/lib/demos.ts`（デモと Thumb）に書き換える。32 行目は「データの約束事の検査は `src/lib/data.check.ts` に足す。`src/lib/server/components.ts` はプリレンダーのたびに動くので、検査を増やさない」にする。あわせて、ページへ渡すデータは `+page.server.ts` などの `load` で要る分だけに削る、という 1 行を「コードの約束事」に足す。

**Verify**: `pnpm check` → exit 0。

### Step 8: ビルドして大きさを比べる

**Verify**:
- `pnpm build` → exit 0
- `grep -rl 'Snackbar' build/_app/immutable | wc -l` → `0`（データの本文がクライアントの JS に入っていない）
- 「チャンクの大きさ」のコマンド → 先頭のチャンクが展開後 150,000 バイト未満
- `ls build/ja/components/modal/__data.json build/en/__data.json` → 2 つともある

### Step 9: 全体を確かめる

**Verify**: `pnpm check && pnpm build && pnpm test:e2e` → すべて exit 0、e2e は全件 passed。`components.json` の中身が変わっていないことは `tests/components-json.spec.ts` と、次のコマンドで確かめる。`git stash` は使わず、変更前のビルドの `components.json` を Step 0 のときに `cp build/components.json /tmp/components-before.json` で控えておき、`cmp /tmp/components-before.json build/components.json` → 差分なし。

## Test plan

- 既存のテストをそのまま通すことで確かめる。対象は、一覧のサムネイル（`tests/thumbs.spec.ts`、`tests/list.spec.ts`）、詳細ページの全部品の axe（`tests/a11y.spec.ts`）、検索（`tests/search.spec.ts`）、関連部品と目次（`tests/layout.spec.ts`）、components.json（`tests/components-json.spec.ts`）
- 新しいテストは書かない。大きさは Step 8 のコマンドで確かめる

## Done criteria

- [ ] `test -f src/lib/registry.ts` が失敗する（ファイルがない）
- [ ] `grep -rln "server/components" src/lib/*.svelte src/lib/components` → 0 件（クライアントのコードがサーバーのモジュールを読んでいない）
- [ ] `grep -rl 'Snackbar' build/_app/immutable | wc -l` → `0`
- [ ] 先頭のチャンクが展開後 150,000 バイト未満（NOTES に前後の数字を書く）
- [ ] `cmp` で `components.json` が変更前と同じ
- [ ] `pnpm check`、`pnpm build`、`pnpm test:e2e` がすべて exit 0
- [ ] `git status` で、In scope 以外のファイルが変わっていない

## STOP conditions

- プリレンダーが `__data.json` を出さない、またはサーバーの `load` があるページで `pnpm build` が失敗し、エラーが `prerender` や `adapter-static` の設定を変えないと直らない
- 一覧ページのサムネイルが表示されない、またはハイドレーションのエラーがコンソールに出る（`tests/thumbs.spec.ts` が落ちる）
- 詳細ページで、言語の切り替えや関連部品への移動のあとデモが変わらない（`tests/layout.spec.ts` や `tests/keyboard.spec.ts` の言語のテストが落ちる）
- `components.json` の中身が変わる
- Step 8 で、先頭のチャンクが 150,000 バイト未満にならない。そのときは、どのモジュールが大きいかを `build/_app/immutable/chunks` の中身で調べて報告する（推測で直さない）

## Maintenance notes

- ページで部品の新しい欄を使うときは、そのページの `+page.server.ts` が返す形にも足す。全データを返すと、この計画の前に戻る。
- `src/lib/server/` はクライアントから import できない。検索の候補に新しい欄を使うときは、`SearchItem` と `+layout.server.ts` に足す。
- 一覧はサムネイルを部品ごとのチャンクで並行して読む。部品が数百になってリクエストが多すぎると感じたら、一覧だけ `eager` の glob にまとめることを考える。
