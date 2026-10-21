<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	// DADS ボタンの使い方: 3つ並べるときは、優先度の低いテキストボタンを左、塗りボタンを右に置く
	const text = {
		en: {
			labels: { text: 'Cancel', outline: 'Save draft', filled: 'Submit' },
			idle: 'Press a button',
			pressed: (name: string) => `“${name}” was pressed`
		},
		ja: {
			labels: { text: 'キャンセル', outline: '下書き保存', filled: '送信する' },
			idle: 'ボタンを押してください',
			pressed: (name: string) => `「${name}」が押されました`
		}
	};
	const kinds = ['text', 'outline', 'filled'] as const;

	let last = $state<string>();
</script>

<div class="demo">
	<div class="row">
		{#each kinds as kind (kind)}
			<button
				type="button"
				class={['btn', kind, kind === 'filled' && 'btn-primary']}
				onclick={() => (last = text[lang].labels[kind])}
			>
				{text[lang].labels[kind]}
			</button>
		{/each}
	</div>
	<p role="status">{last ? text[lang].pressed(last) : text[lang].idle}</p>
</div>

<style>
	.demo {
		text-align: center;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
	}

	.outline {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	/* 枠も背景もないので、下線で押せる文字だとわかるようにする（DADS のテキストボタン） */
	.text {
		border-color: transparent;
		background: transparent;
		color: var(--color-accent);
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}

	.text:hover {
		background: var(--color-surface);
		text-decoration-thickness: 2px;
	}

	p {
		margin: 0.75rem 0 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
