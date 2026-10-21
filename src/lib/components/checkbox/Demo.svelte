<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			legend: 'Toppings',
			all: 'All toppings',
			items: ['Cheese', 'Tomato', 'Basil'],
			terms: 'I agree to the terms of use',
			error: 'Select if you agree to the terms of use.',
			apply: 'Apply',
			sent: 'Application sent'
		},
		ja: {
			legend: 'トッピング',
			all: 'すべてのトッピング',
			items: ['チーズ', 'トマト', 'バジル'],
			terms: '利用規約に同意する',
			error: '＊利用規約に同意する場合は、チェックを付けてください。',
			apply: '申し込む',
			sent: '申し込みました'
		}
	};

	const uid = $props.id();
	let checked = $state([true, false, false]);
	let agreed = $state(false);
	let submitted = $state(false);
	let sent = $state(false);
	let termsBox: HTMLInputElement;
	// 最初の送信まではエラーを出さない。送信後は、チェックを付ければすぐ消える
	let error = $derived(submitted && !agreed);
	let all = $derived(checked.every(Boolean));
	let some = $derived(checked.some(Boolean));
</script>

<div class="demo">
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

	<!-- 同意のチェックは最初から付けない。required を付けるとブラウザ独自の吹き出しが出るので、novalidate にして自前の文で伝える -->
	<form
		novalidate
		onsubmit={(e) => {
			e.preventDefault();
			submitted = true;
			sent = agreed;
			if (!agreed) termsBox.focus();
		}}
	>
		<label>
			<input
				type="checkbox"
				aria-invalid={error}
				aria-describedby={error ? `${uid}-error` : undefined}
				bind:this={termsBox}
				bind:checked={agreed}
				onchange={() => (sent = false)}
			/>
			{text[lang].terms}
		</label>
		{#if error}
			<p id="{uid}-error" class="error">{text[lang].error}</p>
		{/if}
		<div class="row">
			<button type="submit" class="btn btn-primary">{text[lang].apply}</button>
			<p role="status">{sent ? text[lang].sent : ''}</p>
		</div>
	</form>
</div>

<style>
	.demo {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		gap: 1.5rem 3rem;
	}

	form {
		display: grid;
		gap: 0.25rem;
	}

	.error {
		margin: 0;
		color: var(--color-danger);
		font-size: 0.875rem;
	}

	/* キーボードのフォーカス表示を上書きしないよう、フォーカス中は赤い枠を外す */
	[aria-invalid='true']:not(:focus-visible) {
		outline: 2px solid var(--color-danger);
		outline-offset: 1px;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}

	.row p {
		margin: 0;
		font-size: 0.875rem;
	}

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
