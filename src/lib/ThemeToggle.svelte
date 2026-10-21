<script lang="ts">
	let { label }: { label: string } = $props();

	// 表示前の色は app.html のスクリプトが data-theme で決める。prerender の時点では OS の設定が分からないので、ここでは描画後に読み直す
	let dark = $state(false);
	$effect(() => {
		const chosen = document.documentElement.dataset.theme;
		dark = chosen ? chosen === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
	});

	function toggle() {
		dark = !dark;
		const theme = dark ? 'dark' : 'light';
		document.documentElement.dataset.theme = theme;
		try {
			localStorage.setItem('theme', theme);
		} catch {
			// 保存できない環境（プライベートブラウズなど）では、このページを開いている間だけ切り替わる
		}
	}
</script>

<!-- ラベルは変えず、オンかオフかは aria-pressed で伝える（WAI-ARIA APG の Button パターンのトグル） -->
<button type="button" aria-pressed={dark} title={label} onclick={toggle}>
	<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
		<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
	</svg>
	<span class="visually-hidden">{label}</span>
</button>

<style>
	button {
		display: grid;
		place-items: center;
		width: 2.25rem;
		height: 2.25rem;
		padding: 0;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		background: var(--color-bg);
		color: var(--color-text);
		cursor: pointer;
	}

	button:hover {
		background: var(--color-surface);
	}

	svg {
		fill: none;
		stroke: currentColor;
		stroke-width: 1.75;
		stroke-linejoin: round;
	}

	[aria-pressed='true'] svg {
		fill: currentColor;
	}
</style>
