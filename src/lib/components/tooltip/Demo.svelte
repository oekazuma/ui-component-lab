<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { button: 'Copy link', tip: 'Copies this page’s address to the clipboard' },
		ja: { button: 'リンクをコピー', tip: 'このページのアドレスをクリップボードにコピーします' }
	};

	const uid = $props.id();
	let visible = $state(false);
</script>

<!-- APG Tooltip（作業中のパターン）: フォーカスかホバーで表示し、Esc で消す。ツールチップ自体はフォーカスを受けない -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	class="wrap"
	onmouseenter={() => (visible = true)}
	onmouseleave={() => (visible = false)}
	onfocusin={() => (visible = true)}
	onfocusout={() => (visible = false)}
	onkeydown={(e) => e.key === 'Escape' && (visible = false)}
>
	<button type="button" class="btn" aria-describedby="{uid}-tip">{text[lang].button}</button>
	<span id="{uid}-tip" role="tooltip" class:visible>{text[lang].tip}</span>
</span>

<style>
	.wrap {
		position: relative;
		display: inline-block;
	}

	[role='tooltip'] {
		position: absolute;
		bottom: calc(100% + 0.4rem);
		left: 50%;
		z-index: 1;
		width: max-content;
		max-width: 14rem;
		padding: 0.3em 0.6em;
		border-radius: 4px;
		background: var(--color-text);
		color: var(--color-bg);
		font-size: 0.8125rem;
		line-height: 1.4;
		text-align: center;
		opacity: 0;
		visibility: hidden;
		translate: -50% 0;
		transition:
			opacity 0.1s,
			visibility 0s 0.1s;
	}

	/* 表示は少し遅らせ、消すときはすぐ消す */
	[role='tooltip'].visible {
		opacity: 1;
		visibility: visible;
		transition:
			opacity 0.15s 0.3s,
			visibility 0s 0.3s;
	}

	@media (prefers-reduced-motion: reduce) {
		[role='tooltip'],
		[role='tooltip'].visible {
			transition: none;
		}
	}
</style>
