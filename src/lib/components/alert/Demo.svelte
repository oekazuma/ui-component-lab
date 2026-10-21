<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { button: 'Save', alert: 'Could not save. Check your connection and try again.' },
		ja: { button: '保存', alert: '保存できませんでした。通信状況を確認して、もう一度お試しください。' }
	};

	let shown = $state(false);
</script>

<!-- role="alert" の要素は最初から置き、中身を入れた時点で読み上げさせる。フォーカスは動かさない -->
<div class="demo">
	<button type="button" class="btn" onclick={() => (shown = true)}>{text[lang].button}</button>
	<div role="alert">
		{#if shown}
			<p><span aria-hidden="true">⚠ </span>{text[lang].alert}</p>
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

	p {
		margin: 0;
		padding: 0.6em 0.9em;
		border: 1px solid var(--color-danger);
		border-left-width: 4px;
		border-radius: var(--radius);
		background: #fef3f2;
		color: #8a1c12;
		font-size: 0.9375rem;
	}
</style>
