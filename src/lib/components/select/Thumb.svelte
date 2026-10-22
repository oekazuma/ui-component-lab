<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Country',
			placeholder: 'Choose one',
			options: ['Australia', 'Brazil', 'Canada', 'France', 'Germany']
		},
		ja: {
			label: '国',
			placeholder: '選んでください',
			options: ['インド', 'オーストラリア', 'カナダ', 'ケニア', 'ドイツ']
		}
	};
</script>

<!-- 一覧のサムネイル専用の、選択肢のリストが開いている状態の絵。ネイティブの <select> は開いた姿を描けないので、箱とリストを自前で描く。
	サムネイルの枠に収まるよう、選択肢はデモの先頭の 5 つだけにしている -->
<div class="wrap" data-preview>
	<span class="label">{text[lang].label}</span>
	<span class="box">
		{text[lang].placeholder}
		<svg width="12" height="12" viewBox="0 0 12 12">
			<path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" />
		</svg>
	</span>
	<ul>
		{#each text[lang].options as option, i (option)}
			<li class:active={i === 1}>{option}</li>
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

	.box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.4em 0.5em;
		border: 1px solid var(--color-muted);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	ul {
		margin: 0;
		padding: 0.25rem 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);
		list-style: none;
	}

	li {
		padding: 0.15em 0.5em;
		font-size: 0.875rem;
	}

	.active {
		background: var(--color-accent);
		color: var(--color-accent-text);
	}
</style>
