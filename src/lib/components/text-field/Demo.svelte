<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { label: 'Display name', hint: 'Shown on your profile. Up to 20 characters.' },
		ja: { label: '表示名', hint: 'プロフィールに表示されます。20文字まで。' }
	};

	const uid = $props.id();
	let value = $state('');
</script>

<!-- ラベルは placeholder ではなく常に見える <label> で付け、補足は aria-describedby でつなぐ -->
<div class="demo">
	<label for="{uid}-input">{text[lang].label}</label>
	<input id="{uid}-input" type="text" maxlength="20" aria-describedby="{uid}-hint" bind:value />
	<p id="{uid}-hint">{text[lang].hint} <span aria-hidden="true">({value.length}/20)</span></p>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.25rem;
		width: min(100%, 16rem);
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
		margin: 0;
		color: var(--color-muted);
		font-size: 0.8125rem;
	}
</style>
