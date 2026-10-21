// コンポーネントデータの約束事を確かめる: node src/lib/data.check.ts
// registry.ts はクライアントでも動くため、ビルド時にだけ要る検査はここに置く
import { readdirSync } from 'node:fs';
import type { ComponentData } from './types.ts';

const dir = new URL('./components/', import.meta.url);
const all: ComponentData[] = [];
for (const id of readdirSync(dir)) {
	all.push((await import(new URL(`${id}/data.ts`, dir).href)).default);
}
const byId = new Map(all.map((d) => [d.id, d]));
const errors: string[] = [];

for (const d of all) {
	// 詳細ページの {#each} のキーと同じ式。重複すると本番でもハイドレーションで落ちる
	const keyed: [string, string[]][] = [
		['aliases', d.aliases.map((a) => a.name + a.source)],
		['variations', (d.variations ?? []).map((v) => v.name.en)],
		['behavior', d.behavior.map((b) => b.en)],
		['keyboard', d.keyboard.map((k) => k.key)],
		['usage', (d.usage ?? []).map((u) => u.en)],
		['related', (d.related ?? []).map((r) => r.id)],
		['sources', d.sources.map((s) => s.url)]
	];
	for (const [field, keys] of keyed)
		if (new Set(keys).size !== keys.length) errors.push(`${d.id}: duplicate key in ${field}`);

	if (!d.behavior.length) errors.push(`${d.id}: behavior is empty`);
	if (!d.keyboard.length) errors.push(`${d.id}: keyboard is empty`);
	if (!d.sources.length) errors.push(`${d.id}: sources is empty`);

	for (const r of d.related ?? [])
		if (!byId.get(r.id)?.related?.some((back) => back.id === d.id))
			errors.push(`${d.id}: related ${r.id} does not link back`);

	for (const s of d.sources) {
		if (!/^\d{4}-\d{2}-\d{2}$/.test(s.checkedAt) || Number.isNaN(Date.parse(s.checkedAt)))
			errors.push(`${d.id}: bad checkedAt ${s.checkedAt}`);
		if (
			s.url.startsWith('https://design.digital.go.jp/') &&
			!/^デジタル庁デザインシステムウェブサイト「.+」をもとに作成$/.test(s.label)
		)
			errors.push(`${d.id}: DADS source needs the attribution label`);
	}
	for (const url of [...d.sources.map((s) => s.url), ...d.aliases.map((a) => a.url)])
		if (!url.startsWith('https://')) errors.push(`${d.id}: non-https url ${url}`);

	// 英日の両方を埋める（Text 型は空文字を防げない）
	const texts = [
		d.names,
		d.summary,
		d.appearance,
		...d.behavior,
		...d.keyboard.map((k) => k.action),
		...(d.usage ?? []),
		...(d.related ?? []).map((r) => r.diff),
		...(d.variations ?? []).flatMap((v) => [v.name, v.description])
	];
	for (const t of texts) if (!t.en.trim() || !t.ja.trim()) errors.push(`${d.id}: empty text`);
}

if (errors.length) throw new Error(errors.join('\n'));
console.log('ok');
