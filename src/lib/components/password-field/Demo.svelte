<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const min = 8;
	const text = {
		en: {
			label: 'Password',
			hint: `Must be at least ${min} characters.`,
			show: 'Show',
			hide: 'Hide',
			showLabel: 'Show password',
			hideLabel: 'Hide password',
			visible: 'Your password is visible',
			hidden: 'Your password is hidden',
			empty: 'Enter a password.',
			short: `Password must be at least ${min} characters.`,
			save: 'Save',
			saved: 'Saved (in this demo, the password is not sent or kept)'
		},
		ja: {
			label: 'パスワード',
			hint: `${min}文字以上で入力してください。`,
			show: '表示',
			hide: '隠す',
			showLabel: 'パスワードを表示',
			hideLabel: 'パスワードを隠す',
			visible: 'パスワードが表示されています',
			hidden: 'パスワードが隠れています',
			empty: '＊パスワードを入力してください。',
			short: `＊パスワードは${min}文字以上で入力してください。`,
			save: '保存',
			saved: '保存しました（このデモでは、パスワードを送信も保存もしません）'
		}
	};

	const uid = $props.id();
	let value = $state('');
	let shown = $state(false);
	// 最初は空にして、押して初めて状態を読み上げる
	let announced = $state(false);
	let submitted = $state(false);
	let saved = $state(false);
	let input: HTMLInputElement;

	let error = $derived(
		!submitted ? '' : !value ? text[lang].empty : value.length < min ? text[lang].short : ''
	);
</script>

<!-- GOV.UK Password input に沿う。貼り付けとパスワードマネージャーの自動入力を妨げないよう、paste を止めず maxlength も付けない。
	spellcheck と autocapitalize を切るのは、ブラウザの校正機能に値を送らせず、大文字に変えさせないため -->
<form
	class="demo"
	novalidate
	onsubmit={(e) => {
		e.preventDefault();
		submitted = true;
		saved = !error;
		// 表示したまま送ると、ブラウザがほかの欄の入力候補として値を覚えることがあるので隠して送る
		shown = false;
		if (error) input.focus();
	}}
>
	<label for="{uid}-input">{text[lang].label}</label>
	<p id="{uid}-hint" class="hint">{text[lang].hint}</p>
	<div class="row">
		<input
			id="{uid}-input"
			type={shown ? 'text' : 'password'}
			autocomplete="new-password"
			spellcheck="false"
			autocapitalize="off"
			aria-describedby={error ? `${uid}-error ${uid}-hint` : `${uid}-hint`}
			aria-invalid={!!error}
			bind:this={input}
			bind:value
			oninput={() => (saved = false)}
		/>
		<!-- APG Button: ラベルを「表示」「隠す」と変えるので aria-pressed は付けない（付けると「押されていない 隠す」のように食い違う） -->
		<button
			type="button"
			class="btn"
			aria-controls="{uid}-input"
			aria-label={shown ? text[lang].hideLabel : text[lang].showLabel}
			onclick={() => {
				shown = !shown;
				announced = true;
			}}>{shown ? text[lang].hide : text[lang].show}</button
		>
	</div>
	<!-- フォーカスはボタンに残るので、ラベルの変化だけでは読み上げられないことがある。状態を言葉でも知らせる -->
	<p class="visually-hidden" aria-live="polite">
		{announced ? (shown ? text[lang].visible : text[lang].hidden) : ''}
	</p>
	{#if error}
		<p id="{uid}-error" class="error">{error}</p>
	{/if}
	<button type="submit" class="btn btn-primary save">{text[lang].save}</button>
	<p role="status">{saved ? text[lang].saved : ''}</p>
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

	.row {
		display: flex;
		gap: 0.5rem;
	}

	input {
		flex: 1;
		min-width: 0;
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

	.save {
		justify-self: start;
		margin-top: 0.5rem;
	}
</style>
