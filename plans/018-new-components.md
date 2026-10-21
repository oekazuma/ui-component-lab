# 018 部品の追加

名前を取り違えやすい組み合わせを埋める部品を、上の組から順に足す。部品の作り方は CLAUDE.md の「コンポーネントの追加」に従う。

## 作り方の約束

- `src/lib/components/<id>/` に `data.ts` と `Demo.svelte` を置く。id は下の表のとおり
- 出典は実際に開いて確かめたものだけを書く（`checkedAt` は開いた日）。DADS の詳しい仕様は、ページになければ https://github.com/digital-go-jp/design-system-example-components-html の `src/components/<id>/` を読む
- 別名（aliases）の `source` は `src/lib/data.check.ts` の `designSystems` から選ぶ。新しいデザインシステムを使うなら一覧にも足す
- `related` は双方向に張る。取り違えやすい相手の部品の data.ts にも、こちらへの `related` を足す
- `misuse` は 016 の基準どおり（harm は出典に書かれた内容だけ、`deceptive` は出典がディセプティブパターンと分類したものだけ）。根拠が見つからなければ書かない
- デモはネイティブ要素で足りるならそれを使う。独自のキー操作は APG のパターンに従い、`tests/keyboard.spec.ts` にテストを足す。それ以外の挙動は `tests/demos.spec.ts` に足す
- 一覧ページではサムネイル（inert）になる。詳細ページのデスクトップ幅と 375px、ライトとダーク、日英で崩れないこと
- このサイト自身で使っている部品（目次、スキップリンク、ランゲージセレクター、コマンドパレット）は、behavior に「このサイトの◯◯がこの部品」と添える

## A. メニューとナビゲーション

| id | 名前（en / ja） | カテゴリ | 取り違えやすい相手 | 主な資料 |
|---|---|---|---|---|
| hamburger-menu | Hamburger menu button / ハンバーガーメニューボタン | action | drawer、menu | DADS hamburger-menu-button |
| mobile-menu | Mobile menu / モバイルメニュー | navigation | drawer、hamburger-menu | DADS mobile-menu |
| menubar | Menubar / メニューバー（水平メニュー） | navigation | menu、tabs | APG Menu and Menubar、DADS horizontal-menu |
| mega-menu | Mega menu / メガメニュー | navigation | menubar、menu、drawer | DADS mega-menu、APG Disclosure Navigation |
| segmented-control | Segmented control / セグメンテッドコントロール | input | tabs、radio、toggle-button | Apple HIG、Ant Design Segmented、Carbon Content switcher |

## B. お知らせとページの中の移動

| id | 名前（en / ja） | カテゴリ | 取り違えやすい相手 | 主な資料 |
|---|---|---|---|---|
| callout | Callout / 注釈ブロック | feedback | alert | DADS notice-block |
| emergency-banner | Emergency banner / 緊急時バナー | feedback | alert、callout | DADS emergency-banner |
| table-of-contents | Table of contents / 目次 | navigation | breadcrumb、tabs | DADS toc |
| back-to-top | Back to top button / スクロールトップボタン | navigation | link、button | DADS scroll-top-button |
| skip-link | Skip link / スキップリンク | navigation | link、back-to-top | WCAG 2.4.1 Understanding、WebAIM |
| language-selector | Language selector / ランゲージセレクター | navigation | select、menu | DADS language-selector |

## C. APG のパターン

| id | 名前（en / ja） | カテゴリ | 取り違えやすい相手 | 主な資料 |
|---|---|---|---|---|
| command-palette | Command palette / コマンドパレット | overlay | combobox、search-field、modal | APG Combobox、このサイトの検索窓 |
| range-slider | Range slider / 範囲スライダー | input | slider | APG Slider (Multi-Thumb) |
| feed | Feed / フィード | data | list、pagination | APG Feed |
| data-grid | Data grid / グリッド | data | table | APG Grid（table の variations の「データグリッド」と結ぶ） |
| window-splitter | Window splitter / ウィンドウスプリッター | action | slider | APG Window Splitter |

## D. よく使われる入力と表示

| id | 名前（en / ja） | カテゴリ | 取り違えやすい相手 | 主な資料 |
|---|---|---|---|---|
| password-field | Password field / パスワード入力 | input | text-field | GOV.UK Password input、WCAG 3.3.8 |
| one-time-code | One-time code field / 確認コードの入力 | input | text-field、number-input | GOV.UK、MDN autocomplete="one-time-code" |
| rating | Rating / 評価（星） | input | radio、slider | MUI Rating、W3C の radio を使った例 |
| empty-state | Empty state / 空の状態 | feedback | skeleton、alert | Carbon、GOV.UK など |
| context-menu | Context menu / コンテキストメニュー | action | menu、popover | APG Menu、MDN contextmenu |
