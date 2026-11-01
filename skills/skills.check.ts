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
	if (field('license') !== 'MIT') errors.push(`${name}: frontmatter license is ${field('license')}`);
	for (const file of readdirSync(new URL(`${name}/`, dir), { recursive: true, encoding: 'utf8' }).filter((f) => f.endsWith('.md'))) {
		const base = new URL(`${name}/${file}`, dir);
		for (const ref of readFileSync(base, 'utf8').matchAll(/\]\(([\w./-]+\.md)\)/g))
			if (!existsSync(new URL(ref[1], base))) errors.push(`${name}/${file}: ${ref[1]} is referenced but missing`);
	}
}

// 本番のデータを変えない・知らない形の JSON で推測しない、という約束は本文の言い回しにしか現れない。書き直しで消えないよう、要の一文を押さえる
const root = 'improve-ui-components/';
const read = (file: string) => {
	const path = new URL(`${root}${file}`, dir);
	return existsSync(path) ? readFileSync(path, 'utf8') : '';
};
const need = (file: string, scope: string, needles: string[]) => {
	for (const needle of needles) if (!scope.includes(needle)) errors.push(`${root}${file}: missing "${needle}"`);
};

const skill = read('SKILL.md');
// 安全の約束は Hard Rules の節にあってこそ効く。ほかの節に同じ言い回しがあっても通らないよう、節を切り出して探す
const hardRules = skill.match(/^## Hard Rules\n([\s\S]*?)(?=^## |(?![\s\S]))/m)?.[1] ?? '';
if (!hardRules) errors.push('SKILL.md: section "## Hard Rules" not found');
need('SKILL.md', skill, ['https://oekazuma.github.io/ui-component-lab/components.json', '## Hard Rules', 'Hard Rules 1 to 8']);
need('SKILL.md (## Hard Rules)', hardRules, [
	'On the live site, never change anything.',
	'skip the page and say so',
	'backend is not confirmed local',
	'Prefer local:',
	'these always resolve to this machine',
	'**Never reproduce secret values**',
	'the fetched `components.json`',
	'type="button"'
]);

// version の文と「止まる」指示は同じ行に無いと、別々に残って意味が抜ける
const versionLine = skill.split('\n').find((l) => l.includes('This skill understands `version`')) ?? '';
if (!versionLine.includes('**stop** and tell the user'))
	errors.push(`${root}SKILL.md: the line with "This skill understands \`version\`" must also say "**stop** and tell the user"`);
// ComponentsJson の version を上げたのにスキルを直し忘れると、古い形を読み続けるため落とす
const typesVersion = readFileSync(new URL('../src/lib/types.ts', import.meta.url), 'utf8').match(/ComponentsJson[\s\S]*?version: (\d+);/)?.[1];
if (!typesVersion) errors.push('src/lib/types.ts: ComponentsJson version not found');
else need('SKILL.md', skill, [`understands \`version\` ${typesVersion}`]);

need('references/local-server.md', read('references/local-server.md'), ['## 3. Is the backend local?', 'server.proxy', 'predev', 'find the process that listens on it']);

if (errors.length) throw new Error(errors.join('\n'));
console.log('ok');
