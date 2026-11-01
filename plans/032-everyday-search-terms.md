# Plan 032: 「プルダウン」など普段の呼び名でも、ヘッダーの検索で部品が見つかる

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 8ba0ef9..HEAD -- src/lib/types.ts src/lib/search.ts src/lib/search.check.ts src/lib/data.check.ts 'src/routes/[lang=lang]/+layout.server.ts' src/routes/components.json/+server.ts tests/search.spec.ts`
> この計画は 024（`src/lib/server/components.ts`、`[lang=lang]/+layout.server.ts`、`SearchItem`）のあとの形を前提にする。`src/lib/registry.ts` がまだあるなら STOP。

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P3 | S | LOW | 021、024、026 | direction | `8ba0ef9`（2026-11-02） |

## Why this matters

サイトのキャッチは「そのUI、なんて名前？」。名前を知らない人が、自分の知っている言い方で探せることが要になる。ところが、日本語でよく使われる「プルダウン」「ドロップダウン」「吹き出し」「スナックバー」「ポップアップ」は、67 部品のどこにも出てこない。別名（`aliases`）は、どのデザインシステムでの呼び名かを `source` に書き、`src/lib/data.check.ts` の `designSystems` の一覧から選ぶ決まりなので、出典のない普段の呼び名を入れる場所がない。そのため「プルダウン」と打つと「該当するコンポーネントはありません」になる。

この計画は、検索だけに使う語の欄を足す。画面にも `components.json` にも出さないので、「出典のある呼び名だけを別名として見せる」という方針は変わらない。

## Current state

- `src/lib/types.ts` の `ComponentData` の別名は `aliases: { name: string; source: string; url: string }[];`。ほかに `related?`、`sources` など。
- 024 のあとの `src/lib/search.ts` は次のとおり。

```ts
/** 検索に要る分だけ。ページへ渡す量を減らすため、全データではなくこれを渡す */
export type SearchItem = Pick<ComponentData, 'id' | 'names' | 'category'> & { aliases: { name: string }[] };

// ponytail: 部分一致のみ。typo 許容が要るほど件数が増えたら Fuse.js を検討する
export const matches = (data: SearchItem, query: string) => {
	const q = normalize(query);
	return [data.id, data.names.en, data.names.ja, ...data.aliases.map((a) => a.name)].some((s) =>
		normalize(s).includes(q)
	);
};
```

  `matchedAlias(data, query)` は、名前ではなく別名で一致したときに、その別名を返す（検索の候補に「別名: …」と出すため）。
- 024 のあとの `src/routes/[lang=lang]/+layout.server.ts` は、`components` から `{ id, names, category, aliases: aliases.map(({ name }) => ({ name })) }` を作って `searchItems` として返す。
- `src/routes/components.json/+server.ts` は、各部品のデータを `{ ...data, urls }` として出している。`components.json` の形を変えるときは `ComponentsJson` の `version` を上げ、スキルも合わせる決まり（CLAUDE.md）。この計画では形を変えない。
- `src/lib/search.check.ts` は `node` で動く小さな検査で、`normalize` と `matchedAlias` を確かめている。
- `tests/search.spec.ts` は、ショートカット（`Meta+k` か `Control+k`）で検索を開き、`dialog.getByRole('combobox').fill(...)` で打ち、`dialog.getByRole('option')` を確かめている。
- `normalize` はカタカナをひらがなにそろえ、長音と空白と記号を消すが、カタカナと英字の間はつながらない（「スナックバー」と `Snackbar` は一致しない）。

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `pnpm install --frozen-lockfile` | exit 0 |
| 検査 | `node src/lib/search.check.ts && node src/lib/data.check.ts` | `ok` が 2 行 |
| Check | `pnpm check` | exit 0 |
| Build / E2E | `pnpm build && pnpm exec playwright test tests/search.spec.ts tests/components-json.spec.ts` | 全件 passed |
| E2E（全部） | `pnpm test:e2e` | 全件 passed |

## Scope

**In scope**:
- `src/lib/types.ts`、`src/lib/search.ts`、`src/lib/search.check.ts`、`src/lib/data.check.ts`
- `src/routes/[lang=lang]/+layout.server.ts`、`src/routes/components.json/+server.ts`
- 下の表の部品の `data.ts`（`searchTerms` を足すだけ）
- `tests/search.spec.ts`
- `CLAUDE.md`（「data.ts」の節に 1 行）

**Out of scope**:
- 表にない語を足すこと。語を増やすのは保守する人が決める
- 検索の候補での表示の変更（検索語で一致したときは、別名を出さない）
- `components.json` の形と `version`

## Git workflow

- Branch: `advisor/032-everyday-search-terms`
- コミットメッセージは英語の命令形で 1 文、接頭辞なし（例: `Add a search palette opened with Cmd/Ctrl+K, replacing name filtering on the list page`）。1 コミットでよい
- push や PR は作らない

## Steps

### Step 1: 型に検索だけの語を足す

`ComponentData` の `aliases` の下に足す。

```ts
	/** 検索だけに使う、普段の呼び名（例: 「プルダウン」）。出典のある呼び名ではないので、画面にも components.json にも出さない */
	searchTerms?: string[];
```

`src/lib/search.ts` の `SearchItem` に `'searchTerms'` を含め（`Pick<ComponentData, 'id' | 'names' | 'category' | 'searchTerms'>`）、`matches` の並びに `...(data.searchTerms ?? [])` を足す。`matchedAlias` は変えない（検索語で一致しても「別名: …」は出さない）。

### Step 2: 検索に渡し、components.json からは外す

1. `+layout.server.ts` の `searchItems` を作るところで、`searchTerms` も渡す。
2. `components.json/+server.ts` で、`components.map((data) => ...)` の中を `({ searchTerms, ...data }) => ({ ...data, urls: ... })` にする。理由をコメントに書く（例: `検索だけの語は出典のある呼び名ではないので、スキルに渡す知識には含めない`）。`searchTerms` を使わないことで lint の警告が出るなら、`void searchTerms;` ではなく、分割代入の名前を `searchTerms: _searchTerms` にする。

### Step 3: 語を足す

次の表のとおりに、各部品の `data.ts` の `aliases` の直後に `searchTerms` を足す。表にない語は足さない。

| 部品 | `searchTerms` |
|---|---|
| select | `['プルダウン', 'ドロップダウン', 'ドロップダウンリスト']` |
| menu | `['ドロップダウンメニュー', 'プルダウンメニュー']` |
| tooltip | `['吹き出し']` |
| toast | `['スナックバー']` |
| modal | `['ポップアップ']` |
| popover | `['ポップアップ']` |

### Step 4: データの検査を足す

`src/lib/data.check.ts` の部品ごとのループに足す。

```ts
	// 検索だけの語は、空の語と、名前や別名と同じ語を入れない（同じなら要らない）
	for (const term of d.searchTerms ?? []) {
		if (!term.trim()) errors.push(`${d.id}: empty search term`);
		if ([d.names.en, d.names.ja, ...d.aliases.map((a) => a.name)].includes(term)) errors.push(`${d.id}: search term repeats a name: ${term}`);
	}
```

`search.check.ts` に、`searchTerms` で一致する場合と、そのとき `matchedAlias` が `undefined` を返す場合を足す（今の toast の例にならう）。

**Verify**: `node src/lib/search.check.ts && node src/lib/data.check.ts` → `ok` が 2 行。

### Step 5: 検索のテストを足す

`tests/search.spec.ts` に足す。

```ts
test('search: an everyday name such as プルダウン finds the select, without showing it as an alias', async ({ page }) => {
	await page.goto('ja/');
	await page.waitForLoadState('networkidle');
	await page.keyboard.press(shortcut);
	const dialog = page.getByRole('dialog', { name: '名前で検索' });
	await dialog.getByRole('combobox').fill('プルダウン');
	const option = dialog.getByRole('option').first();
	await expect(option).toContainText('セレクトボックス');
	await expect(option).not.toContainText('プルダウン');
});
```

`tests/components-json.spec.ts` に、どの部品にも `searchTerms` がないことを確かめる 1 行を足す（`expect(json.components.some((c: Record<string, unknown>) => 'searchTerms' in c)).toBe(false);`）。

**Verify**: `pnpm build && pnpm exec playwright test tests/search.spec.ts tests/components-json.spec.ts` → 全件 passed。

### Step 6: CLAUDE.md に書く

「### data.ts」の節に、次の 1 行を足す。

```text
- `searchTerms`（任意）は、検索だけに使う普段の呼び名（「プルダウン」など）。出典のある呼び名は `aliases` に書く。`searchTerms` は画面にも `components.json` にも出ない
```

### Step 7: 全体を確かめる

**Verify**: `pnpm check && pnpm build && pnpm test:e2e` → すべて exit 0。

## Test plan

- `search.check.ts` に、検索語で一致する場合と、そのとき別名を返さない場合を足す
- `tests/search.spec.ts` に、「プルダウン」でセレクトボックスが見つかるテストを足す
- `tests/components-json.spec.ts` に、`searchTerms` が出ていないことの確かめを足す

## Done criteria

- [ ] `grep -n "searchTerms?: string\[\]" src/lib/types.ts` → 1 行
- [ ] `grep -rn "searchTerms" src/lib/components/*/data.ts | wc -l` → `6`
- [ ] `curl` を使わず、`build/components.json` に `searchTerms` がない（`grep -c searchTerms build/components.json` → `0`）
- [ ] `pnpm check`、`pnpm build`、`pnpm test:e2e` がすべて exit 0
- [ ] `git status` で、In scope 以外のファイルが変わっていない

## STOP conditions

- 024 の形（`src/lib/server/components.ts`、`SearchItem`、`+layout.server.ts`）になっていない
- `components.json` の中身が、`searchTerms` を外したあとも変わってしまう（`tests/components-json.spec.ts` が落ちる）
- 表の語のどれかが、すでに別名や名前にある（`data.check.ts` の新しい検査で落ちる）

## Maintenance notes

- 語を足すのは、検索で見つからないという声や、検索の記録があったときにする。出典のある呼び名が見つかったら、`searchTerms` から外して `aliases` に移す。
- 1 つの語が複数の部品を指してよい（「ポップアップ」はモーダルとポップオーバー）。検索の候補に両方が並ぶ。
