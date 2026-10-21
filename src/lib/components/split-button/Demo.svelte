<script lang="ts">
	import ActionMenu from '#lib/ActionMenu.svelte';
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			group: 'Save',
			main: 'Save',
			more: 'More save options',
			items: ['Save as draft', 'Save and close'],
			done: (action: string) => `“${action}” ran`
		},
		ja: {
			group: '保存',
			main: '保存',
			more: 'その他の保存方法',
			items: ['下書きとして保存', '保存して閉じる'],
			done: (action: string) => `「${action}」を実行しました`
		}
	};

	let last = $state('');
</script>

<div class="demo">
	<div class="split" role="group" aria-label={text[lang].group}>
		<button type="button" class="btn btn-primary main" onclick={() => (last = text[lang].main)}>
			{text[lang].main}
		</button>
		<ActionMenu
			class="btn-primary more"
			label={text[lang].more}
			items={text[lang].items}
			onselect={(item) => (last = item)}
		>
			{#snippet trigger()}
				<span aria-hidden="true">▾</span>
			{/snippet}
		</ActionMenu>
	</div>
	<p role="status">{last ? text[lang].done(last) : ''}</p>
</div>

<style>
	.demo {
		display: grid;
		justify-items: center;
		gap: 0.5rem;
	}

	.split {
		display: inline-flex;
	}

	.main {
		border-start-end-radius: 0;
		border-end-end-radius: 0;
	}

	.split :global(.more) {
		margin-left: 1px;
		padding-inline: 0.6em;
		border-start-start-radius: 0;
		border-end-start-radius: 0;
	}

	/* メニューは本体より幅が広いので、矢印のボタンの右端（グループの右端）にそろえて、本体の下へ広げる */
	.split :global(.menu-wrap [role='menu']) {
		right: 0;
		left: auto;
	}

	p {
		min-height: 1.6em;
		margin: 0;
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
