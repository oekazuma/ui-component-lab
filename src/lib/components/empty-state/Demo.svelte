<script lang="ts">
	import { tick } from 'svelte';
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			title: 'No projects yet',
			body: 'Projects you create will be listed here.',
			create: 'Create sample projects',
			samples: ['Website redesign', 'Annual report', 'Team offsite'],
			filter: 'Filter projects',
			noMatch: (q: string) => `No projects match “${q}”`,
			tryAgain: 'Check the spelling, or clear the search to see all projects.',
			clear: 'Clear search',
			count: (n: number) => `${n} ${n === 1 ? 'project' : 'projects'}`
		},
		ja: {
			title: 'プロジェクトはまだありません',
			body: '作成したプロジェクトがここに並びます。',
			create: 'サンプルのプロジェクトを作成',
			samples: ['ウェブサイトの改修', '年次報告書', 'チーム合宿'],
			filter: 'プロジェクトを絞り込む',
			noMatch: (q: string) => `「${q}」に一致するプロジェクトはありません`,
			tryAgain: '文字が合っているか確かめるか、検索をクリアしてすべてのプロジェクトを表示してください。',
			clear: '検索をクリア',
			count: (n: number) => `${n}件のプロジェクト`
		}
	};

	const uid = $props.id();
	let projects = $state<string[]>([]);
	let query = $state('');
	let search = $state<HTMLInputElement>();
	let shown = $derived(projects.filter((p) => p.toLowerCase().includes(query.trim().toLowerCase())));

	// 押したボタンは空の状態ごと消えるので、次に使う検索欄へフォーカスを移す
	async function create() {
		projects = text[lang].samples;
		await tick();
		search?.focus();
	}
</script>

{#snippet empty(title: string, body: string, action: string, onclick: () => void)}
	<!-- 空の表は見出しや枠を残さず、この案内に丸ごと置き換える（Carbon） -->
	<div class="empty">
		<span class="icon" aria-hidden="true"></span>
		<h3>{title}</h3>
		<p>{body}</p>
		<button type="button" class="btn btn-primary" {onclick}>{action}</button>
	</div>
{/snippet}

<div class="demo">
	{#if !projects.length}
		{@render empty(text[lang].title, text[lang].body, text[lang].create, create)}
	{:else}
		<label for="{uid}-search">{text[lang].filter}</label>
		<input id="{uid}-search" type="search" bind:this={search} bind:value={query} />
		{#if shown.length}
			<ul>
				{#each shown as project (project)}
					<li>{project}</li>
				{/each}
			</ul>
		{:else}
			{@render empty(text[lang].noMatch(query.trim()), text[lang].tryAgain, text[lang].clear, () => {
				query = '';
				search?.focus();
			})}
		{/if}
	{/if}
	<!-- 絞り込みの結果はフォーカスを動かさずに出るので、件数や「一致なし」をステータスメッセージで伝える（WCAG 4.1.3） -->
	<p class="visually-hidden" role="status">
		{query.trim() ? (shown.length ? text[lang].count(shown.length) : text[lang].noMatch(query.trim())) : ''}
	</p>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.25rem;
		width: min(100%, 18rem);
	}

	.empty {
		display: grid;
		justify-items: start;
		gap: 0.25rem;
		padding: 1rem;
		border: 1px dashed var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	/* 飾りの絵。意味は見出しと本文で伝える */
	.icon {
		width: 2.5rem;
		height: 2rem;
		border: 2px solid var(--color-muted);
		border-top-width: 0.5rem;
		border-radius: 4px;
	}

	h3 {
		margin: 0.25rem 0 0;
		font-size: 1rem;
	}

	p {
		margin: 0 0 0.5rem;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	label {
		font-size: 0.875rem;
	}

	input {
		padding: 0.4em 0.5em;
		border: 1px solid var(--color-muted);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	ul {
		margin: 0.25rem 0 0;
		padding: 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		list-style: none;
	}

	li {
		padding: 0.4em 0.75em;
	}

	li + li {
		border-top: 1px solid var(--color-border);
	}
</style>
