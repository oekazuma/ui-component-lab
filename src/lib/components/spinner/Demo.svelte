<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { button: 'Load comments', loading: 'Loading…', done: '3 comments loaded' },
		ja: { button: 'コメントを読み込む', loading: '読み込み中…', done: 'コメントを3件読み込みました' }
	};

	let status = $state<'idle' | 'loading' | 'done'>('idle');
	let timer: ReturnType<typeof setTimeout>;

	function load() {
		status = 'loading';
		clearTimeout(timer);
		timer = setTimeout(() => (status = 'done'), 2000);
	}

	$effect(() => () => clearTimeout(timer));
</script>

<div class="demo">
	<button type="button" class="btn" onclick={load}>{text[lang].button}</button>
	<!-- 回転する図形は飾りとして隠し、状態は role="status" の文で伝える -->
	<p role="status">
		{#if status === 'loading'}
			<span class="spinner" aria-hidden="true"></span>{text[lang].loading}
		{:else if status === 'done'}
			{text[lang].done}
		{/if}
	</p>
</div>

<style>
	.demo {
		display: grid;
		justify-items: center;
		gap: 0.75rem;
	}

	p {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		min-height: 1.75rem;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	.spinner {
		width: 1.5rem;
		height: 1.5rem;
		border: 3px solid var(--color-border);
		border-top-color: var(--color-accent);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			rotate: 1turn;
		}
	}

	/* 動きを減らす設定では、回転をゆっくりにする */
	@media (prefers-reduced-motion: reduce) {
		.spinner {
			animation-duration: 3s;
		}
	}
</style>
