<script lang="ts">
	import ActionMenu from '#lib/ActionMenu.svelte';
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	// null は区切り線。取り消しにくい操作を、よく使う操作から離して最後に置く
	const text = {
		en: {
			trigger: 'Actions',
			items: ['Rename', 'Duplicate', null, 'Move to trash'],
			file: 'report.pdf',
			more: 'More options for report.pdf',
			fileItems: ['Download', 'Share', null, 'Delete'],
			chosen: 'Chosen:'
		},
		ja: {
			trigger: '操作',
			items: ['名前を変更', '複製', null, 'ゴミ箱に移動'],
			file: 'report.pdf',
			more: 'report.pdf のその他の操作',
			fileItems: ['ダウンロード', '共有', null, '削除'],
			chosen: '選んだ操作:'
		}
	};

	let chosen = $state('');
</script>

<div class="demo">
	<ActionMenu items={text[lang].items} onselect={(item) => (chosen = item)}>
		{#snippet trigger()}
			{text[lang].trigger} <span aria-hidden="true">▾</span>
		{/snippet}
	</ActionMenu>
	<!-- オーバーフローメニュー: 行の右端に置くので、メニューもボタンの右端にそろえる -->
	<div class="file">
		<span>{text[lang].file}</span>
		<ActionMenu
			class="overflow"
			label={text[lang].more}
			items={text[lang].fileItems}
			onselect={(item) => (chosen = item)}
		>
			{#snippet trigger()}
				<span aria-hidden="true">⋯</span>
			{/snippet}
		</ActionMenu>
	</div>
	<p role="status">{chosen ? `${text[lang].chosen} ${chosen}` : ''}</p>
</div>

<style>
	.demo {
		display: grid;
		justify-items: center;
		gap: 0.5rem;
		width: min(100%, 16rem);
	}

	.file {
		display: flex;
		align-items: center;
		justify-content: space-between;
		justify-self: stretch;
		padding-left: 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	.file :global(.overflow) {
		border-color: transparent;
		background: transparent;
	}

	.file :global(.overflow:hover) {
		background: var(--color-surface);
	}

	.file :global(.menu-wrap [role='menu']) {
		right: 0;
		left: auto;
	}

	p {
		min-height: 1.6em;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
