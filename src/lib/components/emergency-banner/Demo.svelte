<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			title: 'Emergency: Evacuation advisory issued for the Minami district',
			time: 'Updated 06:00, 1 January 2026',
			body: 'At 05:40, an evacuation advisory was issued for the Minami district. People who need time to evacuate, such as older people, should go to a designated shelter now.',
			link: 'Check the evacuation shelters',
			would: 'A real site would open the list of evacuation shelters'
		},
		ja: {
			title: '【緊急】南地区に高齢者等避難が発令されました',
			time: '2026年1月1日 06:00更新',
			body: '5時40分、南地区に高齢者等避難が発令されました。お年寄りなど避難に時間がかかる人は、すぐに指定避難所へ避難してください。',
			link: '指定避難所を確認する',
			would: '実際のサイトでは、指定避難所の一覧へ移動します'
		}
	};

	const uid = $props.id();
	let clicked = $state(false);
</script>

<!-- DADS 実装 emergency-banner: 見出しを持つ <article>。読み込み時からあるので role="alert" は付けない。閉じるボタンも置かない -->
<div class="demo">
	<article id={uid}>
		<h3>{text[lang].title}</h3>
		<time datetime="2026-01-01T06:00:00+09:00">{text[lang].time}</time>
		<p>{text[lang].body}</p>
		<div class="action">
			<!-- デモなので移動はせず、行き先を表示する（href は prerender の存在チェックを通すため自身の article を指す） -->
			<a
				href="#{uid}"
				class="btn"
				onclick={(e) => {
					e.preventDefault();
					clicked = true;
				}}>{text[lang].link}</a
			>
		</div>
	</article>
	<p role="status">{clicked ? text[lang].would : ''}</p>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.5rem;
		width: min(100%, 36rem);
	}

	/* サイトのほかの部分と違う、目を引く見た目にする（DADS 緊急時バナー）。色はエラーの色 */
	article {
		display: grid;
		gap: 0.5rem;
		padding: 0.875rem 1rem;
		border: 6px solid var(--color-danger);
		background: var(--color-bg);
	}

	h3 {
		margin: 0;
		font-size: 1.25rem;
		line-height: 1.5;
	}

	article p {
		margin: 0;
	}

	.action {
		display: flex;
		justify-content: center;
		padding-top: 0.25rem;
	}

	/* 押せるのはボタンだけ。幅は表示幅の半分以上、狭い画面では全幅にする（DADS 緊急時バナー） */
	.btn {
		min-width: 50%;
		background: var(--color-danger);
		border-color: var(--color-danger);
		color: var(--color-danger-text);
		font-weight: 700;
		text-align: center;
		text-decoration: none;
	}

	.btn:hover {
		background: var(--color-danger-on-surface);
		text-decoration: underline;
	}

	@media (max-width: 40rem) {
		.btn {
			width: 100%;
		}
	}

	[role='status'] {
		min-height: 1.6em;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
		text-align: center;
	}
</style>
