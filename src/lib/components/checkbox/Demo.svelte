<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { legend: 'Toppings', all: 'All toppings', items: ['Cheese', 'Tomato', 'Basil'] },
		ja: { legend: 'トッピング', all: 'すべてのトッピング', items: ['チーズ', 'トマト', 'バジル'] }
	};

	let checked = $state([true, false, false]);
	let all = $derived(checked.every(Boolean));
	let some = $derived(checked.some(Boolean));
</script>

<!-- 親のチェックボックスは子の状態から決まる。一部だけ選ばれているときは indeterminate（中間状態）にする -->
<fieldset>
	<legend>{text[lang].legend}</legend>
	<label class="parent">
		<input
			type="checkbox"
			checked={all}
			indeterminate={some && !all}
			onchange={(e) => checked.fill(e.currentTarget.checked)}
		/>
		{text[lang].all}
	</label>
	{#each text[lang].items as item, i (item)}
		<label class="child"><input type="checkbox" bind:checked={checked[i]} />{item}</label>
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

	.child {
		padding-left: 1.5rem;
	}

	input {
		width: 1.1em;
		height: 1.1em;
		margin: 0;
		accent-color: var(--color-accent);
	}
</style>
