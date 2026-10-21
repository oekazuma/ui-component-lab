<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const max = 200;
	const text = {
		en: {
			label: `Feedback (up to ${max} characters)`,
			left: (n: number) => (n >= 0 ? `${n} characters left` : `${-n} characters too many`)
		},
		ja: {
			label: `ご意見（${max}文字以内）`,
			left: (n: number) => (n >= 0 ? `あと${n}文字` : `${-n}文字超えています`)
		}
	};

	const uid = $props.id();
	let value = $state('');
	let left = $derived(max - value.length);
</script>

<!-- 上限はラベルに書く。maxlength で打ち切ると貼り付けた文が黙って切れるため、超えても入力させて残り文字数で知らせる。
	1文字ごとに読み上げると邪魔なので、残り文字数は aria-live にせず aria-describedby でつなぐ -->
<div class="demo">
	<label for="{uid}-input">{text[lang].label}</label>
	<textarea id="{uid}-input" rows="4" aria-describedby="{uid}-count" bind:value></textarea>
	<p id="{uid}-count" class:over={left < 0}>{text[lang].left(left)}</p>
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

	textarea {
		padding: 0.4em 0.5em;
		border: 1px solid var(--color-muted);
		border-radius: var(--radius);
		background: var(--color-bg);
		resize: vertical;
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
</style>
