<script lang="ts">
	import { resolve } from '$app/paths';
	import CodeText from '#lib/CodeText.svelte';
	import ExternalLink from '#lib/ExternalLink.svelte';
	import { t } from '#lib/i18n.js';
	import { componentPath, homePath } from '#lib/paths.js';
	import type { PageProps } from './$types';

	let { params }: PageProps = $props();
	let lang = $derived(params.lang);
	let ui = $derived(t(lang));

	const repo = 'https://github.com/oekazuma/ui-component-lab';

	const text = {
		en: {
			finds: 'What it finds',
			findings: [
				{ id: 'select', kind: 'Choice of component', text: 'A dozen radio buttons where a select fits better' },
				{ id: 'checkbox', kind: 'Deceptive pattern', text: 'A newsletter checkbox that starts checked' },
				{ id: 'menu', kind: 'Keyboard', text: 'A menu that opens but cannot be reached with the arrow keys' }
			],
			needs: 'What you need',
			needList: [
				'An AI agent that supports Agent Skills, such as Claude Code.',
				'The repository that holds your site’s source. Plans name the files and lines to change.',
				'A way for the agent to open and operate pages, such as Playwright or a browser extension the agent can drive.',
				'For `--issues`, the GitHub CLI (`gh`), signed in.'
			],
			try: 'Try it',
			install: 'Install it in the repository that holds your site’s source.',
			local: 'Pass the URLs of pages on your running development server. This is the usual way: the components can be operated there.',
			live: 'For a quick look, a live URL works too. If the repository is its source, the skill starts your development server and checks there instead.',
			commands: 'Ways to call it',
			rows: [
				{
					code: '/improve-ui-components <URL> [<URL> ...]',
					text: 'Checks the pages you pass and shows a table of findings. The ones you pick become plans in `plans/`. The URLs can be local (`localhost`) or live.'
				},
				{
					code: '/improve-ui-components --issues <URL>',
					text: 'Does the same, then also files each plan as a GitHub issue. It shows the titles and asks before filing, and warns first when the repository is public.'
				},
				{
					code: '/improve-ui-components plan <what to fix>',
					text: 'Skips the check and writes one plan, for when you already know what to change.'
				}
			],
			flow: 'What happens',
			flowSteps: [
				'It reads your repository (framework, where components live, test commands) and loads this guide’s knowledge (`components.json`). Given a live URL whose source is here, it starts your development server.',
				'For each component on the page, it checks the choice of component, misuses and deceptive patterns, and keyboard behavior.',
				'It shows the findings in a table, most worthwhile first, with deceptive patterns at the top, and asks which ones to plan. Without an answer, it plans about five, deceptive patterns included.',
				'For each chosen finding, it writes a plan in `plans/`: where on the page and in the source, the evidence, the steps, and how to check the fix.',
				'With `--issues`, it also files each plan as a GitHub issue.'
			],
			results: 'Using the results',
			resultList: [
				'`plans/README.md` lists the plans in the order to do them.',
				'Each plan is written so that another agent with no context can carry it out: ask it to run `plans/001-….md`. The improve skill’s `execute` can run them as they are.',
				'After the fix, check it with the keys and expected results at the end of the plan, and with your test commands.',
				'The skill does not change your source, so you can read the plans before deciding what to fix.'
			],
			safe: 'It never operates your live site',
			rules: [
				'On the live site it only reads the page and moves focus. It never submits, buys, deletes, saves, changes a value or signs in.',
				'Changing values and pressing buttons happen only on your development server, and only when everything the page sends stays on your machine.',
				'It does not change your source code. The only files it writes are the plans in `plans/`.',
				'Pages behind a login are checked only in a browser you have signed in to and let the agent use. It never asks for a password.',
				'It checks only the pages you pass. It does not crawl the site.'
			],
			source: 'Source of the skill',
			data: 'Data it reads (components.json)'
		},
		ja: {
			finds: '見つけるもの',
			findings: [
				{ id: 'select', kind: '部品の選び方', text: '12個のラジオボタン。セレクトのほうが向いている' },
				{ id: 'checkbox', kind: 'ディセプティブパターン', text: '最初からオンになっているメール配信のチェックボックス' },
				{ id: 'menu', kind: 'キー操作', text: '開いても矢印キーで項目に移れないメニュー' }
			],
			needs: '必要なもの',
			needList: [
				'Agent Skills に対応した AI エージェント（Claude Code など）。',
				'自分のサイトのソースがあるリポジトリ。計画には、直すファイルと行が書かれる。',
				'エージェントがページを開いて操作するための道具（Playwright や、エージェントが動かせるブラウザの拡張機能など）。',
				'`--issues` を使うときは、ログイン済みの GitHub CLI（`gh`）。'
			],
			try: 'すぐに試す',
			install: '自分のサイトのソースがあるリポジトリに入れる。',
			local: '動かしている開発サーバーのページの URL を渡す。ふだんはこの使い方がよい。手元なら部品を実際に操作して確かめられる。',
			live: '軽く見るだけなら、本番の URL でもよい。リポジトリがそのページのソースなら、スキルが開発サーバーを立ち上げ、手元で点検する。',
			commands: '呼び出し方',
			rows: [
				{
					code: '/improve-ui-components <URL> [<URL> ...]',
					text: '渡したページを点検し、指摘の一覧を出す。選んだ指摘は `plans/` に計画として書く。URL は手元（`localhost`）でも本番でもよい。'
				},
				{
					code: '/improve-ui-components --issues <URL>',
					text: '上と同じことをしたあと、計画を GitHub の issue にもする。作る前に題名の一覧を見せて確かめ、公開リポジトリなら誰でも読めることを先に知らせる。'
				},
				{
					code: '/improve-ui-components plan <直したいこと>',
					text: '点検を省き、直すことが決まっているときに計画を1つだけ書く。'
				}
			],
			flow: '実行の流れ',
			flowSteps: [
				'リポジトリの技術（フレームワーク、部品の置き場所、テストのコマンド）を調べ、このサイトの知見（`components.json`）を読み込む。本番の URL を渡され、ソースがこのリポジトリにあれば、開発サーバーを立ち上げる。',
				'ページの部品ごとに、部品の選び方、避けたい使い方とディセプティブパターン、キー操作を確かめる。',
				'指摘を効果の大きい順に表で見せ、どれを計画にするかを聞く。ディセプティブパターンは先頭に出る。答えがなければ、ディセプティブパターンを含めて5件ほどを計画にする。',
				'選んだ指摘ごとに、ページとソースのどこを直すか、根拠、手順、直したあとの確かめ方を書いた計画を `plans/` に置く。',
				'`--issues` を付けたときは、計画を GitHub の issue にもする。'
			],
			results: '結果の使い方',
			resultList: [
				'`plans/README.md` に、計画の一覧と進める順番がある。',
				'計画は、何も知らない別のエージェントでも進められるように書かれている。「`plans/001-….md` を実行して」と頼めばよい。improve スキルの `execute` でもそのまま扱える。',
				'直したら、計画の最後にある確かめ方（押すキーと、起きるべきこと）と、テストのコマンドで確かめる。',
				'スキルはソースを書き換えないので、計画を読んでから、どれを直すかを決められる。'
			],
			safe: '本番のサイトでは操作しない',
			rules: [
				'本番のページでは、読むこととフォーカスを動かすことだけをする。送信、購入、削除、保存、値の変更、ログインはしない。',
				'値を変えたりボタンを押したりして確かめるのは、開発サーバーの上だけ。それも、ページの送り先がそのマシンの中だけだと確かめられたときに限る。',
				'ソースコードは書き換えない。書くのは `plans/` の計画だけ。',
				'ログインが要るページは、利用者が自分でログインしたブラウザを、使ってよいと言われたときだけ点検する。パスワードは求めない。',
				'点検するのは渡したページだけ。サイトをたどって回らない。'
			],
			source: 'スキルのソース',
			data: 'スキルが読むデータ（components.json）'
		}
	};
	let x = $derived(text[lang]);
</script>

<p class="back">
	<a href={homePath(lang)}>← {ui.backToList}</a>
</p>

<h1>{ui.skill}</h1>
<p class="lead">{ui.skillLead}</p>

<section aria-labelledby="finds">
	<h2 id="finds">{x.finds}</h2>
	<ul class="findings">
		{#each x.findings as f (f.id)}
			<li>
				<span class="kind">{f.kind}</span>
				<a href={componentPath(lang, f.id)}>{f.text}</a>
			</li>
		{/each}
	</ul>
</section>

<section aria-labelledby="needs">
	<h2 id="needs">{x.needs}</h2>
	<ul class="list">
		{#each x.needList as item, i (i)}
			<li><CodeText text={item} /></li>
		{/each}
	</ul>
</section>

<section aria-labelledby="try">
	<h2 id="try">{x.try}</h2>
	<ol class="steps">
		<li>
			<p>{x.install}</p>
			<pre><code>npx skills add oekazuma/ui-component-lab</code></pre>
		</li>
		<li>
			<p>{x.local}</p>
			<pre><code>/improve-ui-components http://localhost:5173/signup</code></pre>
			<p>{x.live}</p>
			<pre><code>/improve-ui-components https://example.com/signup</code></pre>
		</li>
	</ol>
</section>

<section aria-labelledby="commands">
	<h2 id="commands">{x.commands}</h2>
	<dl class="commands">
		{#each x.rows as row (row.code)}
			<dt><code>{row.code}</code></dt>
			<dd><CodeText text={row.text} /></dd>
		{/each}
	</dl>
</section>

<section aria-labelledby="flow">
	<h2 id="flow">{x.flow}</h2>
	<ol class="list">
		{#each x.flowSteps as step, i (i)}
			<li><CodeText text={step} /></li>
		{/each}
	</ol>
</section>

<section aria-labelledby="results">
	<h2 id="results">{x.results}</h2>
	<ul class="list">
		{#each x.resultList as item, i (i)}
			<li><CodeText text={item} /></li>
		{/each}
	</ul>
</section>

<section aria-labelledby="safe">
	<h2 id="safe">{x.safe}</h2>
	<ul class="list">
		{#each x.rules as rule, i (i)}
			<li><CodeText text={rule} /></li>
		{/each}
	</ul>
</section>

<ul class="more">
	<li><ExternalLink href="{repo}/tree/main/skills/improve-ui-components" text={x.source} label={ui.external} /></li>
	<li><a href={resolve('/components.json')}>{x.data}</a></li>
</ul>

<style>
	.back {
		margin: 0 0 1rem;
		font-size: 0.9375rem;
	}

	.lead {
		max-width: 48rem;
		color: var(--color-muted);
	}

	section {
		max-width: 48rem;
		margin-bottom: 2rem;
	}

	h2 {
		margin: 0 0 0.75rem;
		font-size: 1.125rem;
	}

	.steps {
		display: grid;
		gap: 1rem;
		margin: 0;
		padding-left: 1.5rem;
	}

	/* グリッドの項目は既定で中身より縮まないため、長いコマンドの pre がページごと横に広げてしまう */
	.steps li {
		min-width: 0;
	}

	.steps p {
		margin: 0 0 0.5rem;
	}

	/* 長いコマンドは折り返さず、枠の中だけで横にスクロールさせる */
	pre {
		margin: 0 0 0.75rem;
		padding: 0.75rem 1rem;
		border-radius: 8px;
		background: var(--color-surface);
		overflow-x: auto;
	}

	pre code {
		padding: 0;
		background: none;
		overflow-wrap: normal;
	}

	.findings {
		display: grid;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.kind {
		display: block;
		color: var(--color-muted);
		font-size: 0.8125rem;
	}

	.list {
		display: grid;
		gap: 0.5rem;
		margin: 0;
		padding-left: 1.25rem;
	}

	.commands {
		margin: 0;
	}

	.commands dt {
		margin-top: 1rem;
	}

	.commands dt:first-child {
		margin-top: 0;
	}

	/* コマンドは単語の途中で折り返さず、空白の位置でだけ折り返す */
	.commands code {
		overflow-wrap: normal;
	}

	.commands dd {
		margin: 0.375rem 0 0;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--color-border);
	}

	.more {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: 0.9375rem;
	}
</style>
