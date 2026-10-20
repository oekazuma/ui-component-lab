<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			open: 'Shipping fee',
			title: 'How shipping is calculated',
			body: 'Orders over $50 ship free. Otherwise the fee depends on the region.',
			close: 'Close'
		},
		ja: {
			open: '送料について',
			title: '送料の決まり方',
			body: '5,000円以上のご注文は送料無料です。それ以外は地域によって変わります。',
			close: '閉じる'
		}
	};

	const uid = $props.id();
</script>

<!-- popover 属性: popovertarget のボタンで開閉し、外側のクリックや Esc で閉じる（ライトディスミス） -->
<button type="button" class="btn" popovertarget="{uid}-pop" style:anchor-name="--{uid}">
	{text[lang].open}
</button>
<div id="{uid}-pop" popover role="dialog" aria-labelledby="{uid}-title" style:position-anchor="--{uid}">
	<h3 id="{uid}-title">{text[lang].title}</h3>
	<p>{text[lang].body}</p>
	<div class="actions">
		<button type="button" class="btn" popovertarget="{uid}-pop" popovertargetaction="hide">
			{text[lang].close}
		</button>
	</div>
</div>

<style>
	[popover] {
		width: min(calc(100% - 2rem), 18rem);
		padding: 0.75rem 1rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);
	}

	/* アンカー配置に対応したブラウザではボタンの下に出す。未対応なら画面中央に出る */
	@supports (anchor-name: --a) {
		[popover] {
			top: anchor(bottom);
			left: anchor(left);
			margin: 0.4rem 0 0;
			position-try-fallbacks: flip-block;
		}
	}

	h3 {
		margin: 0 0 0.25rem;
		font-size: 1rem;
	}

	p {
		margin: 0;
		font-size: 0.9375rem;
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		margin-top: 0.75rem;
	}
</style>
