# UI Component Lab

UIコンポーネントの名前と動きを、英日で試して確かめられるサイト。SvelteKit 3 と Svelte 5（runes）で全ページをプリレンダーし、GitHub Pages の `/ui-component-lab` に置く。

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
- デジタル庁デザインシステム（DADS）をもとにした内容は、出典のラベルを `デジタル庁デザインシステムウェブサイト「<ページ名>」をもとに作成` にする（利用規約の出典表示）。別名の `source` は `src/lib/data.check.ts` の `designSystems` にある名前から選ぶ（DADS は `デジタル庁デザインシステム`）。新しいデザインシステムを足すときは一覧にも加える
- キーの表記は Enter → Space、↑ → ↓、← → → の順にする。対になる操作は `Home / End` のように 1 行にまとめ、`Tab / Shift + Tab` は `+` の前後に空白を入れる
- キー操作がない部品は `key: '—'` の行を置き、動作に「なし。」から始まる説明を書く
- デモ固有の挙動は behavior に「このデモでは…」「In this demo, …」と書く
- データの約束事の検査は `src/lib/data.check.ts` に足す。`registry.ts` はクライアントでも動くので、検査を増やさない

### Demo.svelte

- props は `let { lang }: { lang: Lang } = $props();` とし、文言はファイル内の `const text = { en: {...}, ja: {...} }` に置く
- id は `$props.id()` から作る。一覧ページではすべてのデモが同時に描画されるため、固定の id は衝突する
- リセットは `DemoFrame.svelte` が `{#key}` で作り直して行うので、デモにリセット処理は書かない。言語を切り替えたときも作り直される
- ネイティブ要素で足りるならそれを使い、何をブラウザに任せているかをコメントに書く（例: `modal/Demo.svelte`）。独自のキー操作には、従う APG のパターン名をコメントで添える
- イベントリスナーは要素に付ける。document や window に付けるのは、ポップアップが開いている間だけにする。`$effect` で付けて、片付けの関数で外す（例: `src/lib/ActionMenu.svelte`、`tooltip/Demo.svelte`）。常設してよいのは toast の `<svelte:window>` だけ
- タイマーは `$effect` の片付けで止める（例: `toast/Demo.svelte`）
- `svelte-ignore` を使うときは、1 行上に理由を書く
- 色は `src/app.css` のトークン（`--color-*`）を使う。エラーは `--color-danger`、アクセントのホバーは `--color-accent-hover`。トークンを足すときはコントラスト比をコメントに書く
- 共通のクラスは `.btn`、`.btn-primary`、`.visually-hidden`（`src/app.css`）
- デモの挙動を変えたら、同じコミットで data.ts の keyboard と behavior を直す。独自のキー操作を変えたときは `tests/keyboard.spec.ts` も直す
- 詳細ページのソース表示では、行全体のコメントが除かれる（`src/lib/strip-comments.ts`）。読者に伝えたい説明は data.ts に書く

## コードの約束事

- routes と data.ts からは `#lib/*.js` で import し、`src/lib` の中では相対パスを使う。`src/params.ts` はビルド時に Node が直接読むので `#lib` を使わない
- コメントは日本語で書き、処理の説明より理由を書く
- `ponytail:` コメントは、意図して簡略にした箇所と、見直すきっかけを示す
- インデントはタブ、文字列はシングルクォート、末尾カンマなし
- `<title>` やメタタグは各ページの +page.ts で `definePageMetaTags` に title と description を渡す。<svelte:head> には書かない（svelte-meta-tags がルートのレイアウトでまとめて出す）
