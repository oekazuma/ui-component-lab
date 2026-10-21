<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { button: 'Archive message', toast: 'Message archived' },
		ja: { button: 'メッセージをアーカイブ', toast: 'メッセージをアーカイブしました' }
	};

	let shown = $state(false);
	let timer: ReturnType<typeof setTimeout>;

	function show() {
		clearTimeout(timer);
		shown = true;
		timer = setTimeout(() => (shown = false), 5000);
	}

	$effect(() => () => clearTimeout(timer));
</script>

<!-- トーストはフォーカスを受けないので window で Esc を受ける。他の部品が処理済みの Esc と IME 変換中の Esc は無視する -->
<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape' && shown && !e.defaultPrevented && !e.isComposing) shown = false;
	}}
/>

<button type="button" class="btn" onclick={show}>{text[lang].button}</button>
<!-- ライブリージョンは最初から置いておき、中身だけを差し替える（後から作ると読み上げられないことがある） -->
<div class="region" role="status" aria-atomic="true">
	{#if shown}
		<p class="toast">{text[lang].toast}</p>
	{/if}
</div>

<style>
	.region {
		position: fixed;
		bottom: 1.5rem;
		left: 50%;
		z-index: 10;
		translate: -50% 0;
	}

	.toast {
		margin: 0;
		padding: 0.6em 1.2em;
		border-radius: var(--radius);
		background: var(--color-text);
		color: var(--color-bg);
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.2);
		animation: rise 0.2s ease-out;
	}

	@keyframes rise {
		from {
			opacity: 0;
			translate: 0 0.5rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.toast {
			animation: none;
		}
	}
</style>
