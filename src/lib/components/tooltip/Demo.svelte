<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { button: 'Copy link', tip: 'Copies this page’s address to the clipboard' },
		ja: { button: 'リンクをコピー', tip: 'このページのアドレスをクリップボードにコピーします' }
	};

	const uid = $props.id();
	// ホバーとフォーカスを別々に持ち、どちらかが続いている間は出しておく（WCAG 1.4.13 Persistent）
	let hovered = $state(false);
	let focused = $state(false);
	let visible = $derived(hovered || focused);

	// ホバーで出たときはフォーカスが別の場所にあるため、表示中だけ document で Esc を受ける（WCAG 1.4.13）
	$effect(() => {
		if (!visible) return;
		const onkeydown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') hovered = focused = false;
		};
		document.addEventListener('keydown', onkeydown);
		return () => document.removeEventListener('keydown', onkeydown);
	});
</script>

<!-- APG Tooltip（作業中のパターン）: フォーカスかホバーで表示し、Esc で消す。ツールチップ自体はフォーカスを受けない -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	class="wrap"
	onmouseenter={() => (hovered = true)}
	onmouseleave={() => (hovered = false)}
	onfocusin={() => (focused = true)}
	onfocusout={() => (focused = false)}
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
		font-size: 0.875rem;
		line-height: 1.4;
		text-align: center;
		opacity: 0;
		visibility: hidden;
		translate: -50% 0;
		transition:
			opacity 0.1s,
			visibility 0s 0.1s;
	}

	/* ボタンとの隙間を透明な帯で埋める。ポインターが隙間を通っても .wrap の中にいる扱いになり、ツールチップへ移れる（WCAG 1.4.13 Hoverable） */
	[role='tooltip']::after {
		content: '';
		position: absolute;
		top: 100%;
		right: 0;
		left: 0;
		height: 0.4rem;
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
