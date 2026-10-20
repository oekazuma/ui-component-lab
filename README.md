# UI Component Lab

UIコンポーネントの名前・見た目・挙動を、その場で操作できるデモ付きで一覧する図鑑サイトです。英語と日本語に対応しています。

公開URL: https://oekazuma.github.io/ui-component-lab/

## 開発

```sh
pnpm install
pnpm dev      # http://localhost:5173/ui-component-lab/
pnpm check    # 型・アクセシビリティの検査
pnpm build    # build/ に静的ファイルを出力
pnpm preview  # ビルド結果の確認
```

SvelteKit（adapter-static）で全ページを prerender し、`main` への push で GitHub Actions が GitHub Pages へデプロイします。

## コンポーネントの追加

`src/lib/components/<id>/` に次の2ファイルを置くと、一覧と詳細ページ（`/en/components/<id>/`、`/ja/components/<id>/`）に自動で載ります。

- `data.ts`: 名前・別名・説明・挙動・キーボード操作・出典（`ComponentData` 型。英日の両方が必須）
- `Demo.svelte`: `lang` を受け取る最小構成のデモ。リセットボタンは共通の枠側にあるため、デモ側での実装は不要です

挙動とキーボード操作の記述は [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) と矛盾しないようにし、根拠にした資料を `sources` に確認日付きで記載します。

## ライセンス

コードは [MIT License](LICENSE) で公開しています。

サイト上の説明文とデモはすべて自作です。名称や挙動の根拠にした資料は、各詳細ページに出典として記載しています。説明文の著作権は oekazuma に帰属します。
