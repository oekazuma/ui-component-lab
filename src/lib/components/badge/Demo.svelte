<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			notifications: 'Notifications',
			messages: 'Messages',
			downloads: 'Downloads',
			unread: (label: string, n: string) => `${label}, ${n} unread`,
			fresh: (label: string) => `${label}, new`
		},
		ja: {
			notifications: '通知',
			messages: 'メッセージ',
			downloads: 'ダウンロード',
			unread: (label: string, n: string) => `${label} ${n}件の未読`,
			fresh: (label: string) => `${label} 新着あり`
		}
	};

	// 件数のないものはドットで「新しいものがある」ことだけを示す
	const items = [
		{ key: 'notifications', icon: 'M12 3a6 6 0 0 0-6 6v4l-2 3h16l-2-3V9a6 6 0 0 0-6-6Zm-2 15a2 2 0 0 0 4 0', count: 3 },
		{ key: 'messages', icon: 'M3 6h18v12H3zM3 6l9 7 9-7', count: 120 },
		{ key: 'downloads', icon: 'M12 3v11m-5-5 5 5 5-5M4 17v3h16v-3', count: null }
	] as const;
	let counts = $state<(number | null)[]>(items.map((i) => i.count));
	let dots = $state(items.map((i) => i.count === null));

	// 99 を超える数は「99+」で頭打ちにする（MUI Badge の max の既定値）。
	// 名前にも同じ「99+」を使う。見えている文字が名前に含まれないと、音声入力で呼べない（WCAG 2.5.3）
	const shown = (n: number) => (n > 99 ? '99+' : String(n));
</script>

<!-- アイコンだけのボタンなので、名前は aria-label で付け、件数もそこに含める。バッジ自体は見た目だけにする -->
<div class="row">
	{#each items as item, i (item.key)}
		{@const label = text[lang][item.key]}
		{@const n = counts[i]}
		<button
			type="button"
			class="btn"
			aria-label={n ? text[lang].unread(label, shown(n)) : dots[i] ? text[lang].fresh(label) : label}
			onclick={() => {
				counts[i] = 0;
				dots[i] = false;
			}}
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentcolor" stroke-width="2" stroke-linejoin="round" aria-hidden="true">
				<path d={item.icon} />
			</svg>
			{#if n}
				<span class="badge" aria-hidden="true">{shown(n)}</span>
			{:else if dots[i]}
				<span class="badge dot" aria-hidden="true"></span>
			{/if}
		</button>
	{/each}
</div>

<style>
	.row {
		display: flex;
		gap: 1.25rem;
	}

	.btn {
		position: relative;
		padding: 0.4em;
	}

	.badge {
		position: absolute;
		top: -0.5rem;
		right: -0.75rem;
		min-width: 1.25rem;
		height: 1.25rem;
		padding: 0 0.3rem;
		border-radius: 999px;
		background: var(--color-danger);
		color: var(--color-danger-text);
		font-size: 0.875rem;
		font-weight: 700;
		line-height: 1.25rem;
		text-align: center;
	}

	.dot {
		top: -0.25rem;
		right: -0.25rem;
		min-width: 0.75rem;
		height: 0.75rem;
		padding: 0;
	}
</style>
