# Plan 028: スキルの指摘が、Lab のページの該当の節を直接開くリンクを添える

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 8ba0ef9..HEAD -- skills/improve-ui-components 'src/routes/[lang=lang]/components/[id]/+page.svelte' tests/components-json.spec.ts`
> 027 は SKILL.md と references を変えている。024 は詳細ページの `<script>` を変えている。下の「Current state」の文が見つからなければ STOP。

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P3 | S | LOW | 027（同じ SKILL.md を触る） | direction | `8ba0ef9`（2026-11-02） |

## Why this matters

improve-ui-components スキルは、指摘ごとに根拠として Lab のページと、頼った欄（usage、misuse、keyboard など）を挙げる。いまはページの URL だけを添えるので、計画や issue を読む人は長いページの中から該当の節を自分で探すことになる。詳細ページにはすでに節ごとの id があるので、URL の後ろに `#<id>` を付けるだけで、その節が開く。id が変わるとリンクが黙って先頭を指すようになるので、id の一覧をテストで固定する。

## Current state

- 詳細ページ `src/routes/[lang=lang]/components/[id]/+page.svelte` は、節の見出しに次の id を付けている（`<h2 id="…">`）。`appearance`、`behavior`、`keyboard`、`sources` はいつもあり、`aliases`、`variations`、`usage`、`misuse`、`related` は中身があるときだけ出る。目次（`toc`）はこの id の並びから作っている。

```ts
			[
				['aliases', data.aliases.length],
				['appearance', true],
				['behavior', true],
				['keyboard', true],
				['variations', data.variations?.length],
				['usage', data.usage?.length],
				['misuse', data.misuse?.length],
				['related', related.length],
				['sources', true]
			] as const
```

- `skills/improve-ui-components/SKILL.md` の「## The knowledge base」の最後の行は ``- Cite the Lab page in the user's language (`urls.ja` for Japanese, otherwise `urls.en`).``。Rule 6 は ``The basis is the UI Component Lab entry (its page URL and the field you relied on: usage, related, misuse, keyboard, behavior)``。
- `skills/improve-ui-components/references/audit-playbook.md` の「## Finding format」には、根拠の書き方の例がある（executor は読んで、Lab の URL を書く箇所を確かめる）。
- `tests/components-json.spec.ts` は `request.get('components.json')` で JSON を取って確かめている。
- `skills/skills.check.ts` は SKILL.md の要の文を確かめている（027 で Hard Rules の節を切り出す形になった）。

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `pnpm install --frozen-lockfile` | exit 0 |
| スキルの検査 | `node skills/skills.check.ts` | `ok` |
| Check | `pnpm check` | exit 0 |
| E2E | `pnpm build && pnpm exec playwright test tests/components-json.spec.ts` | 全件 passed |

## Scope

**In scope**:
- `skills/improve-ui-components/SKILL.md`
- `skills/improve-ui-components/references/audit-playbook.md`（Finding format の例だけ）
- `tests/components-json.spec.ts`

**Out of scope**:
- 詳細ページの id の変更、`components.json` の形の変更（`version` を上げない）
- 1 件ごとの misuse への id（いまはない。必要になったら別に考える）

## Git workflow

- Branch: `advisor/028-skill-section-links`
- コミットメッセージは英語の命令形で 1 文、接頭辞なし（例: `Give components.json a site URL with a single trailing slash`）。1 コミットでよい
- push や PR は作らない

## Steps

### Step 1: SKILL.md に、節へのリンクの付け方を書く

「## The knowledge base」の最後の行を、次の 2 行にする。

```text
- Cite the Lab page in the user's language (`urls.ja` for Japanese, otherwise `urls.en`).
- Link the section you relied on by appending its id to that URL: `#usage`, `#misuse`, `#keyboard`, `#behavior`, `#related`, `#variations`, `#appearance`, `#aliases` or `#sources` (for example `…/components/select/#usage`). A section whose field is absent from the entry is not on the page.
```

**Verify**: `grep -c "#misuse" skills/improve-ui-components/SKILL.md` → 1 以上。`node skills/skills.check.ts` → `ok`。

### Step 2: Finding format の例を、節へのリンクにする

`references/audit-playbook.md` の「## Finding format」で、Lab のページの URL を書いている例を `…/components/<id>/#<section>` の形にする。例がない場合は、根拠の行の説明に「with the section id, such as `#usage`」と足す。

### Step 3: 節の id をテストで固定する

`tests/components-json.spec.ts` に、次のテストを足す。すべての欄を持つ部品（`aliases`、`variations`、`usage`、`misuse`、`related` がどれも空でない部品）を `components.json` から 1 つ選び、その `urls.en` を開いて、9 つの id がすべてあることを確かめる。

```ts
// improve-ui-components スキルは、根拠の節を URL の #id で指す。id を変えるとスキルのリンクが先頭を指すようになる
test('components.json: detail pages have the section ids the skill links to', async ({ page, request }) => {
	const json = await (await request.get('components.json')).json();
	const full = json.components.find(
		(c: Record<string, unknown[]>) => ['aliases', 'variations', 'usage', 'misuse', 'related'].every((k) => c[k]?.length)
	);
	expect(full).toBeTruthy();
	await page.goto(new URL(full.urls.en).pathname.replace(/^\/ui-component-lab\//, ''));
	for (const id of ['aliases', 'appearance', 'behavior', 'keyboard', 'variations', 'usage', 'misuse', 'related', 'sources'])
		await expect(page.locator(`h2#${id}`)).toHaveCount(1);
});
```

`urls.en` は本番の絶対 URL（`https://oekazuma.github.io/ui-component-lab/en/components/<id>/`）なので、`baseURL` からの相対パスに直して開く。

**Verify**: `pnpm build && pnpm exec playwright test tests/components-json.spec.ts` → 全件 passed。

### Step 4: 全体を確かめる

**Verify**: `pnpm check && pnpm build && pnpm test:e2e` → すべて exit 0。

## Test plan

Step 3 のテスト 1 件。SKILL.md の文は `skills.check.ts` が形を確かめる。

## Done criteria

- [ ] `grep -n "appending its id" skills/improve-ui-components/SKILL.md` → 1 行
- [ ] `grep -n "section ids the skill links to" tests/components-json.spec.ts` → 1 行
- [ ] `node skills/skills.check.ts` → `ok`
- [ ] `pnpm check`、`pnpm build`、`pnpm test:e2e` がすべて exit 0
- [ ] `git status` で、In scope 以外のファイルが変わっていない

## STOP conditions

- すべての欄を持つ部品が 1 つもない（Step 3 のテストの前提が崩れている）
- 詳細ページの id が上の 9 つと違う
- SKILL.md の `description`（frontmatter）を変えないと書けない

## Maintenance notes

- 詳細ページの節を足したり id を変えたりするときは、SKILL.md の一覧と Step 3 のテストの一覧を同じ変更で直す。
