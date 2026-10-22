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

// 別名の source はこの一覧から選ぶ。表記がそろっていないとデザインシステム別の索引で別物として並ぶ
const designSystems = [
	'デジタル庁デザインシステム',
	'Carbon Design System',
	'Ant Design',
	'React Aria',
	'WAI-ARIA APG',
	'MUI',
	'Apple Human Interface Guidelines',
	'Open UI',
	'GOV.UK Design System',
	'Bootstrap',
	'Material Design 3',
	'HTML',
	'Fluent UI React v9',
	'Atlassian Design System',
	'Angular Material'
];

for (const d of all) {
	// 詳細ページの {#each} のキーと同じ式。重複すると本番でもハイドレーションで落ちる
	const keyed: [string, string[]][] = [
		['aliases', d.aliases.map((a) => a.name + a.source)],
		['variations', (d.variations ?? []).map((v) => v.name.en)],
		['behavior', d.behavior.map((b) => b.en)],
		['keyboard', d.keyboard.map((k) => k.key)],
		['usage', (d.usage ?? []).map((u) => u.en)],
		['misuse', (d.misuse ?? []).map((m) => m.pattern.en)],
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
	// いろいろな有力な文献をもとにするサイトなので、1つのデザインシステムに寄りすぎないようにする。
	// デジタル庁は DADS のサイト・実装例のリポジトリ・ガイドブックをよく引くため、合わせて数える
	const dads = d.sources.filter((s) => /^https:\/\/((design|www)\.digital\.go\.jp|github\.com\/digital-go-jp)\//.test(s.url)).length;
	if (dads && dads === d.sources.length) errors.push(`${d.id}: needs a source other than the Digital Agency`);
	if (dads * 2 > d.sources.length) errors.push(`${d.id}: more than half of the sources are from the Digital Agency (${dads}/${d.sources.length})`);
	for (const url of [...d.sources.map((s) => s.url), ...d.aliases.map((a) => a.url)])
		if (!url.startsWith('https://')) errors.push(`${d.id}: non-https url ${url}`);
	for (const a of d.aliases)
		if (!designSystems.includes(a.source)) errors.push(`${d.id}: unknown alias source ${a.source}`);

	// 英日の両方を埋める（Text 型は空文字を防げない）
	const texts = [
		d.names,
		d.summary,
		d.appearance,
		...d.behavior,
		...d.keyboard.map((k) => k.action),
		...(d.usage ?? []),
		...(d.misuse ?? []).flatMap((m) => [m.pattern, m.harm, m.instead]),
		...(d.related ?? []).map((r) => r.diff),
		...(d.variations ?? []).flatMap((v) => [v.name, v.description])
	];
	for (const t of texts) if (!t.en.trim() || !t.ja.trim()) errors.push(`${d.id}: empty text`);

	// 文中のコードは `…` で囲む（CodeText.svelte）。閉じ忘れると以降がすべてコードとして表示される
	for (const t of texts)
		for (const s of [t.en, t.ja]) if (s.split('`').length % 2 === 0) errors.push(`${d.id}: unbalanced backtick in ${s}`);
	// 「〇〇 属性」「the 〇〇 attribute」と書いたら、属性名はコードとして囲む
	for (const t of texts)
		for (const s of [t.en, t.ja])
			for (const m of s.matchAll(/(?<![`\w-])([a-z][a-z-]*) (?:attribute|属性)/g))
				if (!['HTML', 'the', 'an', 'a'].includes(m[1])) errors.push(`${d.id}: wrap the attribute name in backticks: ${m[1]}`);
	// 名前と概要はページのタイトルや説明文（メタタグ）にもそのまま出るので、` を使わない
	for (const s of [d.names.en, d.names.ja, d.summary.en, d.summary.ja])
		if (s.includes('`')) errors.push(`${d.id}: backtick in name or summary`);
}

if (errors.length) throw new Error(errors.join('\n'));
console.log('ok');
