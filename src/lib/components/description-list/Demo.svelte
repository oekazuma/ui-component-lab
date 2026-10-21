<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			change: 'Change',
			rows: [
				['Name', 'Taro Yamada', 'name'],
				['Date of birth', 'April 1, 1990', 'date of birth'],
				['Email', 'taro@example.com', 'email'],
				['Address', '1-2-3 Kasumigaseki, Chiyoda-ku, Tokyo', 'address']
			]
		},
		ja: {
			change: '変更',
			rows: [
				['氏名', '山田 太郎', '氏名を'],
				['生年月日', '1990年4月1日', '生年月日を'],
				['メールアドレス', 'taro@example.com', 'メールアドレスを'],
				['住所', '東京都千代田区霞が関1-2-3', '住所を']
			]
		}
	};

	const uid = $props.id();
</script>

<!-- <dl> の dt（項目名）と dd（値）の組で書くと、スクリーンリーダーが組として扱える。
	変更のリンクも同じ行の dd に置く（GOV.UK Summary list）。
	デモなのでリンクは移動しない（href は prerender の存在チェックを通すため自身を指す） -->
<dl id={uid}>
	{#each text[lang].rows as [term, value, hidden] (term)}
		<div>
			<dt>{term}</dt>
			<dd>{value}</dd>
			<dd class="actions">
				<!-- 「変更」だけでは行の外で読んだときにどの項目か分からないので、項目名を見えない文字で補う -->
				<a href="#{uid}" onclick={(e) => e.preventDefault()}>
					{#if lang === 'ja'}<span class="visually-hidden">{hidden}</span>{text[lang].change}{:else}{text[lang].change}<span class="visually-hidden">&nbsp;{hidden}</span>{/if}
				</a>
			</dd>
		</div>
	{/each}
</dl>

<style>
	dl {
		width: min(100%, 28rem);
		margin: 0;
	}

	div {
		display: grid;
		grid-template-columns: minmax(0, 8rem) minmax(0, 1fr) auto;
		gap: 0.5rem;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--color-border);
	}

	dt {
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	dd {
		margin: 0;
		overflow-wrap: anywhere;
	}

	/* 狭い画面では項目名を上の行に出し、値とリンクを下の行に並べる */
	@media (max-width: 30rem) {
		div {
			grid-template-columns: minmax(0, 1fr) auto;
			gap: 0 0.5rem;
		}

		dt {
			grid-column: 1 / -1;
		}
	}
</style>
