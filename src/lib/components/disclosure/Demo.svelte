<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Postal code',
			hint: '7 digits, without a hyphen',
			summary: 'If you live outside Japan',
			body: 'Leave the postal code blank, and enter your whole address, starting with the country, in the address field.'
		},
		ja: {
			label: '郵便番号',
			hint: 'ハイフンなしの7桁',
			summary: '海外にお住まいの場合',
			body: '郵便番号は空欄のままにして、住所欄に国名から住所をすべて入力してください。'
		}
	};

	const uid = $props.id();
</script>

<!-- 一部の人にだけ当てはまる例外の説明を、入力欄の下に畳んでおく（DADS ディスクロージャーのユースケース）。
	ネイティブの <details> が開閉・キー操作・スクリーンリーダーへの状態通知を持つ -->
<div class="demo">
	<label for="{uid}-input">{text[lang].label}</label>
	<p id="{uid}-hint" class="hint">{text[lang].hint}</p>
	<input id="{uid}-input" type="text" inputmode="numeric" autocomplete="postal-code" aria-describedby="{uid}-hint" />
	<details>
		<summary>{text[lang].summary}</summary>
		<p>{text[lang].body}</p>
	</details>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.25rem;
		width: min(100%, 20rem);
	}

	label {
		font-size: 0.875rem;
	}

	.hint {
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	input {
		width: 9rem;
		padding: 0.4em 0.5em;
		border: 1px solid var(--color-muted);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	details {
		margin-top: 0.5rem;
	}

	summary {
		color: var(--color-accent);
		cursor: pointer;
	}

	details p {
		margin: 0.5rem 0 0;
		padding-left: 0.75rem;
		border-left: 4px solid var(--color-border);
		font-size: 0.9375rem;
	}
</style>
