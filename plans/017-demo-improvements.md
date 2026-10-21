# 017 デモの改善

各部品のデモを、デジタル庁デザインシステム（DADS）、WAI-ARIA APG、data.ts の出典と見比べて見つかった改善点。上から順に進める。根拠の URL は各項目に書いた。DADS のページに詳しい仕様がないときは、DADS の HTML 実装リポジトリ（https://github.com/digital-go-jp/design-system-example-components-html の `src/components/<id>/`）を根拠にしている。

## 進め方の約束

- CLAUDE.md の約束に従う。デモの挙動を変えたら、同じ変更で data.ts の behavior・keyboard・variations を直す。独自のキー操作を変えたら `tests/keyboard.spec.ts` も直す
- 色は `--color-*` トークンを使う（ダークモードで読めるように）
- 変更ごとに `pnpm check` と `pnpm build && pnpm test:e2e` を通す

## 1. デモ自身がサイトの説明と食い違っているもの

1. radio: 「通常配送」が選ばれた状態で始まり、misuse「あらかじめ選んでおかない」と食い違う。初期選択をなくす（APG Radio: 未選択なら Tab で最初の選択肢へ、Space で選ぶ）
2. tooltip: ボタンとツールチップの隙間でポインターが外れて消える（misuse「乗せても消えない」、WCAG 1.4.13 Hoverable と食い違う）。隙間を埋める。あわせてホバーとフォーカスを別々に持ち、フォーカス中はマウスが離れても消さない（APG Tooltip、WCAG 1.4.13 Persistent）
3. spinner: 画面の一部（コメント欄）の読み込みで回転している（misuse と DADS「一部の処理中は動かない砂時計」と食い違う）。場面を画面全体の読み込みにするか、砂時計の表示を並べる。読み込み後にコメントを表示する。reduced motion では DADS どおり止める（https://design.digital.go.jp/dads/components/progress-indicator/ ）
4. alert: アイコンが aria-hidden で、種類の語（「エラー：」）がない（misuse と食い違う）。DADS ノティフィケーションバナーの作りに合わせ、アイコンに名前を付けるか種類の語を添え、エラー用の記号にする。再度押したときも読み上げる（https://design.digital.go.jp/dads/components/notification-banner/usage/ ）
5. meter: しきい値を超えても色が変わるだけ（misuse の instead「状態も言葉で添える」と食い違う）。「もうすぐいっぱいです」を出す。見えている「40GB / 100GB」を aria-describedby で結ぶ（APG Meter の aria-valuetext の考え方）
6. number-input: 範囲外を赤い枠だけで示す（WCAG 1.4.1、3.3.1）。aria-describedby で結んだエラー文を出す
7. ボタン全般: `.btn` の高さが約 40px で、button の usage「44 × 44 CSS px 以上」と DADS（https://design.digital.go.jp/dads/components/button/accessibility/ ）に届かない。toolbar のボタン（36px）も同じ
8. menu / split-button: `ActionMenu.svelte` の `role="menu"` に名前がない（APG Menu Button: aria-labelledby でボタンを指す）
9. combobox: 日本語入力の変換中の ↓ や Enter を横取りしている可能性。`e.isComposing` のときは何もしない
10. file-upload: ドロップしたファイルが accept と 10MB の検査を通らない。形式と大きさを確かめ、DADS どおり行ごとにエラー文を出す（https://design.digital.go.jp/dads/components/file-upload/usage/ 「ファイル選択時・エラー時」）。英語版のサイズ表記の全角括弧、1MB 以上の表記も直す

## 2. カルーセル（DADS より簡素）

https://design.digital.go.jp/dads/components/carousel/usage/ 、/accessibility/ 、DADS 実装の carousel、APG Carousel（tablist の例）をもとに作り直す。

1. 番号のボタン（1〜N）でスライドを選ぶステップナビゲーション。`role="tablist"`、`role="tab"`、`aria-selected`、ロービング tabindex、← / → で切り替え（APG の例は Home / End も）。下の点は置き換える
2. 「1 / 4」の今の位置を文字で見せる
3. スライドの中身を、見出し・期間・「詳しく見る」リンクのあるお知らせにする（画像は使わず CSS とテキスト）。大きさを横長にする
4. 画面に見える見出しを置き、`role="region" aria-labelledby` で包む。各スライドの名前は見出しから取る
5. 「すべてのスライド」の `<details>` で、後のスライドを一覧で見られるようにする
6. 直書きの色をトークンにする。data.ts の keyboard の Tab を `Tab / Shift + Tab` に、sources に DADS のアクセシビリティのページを足す。variations に DADS の型（幅狭・標準、打ち出し・コンテナ）、自動再生しないこと、2〜6 枚を書く

## 3. DADS や APG の例より簡素なもの

- toolbar: 区切り線とグループ、揃え方（1 つだけ選べる）のグループを足す（APG Toolbar の例、data.ts の appearance・misuse）。キー操作のテストを足す
- modal / alert-dialog: modal は「閉じる」だけの短いお知らせにする（DADS のユースケース、APG の例）。alert-dialog はメモ欄を置き、「破棄」で実際に消える（APG Alert Dialog の例）。確定ボタンの色をそろえる
- pagination: ページ数を増やし「…」の省略を見せる（GOV.UK Pagination）。`<nav>` のラベルを「検索結果」のような名前にする（DADS 実装）。variations に DADS の「前後とカウンターだけ」の型
- tree-view: 3 段目を足す。開いたファイルを `aria-current` で示す。文字入力での移動を省いた理由を behavior に書く
- card: 見出しリンク付きのカードを 2〜3 枚、格子に並べる。分類のラベル、「PR」と明示した広告カードを 1 枚（DADS カード使い方の構成と、data.ts の misuse）
- toast: 「元に戻す」と閉じるボタン付きのトースト（ボタン付きは自動で消さない）。続けて押したときも読み上げる（MUI Snackbar）
- text-field: 「※必須」と、送信時のエラー文（DADS インプットテキスト使い方）。maxlength で打ち切らない（textarea の方針と GOV.UK Character count）
- stepper: スキップかエラーの状態を 1 つ見せる。終わった段階へボタンで戻れる。最後の段階は「申請する」。全体の進み具合を読み上げ用に伝える（DADS 実装 step-navigation）
- tabs: variations に DADS の 3 つの型、手動アクティベーション、縦並び。パネルにスイッチなどを置く。keyboard に端で折り返すことを書く
- badge: 99+ の頭打ちとドット（MUI Badge）。アイコンだけのボタンの例
- tag: 表示だけのチップラベル（「受付中」など、DADS チップラベル）。選択できるタグ（aria-pressed）
- description-list: 行ごとの「変更」リンク（GOV.UK Summary list）
- table: 容量の列も並べ替えられるようにし、`aria-sort` が 1 列だけに移る様子を見せる。caption に並べ替えの案内（APG Sortable table）。並べ替えできる見出しの見た目（DADS テーブル使い方）
- list: 項目をリンクにした例。DADS「箇条書きリスト」との食い違いは 4 で扱う
- accordion: 本文にリストかリンクを入れる。見出しを質問の形にする。最初の項目を開いておく（DADS アコーディオン使い方）
- disclosure: 入力欄やグラフの下の補足として置く（DADS ディスクロージャーのユースケース）
- drawer: 背景を押したら閉じる（`closedby="any"`、対応しないブラウザの扱いを behavior に書く）。「適用」と、開くボタンに件数。variations に展開位置（DADS ドロワー使い方）
- popover: 中身にリンクを足し、決済画面らしい文脈にする。Tab で外へ出ても開いたままであることを keyboard に書く
- link: 新しいタブで開くリンクとファイルへのリンクの例（DADS リンクテキスト）。ホバーと訪問済みの見た目をデモの中で
- breadcrumb: 4〜5 階層にし、最後を長い名前にして折り返しを見せる
- date-picker: `min` を今日にする（クライアント側で入れる）。年が西暦であることと入力例のサポートテキスト。variations に DADS の分割型
- slider: 最小値と最大値の表示
- switch: 切り替えた結果がその場で見える題材にする。variations に 2 択型（DADS スイッチ）
- search-field: 虫眼鏡アイコン。variations に詳細検索とよくある検索
- select: 日本語版の国を五十音順にする
- listbox: 「(UTC+09:00) 東京」のようなもっともらしい題材と並び
- textarea: 上限を超えたら `aria-invalid` と件数入りのエラー文（DADS テキストエリア使い方）
- combobox: 開閉ボタン、一致した部分の強調、「該当なし」の表示（APG の例、DADS コンボボックス）
- progress-bar: 不確定の状態も見せる。完了後のラベル、実行中の開始ボタン、キャンセル
- skeleton: 読み込み中と完了を支援技術に伝える（role="status"）。画像の矩形を足す
- button: 「キャンセル／下書き保存／送信する」のような実際のラベルと DADS の並び順。テキストボタンに下線
- menu: 「⋯」のオーバーフローメニューの例、危険な操作を区切り線で分ける。端で回ることを keyboard に書く
- split-button: 選んだ操作が本体の既定になる型（variations か、デモで）。メニューを右端にそろえる
- avatar: 写真のアバターと、読み込めず頭文字になる例。名前の隣で飾り扱いにする例。直書きの色をトークンに
- divider: セクションの間は border にし、`<hr>` は文章の中の話題の切り替わりで見せる（HTML 仕様）。全幅とインセットを並べる
- checkbox: 単独のチェックボックス（「利用規約に同意する」）と未チェックのエラー。APG は直前の部分選択を復元することを behavior に注記

## 4. 説明文（data.ts）の直し

- breadcrumb: usage の「狭い画面では折り返す」を DADS（横スクロールも可、条件付き）に合わせる。今のページをリンクにしている理由を behavior に書くか、DADS どおり span にする
- list: 別名の DADS「箇条書きリスト」は実際には別の部品（リソースリスト）にあたる。別名を直すか、素の箇条書きをデモに足して DADS の `<ul>` 方針を usage に書く
- skeleton: DADS の「スケルトンではなくプログレスインジケーターを使う」を usage に書く
- progress-bar: 長い処理では途中の割合を間隔をあけて伝える、を behavior に一文
- spinner、toggle-button など、keyboard の書き方のそろえ（Tab の行など）
