<script lang="ts">
	import { componentPath, homePath } from '#lib/paths.js';
	import DemoFrame from '#lib/DemoFrame.svelte';
	import { categoryNames, t } from '#lib/i18n.js';
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
	// 目次は、このページに出ているセクションだけを並べる
	let toc = $derived(
		(
			[
				['aliases', data.aliases.length],
				['appearance', true],
				['variations', data.variations?.length],
				['behavior', true],
				['keyboard', true],
				['usage', data.usage?.length],
				['misuse', data.misuse?.length],
				['related', related.length],
				['sources', true]
			] as const
		)
			.filter(([, shown]) => shown)
			.map(([id]) => id)
	);
</script>

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

<div class="layout">
	<nav class="toc" aria-labelledby="toc">
		<p id="toc">{ui.toc}</p>
		<ul>
			{#each toc as id (id)}
				<li><a href="#{id}">{ui[id]}</a></li>
			{/each}
		</ul>
	</nav>

	<div class="content">
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

		{#if data.misuse?.length}
			<section aria-labelledby="misuse">
				<h2 id="misuse">{ui.misuse}</h2>
				<ul class="misuse">
					{#each data.misuse as m (m.pattern.en)}
						<li>
							<h3>
								{m.pattern[lang]}
								{#if m.deceptive}<span class="deceptive">{ui.deceptive}</span>{/if}
							</h3>
							<dl>
								<dt>{ui.harm}</dt>
								<dd>{m.harm[lang]}</dd>
								<dt>{ui.instead}</dt>
								<dd>{m.instead[lang]}</dd>
							</dl>
						</li>
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
	</div>
</div>

<style>
	.layout {
		display: grid;
		gap: 3rem;
	}

	/* 目次は右の余白が空く広い画面でだけ出す。狭い画面では本文の前に長い一覧が挟まるので出さない */
	.toc {
		display: none;
	}

	@media (min-width: 64rem) {
		.layout {
			grid-template-columns: minmax(0, 48rem) 12rem;
		}

		.toc {
			position: sticky;
			top: 1.5rem;
			display: block;
			grid-column: 2;
			grid-row: 1;
			align-self: start;
			padding-left: 1rem;
			border-left: 1px solid var(--color-border);
			font-size: 0.875rem;
		}
	}

	.toc p {
		margin: 0 0 0.5rem;
		color: var(--color-muted);
		font-weight: 700;
	}

	.toc ul {
		display: grid;
		gap: 0.375rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.toc a {
		color: inherit;
	}

	.toc a:hover {
		color: var(--color-accent);
	}
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
		margin-bottom: 2.5rem;
	}

	h2 {
		margin: 0 0 0.75rem;
		padding-bottom: 0.25rem;
		border-bottom: 1px solid var(--color-border);
		font-size: 1.375rem;
	}

	dt {
		font-weight: 700;
	}

	dd {
		margin: 0 0 0.5rem;
	}

	.misuse {
		display: grid;
		gap: 1rem;
		padding: 0;
		list-style: none;
	}

	.misuse li {
		padding-left: 0.75rem;
		border-left: 3px solid var(--color-border);
	}

	.misuse h3 {
		margin: 0 0 0.5rem;
		font-size: 1.0625rem;
	}

	/* 項目の見出しと同じ太字にすると階層が読み取れないので、ラベルは小さく灰色にする */
	.misuse dt {
		color: var(--color-muted);
		font-size: 0.8125rem;
	}

	.deceptive {
		margin-left: 0.4em;
		padding: 0 0.5em;
		border: 1px solid var(--color-danger);
		border-radius: 999px;
		color: var(--color-danger);
		font-size: 0.75rem;
		font-weight: 400;
		white-space: nowrap;
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

	/* 既定の等幅フォントは 13px 基準で em が効くため小さくなりすぎる。本文の書体で rem 指定にする */
	kbd {
		padding: 0.05em 0.4em;
		font-family: inherit;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		background: var(--color-surface);
		font-size: 0.875rem;
		white-space: nowrap;
	}

	.checked {
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
