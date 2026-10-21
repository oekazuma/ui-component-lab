<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	type Section = { name: string; top: string; description: string; links: string[] };
	const text: Record<Lang, { label: string; sections: Section[]; went: string }> = {
		en: {
			label: 'Main menu',
			sections: [
				{
					name: 'Living',
					top: 'All about living',
					description: 'Registration, taxes, and moving.',
					links: ['Resident certificate', 'Moving in or out', 'Tax', 'Garbage and recycling', 'Housing', 'Pets']
				},
				{
					name: 'Children',
					top: 'All about children',
					description: 'Support from pregnancy to school.',
					links: ['Pregnancy', 'Childcare', 'Child allowance', 'Schools', 'After-school care', 'Medical costs']
				},
				{
					name: 'Health',
					top: 'All about health',
					description: 'Checkups, insurance, and care.',
					links: ['Health checkups', 'Vaccinations', 'Health insurance', 'Elderly care', 'Disability support', 'Emergency care']
				}
			],
			went: 'Going to:'
		},
		ja: {
			label: 'メインメニュー',
			sections: [
				{
					name: 'くらし',
					top: 'くらしのトップ',
					description: '届け出、税金、引っ越しなど。',
					links: ['住民票の写し', '転入・転出', '税金', 'ごみ・リサイクル', '住まい', 'ペット']
				},
				{
					name: '子育て',
					top: '子育てのトップ',
					description: '妊娠から学校まで。',
					links: ['妊娠・出産', '保育所', '児童手当', '学校', '学童保育', '子どもの医療費']
				},
				{
					name: '健康',
					top: '健康のトップ',
					description: '健診、保険、介護など。',
					links: ['健康診断', '予防接種', '健康保険', '介護', '障害福祉', '救急医療']
				}
			],
			went: '移動先:'
		}
	};

	const uid = $props.id();
	// 一覧ページのサムネイルでもメガメニューだと分かるよう、最初のパネルを開いて始める
	let open = $state<number | null>(0);
	let went = $state('');
	let nav: HTMLElement;
	let buttons: HTMLButtonElement[] = $state([]);

	// 開いている間だけ、ナビゲーションの外を押したら閉じる
	$effect(() => {
		if (open === null) return;
		const onpointerdown = (e: PointerEvent) => {
			if (!nav.contains(e.target as Node)) open = null;
		};
		document.addEventListener('pointerdown', onpointerdown);
		return () => document.removeEventListener('pointerdown', onpointerdown);
	});
</script>

{#snippet link(name: string, className?: string)}
	<!-- デモなので移動はせず、行き先を表示する（href は prerender の存在チェックを通すため nav を指す） -->
	<a
		href="#{uid}"
		class={className}
		onclick={(e) => {
			e.preventDefault();
			went = name;
			open = null;
		}}>{name}</a
	>
{/snippet}

<!-- APG Disclosure Navigation Menu: menu のロールは使わず、開閉ボタン（aria-expanded）とリンクで作る。
	ボタンの開閉は <button> の既定の Enter / Space に任せ、Esc で閉じる処理だけを足す（WCAG 1.4.13） -->
<div class="demo">
	<!-- Esc はボタンとパネルのリンクのどこにフォーカスがあっても受けたいので、個々の要素ではなく nav でまとめて受ける -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<nav
		bind:this={nav}
		id={uid}
		aria-label={text[lang].label}
		onkeydown={(e) => {
			if (e.key !== 'Escape' || open === null) return;
			e.preventDefault();
			buttons[open].focus();
			open = null;
		}}
		onfocusout={(e) => {
			// Safari はクリックでボタンにフォーカスしないため relatedTarget が null になる。null では閉じず、外側のクリックは上の pointerdown で扱う
			if (e.relatedTarget && !nav.contains(e.relatedTarget as Node)) open = null;
		}}
	>
		{#each text[lang].sections as section, i (section.name)}
			<button
				bind:this={buttons[i]}
				type="button"
				aria-expanded={open === i}
				aria-controls="{uid}-panel-{i}"
				onclick={() => (open = open === i ? null : i)}
			>
				{section.name}<span class="chevron" aria-hidden="true"></span>
			</button>
			<!-- Tab でボタンからパネルのリンクへ進めるよう、パネルはボタンの直後に置き、表示だけ下の行へ回す -->
			<div id="{uid}-panel-{i}" class="panel" hidden={open !== i}>
				<div class="intro">
					<!-- ボタンからは第二階層のページへ移れないので、そのページへのリンクをパネルに入れる（DADS メガメニュー） -->
					{@render link(section.top, 'top')}
					<p>{section.description}</p>
				</div>
				<ul>
					{#each section.links as name (name)}
						<li>{@render link(name)}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</nav>
	<p role="status">{went ? `${text[lang].went} ${went}` : ''}</p>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.5rem;
		width: min(100%, 40rem);
		align-self: start;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		border-bottom: 1px solid var(--color-border);
		background: var(--color-bg);
	}

	button {
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
		min-height: 2.75rem;
		padding: 0.3em 0.9em;
		border: 0;
		border-bottom: 3px solid transparent;
		background: none;
		cursor: pointer;
	}

	button:hover {
		background: var(--color-surface);
	}

	button[aria-expanded='true'] {
		border-bottom-color: var(--color-text);
		font-weight: 700;
	}

	.chevron {
		width: 0.45em;
		height: 0.45em;
		border-right: 2px solid currentcolor;
		border-bottom: 2px solid currentcolor;
		rotate: 45deg;
		translate: 0 -0.15em;
	}

	[aria-expanded='true'] .chevron {
		rotate: 225deg;
		translate: 0 0.1em;
	}

	.panel {
		display: flex;
		flex-wrap: wrap;
		flex-basis: 100%;
		order: 1;
		gap: 0.75rem 1.5rem;
		padding: 1rem;
		border-top: 1px solid var(--color-border);
	}

	.panel[hidden] {
		display: none;
	}

	.intro {
		flex: 1 1 9rem;
	}

	.intro p {
		margin: 0.25rem 0 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	.top {
		font-weight: 700;
	}

	ul {
		display: grid;
		flex: 3 1 16rem;
		grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
		gap: 0.25rem 1rem;
		margin: 0;
		padding: 0 0 0 1.5rem;
		border-left: 1px solid var(--color-border);
		list-style: none;
	}

	li a {
		display: inline-block;
		padding: 0.25rem 0;
	}

	[role='status'] {
		min-height: 1.6em;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
		text-align: center;
	}
</style>
