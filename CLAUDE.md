# UI Component Lab

UIコンポーネントの名前と動きを、英日で試して確かめられるサイト。SvelteKit 3 と Svelte 5（runes）で全ページをプリレンダーし、GitHub Pages の `/ui-component-lab` に置く。

## 確認コマンド

- `pnpm check` で型、Svelte の a11y 警告（警告でも失敗する）、`src/lib/search.check.ts`、`src/lib/data.check.ts`、`skills/skills.check.ts` を確かめる
- `pnpm build` で全ページをプリレンダーする
- `pnpm build && pnpm test:e2e` で Playwright と axe を回す（axe は一覧ページと全部品の詳細ページ、ライトとダーク。ほかに独自のキー操作とデモの挙動）

CI は PR ごとに上の 3 つを実行する。

## コンポーネントの追加

`src/lib/components/<id>/` に `data.ts` と `Demo.svelte` を置くと、`src/lib/registry.ts` が自動で登録する。

### data.ts

- `export default { ... } satisfies ComponentData;` の形にする（型は `src/lib/types.ts`）。`id` はディレクトリ名と同じにする
- 文言は `{ en, ja }` の両方を書き、同じ内容にする
- 日本語の説明文は です・ます で書く（概要、見分けるポイント、挙動、キー操作の動作、使い分け、困ること、代わりに、似た部品との違い、バリエーションの説明）。見出しやラベルにあたる `misuse` の `pattern` と `variations` の `name` は言い切りの形のままにする。ページやデモの文言も、説明文は です・ます、メニューやボタンのラベルは短い形にする
- 文中の HTML 要素・属性・ARIA の名前は `` `aria-pressed` `` のようにバッククォートで囲む（詳細ページでコードとして表示される）。名前と概要には使わない（タイトルやメタタグにそのまま出る）
- `related` は双方向に張る。`diff` は自分の側を主語にした一文にする
- 出典の `checkedAt` は、実際に開いて確かめた日を `YYYY-MM-DD` で書く。まとめて書き換えない
- デジタル庁デザインシステム（DADS）をもとにした内容は、出典のラベルを `デジタル庁デザインシステムウェブサイト「<ページ名>」をもとに作成` にする（利用規約の出典表示）。別名の `source` は `src/lib/data.check.ts` の `designSystems` にある名前から選ぶ（DADS は `デジタル庁デザインシステム`）。新しいデザインシステムを足すときは一覧にも加える
- 画面に出る文では、略称の DADS を使わず「デジタル庁デザインシステム」「the Digital Agency Design System」と書く（読み手が略称を知っているとは限らないため）
- キーの表記は Enter → Space、↑ → ↓、← → → の順にする。対になる操作は `Home / End` のように 1 行にまとめ、`Tab / Shift + Tab` は `+` の前後に空白を入れる
- キー操作がない部品は `key: '—'` の行を置き、動作に「なし。」から始まる説明を書く
- デモ固有の挙動は behavior に「このデモでは…」「In this demo, …」と書く
- `misuse`（避けたい使い方）は pattern（どういう使い方か）、harm（誰がどう困るか）、instead（代わりにどうするか）で書く。harm は出典に書かれている内容に限り、部品を問わない資料（WCAG、deceptive.design など）を当てはめてよい。`deceptive: true` は出典がディセプティブパターンやダークパターンとして分類しているものにだけ付ける。根拠にした資料は sources に足し、根拠が見つからない部品には書かない
- `components.json`（`src/routes/components.json/+server.ts`）は improve-ui-components スキル（`skills/`）が読む。形を変えるときは `ComponentsJson` の `version` を上げ、スキルも合わせる
- データの約束事の検査は `src/lib/data.check.ts` に足す。`registry.ts` はクライアントでも動くので、検査を増やさない

### Demo.svelte

- props は `let { lang }: { lang: Lang } = $props();` とし、文言はファイル内の `const text = { en: {...}, ja: {...} }` に置く
- id は `$props.id()` から作る。一覧ページではすべてのデモが同時に描画されるため、固定の id は衝突する
- リセットは `DemoFrame.svelte` が `{#key}` で作り直して行うので、デモにリセット処理は書かない。言語を切り替えたときも作り直される
- ネイティブ要素で足りるならそれを使い、何をブラウザに任せているかをコメントに書く（例: `modal/Demo.svelte`）。独自のキー操作には、従う APG のパターン名をコメントで添える
- イベントリスナーは要素に付ける。document や window に付けるのは、ポップアップが開いている間だけにする。`$effect` で付けて、片付けの関数で外す（例: `src/lib/ActionMenu.svelte`、`tooltip/Demo.svelte`）。常設してよいのは toast の `<svelte:window>` と、検索を開くショートカット（`src/lib/SearchPalette.svelte`）だけ
- タイマーは `$effect` の片付けで止める（例: `toast/Demo.svelte`）
- `svelte-ignore` を使うときは、1 行上に理由を書く
- 色は `src/app.css` のトークン（`--color-*`）を使う。ダークモードではトークンの値が切り替わるので、色を直に書くとダークモードで読めなくなる。エラーは `--color-danger`（その上の文字は `--color-danger-text`）、薄い背景のエラー表示は `--color-danger-surface` と `--color-danger-on-surface`、アクセントのホバーは `--color-accent-hover`。トークンを足すときはライトとダークの両方に値を書き、コントラスト比をコメントに書く
- 共通のクラスは `.btn`、`.btn-primary`、`.visually-hidden`（`src/app.css`）
- デモの挙動を変えたら、同じコミットで data.ts の keyboard と behavior を直す。独自のキー操作を変えたときは `tests/keyboard.spec.ts` も直す

## コードの約束事

- routes と data.ts からは `#lib/*.js` で import し、`src/lib` の中では相対パスを使う。`src/params.ts` はビルド時に Node が直接読むので `#lib` を使わない
- コメントは日本語で書き、処理の説明より理由を書く
- `ponytail:` コメントは、意図して簡略にした箇所と、見直すきっかけを示す
- インデントはタブ、文字列はシングルクォート、末尾カンマなし
- `<title>` やメタタグは各ページの +page.ts で `definePageMetaTags` に title と description を渡す。<svelte:head> には書かない（svelte-meta-tags がルートのレイアウトでまとめて出す）
