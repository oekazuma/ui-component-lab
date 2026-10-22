<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { button: 'Save', type: 'Error: ', alert: 'Could not save. Check your connection and try again.' },
		ja: { button: '保存', type: 'エラー：', alert: '保存できませんでした。通信状況を確認して、もう一度お試しください。' }
	};
</script>

<!-- 一覧のサムネイル専用の、保存に失敗してアラートが出ている状態の絵。操作はしないので、状態もイベントも持たない -->
<div class="wrap" data-preview>
	<span class="btn">{text[lang].button}</span>
	<p>
		<svg width="20" height="20" viewBox="0 0 24 24">
			<path d="M8.25 21 3 15.75v-7.5L8.25 3h7.5L21 8.25v7.5L15.75 21h-7.5Z" fill="var(--color-danger)" />
			<path
				d="m12 13.4-2.85 2.85-1.4-1.4L10.6 12 7.75 9.15l1.4-1.4L12 10.6l2.85-2.85 1.4 1.4L13.4 12l2.85 2.85-1.4 1.4L12 13.4Z"
				fill="var(--color-danger-surface)"
			/>
		</svg>
		<span><strong>{text[lang].type}</strong>{text[lang].alert}</span>
	</p>
</div>

<style>
	.wrap {
		display: grid;
		justify-items: center;
		gap: 0.75rem;
		width: min(100%, 20rem);
	}

	p {
		display: flex;
		align-items: flex-start;
		gap: 0.4em;
		margin: 0;
		padding: 0.6em 0.9em;
		border: 1px solid var(--color-danger);
		border-left-width: 4px;
		border-radius: var(--radius);
		background: var(--color-danger-surface);
		color: var(--color-danger-on-surface);
		font-size: 0.9375rem;
	}

	svg {
		flex: none;
		margin-top: 0.15em;
	}
</style>
