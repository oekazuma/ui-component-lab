<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			button: 'Archive message',
			inbox: '2 messages in the inbox',
			toast: 'Message archived',
			undo: 'Undo'
		},
		ja: {
			button: 'メッセージをアーカイブ',
			inbox: '受信トレイ：2件',
			toast: 'メッセージをアーカイブしました',
			undo: '元に戻す'
		}
	};
</script>

<!-- 一覧のサムネイル専用の、アーカイブしたあとにトーストが出ている状態の絵。
	デモのトーストは画面の下に固定されるが、サムネイルの枠に収めるため流れの中に置く -->
<div class="wrap" data-preview>
	<p>{text[lang].inbox}</p>
	<span class="btn">{text[lang].button}</span>
	<div class="toast">
		<span class="message">{text[lang].toast}</span>
		<span class="btn undo">{text[lang].undo}</span>
		<span class="btn close">×</span>
	</div>
</div>

<style>
	.wrap {
		display: grid;
		justify-items: center;
		gap: 0.5rem;
		text-align: center;
	}

	p {
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}

	.toast {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		margin-top: 1.5rem;
		padding: 0.25rem 0.25rem 0.25rem 1.2rem;
		border-radius: var(--radius);
		background: var(--color-text);
		color: var(--color-bg);
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.2);
	}

	.message {
		margin-right: 0.5rem;
	}

	.toast .btn {
		border: 0;
		background: none;
		color: inherit;
	}

	.undo {
		font-weight: 700;
		white-space: nowrap;
	}

	.close {
		font-size: 1.25rem;
	}
</style>
