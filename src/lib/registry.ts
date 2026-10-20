import type { Component } from 'svelte';
import type { ComponentData, Lang } from './types';

// 1コンポーネント = src/lib/components/<id>/ に data.ts と Demo.svelte を置くだけで登録される
const dataModules = import.meta.glob<ComponentData>('./components/*/data.ts', {
	eager: true,
	import: 'default'
});
const demoModules = import.meta.glob<Component<{ lang: Lang }>>('./components/*/Demo.svelte', {
	eager: true,
	import: 'default'
});

const dirOf = (path: string) => path.split('/')[2];

const demos = new Map(Object.entries(demoModules).map(([path, demo]) => [dirOf(path), demo]));

export const entries = Object.entries(dataModules)
	.map(([path, data]) => {
		const demo = demos.get(dirOf(path));
		if (data.id !== dirOf(path)) throw new Error(`id "${data.id}" does not match ${path}`);
		if (!demo) throw new Error(`Demo.svelte is missing for ${data.id}`);
		return { data, demo };
	})
	.sort((a, b) => a.data.names.en.localeCompare(b.data.names.en));

for (const { data } of entries) {
	for (const r of data.related ?? []) {
		if (!entries.some((e) => e.data.id === r.id))
			throw new Error(`related id "${r.id}" in ${data.id} does not exist`);
	}
}

export const getEntry = (id: string) => entries.find((e) => e.data.id === id);
