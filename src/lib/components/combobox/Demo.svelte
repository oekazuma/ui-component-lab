<script lang="ts">
	import { normalize } from '#lib/search.js';
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Fruit',
			options: ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry', 'Grape', 'Lemon', 'Mango', 'Melon', 'Peach']
		},
		ja: {
			label: '果物',
			options: ['アボカド', 'イチゴ', 'オレンジ', 'キウイ', 'バナナ', 'ブドウ', 'メロン', 'モモ', 'リンゴ', 'レモン']
		}
	};

	const uid = $props.id();
	let value = $state('');
	let open = $state(false);
	/** 視覚的なフォーカスを当てている候補。DOM のフォーカスは入力欄に残し、aria-activedescendant で伝える */
	let active = $state(-1);

	let suggestions = $derived(
		text[lang].options.filter((o) => normalize(o).startsWith(normalize(value)))
	);
	let expanded = $derived(open && suggestions.length > 0);

	function choose(option: string) {
		value = option;
		open = false;
		active = -1;
	}

	// APG「Editable Combobox With List Autocomplete」のキー操作に合わせる
	function onkeydown(e: KeyboardEvent) {
		const n = suggestions.length;
		if (!n && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) return;
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				open = true;
				if (!e.altKey) active = (active + 1) % n;
				break;
			case 'ArrowUp':
				e.preventDefault();
				open = true;
				active = active <= 0 ? n - 1 : active - 1;
				break;
			case 'Enter':
				if (!expanded) return;
				e.preventDefault();
				if (active >= 0) choose(suggestions[active]);
				else open = false;
				break;
			case 'Escape':
				// 閉じているときだけ入力欄を空にする。空にすると全候補が一致するため、open も必ず落とす
				if (!expanded) value = '';
				open = false;
				active = -1;
				break;
			case 'ArrowLeft':
			case 'ArrowRight':
			case 'Home':
			case 'End':
				active = -1;
		}
	}
</script>

<div class="demo">
	<label for="{uid}-input">{text[lang].label}</label>
	<input
		id="{uid}-input"
		type="text"
		role="combobox"
		autocomplete="off"
		aria-autocomplete="list"
		aria-controls="{uid}-list"
		aria-expanded={expanded}
		aria-activedescendant={expanded && active >= 0 ? `${uid}-option-${active}` : undefined}
		bind:value
		oninput={() => {
			open = value !== '';
			active = -1;
		}}
		{onkeydown}
		onblur={() => {
			open = false;
			active = -1;
		}}
	/>
	<ul id="{uid}-list" role="listbox" aria-label={text[lang].label} hidden={!expanded}>
		{#each suggestions as option, i (option)}
			<!-- キーボードでは入力欄側で操作するため、候補はマウス用のクリックだけを持つ -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<li
				id="{uid}-option-{i}"
				role="option"
				aria-selected={i === active}
				onpointerdown={(e) => e.preventDefault()}
				onclick={() => choose(option)}
			>
				{option}
			</li>
		{/each}
	</ul>
</div>

<style>
	.demo {
		position: relative;
		display: grid;
		gap: 0.25rem;
		width: min(100%, 14rem);
	}

	label {
		font-size: 0.875rem;
	}

	input {
		padding: 0.4em 0.5em;
		border: 1px solid var(--color-muted);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	ul {
		position: absolute;
		top: 100%;
		right: 0;
		left: 0;
		z-index: 1;
		margin: 0.25rem 0 0;
		padding: 0.25rem 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
		list-style: none;
	}

	li {
		padding: 0.25em 0.5em;
		cursor: pointer;
	}

	li:hover {
		background: var(--color-surface);
	}

	[aria-selected='true'] {
		background: var(--color-accent);
		color: var(--color-accent-text);
	}

	[aria-selected='true']:hover {
		background: var(--color-accent);
	}
</style>
