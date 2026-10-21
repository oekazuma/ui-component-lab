<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			title: 'Neighborhood news',
			loading: 'Loading more posts…',
			end: 'No more posts',
			posts: [
				['Library opens late on Fridays', 'The central library now stays open until 9 pm every Friday.'],
				['Road work on Station Street', 'One lane will be closed on weekdays until the end of the month.'],
				['Farmers market this Sunday', 'Local growers sell vegetables in the park from 8 am.'],
				['New bus stop at the hospital', 'Route 12 now stops at the main entrance of the hospital.'],
				['Pool closed for cleaning', 'The public pool reopens next Tuesday after its yearly cleaning.'],
				['Volunteers wanted for the festival', 'Sign up at the community center to help with the autumn festival.'],
				['Fewer garbage pickups during holidays', 'Burnable garbage is collected only once in the holiday week.'],
				['Tree planting in the river park', 'Families are invited to plant cherry trees on Saturday morning.'],
				['Free health checks for seniors', 'Residents aged 65 and over can book a check at the clinic.']
			]
		},
		ja: {
			title: '地域のお知らせ',
			loading: '続きを読み込んでいます…',
			end: 'これ以上の投稿はありません',
			posts: [
				['図書館の金曜の開館時間を延長', '中央図書館は毎週金曜、午後9時まで開館します。'],
				['駅前通りで道路工事', '月末まで、平日は片側1車線を通行止めにします。'],
				['日曜に朝市を開きます', '公園で、午前8時から地元の農家が野菜を売ります。'],
				['病院前に新しいバス停', '12系統のバスが、病院の正面玄関前に止まるようになりました。'],
				['プールを清掃のため休業', '市民プールは年に1度の清掃を終え、来週の火曜に再開します。'],
				['お祭りのボランティアを募集', '秋祭りを手伝ってくださる方は、公民館で申し込めます。'],
				['連休中のごみ収集の回数', '連休の週は、燃えるごみの収集が1回だけになります。'],
				['河川公園で植樹会', '土曜の朝、家族で桜の苗木を植えませんか。'],
				['高齢者の無料健診', '65歳以上の方は、診療所で健診を予約できます。']
			]
		}
	};

	const uid = $props.id();
	const batch = 3;
	let count = $state(batch);
	let loading = $state(false);
	let feed: HTMLElement;
	let scroller: HTMLElement;

	let total = $derived(text[lang].posts.length);
	let posts = $derived(text[lang].posts.slice(0, count));

	function loadMore() {
		if (!loading && count < total) loading = true;
	}

	// 取得にかかる時間の代わりに少し待ってから足す。待つ間は aria-busy で読み上げを止めてもらう
	$effect(() => {
		if (!loading) return;
		const timer = setTimeout(() => {
			count += batch;
			loading = false;
		}, 400);
		return () => clearTimeout(timer);
	});

	const articles = () => [...feed.querySelectorAll<HTMLElement>('article')];

	// フィードの前後で、フォーカスできる要素のうちいちばん近いもの。デモの外の要素も対象にする
	function outside(after: boolean) {
		const all = [
			...document.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
			)
		].filter((el) => !feed.contains(el) && !el.closest('[inert]') && el.checkVisibility());
		const isAfter = (el: HTMLElement) => !!(feed.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING);
		return after ? all.find(isAfter) : all.findLast((el) => !isAfter(el));
	}

	// WAI-ARIA APG Feed: Page Down / Page Up で記事を移り、Ctrl + End / Ctrl + Home でフィードの外へ出る
	function onkeydown(e: KeyboardEvent) {
		const list = articles();
		const i = list.findIndex((a) => a.contains(document.activeElement));
		let target: HTMLElement | undefined;
		if (e.key === 'PageDown' && !e.ctrlKey) target = list[i + 1];
		else if (e.key === 'PageUp' && !e.ctrlKey) target = list[i - 1];
		else if (e.key === 'End' && e.ctrlKey) target = outside(true);
		else if (e.key === 'Home' && e.ctrlKey) target = outside(false);
		else return;
		// 端の記事でも箱がスクロールしないよう、既定の動きは常に止める
		e.preventDefault();
		target?.focus();
	}
</script>

<div class="demo">
	<h3 id="{uid}-title">{text[lang].title}</h3>
	<div
		bind:this={scroller}
		class="scroller"
		onscroll={() => {
			if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 40) loadMore();
		}}
	>
		<!-- キー操作は記事のどこにフォーカスがあっても受けたいので、記事ごとではなくフィードでまとめて受ける -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			bind:this={feed}
			role="feed"
			aria-labelledby="{uid}-title"
			aria-busy={loading}
			{onkeydown}
			onfocusin={(e) => {
				// 最後の記事まで読み進めたら続きを読み込む（APG Feed: フォーカスに合わせて記事を足す）
				if ((e.target as HTMLElement) === articles().at(-1)) loadMore();
			}}
		>
			{#each posts as [title, body], i (title)}
				<!-- APG Feed は記事ごとにフォーカスできることを求める。記事はネイティブの <article> で、role="article" を持つ -->
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<article
					tabindex="0"
					aria-labelledby="{uid}-t{i}"
					aria-describedby="{uid}-b{i}"
					aria-posinset={i + 1}
					aria-setsize={count}
				>
					<h4 id="{uid}-t{i}">{title}</h4>
					<p id="{uid}-b{i}">{body}</p>
				</article>
			{/each}
		</div>
		<p role="status" class="status">{loading ? text[lang].loading : count >= total ? text[lang].end : ''}</p>
	</div>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.5rem;
		width: min(100%, 24rem);
	}

	h3 {
		margin: 0;
		font-size: 1rem;
	}

	.scroller {
		height: 15rem;
		overflow-y: auto;
		padding: 0.5rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	[role='feed'] {
		display: grid;
		gap: 0.5rem;
	}

	article {
		padding: 0.6rem 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
	}

	h4 {
		margin: 0;
		font-size: 0.9375rem;
	}

	article p {
		margin: 0.25rem 0 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	.status {
		min-height: 1.6em;
		margin: 0.5rem 0 0;
		color: var(--color-muted);
		font-size: 0.875rem;
		text-align: center;
	}
</style>
