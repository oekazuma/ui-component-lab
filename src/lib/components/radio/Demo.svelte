<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { legend: 'Delivery', options: ['Standard (3–5 days)', 'Express (1–2 days)', 'Pick up in store'] },
		ja: { legend: '配送方法', options: ['通常配送（3〜5日）', 'お急ぎ便（1〜2日）', '店舗で受け取り'] }
	};

	const uid = $props.id();
	let selected = $state(0);
</script>

<!-- 同じ name を持つネイティブのラジオボタンは、矢印キーでの移動と選択をブラウザが受け持つ -->
<fieldset>
	<legend>{text[lang].legend}</legend>
	{#each text[lang].options as option, i (option)}
		<label><input type="radio" name="{uid}-delivery" value={i} bind:group={selected} />{option}</label>
	{/each}
</fieldset>

<style>
	fieldset {
		display: grid;
		gap: 0.25rem;
		margin: 0;
		padding: 0;
		border: 0;
	}

	legend {
		margin-bottom: 0.25rem;
		padding: 0;
		font-size: 0.875rem;
	}

	label {
		display: flex;
		align-items: center;
		gap: 0.4em;
		cursor: pointer;
	}

	input {
		width: 1.1em;
		height: 1.1em;
		margin: 0;
		accent-color: var(--color-accent);
	}
</style>
