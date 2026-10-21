<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			button: 'Open the comments page',
			loading: 'Loading…',
			done: '3 comments loaded',
			comments: ['Thanks, this was easy to follow.', 'Is there a version for phones?', 'Step 2 took me a while to find.']
		},
		ja: {
			button: 'コメントのページを開く',
			loading: '読み込み中…',
			done: 'コメントを3件読み込みました',
			comments: ['分かりやすい説明でした。', 'スマートフォン向けの案内はありますか。', '手順2の場所が分かりにくかったです。']
		}
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
	<!-- 枠を 1 つの画面に見立て、画面全体が読み込み中のときだけ回す。一部の領域の読み込みなら、回さない表示にする -->
	<div class="screen">
		<!-- 回転する図形は飾りとして隠し、状態は role="status" の文で伝える -->
		<p role="status" class:loading={status === 'loading'}>
			{#if status === 'loading'}
				<span class="spinner" aria-hidden="true"></span>{text[lang].loading}
			{:else if status === 'done'}
				{text[lang].done}
			{/if}
		</p>
		{#if status === 'done'}
			<ul>
				{#each text[lang].comments as comment (comment)}
					<li>{comment}</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style>
	.demo {
		display: grid;
		justify-items: center;
		gap: 0.75rem;
		width: min(100%, 20rem);
	}

	.screen {
		display: grid;
		align-content: start;
		gap: 0.5rem;
		width: 100%;
		min-height: 8rem;
		padding: 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	p {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	p.loading {
		flex-direction: column;
		justify-content: center;
		min-height: 6.5rem;
	}

	ul {
		display: grid;
		gap: 0.25rem;
		margin: 0;
		padding-left: 1.25em;
		font-size: 0.9375rem;
	}

	.spinner {
		width: 2rem;
		height: 2rem;
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

	/* 動きを減らす設定では回転を止める（DADS の実装と同じ）。読み込み中であることは文で伝わる */
	@media (prefers-reduced-motion: reduce) {
		.spinner {
			animation: none;
		}
	}
</style>
