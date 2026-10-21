<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { label: 'Volume' },
		ja: { label: '音量' }
	};

	const uid = $props.id();
	const min = 0;
	const max = 100;
	let value = $state(40);
</script>

<!-- ネイティブの <input type="range"> が role="slider" と矢印キー・Home・End の操作を持つ -->
<div class="demo">
	<label for="{uid}-range">{text[lang].label}</label>
	<input id="{uid}-range" type="range" {min} {max} step="5" bind:value />
	<output for="{uid}-range">{value}</output>
	<!-- 範囲は slider の役割が aria-valuemin / aria-valuemax として伝えるので、両端の数字は見た目だけにする -->
	<div class="ends" aria-hidden="true"><span>{min}</span><span>{max}</span></div>
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

	.ends {
		display: flex;
		grid-column: 2;
		justify-content: space-between;
		margin-top: -0.5rem;
		color: var(--color-muted);
		font-size: 0.75rem;
		font-variant-numeric: tabular-nums;
	}

	output {
		text-align: right;
		font-variant-numeric: tabular-nums;
	}
</style>
