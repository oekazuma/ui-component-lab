<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			cards: [
				{ label: 'Travel', title: 'Weekend in Kyoto', meta: '2 days · from $240', body: 'Temples in the morning, tea houses in the afternoon.' },
				{ label: 'Food', title: 'Market breakfast in Hakodate', meta: 'Half day · from $35', body: 'Fresh seafood bowls at the morning market.' }
			],
			ad: { label: 'Ad', sponsor: 'Sponsored by Example Hotels', title: 'Autumn hotel sale', body: 'Up to 20% off rooms until November 30.' },
			save: 'Save'
		},
		ja: {
			cards: [
				{ label: '旅行', title: '週末の京都', meta: '2日間・36,000円から', body: '午前は寺社をめぐり、午後は茶屋でひと休みします。' },
				{ label: 'グルメ', title: '函館の朝市で朝ごはん', meta: '半日・5,000円から', body: '朝市でとれたての海鮮丼を味わいます。' }
			],
			ad: { label: 'PR', sponsor: '提供：サンプルホテルズ', title: '秋のホテルセール', body: '11月30日まで客室が最大20%オフです。' },
			save: '保存'
		}
	};

	const uid = $props.id();
	let saved = $state(text.en.cards.map(() => false));
</script>

<!-- 各カードは 1 つの話題をまとめた article。中にボタンがあるため、カード全体ではなく見出しだけをリンクにする。
	デモなのでリンクは移動しない（href は prerender の存在チェックを通すため自身を指す） -->
<ul class="cards" id={uid}>
	{#each text[lang].cards as card, i (card.title)}
		<li>
			<article aria-labelledby="{uid}-title-{i}">
				<div class="media media-{i}" aria-hidden="true"></div>
				<div class="content">
					<p class="label">{card.label}</p>
					<h3 id="{uid}-title-{i}"><a href="#{uid}" onclick={(e) => e.preventDefault()}>{card.title}</a></h3>
					<p class="meta">{card.meta}</p>
					<p>{card.body}</p>
					<div class="actions">
						<button type="button" class="btn" aria-pressed={saved[i]} onclick={() => (saved[i] = !saved[i])}>
							<span aria-hidden="true">{saved[i] ? '★' : '☆'}</span>
							{text[lang].save}
						</button>
					</div>
				</div>
			</article>
		</li>
	{/each}
	<!-- 広告は記事と取り違えないよう、文字で「広告」と示し、枠と背景も変える -->
	<li>
		<article class="ad" aria-labelledby="{uid}-title-ad">
			<div class="content">
				<p class="label ad-label">{text[lang].ad.label}</p>
				<h3 id="{uid}-title-ad"><a href="#{uid}" onclick={(e) => e.preventDefault()}>{text[lang].ad.title}</a></h3>
				<p class="meta">{text[lang].ad.sponsor}</p>
				<p>{text[lang].ad.body}</p>
			</div>
		</article>
	</li>
</ul>

<style>
	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
		gap: 0.75rem;
		/* max-width を付けると、その幅で入る列の数が中身の最小幅になり、狭い画面でページが横にはみ出す */
		width: 100%;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	article {
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		box-shadow: 0 1px 3px rgb(0 0 0 / 0.08);
	}

	.media {
		height: 3.5rem;
	}

	.media-0 {
		background: linear-gradient(135deg, var(--color-accent), var(--color-danger-surface));
	}

	.media-1 {
		background: linear-gradient(135deg, var(--color-success-surface), var(--color-accent));
	}

	/* 本文の長さが違っても、ボタンをカードの下端にそろえる */
	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		padding: 0.75rem;
	}

	h3 {
		margin: 0;
		font-size: 1rem;
	}

	p {
		margin: 0.25rem 0 0;
		font-size: 0.875rem;
	}

	.label {
		margin: 0 0 0.25rem;
		color: var(--color-muted);
		font-size: 0.8125rem;
		font-weight: 700;
	}

	.meta {
		color: var(--color-muted);
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		margin-top: auto;
		padding-top: 0.75rem;
	}

	.ad {
		border-style: dashed;
		border-color: var(--color-muted);
		background: var(--color-surface);
		box-shadow: none;
	}

	.ad-label {
		align-self: flex-start;
		padding: 0 0.4rem;
		border: 1px solid currentcolor;
		border-radius: 4px;
	}
</style>
