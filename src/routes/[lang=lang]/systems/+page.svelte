<script lang="ts">
	import { componentPath, homePath } from '#lib/paths.js';
	import { t } from '#lib/i18n.js';
	import { entries } from '#lib/registry.js';
	import type { PageProps } from './$types';

	let { params }: PageProps = $props();
	let lang = $derived(params.lang);
	let ui = $derived(t(lang));

	// 別名をデザインシステムごとにまとめる。件数の多い順、同数なら名前順
	let systems = $derived(
		Object.entries(
			Object.groupBy(
				entries.flatMap(({ data }) => data.aliases.map((alias) => ({ alias, data }))),
				({ alias }) => alias.source
			)
		)
			.map(([name, rows]) => ({
				name,
				rows: rows!.toSorted((a, b) => a.data.names[lang].localeCompare(b.data.names[lang], lang))
			}))
			.toSorted((a, b) => b.rows.length - a.rows.length || a.name.localeCompare(b.name))
	);
</script>

<p class="back">
	<a href={homePath(lang)}>← {ui.backToList}</a>
</p>

<h1>{ui.systems}</h1>
<p class="lead">{ui.systemsLead}</p>

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
						<td>
							<a href={alias.url}>
								{alias.name}<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
									<path d="M4.5 2.5h5v5M9.5 2.5 3 9" />
								</svg><span class="visually-hidden">（{ui.external}）</span>
							</a>
						</td>
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

	svg {
		margin-left: 0.2em;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
		stroke-linecap: round;
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
</style>
