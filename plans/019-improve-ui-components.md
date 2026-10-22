# improve-ui-components 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 本番サイトの URL を渡すと、UI Component Lab の知見でそのページの UI を点検し、改善計画を `plans/` に書くエージェントスキル `improve-ui-components` と、その知見の JSON を公開する。

**Architecture:** サイトに全部品の data.ts をまとめた `components.json` をプリレンダーで出す。スキルは `skills/improve-ui-components/` に SKILL.md と参照ファイルを置き、実行のたびに公開中の JSON を読む。スキルの形は小さな検査スクリプトで、効き目はわざと問題を入れた検証用ページで確かめる。

**Tech Stack:** SvelteKit 3（`+server.ts` のプリレンダー）、TypeScript、Node（検査スクリプト）、Playwright（e2e）、エージェントスキル（SKILL.md、`npx skills add`）。

**Spec:** `plans/019-improve-ui-components-design.md`

## Global Constraints

- スキル名は `improve-ui-components`。置き場所は `skills/improve-ui-components/SKILL.md`。入れ方は `npx skills add oekazuma/ui-component-lab`
- 呼び出し方は `/improve-ui-components <URL> [<URL> ...]`。点検するのは渡されたページだけ
- スキルはソースを直さない。書いてよいのは `plans/` の計画と索引だけ（improve と同じ）
- 本番サイトでは、送信・購入・削除・保存・確定・ログイン・認証情報の入力をしない。値が変わる操作（ラジオボタン・セレクトボックス・スライダー・スイッチでの矢印キーや Space、入力欄への入力）もしない。変えてから戻すこともしない
- リポジトリがそのサイトのソースなら、開発用サーバーを立ち上げて手元で点検する。準備が要るときは利用者に確かめる。立ち上げたサーバーは最後に止める
- 根拠は Lab の部品ページの該当項目と、その部品の sources。Lab にないことは、その実行で開いた APG・WCAG・DADS のページに限る。Lab の部品に当たらない UI と axe だけの違反は「Lab 外の気づき」として別枠
- improve の計画のひな形（MIT）は著作権表示を付けて写す。`plans/` の番号と `plans/README.md` の形は improve とそろえる
- JSON には形式の版 `version` を入れる。スキルは知らない版なら止まって知らせる
- スキルのファイルは英語で書く（Lab の英語側の利用者も使うため）。スキルが利用者に返す文と計画は、利用者の言語で書く

## Review Focus

1. 公開中の JSON が取れない、または `version` が想定と違う → 推測で進めず、止まって理由を伝える（Task 2 の検査で SKILL.md にこの手順があることを確かめる）
2. 今いるリポジトリがそのサイトのソースでない → 開発用サーバーを立ち上げず、本番を読み取るだけの点検にして、値が変わる操作は「確かめていない」と書く（Task 2 の検査、Task 3 の試走）
3. ログインが要るページで、ログイン済みのブラウザがない → そのページは点検せず、そう伝える（Task 2 の検査）
4. 本番の部品で、値を変えると保存やページ移動が起きそう → 操作しない（Task 3 の試走で、検証用ページの「変えると送信する」セレクトが操作されないことを見る）
5. `plans/` に improve の計画がすでにある → 番号を続け、索引を壊さない（Task 3 の試走で、既存の `plans/README.md` がある状態から始める）

---

### Task 1: 部品の知見の JSON を公開する

**Files:**
- Create: `src/routes/components.json/+server.ts`
- Modify: `src/lib/types.ts`（JSON の型 `ComponentsJson` を足す）
- Test: `tests/components-json.spec.ts`

**Interfaces:**
- Produces: プリレンダーされる `/ui-component-lab/components.json`。形は次のとおり
  ```ts
  interface ComponentsJson {
  	version: 1;
  	site: { name: string; url: string }; // url は https://oekazuma.github.io/ui-component-lab/
  	categories: { id: Category; names: Text }[];
  	components: (ComponentData & { urls: Record<Lang, string> })[]; // urls は各言語の詳細ページの絶対 URL
  }
  ```
- `ComponentData` の中身は data.ts のまま（文中のバッククォートも残す）。`categoryNames` は `src/lib/i18n.ts` から取る

- [ ] **Step 1: e2e テストを書く**

`tests/components-json.spec.ts` に次の 2 件。

```ts
test('components.json: lists every component with absolute URLs and version 1', async ({ request }) => {
	const res = await request.get('components.json');
	expect(res.status()).toBe(200);
	expect(res.headers()['content-type']).toContain('application/json');
	const json = await res.json();
	expect(json.version).toBe(1);
	expect(json.components.map((c) => c.id).sort()).toEqual([...componentIds].sort());
	const select = json.components.find((c) => c.id === 'select');
	expect(select.urls.ja).toBe('https://oekazuma.github.io/ui-component-lab/ja/components/select/');
	expect(select.usage.length).toBeGreaterThan(0);
});

test('components.json: keeps misuse, related and sources as written in data.ts', async ({ request }) => {
	const json = await (await request.get('components.json')).json();
	const checkbox = json.components.find((c) => c.id === 'checkbox');
	expect(checkbox.misuse.some((m) => m.deceptive)).toBe(true);
	expect(checkbox.related.length).toBeGreaterThan(0);
	expect(checkbox.sources.every((s) => s.url.startsWith('https://'))).toBe(true);
	expect(json.categories).toHaveLength(7);
});
```

`componentIds` は `tests/component-ids.ts` から import する。

- [ ] **Step 2: 失敗を確かめる**

Run: `pnpm build && pnpm test:e2e tests/components-json.spec.ts`
Expected: 2 件とも FAIL（404）

- [ ] **Step 3: `src/routes/components.json/+server.ts` に `GET: RequestHandler` を書く**

`export const prerender = true`。sitemap（`src/routes/sitemap.xml/+server.ts`）と同じく `url.origin` と `componentPath` で絶対 URL を作る。`entries` は `#lib/registry.js` から。`Content-Type: application/json`。`ComponentsJson` を `src/lib/types.ts` に足し、`satisfies ComponentsJson` で形を固定する。

- [ ] **Step 4: 通ることを確かめる**

Run: `pnpm check && pnpm build && pnpm test:e2e`
Expected: すべて PASS。`build/components.json` ができている

- [ ] **Step 5: CLAUDE.md に約束を 1 行足してコミット**

CLAUDE.md の「data.ts」の節に「`components.json`（`src/routes/components.json/+server.ts`）は improve-ui-components スキルが読む。形を変えるときは `version` を上げ、スキルも合わせる」を足す。

```bash
git add src/routes/components.json src/lib/types.ts tests/components-json.spec.ts CLAUDE.md
git commit -m "Publish all component data as components.json for the improve-ui-components skill"
```

---

### Task 2: スキルの本体と参照ファイル

**Files:**
- Create: `skills/improve-ui-components/SKILL.md`
- Create: `skills/improve-ui-components/references/audit-playbook.md`
- Create: `skills/improve-ui-components/references/plan-template.md`
- Create: `skills/improve-ui-components/references/local-server.md`
- Create: `skills/improve-ui-components/LICENSE-improve.md`（improve の MIT の全文と著作権表示）
- Create: `skills/skills.check.ts`
- Modify: `package.json`（`check` の最後に `&& node skills/skills.check.ts`）

**Interfaces:**
- Consumes: Task 1 の `https://oekazuma.github.io/ui-component-lab/components.json` と `ComponentsJson` の形
- Produces: スキルのファイル一式。改善計画は improve の plan-template の項目に、次の UI 向けの節を足した形
  - `## Where on the page`（ページの URL、画面上の場所の文言かセレクター）
  - `## Evidence`（Lab の部品ページの URL と項目名、元の出典の URL）
  - `## How to verify in the browser`（押すキーと起きるべきこと）
  - Status の `Category` に UI 用の値 `ui-choice | ui-misuse | ui-behavior | ui-a11y | ui-outside-lab` を足す

各ファイルには次の中身を書く。文言は作る人に任せる。

- `SKILL.md`
  - frontmatter: `name: improve-ui-components`、`description`（「本番サイトの URL を渡して UI を点検し、改善計画を書く」依頼、UI の監査、部品の選び方や使い方の点検、で呼ばれることが分かる文。1024 文字以内）、`license: MIT`
  - Hard Rules: improve の 1〜6 を UI 向けに直したもの。Global Constraints の本番の安全と根拠の範囲を、ここに一覧で書く
  - Workflow: 設計書の流れ 1〜5（準備、点検、吟味と提示、計画、issue）。準備で JSON を読み、`version !== 1` か取れなければ止まる。ログインが要るページでログイン済みのブラウザがなければ、そのページを飛ばして伝える。リポジトリがソースかの判断と開発用サーバーは `references/local-server.md` を読ませる
  - 点検は `references/audit-playbook.md`、計画は `references/plan-template.md` を読ませる。ページが多いときのサブエージェントへの渡し方（improve と同じく、参照ファイルの絶対パスと Hard Rules の写しを渡す）
  - Invocation variants: 素の呼び出し、`--issues`、`plan <description>`（点検を飛ばして 1 本書く）
- `references/audit-playbook.md`: 観点 1〜5 の手順。観点 2 は各部品の `usage` と `related[].diff` を見る、観点 3 は `misuse`（`deceptive` は別に印を付ける）、観点 4 は `keyboard` と `behavior` を手元のサーバーで操作して比べる。指摘の書式（ページ、場所、部品、観点、根拠、影響、手間 S/M/L、確信度）と、優先度の付け方
- `references/local-server.md`: ソースかどうかの手がかり（渡された URL の道筋に当たるルートやページのファイルがある、設定にそのドメインがある）、起動コマンドの見つけ方（package.json の scripts など）、依存が入っていないときは利用者に確かめる、URL の道筋の置き換え方、終わったら止める
- `skills.check.ts`: `skills/*/SKILL.md` ごとに、frontmatter の `name` がディレクトリ名と同じ、`description` が 1〜1024 文字、本文から参照している `references/*.md` が存在する、を確かめる。`improve-ui-components` については、本文に `components.json` の URL と `version` の確認、Hard Rules の見出しがあることも確かめる。失敗すれば throw、通れば `ok`

- [ ] **Step 1: `skills/skills.check.ts` を書いて、失敗を確かめる**

Run: `node skills/skills.check.ts`
Expected: FAIL（`skills/improve-ui-components/SKILL.md` がない）

- [ ] **Step 2: スキルのファイル一式を書く**

改善計画のひな形は `/Users/oekazuma/.agents/skills/improve/references/plan-template.md` を写して UI 向けの節を足す。冒頭に「Adapted from the improve skill by shadcn (MIT License). See ../LICENSE-improve.md」と書く。improve の SKILL.md の frontmatter（`license: MIT`、`author: shadcn`）を著作権表示の根拠にする。

- [ ] **Step 3: 通ることを確かめる**

Run: `node skills/skills.check.ts && pnpm check`
Expected: `ok`。`pnpm check` も通る

- [ ] **Step 4: README に入れ方と使い方を足してコミット**

README に「## Skill: improve-ui-components」の節を足す（入れ方 `npx skills add oekazuma/ui-component-lab`、使い方 `/improve-ui-components <URL>`、手元にソースがあれば開発用サーバーで点検すること、本番では値を変えないこと）。

```bash
git add skills package.json README.md
git commit -m "Add the improve-ui-components skill"
```

---

### Task 3: 検証用ページでスキルを試走する

**Files:**
- Create: `tests/fixtures/skill-audit/`（検証用の小さな静的ページ。リポジトリに残すが、サイトのビルドには入れない）
  - `index.html`: わざと入れた問題が 5 つ
    1. 選択肢が 12 個のラジオボタン（観点 2、Lab の select の usage）
    2. 別のページへ移るリンクの並びを `role="tablist"` で作ったもの（観点 2、Lab の tabs の usage）
    3. 最初からオンの「メールマガジンを受け取る」チェックボックス（観点 3、deceptive）
    4. 矢印キーで動かないメニューボタン（観点 4、Lab の menu の keyboard）
    5. `onchange` で送信するセレクト（Review Focus 4。本番扱いのときは操作されないこと）
  - `README.md`: 入れた問題の一覧と、期待する指摘

**Interfaces:**
- Consumes: Task 2 のスキル、Task 1 の公開中の `components.json`（Task 1 を push してデプロイ済みであること）

- [ ] **Step 1: 検証用ページを作る**

`python3 -m http.server` などで配信できる素の HTML にする。

- [ ] **Step 2: 本番扱いで試走する**

scratchpad に空の作業フォルダーと `plans/README.md`（improve 形式で 001 が 1 件ある）を用意する。新しいサブエージェントに、スキルの SKILL.md を読ませ、検証用ページの URL を「本番の URL」として渡す。作業フォルダーにソースはないので、読み取りだけの点検になるはず。
Expected:
- 問題 1〜3 が指摘され、根拠に Lab の部品ページの URL が付く
- 問題 4 と 5 は「操作して確かめていない」扱いで、セレクトの値は変わっていない（ページの配信ログに送信の要求がない）
- 計画は 002 から番号が続き、`plans/README.md` の 001 の行が残っている

- [ ] **Step 3: 手元扱いで試走する**

作業フォルダーに検証用ページのソース（`tests/fixtures/skill-audit/`）を置き、開発用サーバーの代わりに配信コマンドを書いた `package.json` を置いて、同じ URL で試走する。
Expected: スキルが配信を立ち上げて手元で点検し、問題 4 が「矢印キーで動かない」と操作の結果付きで指摘される。終わると配信が止まっている

- [ ] **Step 4: 試走の結果でスキルを直してコミット**

期待と違った点は SKILL.md か参照ファイルを直し、Step 2〜3 をやり直す。試走の記録（何が出て何を直したか）は `tests/fixtures/skill-audit/README.md` に足す。

```bash
git add tests/fixtures/skill-audit skills
git commit -m "Add a fixture page with planted UI issues and tune the skill against it"
```

---

### Task 4: 公開と入れ方の確認

- [ ] **Step 1: main に入れてデプロイを待つ**（push は利用者の確認を取ってから）

- [ ] **Step 2: 公開中の JSON を確かめる**

Run: `curl -s https://oekazuma.github.io/ui-component-lab/components.json | node -e "const j=JSON.parse(require('fs').readFileSync(0));console.log(j.version,j.components.length)"`
Expected: `1 67`

- [ ] **Step 3: `npx skills` でスキルが見つかることを確かめる**

Run: `npx skills add oekazuma/ui-component-lab --list`（`--list` がない版なら、ヘルプで一覧だけを出す方法を確かめる）
Expected: `improve-ui-components` が一覧に出る
