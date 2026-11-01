// コンポーネントデータの約束事を確かめる: node src/lib/data.check.ts
// 検査はここに置く（src/lib/server/components.ts は pnpm check では動かず、結果も出ないため）
import { readdirSync, readFileSync } from 'node:fs';
import type { ComponentData } from './types.ts';

const dir = new URL('./components/', import.meta.url);
const all: ComponentData[] = [];
const errors: string[] = [];
for (const id of readdirSync(dir)) {
	// この検査は Node が data.ts を直接読む。#lib/types.js は .ts の実体を指さないので、import type 以外は読み込みで落ちる
	const source = readFileSync(new URL(`${id}/data.ts`, dir), 'utf8');
	if (/^import (?!type )[^;]*from '#lib\//m.test(source)) {
		errors.push(`${id}: data.ts may import only types from #lib`);
		continue;
	}
	all.push((await import(new URL(`${id}/data.ts`, dir).href)).default);
}
const byId = new Map(all.map((d) => [d.id, d]));

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

// diff は自分の側を主語にする。部品名のほかに、文の書き出しで使ってよい呼び方
const subjects: Record<string, { en?: string[]; ja?: string[] }> = {
	link: { en: ['ordinary link'], ja: ['ふつうのリンク'] },
	modal: { ja: ['モーダル'] },
	'one-time-code': { en: ['one-time code'], ja: ['確認コード'] },
	select: { ja: ['セレクト'] },
	tabs: { en: ['tab'] },
	textarea: { en: ['text area'] }
};

const stripEn = (n: string) => n.replace(/ \(.*\)$/, '').toLowerCase();
const stripJa = (n: string) => n.replace(/（.*）$/, '');

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

	// 検索だけの語は、空の語と、名前や別名と同じ語を入れない（同じなら要らない）
	for (const term of d.searchTerms ?? []) {
		if (!term.trim()) errors.push(`${d.id}: empty search term`);
		if ([d.names.en, d.names.ja, ...d.aliases.map((a) => a.name)].includes(term)) errors.push(`${d.id}: search term repeats a name: ${term}`);
	}

	// キー操作がない部品は「なし。」で始め、何もしないことをはっきり書く
	for (const k of d.keyboard)
		if (k.key === '—' && !(k.action.en.startsWith('None.') && k.action.ja.startsWith('なし。')))
			errors.push(`${d.id}: a '—' keyboard row starts with "None." / "なし。"`);
	// 対になるキーは 1 行にまとめる（Home / End）。別の行にすると表が長くなり、対であることが見えにくい
	if (d.keyboard.some((k) => k.key.endsWith('Home')) && d.keyboard.some((k) => k.key.endsWith('End')))
		errors.push(`${d.id}: write Home and End on one row, such as 'Home / End'`);

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

	// 英語の文の引用符は “ ” にそろえる。コードの中の " は HTML の書き方なので除く
	for (const t of texts)
		if (t.en.replace(/`[^`]*`/g, '').includes('"')) errors.push(`${d.id}: use “ ” instead of " in ${t.en}`);

	const enNames = [stripEn(d.names.en), ...(subjects[d.id]?.en ?? [])];
	const jaNames = [stripJa(d.names.ja), ...(subjects[d.id]?.ja ?? [])];
	for (const r of d.related ?? []) {
		const en = r.diff.en.toLowerCase().replace(/^(a|an|the) /, '');
		const other = byId.get(r.id)?.names;
		if (!other) continue;
		// 相手の名前が自分の名前で始まる組（alert と alert dialog）は、長いほうに一致したら相手が主語
		const wrong = (own: string[], text: string, theirs: string) => {
			const mine = own.filter((n) => text.startsWith(n)).sort((a, b) => b.length - a.length)[0];
			return !mine || (text.startsWith(theirs) && theirs.length > mine.length);
		};
		if (wrong(enNames, en, stripEn(other.en))) errors.push(`${d.id}: diff to ${r.id} must start with ${d.names.en} (en)`);
		if (wrong(jaNames, r.diff.ja, stripJa(other.ja))) errors.push(`${d.id}: diff to ${r.id} must start with ${jaNames[0]} (ja)`);
	}

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
