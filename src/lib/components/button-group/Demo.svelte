<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Save options',
			idle: 'Press a button',
			actions: [
				{ key: 'save', label: 'Save', result: 'Saved.' },
				{ key: 'draft', label: 'Save as draft', result: 'Saved as a draft.' },
				{ key: 'cancel', label: 'Cancel', result: 'Canceled.' }
			]
		},
		ja: {
			label: '保存の選択肢',
			idle: 'ボタンを押してください',
			actions: [
				{ key: 'save', label: '保存する', result: '保存しました。' },
				{ key: 'draft', label: '下書き保存', result: '下書きとして保存しました。' },
				{ key: 'cancel', label: 'キャンセル', result: 'キャンセルしました。' }
			]
		}
	};

	let last = $state<string>();
</script>

<div class="demo">
	<!-- Tab と Enter / Space は <button> に任せ、キー操作は付けない。矢印キーで移るのは toolbar（APG Toolbar）の役割 -->
	<div role="group" aria-label={text[lang].label}>
		{#each text[lang].actions as action (action.key)}
			<button
				type="button"
				class={['btn', action.key === 'save' && 'btn-primary']}
				onclick={() => (last = action.key)}
			>
				{action.label}
			</button>
		{/each}
	</div>
	<p role="status">{last ? text[lang].actions.find((a) => a.key === last)!.result : text[lang].idle}</p>
</div>

<style>
	.demo {
		text-align: center;
	}

	[role='group'] {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
	}

	p {
		margin: 0.75rem 0 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
