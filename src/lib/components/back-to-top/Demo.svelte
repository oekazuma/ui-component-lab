<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			article: 'Article',
			title: 'How to sort your rubbish',
			paragraphs: [
				'Burnable rubbish goes out on Mondays and Thursdays, by 8:30 in the morning.',
				'Put kitchen waste in a bag after draining the water.',
				'Cans and bottles go out on Tuesdays. Rinse them and take off the caps.',
				'Plastic containers go out on Wednesdays. Look for the plastic mark on the package.',
				'Paper goes out on Fridays. Tie newspapers and cardboard with string.',
				'Large items need a booking. Call the collection center at least a week ahead.',
				'Batteries go to the collection boxes at the city hall and the libraries.',
				'Electronics such as TVs and fridges are collected by the shop that sold them.',
				'If you are not sure, search the sorting list on the city website by the name of the item.'
			],
			top: 'Back to top'
		},
		ja: {
			article: '記事',
			title: 'ごみの分け方と出し方',
			paragraphs: [
				'燃やすごみは、月曜日と木曜日の朝 8 時 30 分までに出してください。',
				'生ごみは、水気を切ってから袋に入れてください。',
				'缶とびんは火曜日です。中を洗い、ふたを外してください。',
				'プラスチック製容器包装は水曜日です。包装のプラマークを確かめてください。',
				'古紙は金曜日です。新聞と段ボールはひもで縛ってください。',
				'粗大ごみは予約が必要です。1 週間前までに受付センターへ電話してください。',
				'乾電池は、市役所と図書館の回収箱へ入れてください。',
				'テレビや冷蔵庫などの家電は、買った店が引き取ります。',
				'迷ったときは、市のウェブサイトの分別一覧で、品目の名前から探してください。'
			],
			top: 'ページの先頭へ'
		}
	};

	let box: HTMLElement;
	let title: HTMLElement;
	let scrolled = $state(false);

	// 一覧ページのサムネイルでもボタンが見えるよう、記事の途中までスクロールした状態で始める
	$effect(() => {
		box.scrollTop = box.clientHeight;
	});
</script>

<!-- 枠の中に常に Tab で止まる要素があるとは限らない（ボタンは隠れる）ので、枠そのものにフォーカスできるようにする。
	フォーカスがあれば、矢印キーと Home / End のスクロールはブラウザが受け持つ -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	bind:this={box}
	class="box"
	role="region"
	aria-label={text[lang].article}
	tabindex="0"
	onscroll={() => (scrolled = box.scrollTop > box.clientHeight / 2)}
>
	<!-- 押したあとのフォーカスの移り先。消えたボタンにフォーカスが残ると、次の Tab が記事の末尾から始まってしまう -->
	<h3 bind:this={title} tabindex="-1">{text[lang].title}</h3>
	{#each text[lang].paragraphs as p (p)}
		<p>{p}</p>
	{/each}
	<!-- 内容を覆いすぎないよう、十分にスクロールしてから出し、小さくする（NN/g）。fixed にするとページに固定されるので、枠の中の sticky にする -->
	<button
		type="button"
		class="btn"
		hidden={!scrolled}
		onclick={() => {
			box.scrollTop = 0;
			title.focus({ preventScroll: true });
		}}
	>
		<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" /></svg>
		{text[lang].top}
	</button>
</div>

<style>
	.box {
		width: min(100%, 24rem);
		height: 11rem;
		overflow-y: auto;
		padding: 0 1rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	h3 {
		margin: 0;
		padding-top: 0.75rem;
		font-size: 1rem;
	}

	/* タイトルは操作できる要素ではなく、読み始める位置を示すだけなので枠は出さない（サイトの main と同じ） */
	h3:focus {
		outline: none;
		box-shadow: none;
	}

	p {
		margin: 0.25rem 0 0;
		font-size: 0.9375rem;
	}

	/* 記事の最後に置き、スクロールの途中では枠の右下に貼り付ける */
	.btn {
		position: sticky;
		bottom: 0.5rem;
		display: flex;
		width: fit-content;
		margin: 0.5rem 0 0.5rem auto;
		box-shadow: 0 2px 6px rgb(0 0 0 / 0.2);
		font-size: 0.875rem;
	}

	.btn[hidden] {
		display: none;
	}

	svg {
		fill: none;
		stroke: currentColor;
		stroke-width: 1.75;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
</style>
