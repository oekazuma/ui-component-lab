<script lang="ts">
	import { componentPath, systemsPath } from '#lib/paths.js';
	import DemoFrame from '#lib/DemoFrame.svelte';
	import { categoryNames, siteName, t } from '#lib/i18n.js';
	import { entries } from '#lib/registry.js';
	import { filter } from '#lib/filter.svelte.js';
	import { matches } from '#lib/search.js';
	import { categories } from '#lib/types.js';
	import type { PageProps } from './$types';

	let { params }: PageProps = $props();
	let lang = $derived(params.lang);
	let ui = $derived(t(lang));

	// 押したボタンは消えるので、続けて打ち直せるようヘッダーの検索欄へフォーカスを移す
	function clear() {
		filter.query = '';
		filter.category = '';
		document.getElementById('site-search')?.focus();
	}

	let shown = $derived(
		entries.filter(
			({ data }) =>
				(!filter.category || data.category === filter.category) && matches(data, filter.query)
		)
	);
</script>

<h1 class="visually-hidden">{siteName}</h1>
<p class="tagline">{ui.tagline}</p>
<p class="systems-link"><a href={systemsPath(lang)}>{ui.systems}</a></p>

<div class="filters">
	<!-- 見た目はピルだが中身はネイティブのラジオボタン。矢印キーでの移動と、選択中の読み上げはブラウザに任せる -->
	<fieldset>
		<legend class="visually-hidden">{ui.category}</legend>
		<label class="chip">
			<input class="visually-hidden" type="radio" name="category" value="" bind:group={filter.category} />{ui.all}
		</label>
		{#each categories as c (c)}
			<label class="chip">
				<input class="visually-hidden" type="radio" name="category" value={c} bind:group={filter.category} />{categoryNames[c][lang]}
			</label>
		{/each}
	</fieldset>
	<!-- 件数は画面では見せないが、絞り込みの結果を読み上げで伝えるために残す -->
	<p class="count" class:visually-hidden={shown.length} aria-live="polite">{shown.length ? ui.count(shown.length) : ui.noResults}</p>
	{#if !shown.length}
		<button type="button" class="btn" onclick={clear}>{ui.clearFilters}</button>
	{/if}
</div>

<ul class="grid">
	{#each shown as { data, demo } (data.id)}
		<li class="card">
			<DemoFrame {demo} {lang} label="{ui.demo}: {data.names[lang]}" />
			<!-- デモは操作できる部品を含むので、カード全体はリンクにしない。
				リンクは見出しに付け、::after でデモの下の文字の部分だけを押せる範囲に広げる -->
			<div class="body">
				<h2>
					<a href={componentPath(lang, data.id)}>
						{data.names.en}
						{#if lang === 'ja'}<span class="sub">{data.names.ja}</span>{/if}
					</a>
				</h2>
				<p class="summary">{data.summary[lang]}</p>
				{#if data.aliases.length}
					<p class="aliases">
						{ui.aliases}: {data.aliases.map((a) => a.name).join(lang === 'ja' ? '、' : ', ')}
					</p>
				{/if}
			</div>
		</li>
	{/each}
</ul>

<style>
	.tagline {
		margin: 0 0 1.5rem;
		color: var(--color-muted);
	}

	.systems-link {
		margin: -1rem 0 1.5rem;
	}

	.filters {
		display: grid;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	fieldset {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		border: 0;
	}

	/* 狭い画面で折り返すと 4 行になりカードが押し下げられるので、1 行にして横にスクロールさせる。
		フォーカスの線が切れないよう、上下左右に余白を取ってから負のマージンで位置を戻す */
	@media (max-width: 40rem) {
		/* fieldset は既定で中身の幅より縮まず、ページごと横にはみ出すため min-width を 0 にする */
		fieldset {
			min-width: 0;
			flex-wrap: nowrap;
			margin: -0.375rem -1rem;
			padding: 0.375rem 1rem;
			overflow-x: auto;
			scrollbar-width: none;
		}
	}

	/* 見えないラジオは絶対配置なので、ピルを基準にしてスクロールの枠の中に収める */
	.chip {
		position: relative;
		flex-shrink: 0;
		white-space: nowrap;
		padding: 0.25em 0.9em;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		background: var(--color-bg);
		font-size: 0.9375rem;
		cursor: pointer;
	}

	.chip:hover {
		background: var(--color-surface);
	}

	.chip:has(:checked) {
		border-color: var(--color-accent);
		background: var(--color-accent);
		color: var(--color-accent-text);
	}

	.chip:has(:checked):hover {
		background: var(--color-accent-hover);
	}

	/* ラジオ本体は 1px に縮めているので、フォーカスリングはピル側に出す（app.css の :focus-visible と同じ線） */
	.chip:has(:focus-visible) {
		outline: 2px solid var(--color-focus-outer);
		outline-offset: 2px;
		box-shadow: 0 0 0 2px var(--color-focus-inner);
	}

	.filters .btn {
		justify-self: start;
	}

	.count {
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
		gap: 1.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.body {
		position: relative;
		display: grid;
		flex: 1;
		align-content: start;
		gap: 0.375rem;
		margin: 0 -0.5rem;
		padding: 0.5rem;
		border-radius: var(--radius);
	}

	.body:hover {
		background: var(--color-surface);
	}

	/* リンク自体は 1 行だけなので、フォーカスの線は押せる範囲全体に出す */
	.body:has(a:focus-visible) {
		outline: 2px solid var(--color-focus-outer);
		outline-offset: 2px;
		box-shadow: 0 0 0 2px var(--color-focus-inner);
	}

	h2 {
		margin: 0;
		font-size: 1.125rem;
	}

	h2 a {
		color: inherit;
		text-decoration: none;
	}

	h2 a::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	h2 a:focus-visible {
		outline: none;
		box-shadow: none;
	}

	.body:hover h2 a {
		text-decoration: underline;
	}

	.sub {
		margin-left: 0.4em;
		color: var(--color-muted);
		font-size: 0.875rem;
		font-weight: 400;
	}

	.summary {
		margin: 0;
	}

	.aliases {
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
