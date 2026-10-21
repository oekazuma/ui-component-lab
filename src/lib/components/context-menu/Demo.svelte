<script lang="ts">
	import ActionMenu from '#lib/ActionMenu.svelte';
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			hint: 'Right-click a file (Control-click on a Mac), or focus it and press Shift + F10.',
			files: ['report.pdf', 'photo.jpg'],
			more: (file: string) => `More options for ${file}`,
			items: ['Download', 'Share', null, 'Delete'],
			opened: 'Opened:',
			chosen: 'Chosen:'
		},
		ja: {
			hint: 'ファイルを右クリック（Mac では Control + クリック）するか、フォーカスして Shift + F10 を押してください。',
			files: ['report.pdf', 'photo.jpg'],
			more: (file: string) => `${file} のその他の操作`,
			items: ['ダウンロード', '共有', null, '削除'],
			opened: '開いたファイル:',
			chosen: '選んだ操作:'
		}
	};

	let menus: ActionMenu[] = $state([]);
	let status = $state('');
</script>

<!-- 右クリックや Mac の Control + クリック、Windows のメニューキーで起きる contextmenu イベントを、ブラウザ既定のメニューを止めて受ける。
	Shift + F10 で contextmenu を起こさない環境（macOS など）もあるので、Shift + F10 は keydown でも受ける（APG Menu で例に挙がるキー）。
	メニューキーは keydown で受けない。Windows では keyup で contextmenu が起き、keydown で開くとフォーカス先の項目の上にブラウザのメニューが出るため。
	メニューの中身は「⋯」ボタンの APG Menu Button と共有し、右クリックできない人にも同じ操作を見える場所に用意する -->
<div class="demo">
	<p class="hint">{text[lang].hint}</p>
	<ul>
		{#each text[lang].files as file, i (file)}
			<li>
				<button
					type="button"
					class="file"
					onclick={() => (status = `${text[lang].opened} ${file}`)}
					oncontextmenu={(e) => {
						e.preventDefault();
						menus[i].openAt(e.clientX, e.clientY, e.currentTarget);
					}}
					onkeydown={(e) => {
						if (!(e.shiftKey && e.key === 'F10')) return;
						e.preventDefault();
						// キーで開いたときは、ブラウザ既定のメニューと同じく要素の左下に出す
						const r = e.currentTarget.getBoundingClientRect();
						menus[i].openAt(r.left, r.bottom, e.currentTarget);
					}}>{file}</button
				>
				<ActionMenu
					bind:this={menus[i]}
					class="overflow"
					label={text[lang].more(file)}
					items={text[lang].items}
					onselect={(item) => (status = `${text[lang].chosen} ${item} (${file})`)}
				>
					{#snippet trigger()}
						<span aria-hidden="true">⋯</span>
					{/snippet}
				</ActionMenu>
			</li>
		{/each}
	</ul>
	<p role="status">{status}</p>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.5rem;
		width: min(100%, 18rem);
	}

	p {
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	p[role='status'] {
		min-height: 1.6em;
	}

	ul {
		margin: 0;
		padding: 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		list-style: none;
	}

	li {
		display: flex;
		align-items: center;
	}

	li + li {
		border-top: 1px solid var(--color-border);
	}

	.file {
		flex: 1;
		padding: 0.5em 0.75em;
		border: 0;
		background: none;
		text-align: left;
		cursor: pointer;
	}

	li :global(.overflow) {
		border-color: transparent;
		background: transparent;
	}

	.file:hover,
	li :global(.overflow:hover) {
		background: var(--color-surface);
	}

	/* 「⋯」ボタンから開いたときは、行からはみ出さないようボタンの右端にそろえる */
	li :global(.menu-wrap [role='menu']) {
		right: 0;
		left: auto;
	}
</style>
