import type { Component } from 'svelte';
import type { Lang } from './types';

type Demo = Component<{ lang: Lang }>;

// eager にしないと、部品ごとに別のチャンクになり、ページは要るものだけを読み込む
const demoModules = import.meta.glob<Demo>('./components/*/Demo.svelte', { import: 'default' });
// 開いて使う部品は、閉じた状態のデモではサムネイルにきっかけのボタンしか写らない。
// そうした部品は Thumb.svelte を置くと、一覧ではデモの代わりにそれ（開いた状態の絵）を出す
const thumbModules = import.meta.glob<Demo>('./components/*/Thumb.svelte', { import: 'default' });

export const loadDemo = (id: string) => demoModules[`./components/${id}/Demo.svelte`]();

// 一覧のサムネイル。Thumb があればそれを、なければデモを使う
export const loadThumb = (id: string) =>
	(thumbModules[`./components/${id}/Thumb.svelte`] ?? demoModules[`./components/${id}/Demo.svelte`])();
