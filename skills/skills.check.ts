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
	const description = field('description') ?? '';
	if (!description || description.length > 1024) errors.push(`${name}: description must be 1-1024 characters`);
	for (const ref of text.matchAll(/\]\(((?:references\/)?[\w./-]+\.md)\)/g))
		if (!existsSync(new URL(`${name}/${ref[1]}`, dir))) errors.push(`${name}: ${ref[1]} is referenced but missing`);
}

// improve-ui-components は公開中の components.json の形に頼る。読み方と止まり方が本文から消えないようにする
const skill = existsSync(new URL('improve-ui-components/SKILL.md', dir))
	? readFileSync(new URL('improve-ui-components/SKILL.md', dir), 'utf8')
	: '';
for (const needle of ['https://oekazuma.github.io/ui-component-lab/components.json', '`version`', '## Hard Rules'])
	if (skill && !skill.includes(needle)) errors.push(`improve-ui-components: SKILL.md does not mention ${needle}`);

if (errors.length) throw new Error(errors.join('\n'));
console.log('ok');
