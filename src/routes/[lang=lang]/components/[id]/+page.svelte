<script lang="ts">
	import { componentPath, homePath } from '#lib/paths.js';
	import CodeText from '#lib/CodeText.svelte';
	import DemoFrame from '#lib/DemoFrame.svelte';
	import ExternalLink from '#lib/ExternalLink.svelte';
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

	// 画面の上 3 割に入った見出しを「今読んでいる節」とする。
	// ponytail: 上へ戻るときは見出しが上端の帯に入るまで前の節のまま。気になるなら見出しの位置をスクロールごとに比べる
	let current = $state('');
	// 最後の節の見出しは、ページの終わりまでスクロールしても上の帯に届かないことがある。本文の終わりが見えたら最後の節とする
	let atEnd = $state(false);
	let end: HTMLElement;
	let shown = $derived(atEnd ? toc.at(-1) : current);
	$effect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) current = e.target.id;
			},
			{ rootMargin: '0px 0px -70% 0px' }
		);
		for (const id of toc) {
			const heading = document.getElementById(id);
			if (heading) observer.observe(heading);
		}
		const endObserver = new IntersectionObserver(([e]) => (atEnd = e.isIntersecting));
		endObserver.observe(end);
		return () => {
			observer.disconnect();
			endObserver.disconnect();
		};
	});
</script>

{#snippet tocLinks()}
	<ul>
		{#each toc as id (id)}
			<li><a href="#{id}" aria-current={id === shown ? 'location' : undefined}>{ui[id]}</a></li>
		{/each}
	</ul>
{/snippet}

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
		{@render tocLinks()}
	</nav>

	<div class="content">
		<section aria-labelledby="demo">
			<h2 id="demo" class="visually-hidden">{ui.demo}</h2>
			<DemoFrame {demo} {lang} label="{ui.demo}: {data.names[lang]}" />
		</section>

		<!-- 狭い画面では右の目次を出さないので、デモの下に開閉式で置く -->
		<details class="toc-mobile">
			<summary>{ui.toc}</summary>
			{@render tocLinks()}
		</details>

		{#if data.aliases.length}
			<section aria-labelledby="aliases">
				<h2 id="aliases">{ui.aliases}</h2>
				<ul>
					{#each data.aliases as alias (alias.name + alias.source)}
						<li><strong>{alias.name}</strong> — <ExternalLink href={alias.url} text={alias.source} label={ui.external} /></li>
					{/each}
				</ul>
			</section>
		{/if}

		<section aria-labelledby="appearance">
			<h2 id="appearance">{ui.appearance}</h2>
			<p><CodeText text={data.appearance[lang]} /></p>
		</section>

		{#if data.variations?.length}
			<section aria-labelledby="variations">
				<h2 id="variations">{ui.variations}</h2>
				<dl>
					{#each data.variations as v (v.name.en)}
						<dt><CodeText text={v.name[lang]} /></dt>
						<dd><CodeText text={v.description[lang]} /></dd>
					{/each}
				</dl>
			</section>
		{/if}

		<section aria-labelledby="behavior">
			<h2 id="behavior">{ui.behavior}</h2>
			<ul>
				{#each data.behavior as b (b.en)}
					<li><CodeText text={b[lang]} /></li>
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
						<tr><td>{#if k.key === '—'}—{:else}<kbd>{k.key}</kbd>{/if}</td><td><CodeText text={k.action[lang]} /></td></tr>
					{/each}
				</tbody>
			</table>
		</section>

		{#if data.usage?.length}
			<section aria-labelledby="usage">
				<h2 id="usage">{ui.usage}</h2>
				<ul>
					{#each data.usage as u (u.en)}
						<li><CodeText text={u[lang]} /></li>
					{/each}
				</ul>
			</section>
		{/if}

		{#if data.misuse?.length}
			<section aria-labelledby="misuse">
				<h2 id="misuse">{ui.misuse}</h2>
				<ul class="misuse">
					{#each data.misuse as m (m.pattern.en)}
						<!-- 避けたい使い方（赤）と代わりの方法（緑）を色と記号の両方で分け、どちらの話かを一目で分かるようにする -->
						<li>
							<h3>
								<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" /></svg>
								<span>
									<CodeText text={m.pattern[lang]} />
									{#if m.deceptive}<span class="deceptive">{ui.deceptive}</span>{/if}
								</span>
							</h3>
							<dl>
								<div class="harm">
									<dt>{ui.harm}</dt>
									<dd><CodeText text={m.harm[lang]} /></dd>
								</div>
								<div class="instead">
									<dt>
										<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8.5l3.5 3.5L13 4.5" /></svg>
										{ui.instead}
									</dt>
									<dd><CodeText text={m.instead[lang]} /></dd>
								</div>
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
							<CodeText text={r.diff[lang]} />
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
						<ExternalLink href={s.url} text={s.label} label={ui.external} />
						<span class="checked">({ui.checkedAt}: <time datetime={s.checkedAt}>{s.checkedAt}</time>)</span>
					</li>
				{/each}
			</ul>
		</section>
		<div bind:this={end}></div>
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

	.toc-mobile {
		max-width: 48rem;
		margin: -1rem 0 2rem;
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		font-size: 0.9375rem;
	}

	.toc-mobile summary {
		color: var(--color-muted);
		font-weight: 700;
		cursor: pointer;
	}

	.toc-mobile ul {
		margin-top: 0.5rem;
	}

	@media (min-width: 64rem) {
		.toc-mobile {
			display: none;
		}
	}

	.toc p {
		margin: 0 0 0.5rem;
		color: var(--color-muted);
		font-weight: 700;
	}

	.toc ul,
	.toc-mobile ul {
		display: grid;
		gap: 0.375rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.toc a,
	.toc-mobile a {
		color: inherit;
	}

	.toc a:hover,
	.toc-mobile a:hover {
		color: var(--color-accent);
	}

	.toc a[aria-current] {
		color: var(--color-accent);
		font-weight: 700;
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
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
	}

	.misuse h3 {
		display: flex;
		gap: 0.5rem;
		margin: 0;
		padding: 0.625rem 1rem;
		background: var(--color-danger-surface);
		font-size: 1.0625rem;
		line-height: 1.5;
	}

	.misuse svg {
		flex-shrink: 0;
		margin-top: 0.3em;
		fill: none;
		stroke-width: 2.25;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.misuse h3 svg {
		stroke: var(--color-danger-on-surface);
	}

	.misuse dl {
		margin: 0;
	}

	.harm,
	.instead {
		padding: 0.75rem 1rem;
	}

	.harm {
		background: var(--color-bg);
	}

	.instead {
		border-top: 1px solid var(--color-border);
		background: var(--color-success-surface);
	}

	.misuse dt {
		display: flex;
		gap: 0.375rem;
		align-items: center;
		margin-bottom: 0.125rem;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	.instead dt {
		color: var(--color-success-on-surface);
	}

	.instead dt svg {
		margin-top: 0;
		stroke: currentColor;
	}

	.misuse dd {
		margin: 0;
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

	/* 確認日は「2026-」と「10-20」に分かれると読みにくいので折り返さない */
	.checked {
		color: var(--color-muted);
		white-space: nowrap;
		font-size: 0.875rem;
	}
</style>
