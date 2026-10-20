<script lang="ts">
	import ActionMenu from '#lib/ActionMenu.svelte';
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { trigger: 'Actions', items: ['Rename', 'Duplicate', 'Move to trash'], chosen: 'Chosen:' },
		ja: { trigger: '操作', items: ['名前を変更', '複製', 'ゴミ箱に移動'], chosen: '選んだ操作:' }
	};

	let chosen = $state('');
</script>

<div class="demo">
	<ActionMenu items={text[lang].items} onselect={(item) => (chosen = item)}>
		{#snippet trigger()}
			{text[lang].trigger} <span aria-hidden="true">▾</span>
		{/snippet}
	</ActionMenu>
	<p role="status">{chosen ? `${text[lang].chosen} ${chosen}` : ''}</p>
</div>

<style>
	.demo {
		display: grid;
		justify-items: center;
		gap: 0.5rem;
	}

	p {
		min-height: 1.6em;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
