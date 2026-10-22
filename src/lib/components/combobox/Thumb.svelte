<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	// 入力した文字に前方一致する候補だけを、デモの候補から選んで並べる
	const text = {
		en: { label: 'Fruit', value: 'Ap', suggestions: ['Apple', 'Apricot'] },
		ja: { label: '果物', value: 'メ', suggestions: ['メロン'] }
	};
</script>

<!-- 一覧のサムネイル専用の、文字を入力して候補の一覧が開いた状態の絵。操作はしないので、状態もイベントも持たず、入力欄も span で描く。
	枠の高さで縮める倍率が決まるため、一覧は絶対配置にせず通常の流れに置く -->
<div class="wrap" data-preview>
	<span class="label">{text[lang].label}</span>
	<span class="field">
		{text[lang].value}
		<svg width="16" height="16" viewBox="0 0 24 24">
			<path d="M12 17L3 8L4 7L12 15L20 7L21 8L12 17Z" fill="currentcolor" />
		</svg>
	</span>
	<ul>
		{#each text[lang].suggestions as option (option)}
			<li><b>{option.slice(0, text[lang].value.length)}</b>{option.slice(text[lang].value.length)}</li>
		{/each}
	</ul>
</div>

<style>
	.wrap {
		display: grid;
		gap: 0.25rem;
		width: min(100%, 14rem);
	}

	.label {
		font-size: 0.875rem;
	}

	.field {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 2.75rem;
		padding: 0.4em 0.9rem 0.4em 0.5em;
		border: 1px solid var(--color-muted);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	/* 一覧が開いているので、デモと同じく矢印を上向きにする */
	svg {
		rotate: 180deg;
		color: var(--color-muted);
	}

	ul {
		margin: 0;
		padding: 0.25rem 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
		list-style: none;
	}

	li {
		padding: 0.25em 0.5em;
	}
</style>
