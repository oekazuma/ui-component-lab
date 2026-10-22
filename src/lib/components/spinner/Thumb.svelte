<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { button: 'Open the comments page', loading: 'Loading…' },
		ja: { button: 'コメントのページを開く', loading: '読み込み中…' }
	};
</script>

<!-- 一覧のサムネイル専用の、読み込み中の状態の絵。たくさんのサムネイルが同時に回らないよう、輪は止めて描く -->
<div class="wrap" data-preview>
	<span class="btn">{text[lang].button}</span>
	<div class="screen">
		<p>
			<span class="spinner"></span>{text[lang].loading}
		</p>
	</div>
</div>

<style>
	.wrap {
		display: grid;
		justify-items: center;
		gap: 0.75rem;
		width: min(100%, 20rem);
	}

	.screen {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	p {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		min-height: 6.5rem;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	.spinner {
		width: 2rem;
		height: 2rem;
		border: 3px solid var(--color-border);
		border-top-color: var(--color-accent);
		border-radius: 50%;
	}
</style>
