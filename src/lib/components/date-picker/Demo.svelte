<script lang="ts">
	import { onMount } from 'svelte';
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Check-in date',
			hint: 'You can choose today or a later date. Enter the year in the Western calendar. For example, October 21, 2026.',
			error: 'Choose today or a later date.',
			value: 'Value:'
		},
		ja: {
			label: 'チェックイン日',
			hint: '今日以降の日付を選べます。西暦で入力してください。例）2026年10月21日',
			error: '＊今日以降の日付を入力してください。',
			value: '値:'
		}
	};

	const uid = $props.id();
	let value = $state('');
	let min = $state('');
	// 値も min も yyyy-mm-dd なので、文字列の大小で前後を比べられる
	let early = $derived(!!value && !!min && value < min);

	// 事前描画の時点で入れるとビルドした日が残るので、今日の日付はブラウザで入れる。
	// toISOString は UTC なので、日本時間の朝などに前日になる。手元の時刻の年月日から作る
	onMount(() => {
		const d = new Date();
		min = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
	});
</script>

<!-- ネイティブの <input type="date">。表示形式とカレンダーの見た目はブラウザと言語設定で変わるが、値は常に yyyy-mm-dd。
	min より前の日付はカレンダーでは選べないが、直接入力はできるので、文でも知らせる -->
<div class="demo">
	<label for="{uid}-date">{text[lang].label}</label>
	<p id="{uid}-hint" class="hint">{text[lang].hint}</p>
	<input
		id="{uid}-date"
		type="date"
		min={min || undefined}
		aria-describedby={early ? `${uid}-error ${uid}-hint` : `${uid}-hint`}
		aria-invalid={early}
		bind:value
	/>
	{#if early}
		<p id="{uid}-error" class="error">{text[lang].error}</p>
	{/if}
	<p aria-live="polite">{value ? `${text[lang].value} ${value}` : ''}</p>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.25rem;
		width: min(100%, 18rem);
	}

	label {
		font-size: 0.875rem;
	}

	input {
		justify-self: start;
		padding: 0.4em 0.5em;
		border: 1px solid var(--color-muted);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	input[aria-invalid='true'] {
		border-color: var(--color-danger);
	}

	p {
		min-height: 1.6em;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	.error {
		color: var(--color-danger);
	}
</style>
