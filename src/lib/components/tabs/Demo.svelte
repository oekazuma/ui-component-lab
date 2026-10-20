<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Account settings',
			tabs: [
				['Profile', 'Name and photo.'],
				['Notifications', 'Email and push settings.'],
				['Security', 'Password and sign-in methods.']
			]
		},
		ja: {
			label: 'アカウント設定',
			tabs: [
				['プロフィール', '名前と写真の設定です。'],
				['通知', 'メールとプッシュ通知の設定です。'],
				['セキュリティ', 'パスワードとログイン方法の設定です。']
			]
		}
	};

	const uid = $props.id();
	let selected = $state(0);
	let tabEls: HTMLButtonElement[] = $state([]);

	// WAI-ARIA APG Tabs（自動アクティベーション）: 矢印キーで移動と同時に選択する
	function onkeydown(e: KeyboardEvent) {
		const count = text[lang].tabs.length;
		const next = {
			ArrowRight: (selected + 1) % count,
			ArrowLeft: (selected - 1 + count) % count,
			Home: 0,
			End: count - 1
		}[e.key];
		if (next === undefined) return;
		e.preventDefault();
		selected = next;
		tabEls[next].focus();
	}
</script>

<div class="tabs">
	<div role="tablist" aria-label={text[lang].label}>
		{#each text[lang].tabs as [name], i (name)}
			<button
				bind:this={tabEls[i]}
				type="button"
				role="tab"
				id="{uid}-tab-{i}"
				aria-selected={selected === i}
				aria-controls="{uid}-panel-{i}"
				tabindex={selected === i ? 0 : -1}
				onclick={() => (selected = i)}
				{onkeydown}
			>
				{name}
			</button>
		{/each}
	</div>
	{#each text[lang].tabs as [name, body], i (name)}
		<div
			role="tabpanel"
			id="{uid}-panel-{i}"
			aria-labelledby="{uid}-tab-{i}"
			tabindex="0"
			hidden={selected !== i}
		>
			{body}
		</div>
	{/each}
</div>

<style>
	.tabs {
		width: min(100%, 22rem);
	}

	[role='tablist'] {
		display: flex;
		border-bottom: 1px solid var(--color-border);
	}

	[role='tab'] {
		margin-bottom: -1px;
		padding: 0.4em 0.75em;
		border: 0;
		border-bottom: 2px solid transparent;
		background: none;
		color: var(--color-muted);
		white-space: nowrap;
		cursor: pointer;
	}

	[role='tab'][aria-selected='true'] {
		border-bottom-color: var(--color-accent);
		color: var(--color-text);
		font-weight: 700;
	}

	[role='tabpanel'] {
		padding: 0.75rem 0.25rem;
		font-size: 0.9375rem;
	}
</style>
