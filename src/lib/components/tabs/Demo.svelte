<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Account settings',
			tabs: [
				['Profile', 'Name and photo.'],
				['Notifications', 'Choose how you are notified.'],
				['Security', 'Password and sign-in methods.']
			],
			switches: ['Email notifications', 'Push notifications']
		},
		ja: {
			label: 'アカウント設定',
			tabs: [
				['プロフィール', '名前と写真の設定です。'],
				['通知', '通知の受け取り方を選びます。'],
				['セキュリティ', 'パスワードとログイン方法の設定です。']
			],
			switches: ['メール通知', 'プッシュ通知']
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
			<p>{body}</p>
			{#if i === 1}
				<!-- 隠したパネルも DOM に残すので、ほかのタブへ移ってもスイッチの状態は保たれる -->
				{#each text[lang].switches as label (label)}
					<label class="switch">
						{label}
						<input type="checkbox" role="switch" />
					</label>
				{/each}
			{/if}
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
		display: grid;
		gap: 0.5rem;
		padding: 0.75rem 0.25rem;
		font-size: 0.9375rem;
	}

	[role='tabpanel'][hidden] {
		display: none;
	}

	p {
		margin: 0;
	}

	.switch {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}

	input {
		appearance: none;
		position: relative;
		flex: none;
		width: 2.75rem;
		height: 1.5rem;
		margin: 0;
		border: 1px solid var(--color-muted);
		border-radius: 999px;
		background: var(--color-surface);
		cursor: pointer;
	}

	input::before {
		content: '';
		position: absolute;
		top: 2px;
		left: 2px;
		width: calc(1.5rem - 6px);
		height: calc(1.5rem - 6px);
		border-radius: 50%;
		background: var(--color-muted);
	}

	input:checked {
		border-color: var(--color-accent);
		background: var(--color-accent);
	}

	input:checked::before {
		background: var(--color-accent-text);
		translate: 1.25rem 0;
	}
</style>
