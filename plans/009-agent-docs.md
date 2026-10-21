# Plan 009: CLAUDE.md and the README write down how to add a component

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 149b340..HEAD -- README.md CLAUDE.md AGENTS.md`
> `README.md` must be unchanged since `149b340`, and `CLAUDE.md` / `AGENTS.md` must not exist. Otherwise STOP.

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P2 | S | LOW | plans/001–008 (the docs describe the conventions and commands those plans introduce) | docs / dx | commit `149b340`, 2026-10-21 |

## Why this matters

Components were added in agent-sized batches ("phase 1–3" commits, 11–29 components each). The rules each batch had to follow live nowhere except in examples. These include unique ids via `$props.id()`, two-way `related` links, the DADS attribution label, key label notation, the "listeners only while open" pattern, and color tokens. Several fail silently when missed. The README's "Adding a component" section lists two files and five fields, but there are more required fields and build-enforced rules. A `CLAUDE.md` gives the next agent, or person, the rules up front.

## Current state

- `README.md:16-23`:
  ```markdown
  ## Adding a component

  Create `src/lib/components/<id>/` with two files:

  - `data.ts`: names, aliases, behavior, keyboard and sources, in both languages
  - `Demo.svelte`: a minimal interactive demo
  ```
  The rest of the README (logo, title, tagline, site link, Development, License) stays.
- No `CLAUDE.md`, `AGENTS.md` or `CONTRIBUTING` exists.
- Facts the docs state. Each is true once plans 001–008 are applied; check the ones marked ✓ before writing:
  - ✓ `package.json` `check` runs svelte-check with `--fail-on-warnings`, then `node src/lib/search.check.ts` and `node src/lib/data.check.ts` (plan 001).
  - ✓ `package.json` has `test:e2e` (plan 008), and `src/lib/data.check.ts` exists.
  - ✓ `src/app.css` defines `--color-danger` and `--color-accent-hover` (plan 007).
  - Required `ComponentData` fields (`src/lib/types.ts`): `id`, `category`, `names`, `aliases`, `summary`, `appearance`, `behavior`, `keyboard`, `sources`. Optional fields: `variations`, `usage`, `related`.
  - `src/lib/registry.ts` throws at build time if `id` ≠ directory name, `Demo.svelte` is missing, or a `related` id doesn't exist.
  - `Demo.svelte` receives a single prop: `lang`.

If any ✓ fact is false, STOP.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Checks | `pnpm check` | exit 0 |
| Confirm facts | `grep -n 'fail-on-warnings\|data.check\|test:e2e' package.json; grep -c 'color-danger\|color-accent-hover' src/app.css` | 3 matching lines; count ≥ 3 |

If `pnpm` on PATH fails with a vite-plus "Failed to resolve package manager" error, use `/Users/oe.kazuma/Library/pnpm/bin/pnpm`.

## Scope

**In scope**: `CLAUDE.md` (create), `README.md` ("Adding a component" section only), and line 3 of `.github/workflows/deploy.yml` (the header comment only). The last one was added in review: plan 008 made PRs also run `pnpm test:e2e`, but the comment still says 「PR では check と build だけを行い」. Change it to `# PR では check・build・E2E テストだけを行い、GitHub Pages へのデプロイは main への push のときだけ行う`.

**Out of scope**: everything else. No code changes. Do not create `AGENTS.md` too: one file, no duplication.

## Git workflow

- Branch: `advisor/009-agent-docs`
- One commit, e.g. `Document conventions in CLAUDE.md and README`.
- Do NOT push or open a PR.

## Steps

### Step 1: Create `CLAUDE.md`

Write exactly this content. Code comments in this repo are in Japanese, so the agent guide is too. Do not add machine-specific paths. The repo is public.

```markdown
# UI Component Lab

UI コンポーネントの名前と挙動を英日で引ける図鑑。SvelteKit 3 と Svelte 5（runes）で全ページをプリレンダーし、GitHub Pages の `/ui-component-lab` に置く。

## 確認コマンド

- `pnpm check` で型、Svelte の a11y 警告（警告でも失敗する）、`src/lib/search.check.ts`、`src/lib/data.check.ts` を確かめる
- `pnpm build` で全ページをプリレンダーする
- `pnpm build && pnpm test:e2e` で Playwright と axe を回す（一覧と詳細の 4 ページ、独自のキー操作）

CI は PR ごとに上の 3 つを実行する。

## コンポーネントの追加

`src/lib/components/<id>/` に `data.ts` と `Demo.svelte` を置くと、`src/lib/registry.ts` が自動で登録する。

### data.ts

- `export default { ... } satisfies ComponentData;` の形にする（型は `src/lib/types.ts`）。`id` はディレクトリ名と同じにする
- 文言は `{ en, ja }` の両方を書き、同じ内容にする
- `related` は双方向に張る。`diff` は自分の側を主語にした一文にする
- 出典の `checkedAt` は、実際に開いて確かめた日を `YYYY-MM-DD` で書く。まとめて書き換えない
- デジタル庁デザインシステム（DADS）をもとにした内容は、出典のラベルを `デジタル庁デザインシステムウェブサイト「<ページ名>」をもとに作成` にする（利用規約の出典表示）。別名の `source` は `デジタル庁デザインシステム` と書く
- キーの表記は Enter → Space、↑ → ↓、← → → の順にする。対になる操作は `Home / End` のように 1 行にまとめ、`Tab / Shift + Tab` は `+` の前後に空白を入れる
- キー操作がない部品は `key: '—'` の行を置き、動作に「なし。」から始まる説明を書く
- デモ固有の挙動は behavior に「このデモでは…」「In this demo, …」と書く
- データの約束事の検査は `src/lib/data.check.ts` に足す。`registry.ts` はクライアントでも動くので、検査を増やさない

### Demo.svelte

- props は `let { lang }: { lang: Lang } = $props();` とし、文言はファイル内の `const text = { en: {...}, ja: {...} }` に置く
- id は `$props.id()` から作る。一覧ページでは 45 個のデモが同時に描画されるため、固定の id は衝突する
- リセットは `DemoFrame.svelte` が `{#key}` で作り直して行うので、デモにリセット処理は書かない。言語を切り替えたときも作り直される
- ネイティブ要素で足りるならそれを使い、何をブラウザに任せているかをコメントに書く（例: `modal/Demo.svelte`）。独自のキー操作には、従う APG のパターン名をコメントで添える
- イベントリスナーは要素に付ける。document や window に付けるのは、ポップアップが開いている間だけにする。`$effect` で付けて、片付けの関数で外す（例: `src/lib/ActionMenu.svelte`、`tooltip/Demo.svelte`）。常設してよいのは toast の `<svelte:window>` だけ
- タイマーは `$effect` の片付けで止める（例: `toast/Demo.svelte`）
- `svelte-ignore` を使うときは、1 行上に理由を書く
- 色は `src/app.css` のトークン（`--color-*`）を使う。エラーは `--color-danger`、アクセントのホバーは `--color-accent-hover`。トークンを足すときはコントラスト比をコメントに書く
- 共通のクラスは `.btn`、`.btn-primary`、`.visually-hidden`（`src/app.css`）
- デモの挙動を変えたら、同じコミットで data.ts の keyboard と behavior を直す。独自のキー操作を変えたときは `tests/keyboard.spec.ts` も直す

## コードの約束事

- routes と data.ts からは `#lib/*.js` で import し、`src/lib` の中では相対パスを使う。`src/params.ts` はビルド時に Node が直接読むので `#lib` を使わない
- コメントは日本語で書き、処理の説明より理由を書く
- `ponytail:` コメントは、意図して簡略にした箇所と、見直すきっかけを示す
- インデントはタブ、文字列はシングルクォート、末尾カンマなし
```

**Verify**: `test -f CLAUDE.md && grep -c '^## ' CLAUDE.md` → `3`.

### Step 2: Expand the README section

Replace `README.md` lines 16–23 (the "Adding a component" section) with:

```markdown
## Adding a component

Create `src/lib/components/<id>/` with two files. They are registered automatically.

- `data.ts`: `export default { ... } satisfies ComponentData` (see `src/lib/types.ts`). Required fields are `id` (same as the directory name), `category`, `names`, `aliases`, `summary`, `appearance`, `behavior`, `keyboard` and `sources`; `variations`, `usage` and `related` are optional. Every text has both `en` and `ja`.
- `Demo.svelte`: a minimal interactive demo that takes a `lang` prop.

Then run `pnpm check` and `pnpm build`. The conventions (related links, source labels, key notation, demo rules) are in [CLAUDE.md](CLAUDE.md).
```

**Verify**: `grep -c 'CLAUDE.md' README.md` → `1`; `git diff --stat` shows only `README.md` and `CLAUDE.md`.

## Test plan

- Docs only. `pnpm check` must still pass (it does not read markdown). Run it once to be sure nothing else changed.

## Done criteria

- [ ] `CLAUDE.md` exists with the 3 `##` sections
- [ ] `README.md` links `CLAUDE.md` and lists the required fields
- [ ] `pnpm check` exits 0
- [ ] Only `CLAUDE.md` and `README.md` are changed
- [ ] `plans/README.md` status row updated (unless your reviewer maintains it)

## STOP conditions

- Any ✓ fact in "Current state" is false. The docs would describe a repo that doesn't exist.
- `README.md` or `CLAUDE.md` differs from what the drift check expects.

## Maintenance notes

- When a convention changes (a new token, a new check in `data.check.ts`, a new permanent listener), update `CLAUDE.md` in the same PR.
- Keep `CLAUDE.md` short. Detailed rules belong in `data.check.ts`, where they are enforced.
