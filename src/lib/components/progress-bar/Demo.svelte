<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	type Phase = 'idle' | 'preparing' | 'running' | 'done' | 'canceled';

	const text = {
		en: {
			label: { idle: 'photo.jpg', preparing: 'Uploading photo.jpg', running: 'Uploading photo.jpg', done: 'Uploaded photo.jpg', canceled: 'Upload of photo.jpg canceled' },
			preparing: 'Preparing…',
			started: 'Upload started',
			done: 'Upload complete',
			canceled: 'Upload canceled',
			start: 'Start upload',
			cancel: 'Cancel'
		},
		ja: {
			label: { idle: 'photo.jpg', preparing: 'photo.jpg をアップロード中', running: 'photo.jpg をアップロード中', done: 'photo.jpg をアップロードしました', canceled: 'photo.jpg のアップロードを中止しました' },
			preparing: '準備中…',
			started: 'アップロードを開始しました',
			done: 'アップロードが完了しました',
			canceled: 'アップロードを中止しました',
			start: 'アップロード開始',
			cancel: 'キャンセル'
		}
	};

	const uid = $props.id();
	let phase = $state<Phase>('idle');
	let value = $state(0);
	let busy = $derived(phase === 'preparing' || phase === 'running');
	let message = $derived(
		busy ? text[lang].started : phase === 'done' ? text[lang].done : phase === 'canceled' ? text[lang].canceled : ''
	);

	// 送り先の準備が済むまでは終わりが見えないので不確定の表示にし、送り始めてから割合を出す
	$effect(() => {
		if (phase === 'preparing') {
			const id = setTimeout(() => (phase = 'running'), 1000);
			return () => clearTimeout(id);
		}
		if (phase === 'running') {
			const id = setInterval(() => {
				value = Math.min(value + 10, 100);
				if (value === 100) phase = 'done';
			}, 300);
			return () => clearInterval(id);
		}
	});
</script>

<!-- ネイティブの <progress> は role="progressbar" と現在値を支援技術に伝え、value を省くと不確定の表示になる -->
<div class="demo">
	<label for="{uid}-bar">{text[lang].label[phase]}</label>
	{#if phase === 'preparing'}
		<progress id="{uid}-bar" max="100"></progress>
	{:else}
		<progress id="{uid}-bar" max="100" {value}></progress>
	{/if}
	<p aria-hidden="true">{phase === 'preparing' ? text[lang].preparing : `${value}%`}</p>
	<!-- 途中の割合まで読み上げると騒がしいため、開始・完了・中止だけをライブリージョンで伝える -->
	<p class="visually-hidden" role="status">{message}</p>
	<div class="actions">
		<!-- 実行中に disabled にすると押した直後にフォーカスが外れるので、aria-disabled にして押しても何もしない -->
		<button
			type="button"
			class="btn btn-primary"
			aria-disabled={busy}
			onclick={() => {
				if (busy) return;
				value = 0;
				phase = 'preparing';
			}}
		>
			{text[lang].start}
		</button>
		<button
			type="button"
			class="btn"
			aria-disabled={!busy}
			onclick={() => {
				if (busy) phase = 'canceled';
			}}
		>
			{text[lang].cancel}
		</button>
	</div>
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

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.btn[aria-disabled='true'] {
		border-color: var(--color-border);
		background: var(--color-surface);
		color: var(--color-muted);
		cursor: not-allowed;
	}
</style>
