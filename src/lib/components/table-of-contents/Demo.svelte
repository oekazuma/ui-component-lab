<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	type Section = { heading: string; body: string[] };
	const text: Record<Lang, { title: string; article: string; sections: Section[] }> = {
		en: {
			title: 'Contents',
			article: 'Article',
			sections: [
				{
					heading: 'Who needs to give notice',
					body: ['Anyone who moves into the city from another city or town. Give notice for everyone in the household who moves with you.']
				},
				{
					heading: 'What to bring',
					body: [
						'The moving-out certificate from your previous city, and one ID document such as a driver’s licence or passport.',
						'If you have a My Number Card, bring the cards of everyone who moves.'
					]
				},
				{
					heading: 'Where to go',
					body: ['The residents’ counter on the first floor of the city hall, or any branch office.']
				},
				{
					heading: 'Deadline and opening hours',
					body: [
						'Give notice within 14 days of the day you start living here.',
						'The counters are open from 8:30 to 17:15 on weekdays, except on public holidays and over the New Year.',
						'On the second Sunday of each month, the counter at the city hall is also open from 9:00 to 12:00.',
						'The counters are busy at the end of March and the start of April, so come early in the day if you can.'
					]
				}
			]
		},
		ja: {
			title: 'このページの目次',
			article: '記事',
			sections: [
				{
					heading: '届け出が必要な人',
					body: ['ほかの市区町村から市内へ引っ越してきた人。一緒に引っ越してきた世帯の全員分を届け出ます。']
				},
				{
					heading: '持っていくもの',
					body: [
						'前の市区町村で受け取った転出証明書と、運転免許証やパスポートなどの本人確認書類を 1 つ。',
						'マイナンバーカードを持っている人は、引っ越してきた全員分のカードも持ってきてください。'
					]
				},
				{
					heading: '届け出る場所',
					body: ['市役所 1 階の市民課の窓口か、各支所の窓口。']
				},
				{
					heading: '期限と受付時間',
					body: [
						'住み始めた日から 14 日以内に届け出てください。',
						'受付は平日の 8 時 30 分から 17 時 15 分までです。祝日と年末年始は休みです。',
						'毎月第 2 日曜日は、市役所の窓口に限り 9 時から 12 時まで受け付けます。',
						'3 月の終わりから 4 月の初めは窓口が混み合うので、できれば早い時間に来てください。'
					]
				}
			]
		}
	};

	const uid = $props.id();
	let current = $state(0);
	let box: HTMLElement;
	let headings: HTMLElement[] = $state([]);

	// 上端に来た見出しの節を今の節とする。最後の節は上端まで届かないことがあるので、枠の終わりまで来たら最後の節とする
	function onscroll() {
		if (box.scrollTop + box.clientHeight >= box.scrollHeight - 1) {
			current = headings.length - 1;
			return;
		}
		current = headings.findLastIndex((h) => h.offsetTop <= box.scrollTop + 8);
		if (current < 0) current = 0;
	}
</script>

<!-- DADS 実装 toc: 見出しを aria-labelledby で名前にした <nav> と、見出しへのリンクのリスト。
	ブラウザの既定の移動はページ全体もスクロールさせるので止め、記事の枠だけを動かして見出しへフォーカスを移す -->
<div class="demo">
	<nav aria-labelledby="{uid}-title">
		<h3 id="{uid}-title">{text[lang].title}</h3>
		<ul>
			{#each text[lang].sections as section, i (section.heading)}
				<li>
					<a
						href="#{uid}-s{i}"
						aria-current={i === current ? 'location' : undefined}
						onclick={(e) => {
							e.preventDefault();
							box.scrollTop = headings[i].offsetTop;
							headings[i].focus({ preventScroll: true });
						}}>{section.heading}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
	<!-- 枠の中に Tab で止まる要素がないので、枠そのものにフォーカスできるようにし、矢印キーや Home / End でスクロールさせる -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div bind:this={box} class="box" role="region" aria-label={text[lang].article} tabindex="0" {onscroll}>
		{#each text[lang].sections as section, i (section.heading)}
			<section aria-labelledby="{uid}-s{i}">
				<!-- リンクから移ったときにフォーカスを受け、次の Tab をここから始めるため tabindex="-1" -->
				<h3 bind:this={headings[i]} id="{uid}-s{i}" tabindex="-1">{section.heading}</h3>
				{#each section.body as p (p)}
					<p>{p}</p>
				{/each}
			</section>
		{/each}
	</div>
</div>

<style>
	.demo {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 1.5rem;
		width: min(100%, 40rem);
		align-items: flex-start;
	}

	nav {
		flex: 1 1 10rem;
		padding: 0.75rem 1rem;
		border: 1px dotted var(--color-muted);
		background: var(--color-bg);
		font-size: 0.9375rem;
	}

	h3 {
		margin: 0;
		font-size: 1rem;
	}

	ul {
		display: grid;
		gap: 0.375rem;
		margin: 0.5rem 0 0;
		padding-left: 1.25rem;
	}

	[aria-current] {
		font-weight: 700;
	}

	/* 見出しの offsetTop を枠の上端からの距離にするため、枠を基準の位置にする */
	.box {
		position: relative;
		flex: 3 1 16rem;
		height: 12rem;
		overflow-y: auto;
		padding: 0 1rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	.box h3 {
		padding-top: 0.75rem;
	}

	/* 見出しは操作できる要素ではなく、読み始める位置を示すだけなので枠は出さない（サイトの main と同じ） */
	.box h3:focus {
		outline: none;
		box-shadow: none;
	}

	p {
		margin: 0.25rem 0 0;
		font-size: 0.9375rem;
	}

	section:last-child {
		padding-bottom: 0.75rem;
	}
</style>
