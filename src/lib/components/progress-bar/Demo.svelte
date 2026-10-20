<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: { label: 'Uploading photo.jpg', start: 'Start upload', done: 'Upload complete' },
		ja: { label: 'photo.jpg をアップロード中', start: 'アップロード開始', done: 'アップロード完了' }
	};

	const uid = $props.id();
	let value = $state(0);
	let running = $state(false);

	$effect(() => {
		if (!running) return;
		const id = setInterval(() => {
			value = Math.min(value + 10, 100);
			if (value === 100) running = false;
		}, 300);
		return () => clearInterval(id);
	});
</script>

<!-- ネイティブの <progress> は role="progressbar" と現在値を支援技術に伝える -->
<div class="demo">
	<label for="{uid}-bar">{text[lang].label}</label>
	<progress id="{uid}-bar" max="100" {value}></progress>
	<!-- 途中の割合まで読み上げると騒がしいため、完了だけをライブリージョンで伝える -->
	<p><span aria-hidden="true">{value}%</span> <span aria-live="polite">{value === 100 ? text[lang].done : ''}</span></p>
	<button
		type="button"
		class="btn"
		onclick={() => {
			value = 0;
			running = true;
		}}
	>
		{text[lang].start}
	</button>
</div>

<style>
	.demo {
		display: grid;
		gap: 0.25rem;
		width: min(100%, 16rem);
	}

	label,
	p {
		font-size: 0.875rem;
	}

	progress {
		width: 100%;
		height: 0.6rem;
		accent-color: var(--color-accent);
	}

	p {
		margin: 0 0 0.5rem;
		color: var(--color-muted);
	}

	.btn {
		justify-self: start;
	}
</style>
