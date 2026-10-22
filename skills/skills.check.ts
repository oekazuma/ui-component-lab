// スキルの形の最小チェック: node skills/skills.check.ts
// npx skills add は skills/<name>/SKILL.md を探す。name の食い違いや、参照先のファイルの欠けを先に見つける
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const dir = new URL('./', import.meta.url);
const errors: string[] = [];

const names = readdirSync(dir, { withFileTypes: true })
	.filter((d) => d.isDirectory())
	.map((d) => d.name);
if (!names.includes('improve-ui-components')) errors.push('skills/improve-ui-components/ is missing');

for (const name of names) {
	const path = new URL(`${name}/SKILL.md`, dir);
	if (!existsSync(path)) {
		errors.push(`${name}: SKILL.md is missing`);
		continue;
	}
	const text = readFileSync(path, 'utf8');
	const front = text.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? '';
	const field = (key: string) => front.match(new RegExp(`^${key}: (.+)$`, 'm'))?.[1].trim();
	if (field('name') !== name) errors.push(`${name}: frontmatter name is ${field('name')}`);
	// 1 行で書く前提で読むので、`>` や `|` の複数行の書き方は弾く
	const description = field('description') ?? '';
	if (!description || /^[>|]/.test(description) || description.length > 1024)
		errors.push(`${name}: description must be one line of 1-1024 characters`);
	for (const file of readdirSync(new URL(`${name}/`, dir), { recursive: true, encoding: 'utf8' }).filter((f) => f.endsWith('.md'))) {
		const base = new URL(`${name}/${file}`, dir);
		for (const ref of readFileSync(base, 'utf8').matchAll(/\]\(([\w./-]+\.md)\)/g))
			if (!existsSync(new URL(ref[1], base))) errors.push(`${name}/${file}: ${ref[1]} is referenced but missing`);
	}
}

// 本番のデータを変えない・知らない形の JSON で推測しない、という約束は本文の言い回しにしか現れない。書き直しで消えないよう、要の一文を押さえる
const required: Record<string, string[]> = {
	'SKILL.md': [
		'https://oekazuma.github.io/ui-component-lab/components.json',
		'**stop** and tell the user',
		'## Hard Rules',
		'On the live site, never change anything.',
		'skip the page and say so',
		'backend is not confirmed local',
		'Hard Rules 2, 3, 4, 5, 7 and 8'
	],
	'references/local-server.md': ['## 3. Is the backend local?']
};
for (const [file, needles] of Object.entries(required)) {
	const path = new URL(`improve-ui-components/${file}`, dir);
	const text = existsSync(path) ? readFileSync(path, 'utf8') : '';
	for (const needle of needles) if (!text.includes(needle)) errors.push(`improve-ui-components/${file}: missing "${needle}"`);
}

if (errors.length) throw new Error(errors.join('\n'));
console.log('ok');
