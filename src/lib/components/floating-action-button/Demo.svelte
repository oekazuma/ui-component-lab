<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			title: 'Notes',
			fab: 'New note',
			notes: [
				'Shopping list',
				'Ideas for the trip',
				'Meeting notes',
				'Books to read',
				'Recipe: miso soup',
				'Gift ideas',
				'Packing list',
				'Password hints'
			],
			open: (note: string) => `A real app would open “${note}”`,
			create: 'A real app would open a new note'
		},
		ja: {
			title: 'メモ',
			fab: '新しいメモ',
			notes: [
				'買い物リスト',
				'旅行のアイデア',
				'会議のメモ',
				'読みたい本',
				'レシピ: みそ汁',
				'贈り物の案',
				'持ち物リスト',
				'合言葉のヒント'
			],
			open: (note: string) => `実際のアプリでは「${note}」を開きます`,
			create: '実際のアプリでは新しいメモを開きます'
		}
	};

	const uid = $props.id();
	let message = $state('');
</script>

<div id={uid} class="demo">
	<!-- ボタンは position: fixed ではなく、この画面の枠に対する absolute で重ねる。fixed だと画面の隅に出て、デモの枠から外れる。
		DOM ではリストより前に置くので、Tab はまずボタンに届く。見た目は右下で、読み順（先に届く）とは一致しない -->
	<div class="screen">
		<h3>{text[lang].title}</h3>
		<!-- ネイティブの <button> なので、Tab での到達、Enter / Space での実行、フォーカスの表示、ボタンの役割はブラウザに任せる。アイコンは名前にならないので、名前は aria-label で付ける -->
		<button type="button" class="fab" aria-label={text[lang].fab} onclick={() => (message = text[lang].create)}>
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
		</button>
		<!-- リストの下に、ボタンの高さ以上の余白と scroll-padding を取る。フォーカスの移った行がスクロールでボタンの下から出るので、
			行がボタンに隠れない（WCAG 2.4.11） -->
		<ul role="list">
			{#each text[lang].notes as note (note)}
				<li>
					<!-- デモなので移動はせず、開く先を表示する（href は prerender の存在チェックを通すため枠を指す） -->
					<a
						href="#{uid}"
						onclick={(e) => {
							e.preventDefault();
							message = text[lang].open(note);
						}}>{note}</a
					>
				</li>
			{/each}
		</ul>
	</div>
	<p role="status">{message}</p>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.5rem;
		width: min(100%, 20rem);
	}

	.screen {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 15rem;
		overflow: hidden;
		border: 2px solid var(--color-border);
		border-radius: 1.5rem;
		background: var(--color-bg);
	}

	h3 {
		margin: 0;
		padding: 0.75rem 1rem 0.5rem;
		border-bottom: 1px solid var(--color-border);
		font-size: 1.125rem;
	}

	ul {
		flex: 1;
		min-height: 0;
		margin: 0;
		padding: 0.25rem 0.25rem 5rem;
		overflow-y: auto;
		scroll-padding-bottom: 5rem;
		list-style: none;
	}

	a {
		display: block;
		padding: 0.75rem;
		border-radius: var(--radius);
		color: var(--color-text);
		text-decoration: none;
	}

	a:hover {
		background: var(--color-surface);
	}

	.fab {
		position: absolute;
		right: 0.75rem;
		bottom: 0.75rem;
		z-index: 1;
		display: grid;
		place-items: center;
		width: 3.5rem;
		height: 3.5rem;
		padding: 0;
		border: 0;
		border-radius: 1rem;
		background: var(--color-accent);
		color: var(--color-accent-text);
		box-shadow: 0 3px 8px rgb(0 0 0 / 0.3);
		cursor: pointer;
	}

	.fab:hover {
		background: var(--color-accent-hover);
	}

	/* ボタンと一緒に、文字を大きくしたときも大きくなるよう rem で指定する */
	svg {
		width: 1.5rem;
		height: 1.5rem;
		fill: none;
		stroke: currentcolor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	p {
		min-height: 1.5em;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
