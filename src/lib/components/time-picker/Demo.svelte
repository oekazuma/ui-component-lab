<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Reservation time',
			hint: 'We take reservations from 9:00 AM to 6:00 PM (09:00 to 18:00), every 30 minutes. For example, 1:30 PM (13:30).',
			error: 'Choose a time from 9:00 AM to 6:00 PM, on the hour or half hour.',
			value: 'Value:'
		},
		ja: {
			label: '予約時刻',
			hint: '午前9:00から午後6:00（9:00から18:00）まで、30分刻みで予約できます。例）午後1:30（13:30）',
			error: '＊午前9:00から午後6:00（9:00から18:00）までの、30分刻みの時刻を入力してください。',
			value: '値:'
		}
	};

	const uid = $props.id();
	let value = $state('');
	let invalid = $state(false);
</script>

<!-- ネイティブの <input type="time">。見た目（12時間か24時間か、時・分の欄、ポップアップ）はブラウザが決め、値は常に HH:mm の24時間表記。
	min・max・step は時刻の検証に使われるが、Chromium では ↑↓ でも範囲外や刻み外の時刻になるので、文でも知らせる。
	空の欄に打ち始めた間は値が空のままで badInput になるだけなので、範囲の違反として扱わない（すでに時刻が入っているときは、1桁ごとに値が変わる）。
	bind:value を使うと value が oninput より先に更新され、範囲外の値が状態表示に一瞬出て読み上げられるので、value と invalid は oninput で一緒に更新する -->
<div class="demo">
	<label for="{uid}-time">{text[lang].label}</label>
	<p id="{uid}-hint" class="hint">{text[lang].hint}</p>
	<input
		id="{uid}-time"
		type="time"
		min="09:00"
		max="18:00"
		step="1800"
		aria-describedby={invalid ? `${uid}-error ${uid}-hint` : `${uid}-hint`}
		aria-invalid={invalid}
		oninput={(e) => {
			const v = e.currentTarget.validity;
			value = e.currentTarget.value;
			invalid = v.rangeUnderflow || v.rangeOverflow || v.stepMismatch;
		}}
	/>
	{#if invalid}
		<p id="{uid}-error" class="error">{text[lang].error}</p>
	{/if}
	<p aria-live="polite">{value && !invalid ? `${text[lang].value} ${value}` : ''}</p>
</div>

<style>
	.demo {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
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
