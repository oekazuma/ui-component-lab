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
</div>

<ul class="grid">
	{#each shown as { data, demo } (data.id)}
		<li class="card">
			<DemoFrame {demo} {lang} label="{ui.demo}: {data.names[lang]}" />
			<h2>
				{data.names.en}
				{#if lang === 'ja'}<span class="sub">{data.names.ja}</span>{/if}
			</h2>
			<p class="summary">{data.summary[lang]}</p>
			{#if data.aliases.length}
				<ul class="aliases" aria-label={ui.aliases}>
					{#each data.aliases as alias (alias.name + alias.source)}
						<li>{alias.name}</li>
					{/each}
				</ul>
			{/if}
			<a class="more" href={componentPath(lang, data.id)}>
				{ui.details}<span class="visually-hidden">: {data.names[lang]}</span>
			</a>
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

	.chip {
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

	h2 {
		margin: 0.25rem 0 0;
		font-size: 1.125rem;
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
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.aliases li {
		padding: 0 0.5em;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	.more {
		margin-top: auto;
		font-size: 0.9375rem;
	}
</style>
