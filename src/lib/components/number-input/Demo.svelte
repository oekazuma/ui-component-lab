<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { label: 'Quantity', hint: '1 to 10' },
		ja: { label: '数量', hint: '1〜10' }
	};

	const uid = $props.id();
	let value = $state(1);
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
		aria-describedby="{uid}-hint"
		bind:value
	/>
	<p id="{uid}-hint">{text[lang].hint}</p>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.25rem;
		width: 8rem;
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

	input:invalid {
		border-color: var(--color-danger);
	}

	p {
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
