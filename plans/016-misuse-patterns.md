# 避けたい使い方 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 詳細ページに「避けたい使い方」のセクションを足し、根拠のある項目を全 46 部品から調べて載せる。

**Architecture:** `ComponentData` に省略可能な `misuse` を足し、詳細ページで `usage` の直後に描画する。まず表示の仕組みとカルーセル 1 件を作り、残りはカテゴリごとに「調査役が書く → 別の検査役が出典を開き直して確かめる → 直す」を繰り返す。

**Tech Stack:** SvelteKit 3、Svelte 5（runes）、TypeScript、Playwright と axe。

**Spec:** `plans/016-misuse-design.md`

## Global Constraints

- 文言は `{ en, ja }` の両方を書き、同じ内容にする。出典の文を写さず、言い換えて書く
- harm（誰がどう困るか）は出典に書かれている内容に限る。pattern と instead は作る人が判断してよい
- `deceptive: true` は、出典がディセプティブパターンやダークパターンとして分類しているものにだけ付ける
- 出典は各部品の `sources` に足す。`checkedAt` は、エージェントがページを取得して内容を確かめた日（`YYYY-MM-DD`）にする
- DADS の出典ラベルは `デジタル庁デザインシステムウェブサイト「<ページ名>」をもとに作成` にする
- 1 部品あたり 0〜3 件。根拠が見つからない部品には書かない
- 法令違反かどうかの判断は書かない。読み手を責める口調にしない
- 見出しは ja「避けたい使い方」、en「Misuses to avoid」。ラベルは ja「困ること」「代わりに」「ディセプティブパターン」、en「Harm」「Instead」「Deceptive pattern」
- コードの約束事は CLAUDE.md に従う（タブ、シングルクォート、末尾カンマなし、日本語で WHY のコメント）

## Review Focus

1. `misuse` のない部品（例: divider）では、見出しごとセクションが出ない
2. ディセプティブパターンの区別が色だけに頼っておらず、文字のラベルがある
3. `usage` から移した結果 `usage` が空になった部品では、「使い分け・注意点」のセクションが消える（既存の `usage?.length` 判定で済むが、e2e で確かめる）
4. 同じ部品の中で `pattern.en` が重なると `{#each}` のキーが衝突する（`data.check.ts` で検出する）
5. 言語を切り替えると、見出しとラベルも切り替わる

---

### Task 1: 表示の仕組みとカルーセルの 1 件

**Files:**
- Modify: `src/lib/types.ts`（`ComponentData` に `misuse` を足す）
- Modify: `src/lib/i18n.ts`（`ui.en` と `ui.ja` にキーを足す）
- Modify: `src/routes/[lang=lang]/components/[id]/+page.svelte`（`usage` のセクションの直後）
- Modify: `src/lib/data.check.ts`（`keyed` と `texts`）
- Modify: `src/lib/components/carousel/data.ts`
- Modify: `CLAUDE.md`（「data.ts」の節）
- Create: `tests/misuse.spec.ts`
- Modify: `tests/a11y.spec.ts`（パスの一覧に `ja/components/carousel/` を足す）

**Interfaces:**
- Produces: `ComponentData['misuse']` の型。設計書のとおり `{ pattern: Text; harm: Text; instead: Text; deceptive?: true }[]` で、各フィールドに設計書の JSDoc を付ける
- Produces: i18n のキー `misuse`、`harm`、`instead`、`deceptive`

- [ ] **Step 1: e2e テストを書く**

`tests/misuse.spec.ts` を作り、次の 3 つのテストを置く。

```ts
test('misuse: carousel shows the section with labels', async ({ page }) => {
	await page.goto('ja/components/carousel/');
	const section = page.getByRole('region', { name: '避けたい使い方' });
	await expect(section).toBeVisible();
	await expect(section).toContainText('困ること');
	await expect(section).toContainText('代わりに');
});

test('misuse: section is absent without entries', async ({ page }) => {
	await page.goto('en/components/divider/');
	await expect(page.getByRole('heading', { name: 'Misuses to avoid' })).toHaveCount(0);
});

test('misuse: labels follow the language switch', async ({ page }) => {
	await page.goto('ja/components/carousel/');
	await page.waitForLoadState('networkidle');
	await page.getByRole('link', { name: 'English' }).click();
	await expect(page.getByRole('heading', { name: 'Misuses to avoid' })).toBeVisible();
	await expect(page.getByRole('region', { name: 'Misuses to avoid' })).toContainText('Harm');
});
```

`tests/a11y.spec.ts` のパスの一覧に `'ja/components/carousel/'` を足す。

2 つ目のテストは、項目のない部品を 1 つ使う。Task 8 で divider に項目を足したときは、項目のない別の部品に差し替える。

- [ ] **Step 2: 失敗を確かめる**

Run: `pnpm build && pnpm test:e2e tests/misuse.spec.ts`
Expected: 1 つ目と 3 つ目が FAIL（見出しがない）、2 つ目は PASS

- [ ] **Step 3: 型、文言、描画、検査を足す**

- `types.ts`: `usage` の直後に `misuse?` を足す
- `i18n.ts`: en は `misuse: 'Misuses to avoid'`、`harm: 'Harm'`、`instead: 'Instead'`、`deceptive: 'Deceptive pattern'`。ja は `misuse: '避けたい使い方'`、`harm: '困ること'`、`instead: '代わりに'`、`deceptive: 'ディセプティブパターン'`
- `+page.svelte`: `{#if data.misuse?.length}` で `<section aria-labelledby="misuse">` と `<h2 id="misuse">` を描く（`usage` のセクションと同じ形）。項目のキーは `m.pattern.en` にする。1 件は、`pattern` を `<h3>` にし、`deceptive` のときは `<h3>` の中にラベル（`.badge` 風の小さな枠、文字は `ui.deceptive`）を添える。その下に `<dl>` で `ui.harm` → `harm`、`ui.instead` → `instead` を並べる。ラベルの色は `--color-danger` の枠線と文字色を使い、背景は塗らない
- `data.check.ts`: `keyed` に `['misuse', (d.misuse ?? []).map((m) => m.pattern.en)]`、`texts` に `...(d.misuse ?? []).flatMap((m) => [m.pattern, m.harm, m.instead])` を足す
- `carousel/data.ts`: `usage` の「Do not autoplay」の項目を消し、`misuse` に移す。pattern は「自動で切り替わる」、harm と instead は WCAG 2.2 の Understanding SC 2.2.2 と DADS のカルーセルの使い方のページ（https://design.digital.go.jp/dads/components/carousel/usage/）を開いて書く。2 つを `sources` に足す。`deceptive` は付けない
- `CLAUDE.md`: 「data.ts」の節に 1 項目足す。内容は、`misuse` は pattern・harm・instead の 3 つで書く、harm は出典に書かれた内容に限る、`deceptive: true` は出典がディセプティブパターンやダークパターンとして分類しているものだけ、根拠が見つからない部品には書かない

- [ ] **Step 4: 通ることを確かめる**

Run: `pnpm check && pnpm build && pnpm test:e2e`
Expected: `pnpm check` は 0 ERRORS と `ok` が 3 行。e2e はすべて PASS（a11y の carousel を含む）

- [ ] **Step 5: ブラウザで見る**

`ja/components/carousel/` を開き、セクションの見た目が既存のセクション（使い分け・注意点、似た部品との違い）と並んで浮かないことを確かめる。

- [ ] **Step 6: コミット**

```bash
git add -A
git commit -m "Add the misuses-to-avoid section with the carousel entry"
```

---

### Task 2〜8: カテゴリごとの調査と検査

1 カテゴリを 1 タスクにする。順番と対象は次のとおり。

| Task | カテゴリ | 部品 |
|---|---|---|
| 2 | input | checkbox combobox date-picker file-upload listbox number-input radio search-field select slider switch text-field textarea |
| 3 | action | button menu split-button toggle-button toolbar |
| 4 | overlay | alert-dialog drawer modal popover tooltip |
| 5 | feedback | alert progress-bar skeleton spinner toast |
| 6 | navigation | breadcrumb link pagination stepper tabs tree-view |
| 7 | disclosure | accordion disclosure（carousel は Task 1 で済み。追加があれば足す） |
| 8 | data | avatar badge card description-list divider list meter table tag |

**Files:**
- Modify: 対象部品の `src/lib/components/<id>/data.ts`

**Interfaces:**
- Consumes: Task 1 の `misuse` の型と、CLAUDE.md に足した書き方

各タスクは同じ手順で進める。

- [ ] **Step 1: 調査役のサブエージェントが書く**

調査役に渡すもの: 設計書、この計画の Global Constraints、対象部品の一覧、Task 1 のカルーセルの `misuse` を見本として。

調査役の仕事:
- 部品ごとに、設計書の「出典の候補」を中心に、避けたい使い方の根拠を WebFetch で開いて探す
- 見つかったものを `misuse` に書き、出典を `sources` に足す。`usage` の「〜しない」系で 3 つの要素で書けるものは移す
- 最後に、項目ごとに「項目の pattern.ja / harm を裏付ける出典 URL / 出典のどこに書いてあるか（見出しか要約）/ deceptive を付けた根拠」の対応表を返す。根拠が見つからず書かなかった部品も、その旨を返す

- [ ] **Step 2: 検査役の別サブエージェントが確かめる**

検査役には調査役の会話を渡さず、対応表と差分（`git diff`）だけを渡す。

検査役の仕事:
- 対応表の URL をすべて自分で開き直し、harm が出典に書かれているかを 1 件ずつ判定する
- `deceptive: true` の項目は、出典がディセプティブパターンやダークパターンとして分類しているかを確かめる。付いていない項目に付けるべきものがないかも見る
- en と ja が同じ内容か、出典の文を写していないか、責める口調でないかを見る
- 項目ごとに「OK / 直す（理由と直し方）/ 消す（理由）」を返す

- [ ] **Step 3: 検査結果を反映する**

「直す」「消す」をすべて反映する。調査役と検査役の判断が食い違ったときは、消す側に倒す（根拠の確かさを優先する設計のため）。

- [ ] **Step 4: 通ることを確かめる**

Run: `pnpm check`
Expected: 0 ERRORS と `ok` が 3 行

- [ ] **Step 5: コミット**

```bash
git add src/lib/components
git commit -m "Add misuses to avoid for the <category> components"
```

---

### Task 9: 全体の確認

- [ ] **Step 1: 全体のテスト**

Run: `pnpm check && pnpm build && pnpm test:e2e`
Expected: すべて PASS

- [ ] **Step 2: 消えたセクションを確かめる**

`usage` から項目を移して `usage` が空になった部品があれば、その詳細ページで「使い分け・注意点」が出ていないことをブラウザで確かめる。

- [ ] **Step 3: 一覧を作る**

項目を書いた部品、書かなかった部品、`deceptive` の件数を数えて、最終報告に載せる。
