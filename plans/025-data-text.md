# Plan 025: 部品の説明文が、ほかの部品のページやデモと食い違わない

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 8ba0ef9..HEAD -- src/lib/components/*/data.ts`
> 022 と 023 は stepper、mega-menu、back-to-top、one-time-code、card、radio の `data.ts` を変えている。この計画が触るのはそれ以外のファイル（radio は触らない）。下の表の「今の文」が見つからなければ STOP。

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P2 | S | LOW | none（026 はこの計画のあと） | docs | `8ba0ef9`（2026-11-02） |

## Why this matters

このサイトは読み手に部品の使い分けを教える。いくつかの説明文が、同じページの別の行や、似た部品のページと逆のことを言っている。

- モーダルのページが「取り消せない操作の確認に使う」と書く一方で、同じページの挙動の欄は「取り消せない操作の確認はアラートダイアログを参照」と書く
- モーダルのページは、ナビゲーションには「メニューボタン」を使うよう勧める。ところがメニューとメニューバーのページは、メニューは操作の一覧であり、サイトのナビゲーションには使わないと書いている
- トーストの概要（ページのタイトルとメタタグにも出る）は「自動で消える」と言い切るが、同じページの「操作付き」のバリエーションは自動で消えない
- button と split-button、button と toggle-button の `related` の `diff` は、互いの文が入れ替わっている。CLAUDE.md の「diff は自分の側を主語にした一文」に反する

ほかにも、デモと違う説明、キー表記の約束事からのずれ、コードとして囲んでいない属性名、英語の引用符の不ぞろいがある。

## Current state

約束事（CLAUDE.md の「data.ts」より）は次のとおり。

- 文言は `{ en, ja }` の両方を書き、同じ内容にする。日本語の説明文は です・ます で書く
- 文中の HTML 要素・属性・ARIA の名前は `` `aria-pressed` `` のようにバッククォートで囲む。名前と概要（`names`、`summary`）には使わない
- `related` の `diff` は自分の側を主語にした一文にする
- キーの表記は Enter → Space、↑ → ↓、← → → の順にする。対になる操作は `Home / End` のように 1 行にまとめる
- キー操作がない部品は `key: '—'` の行を置き、動作に「なし。」から始まる説明を書く（ほかの 9 部品は en も `None.` で始まる）
- 英語の文の引用符は “ ” を使う（110 か所がこの形。8 か所だけ `"` になっている）

ファイルはすべて `src/lib/components/<id>/data.ts`。インデントはタブ、文字列はシングルクォート。文字列の中のアポストロフィは ’（U+2019）を使っている（例: `the button’s`）。

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `pnpm install --frozen-lockfile` | exit 0 |
| Check | `pnpm check` | exit 0（`data.check.ts` が `ok`） |
| Build | `pnpm build` | exit 0 |
| E2E | `pnpm test:e2e` | 全件 passed |

## Scope

**In scope**（`data.ts` だけ）: modal、toast、alert、button、split-button、toggle-button、link、combobox、badge、slider、number-input、meter、spinner、data-grid、menubar、segmented-control、table-of-contents、tag、carousel、disclosure、pagination、stepper（引用符の 1 か所だけ）

**Out of scope**:
- `src/lib/data.check.ts`（検査の追加は 026 で行う）
- `Demo.svelte`。説明をデモに合わせるのであって、デモは変えない
- radio の `data.ts`（023 が触る）。ただし引用符の 1 か所（56 行目付近の `"None of these"`）だけはこの計画で直す。023 のあとに実行するので衝突しない
- 出典（`sources`）。新しい出典は足さない

## Git workflow

- Branch: `advisor/025-data-text`
- コミットメッセージは英語の命令形で 1 文、接頭辞なし（例: `Fix cross-references and add missing sources`）。Step ごとに 1 コミット
- push や PR は作らない

## Steps

各 Step では、「今の文」を `grep -n` で探して置き換える。en と ja は必ず両方直す。

### Step 1: モーダルの使い分けを、アラートダイアログとメニューのページに合わせる

`modal/data.ts` の `usage`。

| | 今の文 | 新しい文 |
|---|---|---|
| en | `Use it to confirm a destructive action or to show a short, self-contained message.` | `Use it to show a short, self-contained message. To confirm a destructive action, use an alert dialog.` |
| ja | `取り消せない操作の確認や、短く完結したメッセージに使います。` | `短く完結したメッセージに使います。取り消せない操作の確認には、アラートダイアログを使います。` |
| en | `Do not use it for navigation menus or completion notices; use a drawer or a menu button for navigation.` | `Do not use it for navigation menus or completion notices; for navigation, use a drawer opened by a hamburger menu button.` |
| ja | `ナビゲーションメニューや完了の通知には使いません。ナビゲーションにはドロワーやメニューボタンを使います。` | `ナビゲーションメニューや完了の通知には使いません。ナビゲーションには、ハンバーガーメニューボタンで開くドロワーを使います。` |

**Verify**: `grep -c "menu button for navigation\|メニューボタンを使います" src/lib/components/modal/data.ts` → `0`。

### Step 2: トーストは「文字だけのものが」自動で消える、と書く

| ファイル | | 今の文 | 新しい文 |
|---|---|---|---|
| `toast/data.ts`（`summary`） | en | `A brief message that pops up at the edge of the screen after an action and disappears on its own.` | `A brief message that pops up at the edge of the screen after an action; one with only a message disappears on its own.` |
| | ja | `操作の結果を画面の端に短く表示し、しばらくすると自動で消えるメッセージです。` | `操作の結果を画面の端に短く表示するメッセージです。文字だけのものは、しばらくすると自動で消えます。` |
| `toast/data.ts`（`related` の alert） | en | `A toast floats over the page and disappears on its own; an alert sits in the page content and stays until it is no longer needed or the user closes it.` | `A toast floats over the page, and one with only a message disappears on its own; an alert sits in the page content and stays until it is no longer needed or the user closes it.` |
| | ja | `トーストはページの上に浮かんで自動で消え、アラートはページの中に置かれ、不要になるか利用者が閉じるまで残ります。` | `トーストはページの上に浮かび、文字だけのものは自動で消えますが、アラートはページの中に置かれ、不要になるか利用者が閉じるまで残ります。` |
| `alert/data.ts`（`related` の toast） | en | `An alert stays in the page content; a toast floats over the page and disappears on its own.` | `An alert stays in the page content; a toast floats over the page, and one with only a message disappears on its own.` |
| | ja | `アラートはページの中に残り、トーストはページの上に浮かんで自動で消えます。` | `アラートはページの中に残り、トーストはページの上に浮かんで、文字だけのものは自動で消えます。` |

`summary` には バッククォートを使わない（タイトルとメタタグに出るため）。

**Verify**: `pnpm check` → exit 0。

### Step 3: 入れ替わった `diff` を元に戻す

自分の側を主語にする。2 組とも、相手のファイルにある文と入れ替える。

| ファイル（`related` の相手） | | 新しい文 |
|---|---|---|
| `button/data.ts`（toggle-button） | en | `A button runs its action once per press; a toggle button keeps an on or off state.` |
| | ja | `ボタンは押すたびに操作を1回実行し、トグルボタンはオン・オフの状態を保ちます。` |
| `toggle-button/data.ts`（button） | en | `A toggle button keeps an on or off state; a button runs its action once per press.` |
| | ja | `トグルボタンはオン・オフの状態を保ち、ボタンは押すたびに操作を1回実行します。` |
| `button/data.ts`（split-button） | en | `A button offers one action; a split button adds a menu of related actions beside it.` |
| | ja | `ボタンは操作が1つだけで、スプリットボタンはその横に関連する操作のメニューが付きます。` |
| `split-button/data.ts`（button） | en | `A split button adds a menu of related actions beside the main button; a button offers one action.` |
| | ja | `スプリットボタンは、主な操作のボタンの横に関連する操作のメニューが付き、ボタンは操作が1つだけです。` |

**Verify**: `grep -n "en: 'A toggle button keeps" src/lib/components/button/data.ts` → 0 行。`grep -n "en: 'A button offers one action" src/lib/components/split-button/data.ts` → 0 行。

### Step 4: デモと違う説明を直す

| ファイル | | 今の文（一部） | 直し方 |
|---|---|---|---|
| `link/data.ts`（`behavior`） | en | `hovering thickens the underline and darkens the color` | `darkens the color` を `changes the color` にする（ダークモードではホバーの色が明るくなる） |
| | ja | `下線が太くなって色が濃くなり` | `下線が太くなって色が変わり` にする |
| `combobox/data.ts`（`keyboard` の `↓`） | en | `Opens the suggestions, or highlights the next one.` | `Opens the suggestions and highlights the first one, or highlights the next one.` |
| | ja | `候補を開きます。開いているときは次の候補を選びます。` | `候補を開いて最初の候補を選びます。開いているときは次の候補を選びます。` |
| `combobox/data.ts`（`keyboard` の `↑`） | en | `Opens the suggestions, or highlights the previous one.` | `Opens the suggestions and highlights the last one, or highlights the previous one.` |
| | ja | `候補を開きます。開いているときは前の候補を選びます。` | `候補を開いて最後の候補を選びます。開いているときは前の候補を選びます。` |
| `table-of-contents/data.ts`（`behavior`） | en | `the link has `aria-current="location"` as well as the bold text and color.` | `the link has `aria-current="location"` as well as a visible mark such as bold text.` |
| | ja | `太字と色に加えて、そのリンクに` | `太字などの見た目の印に加えて、そのリンクに` |
| `tag/data.ts`（`behavior` と `keyboard`） | ja | `隣のタグのボタンにフォーカスを移します。`、`隣のタグへフォーカスを移します。` | en に合わせ、「次のタグ（最後のタグなら前のタグ）」と書く。例: `次のタグ（最後のタグだったときは前のタグ）のボタンにフォーカスを移します。` |
| `segmented-control/data.ts`（`usage`） | en | `For a yes/no or on/off choice, use a switch.` | `For an on/off setting that takes effect immediately, use a switch.`（switch のページの使い分けに合わせる） |
| | ja | `はい・いいえやオン・オフの選択には、スイッチを使います。` | `すぐに反映されるオン・オフの設定には、スイッチを使います。` |

combobox の新しい文は `combobox/Demo.svelte` の `onkeydown`（閉じているとき `active` は -1 で、↓ は 0、↑ は最後になる）と合っている。

**Verify**: `pnpm check` → exit 0。

### Step 5: キー表記の約束事に合わせる

| ファイル | 今 | 新しい形 |
|---|---|---|
| `slider/data.ts` | `{ key: 'Home', ... 'Sets the minimum value.' / '最小値にします。' }` と `{ key: 'End', ... 'Sets the maximum value.' / '最大値にします。' }` の 2 行 | 1 行にまとめる。`{ key: 'Home / End', action: { en: 'Sets the minimum / maximum value.', ja: '最小値・最大値にします。' } }` |
| `number-input/data.ts` | `{ key: '↑', ... 'Increases the value by one step.' }` と `{ key: '↓', ... 'Decreases the value by one step.' }` の 2 行 | 1 行にまとめる。`{ key: '↑ / ↓', action: { en: 'Increases / decreases the value by one step.', ja: '値を1刻み増やしたり減らしたりします。' } }` |
| `badge/data.ts`（`key: '—'`） | en `None for the badge. The button it sits on uses Enter / Space.`、ja `バッジ自体にはありません。付いているボタンは Enter / Space で押せます。` | en `None. The badge itself has no keyboard interaction; the button it sits on uses Enter / Space.`、ja `なし。バッジ自体にはキー操作がなく、付いているボタンは Enter / Space で押せます。` |

`tests/` にキーの行の文字を見ているテストがないかを `grep -rn "Sets the minimum\|Increases the value" tests` で確かめる。あれば STOP。

**Verify**: `pnpm check` → exit 0。

### Step 6: 属性・役割の名前をコードとして囲む

| ファイル | 直し方 |
|---|---|
| `meter/data.ts`（`behavior`） | en の `with low, high and optimum` を ``with `low`, `high` and `optimum` ``、ja の `low・high・optimum` を `` `low`・`high`・`optimum` `` にする |
| `number-input/data.ts`（`misuse` か `usage` の `autocomplete`） | en の `a matching autocomplete value` を ``a matching `autocomplete` value``、ja の `内容に合う autocomplete を付けます` を ``内容に合う `autocomplete` を付けます`` にする |
| `spinner/data.ts`（`behavior`） | en の `in a status region` を ``in a `status` region``、ja の `status の領域` を `` `status` の領域 `` にする |
| `data-grid/data.ts`、`menubar/data.ts`（`behavior`） | en の `(roving tabindex)` を ``(roving `tabindex`)`` にする（toolbar の書き方に合わせる）。ja のカタカナ表記はそのまま |

**Verify**: `pnpm check` → exit 0（バッククォートの数が合っていないと `data.check.ts` が落ちる）。

### Step 7: 英語の引用符をそろえる

次の 8 か所の en の文で、バッククォートの外にある `"…"` を `“…”` にする。バッククォートの中（例: `` `aria-current="page"` ``）は変えない。

- `carousel/data.ts` の 16 行目付近（`"1 / 4"`）と 107 行目付近（`"1 / 4"`）
- `disclosure/data.ts` の 49 行目付近（`"Show more"`、`"Open"`、`"Close"`）
- `link/data.ts` の 66 行目付近（`"here"`、`"Details"`）と 74 行目付近（`"Price list"`、`"Click here for prices"`）
- `pagination/data.ts` の 71 行目付近（`"Previous"`、`"Next"`）
- `radio/data.ts` の 56 行目付近（`"None of these"`）
- `stepper/data.ts` の 99 行目付近（`"Same as shipping address"`）

**Verify**: 次のコマンドが何も出力しない。

```sh
node -e 'const fs=require("fs");for(const id of fs.readdirSync("src/lib/components")){fs.readFileSync(`src/lib/components/${id}/data.ts`,"utf8").split("\n").forEach((l,i)=>{const m=l.match(/^\s*en: \x27(.*)\x27,?$/);if(m&&m[1].replace(/`[^`]*`/g,"").includes("\""))console.log(id,i+1)})}'
```

### Step 8: 全体を確かめる

**Verify**: `pnpm check && pnpm build && pnpm test:e2e` → すべて exit 0、e2e は全件 passed。

## Test plan

文言の変更なので、新しいテストは書かない。約束事を機械で守らせる検査は 026 で足す。`pnpm check`（`data.check.ts` のバッククォートの数、空の文）と e2e（axe、キー表のテスト）で壊れていないことを確かめる。

## Done criteria

- [ ] Step 1〜7 の Verify がすべて期待どおり
- [ ] `grep -n "key: 'Home'" src/lib/components/slider/data.ts` → 0 行、`grep -n "key: 'Home / End'" src/lib/components/slider/data.ts` → 1 行
- [ ] `grep -n "ja: 'なし。" src/lib/components/badge/data.ts` → 1 行
- [ ] `pnpm check`、`pnpm build`、`pnpm test:e2e` がすべて exit 0
- [ ] `git diff --stat` で、`src/lib/components/*/data.ts` 以外が変わっていない

## STOP conditions

- 表の「今の文」が見つからない（ほかの計画で変わっている）
- `tests/` の中に、変える文をそのまま見ているテストがある
- 新しい文が、そのページの `sources` に書かれていない主張を足すことになると判断した（この計画は食い違いを直すだけ）

## Maintenance notes

- 似た部品の両方のページに同じ事実を書くときは、両方を同時に直す。トーストとアラートのように、`related` の `diff` が対になっている部品は特に。
- 026 で、「なし。」の行、`Home / End` の 1 行化、`diff` の主語、英語の引用符を `data.check.ts` に足す。この計画を先に入れないと、026 の検査が落ちる。
