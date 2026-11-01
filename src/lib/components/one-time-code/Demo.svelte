<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const length = 6;
	const text = {
		en: {
			label: 'Security code',
			hint: `Enter the ${length}-digit code from the text message. In this demo, nothing is sent, and any ${length} digits work.`,
			empty: 'Enter the security code.',
			wrong: `The code must be ${length} numbers.`,
			submit: 'Continue',
			ok: 'Code accepted'
		},
		ja: {
			label: '確認コード',
			hint: `SMS で届いた${length}桁の数字を入力してください。このデモでは何も送られず、${length}桁の数字なら何でも通ります。`,
			empty: '＊確認コードを入力してください。',
			wrong: `＊確認コードは${length}桁の数字で入力してください。`,
			submit: '次へ',
			ok: '確認できました'
		}
	};

	const uid = $props.id();
	let value = $state('');
	let submitted = $state(false);
	let ok = $state(false);
	let input: HTMLInputElement;

	// 届いたままの形で貼り付けられるよう、空白とハイフンは入力させてから取り除く。
	// 日本語入力のまま打った全角の数字や記号も通すため、先に NFKC で半角にそろえる（「ー」はハイフンのつもりで打たれる）
	let digits = $derived(value.normalize('NFKC').replace(/[\s\-ー]/g, ''));
	let error = $derived(
		!submitted ? '' : !digits ? text[lang].empty : digits.length !== length || /\D/.test(digits) ? text[lang].wrong : ''
	);
</script>

<!-- 1 つの欄にすると、貼り付けも、ブラウザによる自動入力（autocomplete="one-time-code"）もそのまま全桁が入る。
	inputmode="numeric" で数字のキーボードを出し、type="number" は使わない（先頭の 0 が消え、スクロールで値が変わる）。
	貼り付けた「123 456」が途中で切れないよう maxlength は付けない -->
<form
	class="demo"
	novalidate
	onsubmit={(e) => {
		e.preventDefault();
		submitted = true;
		ok = !error;
		if (error) input.focus();
	}}
>
	<label for="{uid}-input">{text[lang].label}</label>
	<p id="{uid}-hint" class="hint">{text[lang].hint}</p>
	<input
		id="{uid}-input"
		type="text"
		inputmode="numeric"
		autocomplete="one-time-code"
		spellcheck="false"
		aria-describedby={error ? `${uid}-error ${uid}-hint` : `${uid}-hint`}
		aria-invalid={!!error}
		bind:this={input}
		bind:value
		oninput={() => (ok = false)}
	/>
	{#if error}
		<p id="{uid}-error" class="error">{error}</p>
	{/if}
	<button type="submit" class="btn btn-primary">{text[lang].submit}</button>
	<p role="status">{ok ? text[lang].ok : ''}</p>
</form>

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
		width: 8em;
		padding: 0.4em 0.5em;
		border: 1px solid var(--color-muted);
		border-radius: var(--radius);
		background: var(--color-bg);
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.15em;
	}

	input[aria-invalid='true'] {
		border-color: var(--color-danger);
	}

	p {
		margin: 0;
		font-size: 0.875rem;
	}

	.hint {
		color: var(--color-muted);
	}

	.error {
		color: var(--color-danger);
	}

	button {
		justify-self: start;
		margin-top: 0.5rem;
	}
</style>
