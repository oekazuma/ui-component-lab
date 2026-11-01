# Plan 020: CI が `test.only` で黙って緩まず、失敗したテストの記録が残る

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 8ba0ef9..HEAD -- playwright.config.ts .github/workflows/deploy.yml .github/dependabot.yml tsconfig.json skills/skills.check.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P1 | S | LOW | none | dx | `8ba0ef9`（2026-11-02） |

## Why this matters

CI（`.github/workflows/deploy.yml`）は `pnpm test:e2e` が通ると main を GitHub Pages に出す。Playwright の設定に `forbidOnly` がないので、誰かが `test.only` を 1 つコミットすると、その 1 件だけが走って CI は緑になり、axe・キー操作・デモの 360 件ほどの検査が黙って止まる。CI で落ちたときも、トレースや結果が残らないので手元で再現するしかない。あわせて、`skills/skills.check.ts` は `pnpm check` で Node が実行するだけで、型検査の対象（tsconfig の `include`）に入っていない。Dependabot は `@types/node` のメジャー更新（いま 26 が出ている）を PR にしてくるが、実行環境は Node 24 なので、マージすると実在しない API で型が通ってしまう。

## Current state

- `playwright.config.ts`（全文）:

```ts
import { defineConfig } from '@playwright/test';

// ビルド済みの build/ を vite preview で配信して確かめる（pnpm build を先に実行する）
export default defineConfig({
	testDir: 'tests',
	use: { baseURL: 'http://localhost:4180/ui-component-lab/' },
	webServer: {
		command: 'vite preview --port 4180 --strictPort',
		url: 'http://localhost:4180/ui-component-lab/en/',
		// 別のブランチの preview を誤って使い回さないよう、既存のサーバーは使わない
		reuseExistingServer: false
	}
});
```

- `.github/workflows/deploy.yml:29-35`（`build` ジョブの途中）:

```yaml
      - run: pnpm check

      - run: pnpm build

      - run: pnpm exec playwright install --with-deps chromium

      - run: pnpm test:e2e
```

  同じファイルの Action はすべて SHA で固定し、行末にタグをコメントで書いている。例: `- uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7`。ファイル冒頭の `permissions` は `contents: read` と `pages: read`。

- `tsconfig.json`（全文）:

```json
{
	"extends": "$app/tsconfig",
	"compilerOptions": {
		"strict": true,
		"types": ["$app/types", "node"]
	},
	"include": ["src", "tests", "vite.config.ts", "playwright.config.ts"]
}
```

- `.github/dependabot.yml`（全文）:

```yaml
# 依存とワークフローの Action を週1回更新する。Action は SHA 固定なので、これがないと更新されない
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    groups:
      dev-dependencies:
        patterns: ['*']
        update-types: [minor, patch]
  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
    groups:
      actions:
        patterns: ['*']
```

- `package.json` の `engines.node` は `>=24`、devDependencies の `@types/node` は `^24.19.2`、CI の `node-version` は `24`。
- `.gitignore` は `/test-results` と `/playwright-report` を無視している。
- 約束事（CLAUDE.md より）: コメントは日本語で、処理の説明ではなく理由を書く。インデントはタブ（YAML はスペース 2）、文字列はシングルクォート、末尾カンマなし。

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `pnpm install --frozen-lockfile` | exit 0 |
| Check | `pnpm check` | exit 0（最後に `ok` が 3 行） |
| Build | `pnpm build` | exit 0、`Wrote site to "build"` |
| E2E | `pnpm test:e2e` | 全件 passed |
| Action の SHA | `gh api repos/actions/upload-artifact/releases/latest --jq .tag_name` と `gh api repos/actions/upload-artifact/git/ref/tags/<tag> --jq .object.sha` | タグ名と 40 桁の SHA |

## Scope

**In scope**:
- `playwright.config.ts`
- `.github/workflows/deploy.yml`
- `.github/dependabot.yml`
- `tsconfig.json`
- `skills/skills.check.ts`（tsconfig に入れて型エラーが出たときだけ、その修正のために）

**Out of scope**:
- `retries` の追加。再試行すると、たまに落ちるテストが隠れる
- Playwright のブラウザのキャッシュ、WebKit や Firefox のプロジェクト追加。別の判断で見送った
- テスト本体（`tests/*.spec.ts`）

## Git workflow

- Branch: `advisor/020-ci-guards`
- コミットメッセージは英語の命令形で 1 文、接頭辞なし（例: `Pin workflow actions and add Dependabot`）。この計画は 1 コミットでよい
- push や PR は作らない

## Steps

### Step 1: `forbidOnly` とトレースを足す

`playwright.config.ts` の `defineConfig({ ... })` に次の 2 つを足す。`use` には既存の `baseURL` と並べて `trace` を書く。

```ts
	// CI で test.only が残っていると、その 1 件だけが走って緑になり、ほかの検査が黙って止まる
	forbidOnly: !!process.env.CI,
	use: { baseURL: 'http://localhost:4180/ui-component-lab/', trace: 'retain-on-failure' },
```

`trace: 'retain-on-failure'` は、落ちたテストのトレースだけを `test-results/` に残す。

**Verify**: `CI=1 pnpm exec playwright test --list > /dev/null; echo $?` → `0`（今は `test.only` がないので一覧が出せる）。

### Step 2: CI で失敗したときに `test-results/` を残す

1. `gh api repos/actions/upload-artifact/releases/latest --jq .tag_name` でタグ名を取り、`gh api repos/actions/upload-artifact/git/ref/tags/<そのタグ> --jq .object.sha` で SHA を得る。`object.type` が `tag`（注釈付きタグ）のときは、`gh api repos/actions/upload-artifact/git/tags/<その SHA> --jq .object.sha` でコミットの SHA にたどる。
2. `deploy.yml` の `- run: pnpm test:e2e` の直後に足す（`<SHA>` と `<tag>` は 1 で得たもの。タグは `v7` のように大きい版だけを書く、ほかの行と同じ書き方）:

```yaml

      # 落ちたテストのトレースを残す。手元で再現しなくても原因を見られるようにする
      - if: failure()
        uses: actions/upload-artifact@<SHA> # <tag>
        with:
          name: playwright-test-results
          path: test-results/
          retention-days: 7
```

**Verify**: `grep -n 'upload-artifact@[0-9a-f]\{40\}' .github/workflows/deploy.yml` → 1 行。`gh` が使えない、または SHA が取れないときは STOP。

### Step 3: `skills/` を型検査に入れる

`tsconfig.json` の `include` を `["src", "tests", "skills", "vite.config.ts", "playwright.config.ts"]` にする。

**Verify**: `pnpm check` → exit 0。`skills/skills.check.ts` に型エラーが出たら、挙動を変えない最小の修正（型注釈を足すなど）で直す。修正が挙動の変更を要するなら STOP。

### Step 4: Dependabot に `@types/node` のメジャー更新を出させない

`.github/dependabot.yml` の npm の項目（`package-ecosystem: npm`）に、次の `ignore` を足す。

```yaml
    # 実行環境（package.json の engines と CI）は Node 24。型だけ先に上げると、24 にない API でも型検査が通ってしまう
    ignore:
      - dependency-name: '@types/node'
        update-types: ['version-update:semver-major']
```

`groups:` と同じ深さ（スペース 4）に置く。

**Verify**: `node -e "const y=require('fs').readFileSync('.github/dependabot.yml','utf8'); if(!/dependency-name: '@types\/node'/.test(y)) process.exit(1)"; echo $?` → `0`。

### Step 5: 全体を確かめる

**Verify**: `pnpm check && pnpm build && pnpm test:e2e` → すべて exit 0、e2e は全件 passed。

## Test plan

設定の変更なので、新しいテストは書かない。Step 1 の `--list` と Step 5 の全件実行で確かめる。

## Done criteria

- [ ] `grep -n "forbidOnly: !!process.env.CI" playwright.config.ts` → 1 行
- [ ] `grep -n "retain-on-failure" playwright.config.ts` → 1 行
- [ ] `grep -n "if: failure()" .github/workflows/deploy.yml` → 1 行、その直下に SHA 固定の `actions/upload-artifact`
- [ ] `grep -n '"skills"' tsconfig.json` → 1 行
- [ ] `grep -n "@types/node" .github/dependabot.yml` → 1 行
- [ ] `pnpm check`、`pnpm build`、`pnpm test:e2e` がすべて exit 0
- [ ] `git status` で、In scope 以外のファイルが変わっていない

## STOP conditions

- `gh` コマンドが使えない、またはネットワークがなく `upload-artifact` の SHA が取れない（推測の SHA を書かない）
- `skills/skills.check.ts` の型エラーを直すのに、検査の中身を変える必要がある
- 「Current state」の抜粋と実際のファイルが違う

## Maintenance notes

- 実行環境を Node 26 に上げるときは、`package.json` の `engines`、CI の `node-version`、この `ignore` を同じ変更で動かす。
- アーティファクトは失敗したときだけ上がる。トレースは `npx playwright show-trace <zip>` で開ける。
