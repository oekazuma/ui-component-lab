<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { label: 'Quantity', hint: '1 to 10', error: 'Enter a whole number from 1 to 10.' },
		ja: { label: '数量', hint: '1〜10', error: '1から10までの整数を入力してください。' }
	};

	const uid = $props.id();
	let value = $state(1);
	let invalid = $state(false);
</script>

<!-- ネイティブの <input type="number"> は role="spinbutton" を持ち、↑↓ で増減できる -->
<div class="demo">
	<label for="{uid}-input">{text[lang].label}</label>
	<input
		id="{uid}-input"
		type="number"
		min="1"
		max="10"
		step="1"
		aria-describedby={invalid ? `${uid}-hint ${uid}-error` : `${uid}-hint`}
		aria-invalid={invalid}
		bind:value
		oninput={(e) => (invalid = !e.currentTarget.validity.valid)}
	/>
	<p id="{uid}-hint">{text[lang].hint}</p>
	<!-- 色だけに頼らないよう、範囲外では枠の色に加えて文で伝える（WCAG 1.4.1、3.3.1） -->
	{#if invalid}
		<p id="{uid}-error" class="error">{text[lang].error}</p>
	{/if}
</div>

<style>
	.demo {
		display: grid;
		gap: 0.25rem;
		width: min(100%, 12rem);
	}

	label {
		font-size: 0.875rem;
	}

	input {
		padding: 0.4em 0.5em;
		border: 1px solid var(--color-muted);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	input {
		width: 8rem;
	}

	input[aria-invalid='true'] {
		border-color: var(--color-danger);
	}

	p {
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	.error {
		color: var(--color-danger);
	}
</style>
