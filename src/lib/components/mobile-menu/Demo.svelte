<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	// 文字列はリンク、配列を持つものは開閉するまとまり
	type Item = string | [string, string[]];
	const text: Record<Lang, { label: string; items: Item[]; section: string; footer: string[]; went: string }> = {
		en: {
			label: 'Menu',
			items: [
				'Home',
				['Services', ['Resident certificate', 'Moving in or out', 'My Number Card']],
				['Children and education', ['Childcare', 'Schools']],
				'News'
			],
			section: 'About this site',
			footer: ['Contact', 'Accessibility'],
			went: 'Going to:'
		},
		ja: {
			label: 'メニュー',
			items: [
				'ホーム',
				['手続き', ['住民票の写し', '転入・転出', 'マイナンバーカード']],
				['子育て・教育', ['保育所', '学校']],
				'お知らせ'
			],
			section: 'このサイトについて',
			footer: ['お問い合わせ', 'アクセシビリティ方針'],
			went: '移動先:'
		}
	};

	const uid = $props.id();
	let went = $state('');
</script>

{#snippet link(name: string)}
	<!-- デモなので移動はせず、行き先を表示する（href は prerender の存在チェックを通すため nav を指す） -->
	<a
		href="#{uid}"
		onclick={(e) => {
			e.preventDefault();
			went = name;
		}}>{name}</a
	>
{/snippet}

<div class="demo">
	<nav id={uid} aria-label={text[lang].label}>
		<ul>
			{#each text[lang].items as item (typeof item === 'string' ? item : item[0])}
				<li>
					{#if typeof item === 'string'}
						{@render link(item)}
					{:else}
						<!-- アコーディオンタイプ。<details> が開閉と、開閉の状態の読み上げを受け持つ -->
						<details>
							<summary>{item[0]}</summary>
							<ul>
								{#each item[1] as child (child)}
									<li>{@render link(child)}</li>
								{/each}
							</ul>
						</details>
					{/if}
				</li>
			{/each}
		</ul>
		<p id="{uid}-section" class="section">{text[lang].section}</p>
		<ul aria-labelledby="{uid}-section">
			{#each text[lang].footer as name (name)}
				<li>{@render link(name)}</li>
			{/each}
		</ul>
	</nav>
	<p role="status">{went ? `${text[lang].went} ${went}` : ''}</p>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.5rem;
		width: min(100%, 20rem);
	}

	nav {
		padding: 0 0.75rem 0.5rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li + li {
		border-top: 1px solid var(--color-border);
	}

	/* タップしやすいよう、1 行を 44px 以上にする */
	a,
	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		min-height: 2.75rem;
		padding: 0.25rem;
		color: var(--color-text);
		text-decoration: none;
		cursor: pointer;
	}

	a:hover,
	summary:hover {
		text-decoration: underline;
	}

	/* リンクと開閉で形の違うアイコンを使う（DADS モバイルメニューの使い方: 向きだけの違いにしない） */
	a::after {
		content: '›';
		color: var(--color-muted);
		font-size: 1.25rem;
		line-height: 1;
	}

	summary {
		list-style: none;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary::after {
		content: '+';
		color: var(--color-muted);
		font-size: 1.25rem;
		line-height: 1;
	}

	details[open] > summary::after {
		content: '−';
	}

	details ul {
		padding-left: 1rem;
		border-top: 1px solid var(--color-border);
	}

	/* セクション名は太字にし、区切り線で前のまとまりと分ける（DADS モバイルメニューの使い方: セクションの明確化） */
	.section {
		margin: 0;
		padding: 0.75rem 0.25rem 0.25rem;
		border-top: 2px solid var(--color-border);
		font-weight: 700;
	}

	[role='status'] {
		min-height: 1.6em;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
		text-align: center;
	}
</style>
