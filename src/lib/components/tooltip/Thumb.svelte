<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { button: 'Copy link', tip: 'Copies this page’s address to the clipboard' },
		ja: { button: 'リンクをコピー', tip: 'このページのアドレスをクリップボードにコピーします' }
	};
</script>

<!-- 一覧のサムネイル専用の、ツールチップが出ている状態の絵。操作はしないので、状態もイベントも持たない -->
<div class="wrap" data-preview>
	<span class="tip">{text[lang].tip}</span>
	<span class="btn">{text[lang].button}</span>
</div>

<style>
	.wrap {
		display: grid;
		justify-items: center;
		gap: 0.4rem;
		padding-top: 1rem;
	}

	.tip {
		max-width: 14rem;
		padding: 0.3em 0.6em;
		border-radius: 4px;
		background: var(--color-text);
		color: var(--color-bg);
		font-size: 0.875rem;
		line-height: 1.4;
		text-align: center;
	}
</style>
