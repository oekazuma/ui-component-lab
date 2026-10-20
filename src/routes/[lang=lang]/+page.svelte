<script lang="ts">
	import { componentPath } from '#lib/paths.js';
	import DemoFrame from '#lib/DemoFrame.svelte';
	import { siteName, t } from '#lib/i18n.js';
	import { entries } from '#lib/registry.js';
	import type { PageProps } from './$types';

	let { params }: PageProps = $props();
	let lang = $derived(params.lang);
</script>

<svelte:head>
	<title>{siteName}</title>
	<meta name="description" content={t(lang).tagline} />
</svelte:head>

<h1 class="visually-hidden">{siteName}</h1>
<p class="tagline">{t(lang).tagline}</p>

<ul class="grid">
	{#each entries as { data, demo } (data.id)}
		<li class="card">
			<DemoFrame {demo} {lang} label="{t(lang).demo}: {data.names[lang]}" />
			<h2>
				{data.names.en}
				{#if lang === 'ja'}<span class="sub">{data.names.ja}</span>{/if}
			</h2>
			<p class="summary">{data.summary[lang]}</p>
			{#if data.aliases.length}
				<ul class="aliases" aria-label={t(lang).aliases}>
					{#each data.aliases as alias (alias.name + alias.source)}
						<li>{alias.name}</li>
					{/each}
				</ul>
			{/if}
			<a class="more" href={componentPath(lang, data.id)}>
				{t(lang).details}<span class="visually-hidden">: {data.names[lang]}</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	.tagline {
		margin: 0 0 1.5rem;
		color: var(--color-muted);
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
		font-size: 0.8125rem;
	}

	.more {
		margin-top: auto;
		font-size: 0.9375rem;
	}
</style>
