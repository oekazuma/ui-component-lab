<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			open: 'Show store details',
			title: 'Riverside Store',
			hours: 'Open until 8:00 PM',
			address: '3-4 Riverside, Chuo-ku',
			more: 'More details',
			moreTitle: 'Opening hours',
			days: ['Mon–Fri 10:00–20:00', 'Sat–Sun 10:00–18:00'],
			close: 'Close'
		},
		ja: {
			open: '店舗の詳細を表示',
			title: 'リバーサイド店',
			hours: '20:00まで営業',
			address: '中央区リバーサイド3-4',
			more: 'さらに詳しく',
			moreTitle: '営業時間',
			days: ['平日 10:00〜20:00', '土日 10:00〜18:00'],
			close: '閉じる'
		}
	};

	const uid = $props.id();
	let dialog: HTMLDialogElement;
	let full = $state(false);

	// 開くたびに低いほうの高さから始める
	function open() {
		full = false;
		dialog.showModal();
	}
</script>

<!-- モーダルの <dialog> を使う。背景の操作無効化・Esc・フォーカス復帰はブラウザが受け持つ -->
<div class="demo">
	<button type="button" class="btn" onclick={open}>{text[lang].open}</button>
</div>
<!-- <dialog> 自身が枠いっぱいの大きさなので、枠の中の暗い部分も、枠の外の ::backdrop も、クリックの対象は <dialog> になる。そこを押したときに閉じる。キーボードでは Esc で閉じられる -->
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	class="in-frame"
	aria-labelledby="{uid}-title"
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<form method="dialog" class="sheet" class:full>
		<!-- ドラッグではなくボタンで高さを切り替える（WCAG 2.5.7 のドラッグの代替）。名前は状態で変えず、開閉は aria-expanded で伝える -->
		<button type="button" class="handle" aria-expanded={full} aria-controls="{uid}-more" onclick={() => (full = !full)}>
			<span class="grip" aria-hidden="true"></span>
			<span class="visually-hidden">{text[lang].more}</span>
		</button>
		<div class="head">
			<h2 id="{uid}-title">{text[lang].title}</h2>
			<button class="btn">{text[lang].close}</button>
		</div>
		<p>{text[lang].hours}</p>
		<p>{text[lang].address}</p>
		<!-- hidden にして、低い高さのときに見えない部分へ Tab やスクリーンリーダーが届かないようにする -->
		<div id="{uid}-more" hidden={!full}>
			<h3>{text[lang].moreTitle}</h3>
			<ul>
				{#each text[lang].days as day (day)}
					<li>{day}</li>
				{/each}
			</ul>
		</div>
	</form>
</dialog>

<style>
	/* 列の幅を枠に固定する。auto のままだと、狭い枠で文字を大きくしたとき、中身の最小幅にあわせて列が枠より広がる */
	dialog {
		grid-template-columns: minmax(0, 1fr);
	}

	/* 低い高さのシートでも枠の中央（背景を押して閉じる位置）が空くよう、枠に高さを確保する */
	.demo {
		display: grid;
		place-items: center;
		min-height: 26rem;
	}

	/* 枠の下端に付くシート（枠に重ねる仕組みは app.css の .in-frame）。
		低い高さは枠の半分より少し低くし、文字を大きくして中身が増えたときは max-content まで伸ばして、溢れさせない */
	.sheet {
		align-self: end;
		justify-self: center;
		width: min(100%, 40rem);
		height: 42%;
		min-height: max-content;
		padding: 0 1rem 1rem;
		border: 1px solid var(--color-border);
		border-bottom: 0;
		border-radius: 1.75rem 1.75rem 0 0;
		background: var(--color-bg);
		color: var(--color-text);
		transition: height 0.2s ease-out;
		animation: slide-up 0.2s ease-out;
	}

	.sheet.full {
		height: 100%;
	}

	@keyframes slide-up {
		from {
			translate: 0 100%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.sheet {
			transition: none;
			animation: none;
		}
	}

	/* 押せる範囲は上端の幅いっぱい。見た目の持ち手は中に小さく描く */
	.handle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		min-height: 2.75rem;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
	}

	.grip {
		width: 2rem;
		height: 0.25rem;
		border-radius: 0.125rem;
		background: var(--color-muted);
	}

	/* 狭い枠で文字を大きくしたときは、閉じるボタンがタイトルの下に回る */
	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0 0.5rem;
	}

	h2 {
		margin: 0;
		font-size: 1.125rem;
	}

	h3 {
		margin: 0.75rem 0 0.25rem;
		font-size: 1rem;
	}

	p,
	ul {
		margin: 0.25rem 0 0;
	}

	ul {
		padding-left: 1.25rem;
	}
</style>
