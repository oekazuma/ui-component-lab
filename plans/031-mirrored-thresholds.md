# Plan 031: 部品の使い分けの基準を、比べる両方の部品のページに書く

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 8ba0ef9..HEAD -- src/lib/components/{select,radio,tabs,link,switch,checkbox,stepper}/data.ts`
> 023 と 025 は radio、link、stepper などの `data.ts` を変えている。この計画は `usage` に行を足し、`sources` に出典を足すだけなので、ほかの差分があっても続けてよい。

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P3 | S | LOW | 025、026（同じ data.ts の文言を触る。026 の検査が通る形で書く） | direction | `8ba0ef9`（2026-11-02） |

## Why this matters

使い分けの基準が、比べる片方の部品のページにしか書かれていないことがある。たとえば「選択肢が 5 つ以下ならラジオボタン」はセレクトボックスのページ（`select/data.ts` の `usage`）にしかなく、ラジオボタンのページには、選択肢が多いときにどうするかが書かれていない。ラジオボタンのページから読み始めた人は、この基準に出会わない。

improve-ui-components スキルの試行（`tests/fixtures/skill-audit/README.md`）でも、ラジオボタンが 12 個並ぶページが、はじめは計画にならなかった。スキルは片側だけの基準を反対側から読むよう手順を足して対処したが、その場合の確信度は「中」にとどまる（`skills/improve-ui-components/references/audit-playbook.md` の section 2）。両方のページに基準があれば、どちらのページからでも読め、スキルも確信を持って指摘できる。

## Current state

- `src/lib/components/select/data.ts` の `usage`:

```ts
		{
			en: 'With five or fewer options, use radio buttons instead. Never use a select for two options.',
			ja: '選択肢が5つ以下ならラジオボタンを使います。2択にはセレクトを使いません。'
		}
```

  select の `sources` は、Open UI: Select、WAI-ARIA APG: Select-Only Combobox Example、MDN: `<select>`、デジタル庁デザインシステム「セレクトボックス」（`https://design.digital.go.jp/dads/components/select/`）、Deceptive Patterns: Trick wording。どれがこの基準の出典かは、ページを開いて確かめる。

- `src/lib/components/radio/data.ts` の `usage` には、選択肢の数の基準がない（「任意の質問には『あてはまるものはない』を加える」「丸はラベルの左」の 2 行）。`related` の select への `diff` にも数は出てこない。
- スキルの手順（`audit-playbook.md` の section 2）が挙げる、ほかの片側だけになりやすい組は次の 3 つ。
  - links と tabs（選ぶと別のページへ移るか、その場で中身が変わるか）
  - switch と checkbox（すぐに反映されるか、送信のときに反映されるか）
  - stepper と tabs（決まった順の数段階か、自由に切り替えるか）
- 約束事（CLAUDE.md の「data.ts」より）は次のとおり。
  - 文言は `{ en, ja }` の両方を書き、同じ内容にする。日本語の説明文は です・ます で書く
  - 文中の HTML 要素・属性・ARIA の名前はバッククォートで囲む
  - 出典の `checkedAt` は、実際に開いて確かめた日を `YYYY-MM-DD` で書く。まとめて書き換えない
  - デジタル庁デザインシステムをもとにした内容は、出典のラベルを `デジタル庁デザインシステムウェブサイト「<ページ名>」をもとに作成` にする
  - 画面に出る文では略称の DADS を使わない
- `src/lib/data.check.ts` は、出典の半分より多くがデジタル庁のもの（`design.digital.go.jp`、`www.digital.go.jp`、`github.com/digital-go-jp`）だと落ちる。出典を足すときは、この検査を通るかを確かめる。

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `pnpm install --frozen-lockfile` | exit 0 |
| データの検査 | `node src/lib/data.check.ts` | `ok` |
| Check | `pnpm check` | exit 0 |
| Build / E2E | `pnpm build && pnpm test:e2e` | 全件 passed |
| ページを開く | WebFetch などの、ページを取って読む道具 | ページの本文 |

## Scope

**In scope**: `src/lib/components/{radio,select,tabs,link,switch,checkbox,stepper}/data.ts` の `usage` と `sources` だけ

**Out of scope**:
- 既存の `usage` の文の書き換え（足すだけ）
- `misuse` の追加
- スキルのファイル（`skills/`）。基準を両側に書いたあとで手順を変えるかは、別に決める

## Git workflow

- Branch: `advisor/031-mirrored-thresholds`
- コミットメッセージは英語の命令形で 1 文、接頭辞なし（例: `Tighten new component texts to their sources and link rating with slider and empty state with search field`）。組ごとに 1 コミット
- push や PR は作らない

## Steps

### Step 1: select の基準の出典を確かめる

select の `sources` の URL を開き、「選択肢が 5 つ以下（または少ない）ならラジオボタン」に当たる記述がどれにあるかを確かめる。見つかった出典の URL と、該当の文の要旨（写さず、自分の言葉で）を NOTES に書く。

どの出典にも見つからなければ STOP（基準の出典が分からないまま、反対側に写さない）。

### Step 2: ラジオボタンのページに、反対側からの基準を足す

`radio/data.ts` の `usage` の先頭に 1 行足す。言い回しの例を示す。Step 1 の出典が言っている範囲に合わせて直してよい。

```ts
		{
			en: 'With more than five options, a select usually fits better, since a long list of radio buttons takes a lot of space. With only two options, radio buttons still fit better than a select.',
			ja: '選択肢が6つ以上なら、たいていはセレクトボックスのほうが向いています。ラジオボタンを長く並べると場所を取るためです。2択なら、セレクトボックスよりラジオボタンが向いています。'
		},
```

Step 1 の出典が radio の `sources` になければ、select と同じラベルと URL で足し、`checkedAt` は今日（Step 1 で開いた日）にする。

**Verify**: `node src/lib/data.check.ts` → `ok`。

### Step 3: ほかの 3 つの組を調べ、片側だけの基準があれば反対側にも書く

links と tabs、switch と checkbox、stepper と tabs のそれぞれで、両方の `data.ts` の `usage` と `related` の `diff` を読み、次の表を NOTES に作る。

| 組 | 基準（要旨） | 書かれている側 | 出典 | 反対側に足したか |
|---|---|---|---|---|

基準が片側の `usage` にしかなく、反対側の `usage` にも `related` の `diff` にも出てこないときだけ、Step 2 と同じやり方で反対側の `usage` に 1 行足す。出典は、書かれている側の `sources` から開いて確かめたものを使う。どちらにもすでに書かれている組は何も足さない。

**Verify**: `node src/lib/data.check.ts` → `ok`。

### Step 4: 全体を確かめる

**Verify**: `pnpm check && pnpm build && pnpm test:e2e` → すべて exit 0。

## Test plan

文言の追加なので、新しいテストは書かない。`data.check.ts`（空の文、バッククォート、出典の数の偏り、`checkedAt` の形）と e2e（axe）で壊れていないことを確かめる。

## Done criteria

- [ ] `grep -n "more than five options" src/lib/components/radio/data.ts` → 1 行（言い回しを変えた場合は、NOTES に新しい文を書く）
- [ ] NOTES に、Step 1 の出典と、Step 3 の表がある
- [ ] 足した出典の `checkedAt` が、実際に開いた日になっている
- [ ] `pnpm check`、`pnpm build`、`pnpm test:e2e` がすべて exit 0
- [ ] `git status` で、In scope 以外のファイルが変わっていない

## STOP conditions

- ページを開く道具がない、またはページが開けない（出典を確かめずに書かない）
- Step 1 で、基準の出典が見つからない
- 出典を足すと `data.check.ts` の「デジタル庁の出典が半分より多い」に当たり、ほかの出典がない

## Maintenance notes

- 使い分けの基準を書くときは、比べる両方の部品の `usage` に書く。片方だけ直すと、また片側だけになる。
- 両側に書いたあとで、スキルの手順（`audit-playbook.md` の「Thresholds are often written from one side only」）の確信度の扱いを見直すかを決める。
