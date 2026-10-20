<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { label: 'Volume' },
		ja: { label: '音量' }
	};

	const uid = $props.id();
	let value = $state(40);
</script>

<!-- ネイティブの <input type="range"> が role="slider" と矢印キー・Home・End の操作を持つ -->
<div class="demo">
	<label for="{uid}-range">{text[lang].label}</label>
	<input id="{uid}-range" type="range" min="0" max="100" step="5" bind:value />
	<output for="{uid}-range">{value}</output>
</div>

<style>
	.demo {
		display: grid;
		grid-template-columns: auto 1fr 2.5em;
		align-items: center;
		gap: 0.5rem;
		width: min(100%, 18rem);
	}

	input {
		width: 100%;
		margin: 0;
		accent-color: var(--color-accent);
	}

	output {
		text-align: right;
		font-variant-numeric: tabular-nums;
	}
</style>
