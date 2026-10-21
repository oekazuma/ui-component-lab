<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			notifications: 'Notifications',
			channels: ['Email', 'Push notifications', 'Text messages'],
			store: 'Store information',
			hours: 'Open every day from 10:00 to 19:00.',
			parking: 'Parking is free for up to two hours with a purchase.',
			links: ['Help', 'Terms', 'Privacy']
		},
		ja: {
			notifications: '通知',
			channels: ['メール', 'プッシュ通知', 'SMS'],
			store: '店舗の情報',
			hours: '毎日10時から19時まで営業しています。',
			parking: '駐車場は、お買い物で2時間まで無料です。',
			links: ['ヘルプ', '利用規約', 'プライバシー']
		}
	};

	const uid = $props.id();
</script>

<!-- セクションは見出しで区切りが伝わるので、間の線は CSS の border にする（<hr> は要らない）。
	<hr> は同じセクションの文章の中で話題が変わるところにだけ使う（HTML 仕様）。
	リンクの間の縦線は飾りなので読み上げさせない。
	デモなのでリンクは移動しない（href は prerender の存在チェックを通すため自身を指す） -->
<div class="demo" id={uid}>
	<section>
		<h3>{text[lang].notifications}</h3>
		<!-- 同じセクションの項目の間は、余白の内側だけに引くインセットの線にする -->
		<ul class="inset">
			{#each text[lang].channels as channel (channel)}
				<li>{channel}</li>
			{/each}
		</ul>
	</section>
	<section>
		<h3>{text[lang].store}</h3>
		<p>{text[lang].hours}</p>
		<hr />
		<p>{text[lang].parking}</p>
	</section>
	<p class="links">
		{#each text[lang].links as link, i (link)}
			{#if i > 0}<span class="vr" aria-hidden="true"></span>{/if}
			<a href="#{uid}" onclick={(e) => e.preventDefault()}>{link}</a>
		{/each}
	</p>
</div>

<style>
	/* 左右の余白は中身の側で取り、セクションの間の線（全幅）が枠の端から端まで届くようにする */
	.demo {
		width: min(100%, 20rem);
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	/* セクションの間の線の上下には 16px 以上、リストの項目の間には 8px 以上の余白をとる（DADS ディバイダー） */
	section,
	.links {
		padding: 1rem;
	}

	section + section,
	.links {
		border-top: 1px solid var(--color-border);
	}

	h3 {
		margin: 0 0 0.25rem;
		font-size: 1rem;
	}

	p,
	li {
		margin: 0;
		font-size: 0.875rem;
	}

	.inset {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.inset li {
		padding: 0.5rem 0;
	}

	.inset li + li {
		border-top: 1px solid var(--color-border);
	}

	hr {
		margin: 1rem 0;
		border: 0;
		border-top: 1px solid var(--color-border);
	}

	.links {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.vr {
		align-self: stretch;
		border-left: 1px solid var(--color-border);
	}
</style>
