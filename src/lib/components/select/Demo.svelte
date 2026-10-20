<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { label: 'Fruit', placeholder: 'Choose one', selected: 'Selected:', options: ['Apple', 'Banana', 'Cherry', 'Grape'] },
		ja: { label: '果物', placeholder: '選んでください', selected: '選択中:', options: ['りんご', 'バナナ', 'さくらんぼ', 'ぶどう'] }
	};

	const uid = $props.id();
	let value = $state('');
</script>

<!-- ネイティブの <select> が開閉・キー操作・スクリーンリーダー対応をすべて持つ -->
<div class="demo">
	<label for="{uid}-select">{text[lang].label}</label>
	<select id="{uid}-select" bind:value>
		<option value="" disabled>{text[lang].placeholder}</option>
		{#each text[lang].options as option (option)}
			<option>{option}</option>
		{/each}
	</select>
	<p aria-live="polite">{value ? `${text[lang].selected} ${value}` : ''}</p>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.25rem;
		width: min(100%, 14rem);
	}

	label {
		font-size: 0.875rem;
	}

	select {
		padding: 0.4em 0.5em;
		border: 1px solid var(--color-muted);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	p {
		min-height: 1.6em;
		margin: 0.25rem 0 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
