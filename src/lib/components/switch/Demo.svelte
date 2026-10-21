<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Show completed tasks',
			on: 'On',
			off: 'Off',
			list: 'Tasks',
			done: 'Done',
			tasks: [
				['Book a meeting room', false],
				['Send the invoice', true],
				['Reply to Ms. Sato', false],
				['Renew the passport', true]
			] as const
		},
		ja: {
			label: '完了したタスクを表示する',
			on: 'オン',
			off: 'オフ',
			list: 'タスク',
			done: '完了',
			tasks: [
				['会議室を予約する', false],
				['請求書を送る', true],
				['佐藤さんに返信する', false],
				['パスポートを更新する', true]
			] as const
		}
	};

	let checked = $state(false);
	let shown = $derived(text[lang].tasks.filter(([, done]) => checked || !done));
</script>

<!-- ネイティブのチェックボックスに role="switch" を付けると、Space での切替とオン・オフの読み上げを引き継げる -->
<!-- スイッチは切り替えた結果がその場で見える設定に使う（DADS）。保存ボタンを挟まず、すぐ下の一覧に反映する -->
<div class="demo">
	<label>
		<span>{text[lang].label}</span>
		<input type="checkbox" role="switch" bind:checked />
		<span class="state" aria-hidden="true">{checked ? text[lang].on : text[lang].off}</span>
	</label>
	<ul aria-label={text[lang].list}>
		{#each shown as [task, done] (task)}
			<li>{task}{#if done}<span class="done">{text[lang].done}</span>{/if}</li>
		{/each}
	</ul>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.75rem;
		width: min(100%, 18rem);
	}

	ul {
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--color-border);
		list-style: none;
	}

	li {
		display: flex;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.35rem 0.25rem;
		border-bottom: 1px solid var(--color-border);
	}

	.done {
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	label {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}

	input {
		appearance: none;
		position: relative;
		width: 2.75rem;
		height: 1.5rem;
		margin: 0;
		border: 1px solid var(--color-muted);
		border-radius: 999px;
		background: var(--color-surface);
		cursor: pointer;
		transition: background-color 0.15s;
	}

	input::before {
		content: '';
		position: absolute;
		top: 2px;
		left: 2px;
		width: calc(1.5rem - 6px);
		height: calc(1.5rem - 6px);
		border-radius: 50%;
		background: var(--color-muted);
		transition: translate 0.15s;
	}

	input:checked {
		border-color: var(--color-accent);
		background: var(--color-accent);
	}

	input:checked::before {
		background: var(--color-accent-text);
		translate: 1.25rem 0;
	}

	.state {
		min-width: 2.5em;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	@media (prefers-reduced-motion: reduce) {
		input,
		input::before {
			transition: none;
		}
	}
</style>
