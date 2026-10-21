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

<!-- ラベルは変えず、オンかオフかは aria-pressed で伝える（WAI-ARIA APG の Button パターンのトグル）。
	アイコンは今の配色を表す。どちらを出すかは CSS で決め、描画直後に別のアイコンが一瞬見えないようにする -->
<button type="button" aria-pressed={dark} title={label} onclick={toggle}>
	<svg class="sun" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
		<circle cx="12" cy="12" r="4" />
		<path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
	</svg>
	<svg class="moon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
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
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	/* app.css のダークモードの条件と同じ。選んだ値（data-theme）を優先し、なければ OS の設定に従う */
	.moon {
		display: none;
	}

	@media (prefers-color-scheme: dark) {
		:global(:root:not([data-theme='light'])) .sun {
			display: none;
		}

		:global(:root:not([data-theme='light'])) .moon {
			display: block;
		}
	}

	:global(:root[data-theme='dark']) .sun {
		display: none;
	}

	:global(:root[data-theme='dark']) .moon {
		display: block;
	}
</style>
