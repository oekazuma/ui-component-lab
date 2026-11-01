import type { ComponentData } from '../types';

// 1コンポーネント = src/lib/components/<id>/ に data.ts と Demo.svelte を置くだけで登録される。
// 全部品の英日の本文は大きいので、サーバー（プリレンダー）だけで読み、ページには load で要る分だけを渡す
const dataModules = import.meta.glob<ComponentData>('../components/*/data.ts', {
	eager: true,
	import: 'default'
});
// eager なしの glob は中身を読み込まないので、Demo.svelte があるかを確かめるのに使う
const demoPaths = new Set(
	Object.keys(import.meta.glob('../components/*/Demo.svelte')).map((p) => p.split('/')[2])
);

export const components = Object.entries(dataModules)
	.map(([path, data]) => {
		const dir = path.split('/')[2];
		if (data.id !== dir) throw new Error(`id "${data.id}" does not match ${path}`);
		if (!demoPaths.has(dir)) throw new Error(`Demo.svelte is missing for ${data.id}`);
		return data;
	})
	.sort((a, b) => a.names.en.localeCompare(b.names.en, 'en'));

export const getComponent = (id: string) => components.find((d) => d.id === id);
