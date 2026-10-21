<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Price',
			thumbs: ['Minimum price', 'Maximum price'],
			max: 500,
			step: 10,
			start: [100, 300],
			format: (n: number) => `$${n}`
		},
		ja: {
			label: '価格',
			thumbs: ['最低価格', '最高価格'],
			max: 50000,
			step: 1000,
			start: [10000, 30000],
			format: (n: number) => `${n.toLocaleString('ja-JP')}円`
		}
	};

	const uid = $props.id();
	const t = $derived(text[lang]);
	// DemoFrame が言語ごとに作り直すので、初期値は最初の言語のものだけを取れば足りる
	// svelte-ignore state_referenced_locally
	let values = $state([...text[lang].start]);
	let dragging = $state<number | null>(null);
	let rail: HTMLDivElement;
	let thumbs: HTMLDivElement[] = $state([]);

	// つまみは追い越せない。下のつまみの上限は上のつまみの値、上のつまみの下限は下のつまみの値（APG Slider (Multi-Thumb)）
	const limits = (i: number) => (i === 0 ? [0, values[1]] : [values[0], t.max]);
	const pct = (v: number) => (v / t.max) * 100;

	function set(i: number, v: number) {
		const [lo, hi] = limits(i);
		values[i] = Math.min(hi, Math.max(lo, Math.round(v / t.step) * t.step));
	}

	// WAI-ARIA APG Slider (Multi-Thumb): 各つまみが Slider のキー操作を持つ。Page Up / Page Down は 10 刻み
	function onkeydown(e: KeyboardEvent, i: number) {
		const [lo, hi] = limits(i);
		const by = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 10, PageDown: -10 }[e.key];
		if (by !== undefined) set(i, values[i] + by * t.step);
		else if (e.key === 'Home') values[i] = lo;
		else if (e.key === 'End') values[i] = hi;
		else return;
		e.preventDefault();
	}

	const valueAt = (x: number) => {
		const r = rail.getBoundingClientRect();
		return ((x - r.left) / r.width) * t.max;
	};

	// ドラッグできない人のために、溝を押すだけでも近いほうのつまみをそこへ動かす（WCAG 2.5.7）。
	// 押したまま動かせばドラッグになる。ポインターは溝が捕まえるので、document にリスナーを付けずに済む
	function onpointerdown(e: PointerEvent) {
		if (e.button !== 0) return;
		e.preventDefault();
		const v = valueAt(e.clientX);
		// つまみが重なっているときは、押した側にあるほうを動かす
		const i = Math.abs(v - values[0]) < Math.abs(v - values[1]) || (values[0] === values[1] && v < values[0]) ? 0 : 1;
		set(i, v);
		thumbs[i].focus();
		dragging = i;
		rail.setPointerCapture(e.pointerId);
	}
</script>

<div class="demo" role="group" aria-labelledby="{uid}-label">
	<div class="head">
		<span id="{uid}-label">{t.label}</span>
		<!-- 値は各つまみが aria-valuetext で読み上げるので、まとめた表示は見た目だけにする -->
		<span class="range" aria-hidden="true">{t.format(values[0])} – {t.format(values[1])}</span>
	</div>
	<div
		bind:this={rail}
		class="rail"
		role="presentation"
		{onpointerdown}
		onpointermove={(e) => dragging !== null && set(dragging, valueAt(e.clientX))}
		onpointerup={() => (dragging = null)}
		onpointercancel={() => (dragging = null)}
	>
		<div class="track"></div>
		<div class="fill" style:left="{pct(values[0])}%" style:width="{pct(values[1]) - pct(values[0])}%"></div>
		<!-- HTML の <input type="range"> は値を 1 つしか持てないので、APG の例と同じく role="slider" の要素を 2 つ置く -->
		{#each values as value, i (i)}
			<div
				bind:this={thumbs[i]}
				class="knob"
				role="slider"
				tabindex="0"
				aria-label={t.thumbs[i]}
				aria-valuemin={limits(i)[0]}
				aria-valuemax={limits(i)[1]}
				aria-valuenow={value}
				aria-valuetext={t.format(value)}
				style:left="{pct(value)}%"
				onkeydown={(e) => onkeydown(e, i)}
			></div>
		{/each}
	</div>
	<div class="ends" aria-hidden="true"><span>{t.format(0)}</span><span>{t.format(t.max)}</span></div>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.25rem;
		width: min(100%, 20rem);
	}

	.head {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	.range {
		font-variant-numeric: tabular-nums;
	}

	/* 押せる範囲を 44px の高さにとり、見た目の溝はその中央に細く描く */
	.rail {
		position: relative;
		height: 2.75rem;
		margin: 0 0.625rem;
		touch-action: none;
		cursor: pointer;
	}

	.track,
	.fill {
		position: absolute;
		top: 50%;
		height: 0.25rem;
		border-radius: 999px;
		translate: 0 -50%;
	}

	.track {
		right: 0;
		left: 0;
		background: var(--color-border);
	}

	.fill {
		background: var(--color-accent);
	}

	.knob {
		position: absolute;
		top: 50%;
		width: 1.25rem;
		height: 1.25rem;
		border: 2px solid var(--color-accent);
		border-radius: 50%;
		background: var(--color-bg);
		translate: -50% -50%;
	}

	.ends {
		display: flex;
		justify-content: space-between;
		margin-top: -0.5rem;
		color: var(--color-muted);
		font-size: 0.75rem;
		font-variant-numeric: tabular-nums;
	}
</style>
