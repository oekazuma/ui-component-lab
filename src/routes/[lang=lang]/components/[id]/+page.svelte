<script lang="ts">
	import { componentPath, homePath } from '#lib/paths.js';
	import DemoFrame from '#lib/DemoFrame.svelte';
	import { categoryNames, siteName, t } from '#lib/i18n.js';
	import { getEntry } from '#lib/registry.js';
	import type { PageProps } from './$types';

	let { data: page, params }: PageProps = $props();
	let lang = $derived(params.lang);
	let { data, demo } = $derived(page.entry);
	let ui = $derived(t(lang));
	let related = $derived(
		(data.related ?? []).flatMap((r) => {
			const entry = getEntry(r.id);
			return entry ? [{ ...r, names: entry.data.names }] : [];
		})
	);
</script>

<svelte:head>
	<title>{data.names[lang]} | {siteName}</title>
	<meta name="description" content={data.summary[lang]} />
</svelte:head>

<p class="back">
	<a href={homePath(lang)}>← {ui.backToList}</a>
</p>

<header>
	<p class="category">{categoryNames[data.category][lang]}</p>
	<h1>
		{data.names.en}
		{#if lang === 'ja'}<span class="sub">{data.names.ja}</span>{/if}
	</h1>
	<p class="summary">{data.summary[lang]}</p>
</header>

<section aria-labelledby="demo">
	<h2 id="demo" class="visually-hidden">{ui.demo}</h2>
	<DemoFrame {demo} {lang} label="{ui.demo}: {data.names[lang]}" />
</section>

{#if data.aliases.length}
	<section aria-labelledby="aliases">
		<h2 id="aliases">{ui.aliases}</h2>
		<ul>
			{#each data.aliases as alias (alias.name + alias.source)}
				<li><strong>{alias.name}</strong> — <a href={alias.url}>{alias.source}</a></li>
			{/each}
		</ul>
	</section>
{/if}

<section aria-labelledby="appearance">
	<h2 id="appearance">{ui.appearance}</h2>
	<p>{data.appearance[lang]}</p>
</section>

{#if data.variations?.length}
	<section aria-labelledby="variations">
		<h2 id="variations">{ui.variations}</h2>
		<dl>
			{#each data.variations as v (v.name.en)}
				<dt>{v.name[lang]}</dt>
				<dd>{v.description[lang]}</dd>
			{/each}
		</dl>
	</section>
{/if}

<section aria-labelledby="behavior">
	<h2 id="behavior">{ui.behavior}</h2>
	<ul>
		{#each data.behavior as b (b.en)}
			<li>{b[lang]}</li>
		{/each}
	</ul>
</section>

<section aria-labelledby="keyboard">
	<h2 id="keyboard">{ui.keyboard}</h2>
	<table>
		<thead>
			<tr><th scope="col">{ui.key}</th><th scope="col">{ui.action}</th></tr>
		</thead>
		<tbody>
			{#each data.keyboard as k (k.key)}
				<tr><td>{#if k.key === '—'}—{:else}<kbd>{k.key}</kbd>{/if}</td><td>{k.action[lang]}</td></tr>
			{/each}
		</tbody>
	</table>
</section>

{#if data.usage?.length}
	<section aria-labelledby="usage">
		<h2 id="usage">{ui.usage}</h2>
		<ul>
			{#each data.usage as u (u.en)}
				<li>{u[lang]}</li>
			{/each}
		</ul>
	</section>
{/if}

{#if related.length}
	<section aria-labelledby="related">
		<h2 id="related">{ui.related}</h2>
		<ul>
			{#each related as r (r.id)}
				<li>
					<a href={componentPath(lang, r.id)}>{r.names[lang]}</a>:
					{r.diff[lang]}
				</li>
			{/each}
		</ul>
	</section>
{/if}

<section aria-labelledby="sources">
	<h2 id="sources">{ui.sources}</h2>
	<ul>
		{#each data.sources as s (s.url)}
			<li>
				<a href={s.url}>{s.label}</a>
				<span class="checked">({ui.checkedAt}: <time datetime={s.checkedAt}>{s.checkedAt}</time>)</span>
			</li>
		{/each}
	</ul>
</section>

<style>
	.back {
		margin: 0 0 1rem;
		font-size: 0.9375rem;
	}

	.category {
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	h1 {
		margin: 0;
	}

	.sub {
		margin-left: 0.4em;
		color: var(--color-muted);
		font-size: 1.125rem;
		font-weight: 400;
	}

	.summary {
		margin: 0.5rem 0 1.5rem;
	}

	section {
		max-width: 48rem;
		margin-bottom: 2rem;
	}

	h2 {
		margin: 0 0 0.5rem;
		font-size: 1.125rem;
	}

	dt {
		font-weight: 700;
	}

	dd {
		margin: 0 0 0.5rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		padding: 0.4rem 0.6rem;
		border-bottom: 1px solid var(--color-border);
		text-align: left;
		vertical-align: top;
	}

	kbd {
		padding: 0.05em 0.4em;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		background: var(--color-surface);
		font-size: 0.875em;
		white-space: nowrap;
	}

	.checked {
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
