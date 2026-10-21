<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const max = 20;
	const text = {
		en: {
			label: 'Display name',
			required: '(required)',
			hint: `Shown on your profile. Up to ${max} characters.`,
			empty: 'Enter a display name.',
			long: (n: number) => `Display name must be ${max} characters or less (you entered ${n}).`,
			save: 'Save',
			saved: 'Saved'
		},
		ja: {
			label: '表示名',
			required: '※必須',
			hint: `プロフィールに表示されます。${max}文字以内で入力してください。`,
			empty: '＊表示名を入力してください。',
			long: (n: number) => `＊表示名は${max}文字以内で入力してください。（入力文字数${n}文字）`,
			save: '保存',
			saved: '保存しました'
		}
	};

	const uid = $props.id();
	let value = $state('');
	let submitted = $state(false);
	let saved = $state(false);
	let input: HTMLInputElement;

	// 最初の送信まではエラーを出さない。送信後は入力に合わせて直し、直せばすぐ消える
	let error = $derived(
		!submitted ? '' : !value.trim() ? text[lang].empty : value.length > max ? text[lang].long(value.length) : ''
	);
</script>

<!-- ラベルは placeholder ではなく常に見える <label> で付け、補足とエラーは aria-describedby でつなぐ。
	maxlength で打ち切ると貼り付けた文が黙って切れるので、上限を超えても入力させ、送信時にエラーで知らせる。
	required を付けるとブラウザ独自の吹き出しが出るので、novalidate にして自前の文で伝える -->
<form
	class="demo"
	novalidate
	onsubmit={(e) => {
		e.preventDefault();
		submitted = true;
		saved = !error;
		if (error) input.focus();
	}}
>
	<label for="{uid}-input">{text[lang].label} <span class="required">{text[lang].required}</span></label>
	<p id="{uid}-hint" class="hint">{text[lang].hint}</p>
	<input
		id="{uid}-input"
		type="text"
		aria-describedby={error ? `${uid}-error ${uid}-hint` : `${uid}-hint`}
		aria-invalid={!!error}
		bind:this={input}
		bind:value
		oninput={() => (saved = false)}
	/>
	{#if error}
		<p id="{uid}-error" class="error">{error}</p>
	{/if}
	<div class="row">
		<button type="submit" class="btn btn-primary">{text[lang].save}</button>
		<p role="status">{saved ? text[lang].saved : ''}</p>
	</div>
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

	.required {
		color: var(--color-danger);
	}

	input {
		padding: 0.4em 0.5em;
		border: 1px solid var(--color-muted);
		border-radius: var(--radius);
		background: var(--color-bg);
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

	.row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}
</style>
