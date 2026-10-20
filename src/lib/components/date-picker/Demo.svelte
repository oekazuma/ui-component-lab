<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { label: 'Check-in date', value: 'Value:' },
		ja: { label: 'チェックイン日', value: '値:' }
	};

	const uid = $props.id();
	let value = $state('');
</script>

<!-- ネイティブの <input type="date">。表示形式とカレンダーの見た目はブラウザと言語設定で変わるが、値は常に yyyy-mm-dd -->
<div class="demo">
	<label for="{uid}-date">{text[lang].label}</label>
	<input id="{uid}-date" type="date" bind:value />
	<p aria-live="polite">{value ? `${text[lang].value} ${value}` : ''}</p>
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

	input {
		padding: 0.4em 0.5em;
		border: 1px solid var(--color-muted);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	p {
		min-height: 1.6em;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
