<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			summary: 'Order summary',
			subtotal: 'Subtotal',
			shipping: 'Shipping',
			total: 'Total',
			amounts: ['$42.00', '$6.00', '$48.00'],
			open: 'About shipping',
			title: 'How shipping is calculated',
			body: 'Orders of $50 or more ship free. Otherwise the fee depends on the region.',
			link: 'Shipping fees by region',
			close: 'Close'
		},
		ja: {
			summary: 'ご注文内容',
			subtotal: '小計',
			shipping: '送料',
			total: '合計',
			amounts: ['4,200円', '600円', '4,800円'],
			open: '送料について',
			title: '送料の決まり方',
			body: '5,000円以上のご注文は送料無料です。それ以外は地域によって変わります。',
			link: '地域ごとの送料',
			close: '閉じる'
		}
	};

	const uid = $props.id();
</script>

<section aria-labelledby="{uid}-summary">
	<h3 id="{uid}-summary">{text[lang].summary}</h3>
	<dl>
		<div>
			<dt>{text[lang].subtotal}</dt>
			<dd>{text[lang].amounts[0]}</dd>
		</div>
		<div>
			<dt>
				{text[lang].shipping}
				<!-- popover 属性: popovertarget のボタンで開閉し、外側のクリックや Esc で閉じる（ライトディスミス）。
					フォーカスが外へ出ても閉じない。Tab の順は、ボタンの直後にポップオーバーの中身が入る -->
				<button type="button" class="btn" popovertarget="{uid}-pop" style:anchor-name="--{uid}">
					{text[lang].open}
				</button>
			</dt>
			<dd>{text[lang].amounts[1]}</dd>
		</div>
		<div class="total">
			<dt>{text[lang].total}</dt>
			<dd>{text[lang].amounts[2]}</dd>
		</div>
	</dl>
</section>
<div id="{uid}-pop" popover role="dialog" aria-labelledby="{uid}-title" style:position-anchor="--{uid}">
	<h4 id="{uid}-title">{text[lang].title}</h4>
	<p>{text[lang].body}</p>
	<!-- デモなので移動はしない（href は prerender の存在チェックを通すため見出しを指す） -->
	<a href="#{uid}-title" onclick={(e) => e.preventDefault()}>{text[lang].link}</a>
	<div class="actions">
		<button type="button" class="btn" popovertarget="{uid}-pop" popovertargetaction="hide">
			{text[lang].close}
		</button>
	</div>
</div>

<style>
	section {
		width: min(100%, 18rem);
		padding: 0.75rem 1rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	h3 {
		margin: 0 0 0.5rem;
		font-size: 1rem;
	}

	dl {
		margin: 0;
	}

	dl div {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.25rem 0;
	}

	dt {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem 0.5rem;
	}

	dd {
		margin: 0;
		white-space: nowrap;
	}

	.total {
		margin-top: 0.25rem;
		border-top: 1px solid var(--color-border);
		font-weight: 700;
	}

	dt .btn {
		padding-inline: 0.6em;
		font-size: 0.875rem;
	}

	[popover] {
		width: min(calc(100% - 2rem), 18rem);
		padding: 0.75rem 1rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);
	}

	/* アンカー配置に対応したブラウザではボタンの下に出す。左右どちらにそろえてもはみ出す狭い画面では、画面の端から 1rem に寄せる。
		未対応なら画面中央に出る */
	@supports (anchor-name: --a) {
		[popover] {
			top: anchor(bottom);
			left: anchor(left);
			margin: 0.4rem 0 0;
			position-try-fallbacks: flip-inline, --popover-demo-inset, flip-block;
		}
	}

	@position-try --popover-demo-inset {
		left: 1rem;
	}

	h4 {
		margin: 0 0 0.25rem;
		font-size: 1rem;
	}

	p {
		margin: 0 0 0.25rem;
		font-size: 0.9375rem;
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		margin-top: 0.75rem;
	}
</style>
