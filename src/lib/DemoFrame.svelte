<script lang="ts">
	import type { Component } from 'svelte';
	import { t } from './i18n';
	import type { Lang } from './types';

	let {
		demo: Demo,
		lang,
		label
	}: { demo: Component<{ lang: Lang }>; lang: Lang; label: string } = $props();

	// key を変えてデモを作り直すことで、各デモに個別のリセット処理を書かずに初期状態へ戻す。
	// 言語切替はクライアント側の遷移でデモが残るため、lang もキーに含めて前の言語の状態を捨てる
	let generation = $state(0);
</script>

<div class="frame" role="group" aria-label={label}>
	<div class="stage">
		{#key `${lang}-${generation}`}
			<Demo {lang} />
		{/key}
	</div>
	<button type="button" class="reset" onclick={() => generation++}>
		↺ {t(lang).reset}<span class="visually-hidden">: {label}</span>
	</button>
</div>

<style>
	.frame {
		position: relative;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-surface);
	}

	.stage {
		display: grid;
		place-items: center;
		min-height: 11rem;
		padding: 2.25rem 1rem 1rem;
	}

	.reset {
		position: absolute;
		top: 0.4rem;
		right: 0.4rem;
		padding: 0.1em 0.5em;
		border: 1px solid transparent;
		border-radius: var(--radius);
		background: none;
		color: var(--color-muted);
		font-size: 0.875rem;
		cursor: pointer;
	}

	.reset:hover {
		border-color: var(--color-border);
		background: var(--color-bg);
	}
</style>
