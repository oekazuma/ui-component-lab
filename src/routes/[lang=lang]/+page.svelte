<script lang="ts">
	import { componentPath } from '#lib/paths.js';
	import DemoFrame from '#lib/DemoFrame.svelte';
	import { categoryNames, siteName, t } from '#lib/i18n.js';
	import { entries } from '#lib/registry.js';
	import { matches } from '#lib/search.js';
	import { categories, type Category } from '#lib/types.js';
	import type { PageProps } from './$types';

	let { params }: PageProps = $props();
	let lang = $derived(params.lang);
	let ui = $derived(t(lang));

	// ponytail: 絞り込み状態は URL に載せない（prerender のため searchParams を読めない）。共有したくなったら replaceState で同期する
	let query = $state('');
	let category = $state<Category | ''>('');
	let shown = $derived(
		entries.filter(
			({ data }) => (!category || data.category === category) && matches(data, query)
		)
	);
</script>

<svelte:head>
	<title>{siteName}</title>
	<meta name="description" content={ui.tagline} />
</svelte:head>

<h1 class="visually-hidden">{siteName}</h1>
<p class="tagline">{ui.tagline}</p>

<search class="filters">
	<label class="query">
		{ui.search}
		<input type="search" autocomplete="off" bind:value={query} />
	</label>
	<fieldset>
		<legend>{ui.category}</legend>
		<label><input type="radio" name="category" value="" bind:group={category} />{ui.all}</label>
		{#each categories as c (c)}
			<label><input type="radio" name="category" value={c} bind:group={category} />{categoryNames[c][lang]}</label>
		{/each}
	</fieldset>
	<p class="count" aria-live="polite">{shown.length ? ui.count(shown.length) : ui.noResults}</p>
</search>

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

	.filters {
		display: grid;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.query {
		display: grid;
		gap: 0.25rem;
		max-width: 24rem;
		font-size: 0.875rem;
	}

	.query input {
		padding: 0.4em 0.5em;
		border: 1px solid var(--color-muted);
		border-radius: var(--radius);
		font-size: 1rem;
	}

	fieldset {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1rem;
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 0.9375rem;
	}

	legend {
		margin-bottom: 0.25rem;
		padding: 0;
		font-size: 0.875rem;
	}

	fieldset label {
		display: inline-flex;
		align-items: center;
		gap: 0.25em;
		cursor: pointer;
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
