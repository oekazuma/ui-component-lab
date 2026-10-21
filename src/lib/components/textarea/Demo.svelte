<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const max = 200;
	const text = {
		en: {
			label: `Feedback (up to ${max} characters)`,
			left: (n: number) => {
				const m = Math.abs(n);
				return `${m} character${m === 1 ? '' : 's'} ${n >= 0 ? 'left' : 'too many'}`;
			},
			long: (n: number) => `Feedback must be ${max} characters or less (you entered ${n}).`,
			send: 'Send',
			sent: 'Sent'
		},
		ja: {
			label: `ご意見（${max}文字以内）`,
			left: (n: number) => (n >= 0 ? `あと${n}文字` : `${-n}文字超えています`),
			long: (n: number) => `＊入力できる文字数を超えています。（入力文字数${n}文字）`,
			send: '送信',
			sent: '送信しました'
		}
	};

	const uid = $props.id();
	let value = $state('');
	let submitted = $state(false);
	let sent = $state(false);
	let box: HTMLTextAreaElement;
	let left = $derived(max - value.length);
	// 最初の送信まではエラーを出さない。送信後は入力に合わせて直し、上限内に戻せばすぐ消える
	let error = $derived(submitted && left < 0 ? text[lang].long(value.length) : '');
</script>

<!-- 上限はラベルに書く。maxlength で打ち切ると貼り付けた文が黙って切れるため、超えても入力させて残り文字数で知らせ、
	送信時に入力文字数入りのエラーを出す。1文字ごとに読み上げると邪魔なので、残り文字数は aria-live にせず aria-describedby でつなぐ -->
<form
	class="demo"
	novalidate
	onsubmit={(e) => {
		e.preventDefault();
		submitted = true;
		sent = !error;
		if (error) box.focus();
	}}
>
	<label for="{uid}-input">{text[lang].label}</label>
	<textarea
		id="{uid}-input"
		rows="4"
		aria-describedby={error ? `${uid}-error ${uid}-count` : `${uid}-count`}
		aria-invalid={!!error}
		bind:this={box}
		bind:value
		oninput={() => (sent = false)}
	></textarea>
	<p id="{uid}-count" class:over={left < 0}>{text[lang].left(left)}</p>
	{#if error}
		<p id="{uid}-error" class="error">{error}</p>
	{/if}
	<div class="row">
		<button type="submit" class="btn btn-primary">{text[lang].send}</button>
		<p role="status">{sent ? text[lang].sent : ''}</p>
	</div>
</form>

<style>
	.demo {
		display: grid;
		gap: 0.25rem;
		width: min(100%, 20rem);
	}

	label {
		font-size: 0.875rem;
	}

	textarea {
		padding: 0.4em 0.5em;
		border: 1px solid var(--color-muted);
		border-radius: var(--radius);
		background: var(--color-bg);
		resize: vertical;
	}

	textarea[aria-invalid='true'] {
		border-color: var(--color-danger);
	}

	p {
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	.over {
		color: var(--color-danger);
		font-weight: 700;
	}

	.error {
		color: var(--color-danger);
	}

	.row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}
</style>
