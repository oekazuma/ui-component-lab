<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	// 入力した語を含むコマンドだけを、デモのコマンドから選んで並べる
	const text = {
		en: { open: 'Commands…', query: 'Save', results: ['Save', 'Save as…'] },
		ja: { open: 'コマンド…', query: '保存', results: ['保存', '名前を付けて保存…'] }
	};
</script>

<!-- 一覧のサムネイル専用の、コマンドパレットを開いた状態の絵。操作はしないので、状態もイベントも持たない。
	本物の <dialog> は画面全体に重なるため、小さなページの枠の中に、暗くした背景とパネルを grid で重ねて描く -->
<div class="page" data-preview>
	<div class="behind">
		<span class="btn">{text[lang].open}</span>
	</div>
	<div class="backdrop">
		<div class="panel">
			<span class="query">{text[lang].query}</span>
			<ul>
				{#each text[lang].results as command, i (command)}
					<li class:active={i === 0}>{command}</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
	.page {
		display: grid;
		width: min(100%, 26rem);
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	.behind,
	.backdrop {
		grid-area: 1 / 1;
	}

	.behind {
		display: grid;
		place-items: center;
	}

	/* デモの `dialog.in-frame` の背景（`src/app.css`）と同じ黒の半透明。ダークモードでも背後を暗く沈める */
	.backdrop {
		display: grid;
		justify-items: center;
		padding: 1.5rem 1.5rem 2rem;
		background: rgb(0 0 0 / 0.4);
	}

	.panel {
		width: 100%;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		box-shadow: 0 12px 32px rgb(0 0 0 / 0.25);
	}

	.query {
		display: block;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--color-border);
		box-shadow: inset 0 -2px 0 var(--color-accent);
		font-size: 1.0625rem;
	}

	ul {
		margin: 0;
		padding: 0.25rem;
		list-style: none;
	}

	li {
		padding: 0.5rem 0.75rem;
		border-radius: calc(var(--radius) - 2px);
	}

	.active {
		background: var(--color-surface);
		box-shadow: inset 3px 0 0 var(--color-accent);
	}
</style>
