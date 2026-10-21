import type { Category } from './types';

// ヘッダーの検索欄と一覧ページで共有するため、モジュールに置く。
// SSR ではリクエスト間で共有されてしまうが、prerender 時は誰も書き換えないので初期値のまま出る
// ponytail: 絞り込み状態は URL に載せない（prerender のため searchParams を読めない）。共有したくなったら replaceState で同期する
export const filter = $state({ query: '', category: '' as Category | '' });
