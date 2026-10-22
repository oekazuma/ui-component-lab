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
			try: 'Try it',
			install: 'Install it in the repository that holds your site’s source.',
			local: 'Pass the URLs of pages on your running development server. This is the usual way: the components can be operated there.',
			live: 'For a quick look, a live URL works too. If the repository is its source, the skill starts your development server and checks there instead.',
			result:
				'You get a table of findings, each with the page in this guide and the source it rests on. The ones you pick become plans in `plans/` that you or another agent can implement. Add `--issues` to file them as GitHub issues.',
			finds: 'What it finds',
			findings: [
				{ id: 'select', kind: 'Choice of component', text: 'A dozen radio buttons where a select fits better' },
				{ id: 'checkbox', kind: 'Deceptive pattern', text: 'A newsletter checkbox that starts checked' },
				{ id: 'menu', kind: 'Keyboard', text: 'A menu that opens but cannot be reached with the arrow keys' }
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
			try: 'すぐに試す',
			install: '自分のサイトのソースがあるリポジトリに入れる。',
			local: '動かしている開発サーバーのページの URL を渡す。ふだんはこの使い方がよい。手元なら部品を実際に操作して確かめられる。',
			live: '軽く見るだけなら、本番の URL でもよい。リポジトリがそのソースなら、スキルが開発サーバーを立ち上げ、手元で点検する。',
			result:
				'指摘の一覧が出る。どの指摘にも、このサイトのページと、その元になった出典が付く。選んだ指摘は `plans/` に計画として書かれるので、自分で直しても、別のエージェントに任せてもよい。`--issues` を付けると GitHub の issue にもなる。',
			finds: '見つけるもの',
			findings: [
				{ id: 'select', kind: '部品の選び方', text: '12個のラジオボタン。セレクトのほうが向いている' },
				{ id: 'checkbox', kind: 'ディセプティブパターン', text: '最初からオンになっているメール配信のチェックボックス' },
				{ id: 'menu', kind: 'キー操作', text: '開いても矢印キーで項目に移れないメニュー' }
			],
			safe: '本番のサイトでは操作しない',
			rules: [
				'本番のページでは、読むこととフォーカスを動かすことだけをする。送信、購入、削除、保存、値の変更、ログインはしない。',
				'値を変える操作やボタンを押す確認は、開発サーバーでだけ行う。それも、ページの送り先がそのマシンの中だけだと確かめられたときに限る。',
				'ソースコードは書き換えない。書くのは `plans/` の計画だけ。',
				'ログインが要るページは、自分でログインしたブラウザを使わせてもらえるときだけ点検する。パスワードは求めない。',
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
		<li>
			<p><CodeText text={x.result} /></p>
		</li>
	</ol>
</section>

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

<section aria-labelledby="safe">
	<h2 id="safe">{x.safe}</h2>
	<ul class="rules">
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

	.rules {
		display: grid;
		gap: 0.5rem;
		margin: 0;
		padding-left: 1.25rem;
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
