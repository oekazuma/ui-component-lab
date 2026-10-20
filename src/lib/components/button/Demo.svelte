<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { idle: 'Press a button', pressed: (name: string) => `“${name}” was pressed` },
		ja: { idle: 'ボタンを押してください', pressed: (name: string) => `「${name}」が押されました` }
	};
	const variants = ['Primary', 'Secondary', 'Ghost'] as const;

	let last = $state<string>();
</script>

<div class="demo">
	<div class="row">
		{#each variants as v (v)}
			<button type="button" class={['btn', v === 'Primary' && 'btn-primary', v === 'Ghost' && 'ghost']} onclick={() => (last = v)}>
				{v}
			</button>
		{/each}
	</div>
	<p role="status">{last ? text[lang].pressed(last) : text[lang].idle}</p>
</div>

<style>
	.demo {
		text-align: center;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
	}

	.ghost {
		border-color: transparent;
		background: transparent;
		color: var(--color-accent);
	}

	p {
		margin: 0.75rem 0 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
