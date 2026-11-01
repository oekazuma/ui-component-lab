<script lang="ts">
	import { componentPath, homePath } from '#lib/paths.js';
	import ExternalLink from '#lib/ExternalLink.svelte';
	import { t } from '#lib/i18n.js';
	import type { PageProps } from './$types';

	let { data: page, params }: PageProps = $props();
	let lang = $derived(params.lang);
	let ui = $derived(t(lang));

	// 別名をデザインシステムごとにまとめる。件数の多い順にすると特定のデザインシステムが先頭で目立つので、名前順にする
	let systems = $derived(
		Object.entries(
			Object.groupBy(
				page.rows.flatMap((data) => data.aliases.map((alias) => ({ alias, data }))),
				({ alias }) => alias.source
			)
		)
			.map(([name, rows]) => ({
				name,
				rows: rows!.toSorted((a, b) => a.data.names[lang].localeCompare(b.data.names[lang], lang))
			}))
			.toSorted((a, b) => a.name.localeCompare(b.name, lang))
	);
</script>

<p class="back">
	<a href={homePath(lang)}>← {ui.backToList}</a>
</p>

<h1>{ui.systems}</h1>
<p class="lead">{ui.systemsLead}</p>

<nav class="index" aria-labelledby="index">
	<h2 id="index" class="visually-hidden">{ui.systemsIndex}</h2>
	<ul>
		{#each systems as s, i (s.name)}
			<li><a href="#sys-{i}">{s.name}</a> <span class="n">{s.rows.length}</span></li>
		{/each}
	</ul>
</nav>

{#each systems as s, i (s.name)}
	<section aria-labelledby="sys-{i}">
		<h2 id="sys-{i}">{s.name}</h2>
		<table>
			<thead>
				<tr><th scope="col">{ui.nameInSystem}</th><th scope="col">{ui.componentHere}</th></tr>
			</thead>
			<tbody>
				{#each s.rows as { alias, data } (data.id + alias.name)}
					<tr>
						<td><ExternalLink href={alias.url} text={alias.name} label={ui.external} /></td>
						<td><a href={componentPath(lang, data.id)}>{data.names[lang]}</a></td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
{/each}

<style>
	.back {
		margin: 0 0 1rem;
		font-size: 0.9375rem;
	}

	.lead {
		color: var(--color-muted);
	}

	section {
		max-width: 48rem;
		margin-bottom: 2rem;
	}

	h2 {
		margin: 0 0 0.5rem;
		font-size: 1.125rem;
	}

	.index ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem 1.25rem;
		max-width: 48rem;
		margin: 0 0 2rem;
		padding: 0;
		list-style: none;
		font-size: 0.9375rem;
	}

	.n {
		color: var(--color-muted);
		font-size: 0.8125rem;
	}

	/* 表ごとに中身で列幅が変わると並べたときにがたつくので、どの表も半分ずつにする */
	table {
		table-layout: fixed;
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
</style>
