// コメント除去の最小チェック: node src/lib/strip-comments.check.ts
import { stripComments } from './strip-comments.ts';

const input = [
	'<script lang="ts">',
	'\t// 理由のコメント',
	"\tconst url = 'https://example.com';",
	'</script>',
	'',
	'<!-- 1行のコメント -->',
	'<!-- svelte-ignore a11y_no_static_element_interactions -->',
	'<div>',
	'\t<!-- 複数行の',
	'\t     コメント -->',
	'\t<p>text</p>',
	'</div>',
	'',
	'<style>',
	'\t/* CSS のコメント */',
	'\tp { margin: 0; }',
	'</style>',
	''
].join('\n');

const expected = [
	'<script lang="ts">',
	"\tconst url = 'https://example.com';",
	'</script>',
	'',
	'<div>',
	'\t<p>text</p>',
	'</div>',
	'',
	'<style>',
	'\tp { margin: 0; }',
	'</style>',
	''
].join('\n');

const actual = stripComments(input);
if (actual !== expected) throw new Error(`unexpected output:\n${actual}`);
console.log('ok');
