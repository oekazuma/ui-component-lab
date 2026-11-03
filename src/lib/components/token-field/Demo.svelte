<script lang="ts">
	import { normalize } from '#lib/search.js';
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Ingredients',
			chosen: 'Chosen ingredients',
			hint: 'In the empty field, Backspace removes the last ingredient.',
			none: 'No matching ingredient',
			initial: 'Garlic',
			options: ['Basil', 'Broccoli', 'Carrot', 'Garlic', 'Ginger', 'Lemon', 'Mushroom', 'Onion', 'Pepper', 'Tomato'],
			remove: (o: string) => `Remove ${o}`,
			added: (o: string, n: number) => `Added ${o}. ${n} chosen.`,
			removed: (o: string, n: number) => `Removed ${o}. ${n} chosen.`
		},
		ja: {
			label: '食材',
			chosen: '選んだ食材',
			hint: '入力欄が空のとき、Backspace で最後の食材を外せます。',
			none: '該当する食材はありません',
			initial: 'ニンニク',
			options: ['キノコ', 'コショウ', 'ショウガ', 'タマネギ', 'トマト', 'ニンジン', 'ニンニク', 'バジル', 'ブロッコリー', 'レモン'],
			remove: (o: string) => `${o}を外す`,
			added: (o: string, n: number) => `${o}を追加しました。${n}件を選択中です。`,
			removed: (o: string, n: number) => `${o}を外しました。${n}件を選択中です。`
		}
	};

	const uid = $props.id();
	// 言語を切り替えると DemoFrame がデモを作り直すので、初期値だけ読めば足りる
	// svelte-ignore state_referenced_locally
	let chosen = $state([text[lang].initial]);
	let value = $state('');
	let open = $state(false);
	/** 視覚的なフォーカスを当てている候補。DOM のフォーカスは入力欄に残し、aria-activedescendant で伝える */
	let active = $state(-1);
	let message = $state('');
	let input: HTMLInputElement;

	// 選んだ値は候補から外すので、同じ値を二度選ぶことはない
	let suggestions = $derived(
		text[lang].options.filter((o) => !chosen.includes(o) && normalize(o).startsWith(normalize(value)))
	);
	let expanded = $derived(open && suggestions.length > 0);
	let noMatch = $derived(open && value !== '' && suggestions.length === 0);

	function add(option: string) {
		chosen.push(option);
		message = text[lang].added(option, chosen.length);
		value = '';
		open = false;
		active = -1;
	}

	// 外したボタンはなくなるので、フォーカスは常に入力欄へ移す。隣のトークンへ移すと、続けて入力するのに Tab が要る
	function remove(option: string) {
		chosen = chosen.filter((c) => c !== option);
		message = text[lang].removed(option, chosen.length);
		// 外した値は候補に戻り、同じ番号の位置に入る。強調を残すと、外したばかりの値が選ばれた状態になり、Enter で入れ直してしまう
		active = -1;
		input.focus();
	}

	// APG「Editable Combobox With List Autocomplete」のキー操作に合わせる。
	// 候補を決めたあとは、入力欄を空にして次の値を続けて入力できるようにする（APG の Enter の説明にある、宛先の追加と同じ扱い）
	function onkeydown(e: KeyboardEvent) {
		// 日本語入力の変換中の ↓ や Enter は IME の操作なので横取りしない。
		// Safari は変換を確定する Enter で isComposing が false になるため、keyCode 229 も見る
		if (e.isComposing || e.keyCode === 229) return;
		const n = suggestions.length;
		switch (e.key) {
			case 'ArrowDown':
			case 'ArrowUp':
				if (!n) return;
				e.preventDefault();
				open = true;
				if (e.key === 'ArrowUp') active = active <= 0 ? n - 1 : active - 1;
				else if (!e.altKey) active = (active + 1) % n;
				break;
			case 'Enter':
				if (!expanded) return;
				e.preventDefault();
				if (active >= 0) add(suggestions[active]);
				else open = false;
				break;
			case 'Escape':
				// 閉じているときだけ入力した文字を消す。選んだ値は消さない。空にすると全候補が一致するため、open も必ず落とす
				if (!expanded) value = '';
				open = false;
				active = -1;
				break;
			case 'Backspace':
				// 文字が残っているときは、ブラウザの文字削除に任せる（APG: 文字編集のキーを JavaScript で奪わない）。
				// 押しっぱなしの繰り返しは無視する。文字を消し切ったあとも押し続けると、選んだ値まで次々に消えてしまうため
				if (value !== '' || !chosen.length) return;
				e.preventDefault();
				if (!e.repeat) remove(chosen[chosen.length - 1]);
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
	<div class="combo">
		<div class="field">
			<!-- 外すボタンは Tab で止まる。矢印キーでしか届かないトークンは、スクリーンリーダーの利用者に気づかれにくい（Primer のアクセシビリティの指摘） -->
			{#if chosen.length}
				<ul role="list" aria-label={text[lang].chosen}>
					{#each chosen as option (option)}
						<li>
							{option}
							<button type="button" aria-label={text[lang].remove(option)} onclick={() => remove(option)}>
								<span aria-hidden="true">×</span>
							</button>
						</li>
					{/each}
				</ul>
			{/if}
			<input
				id="{uid}-input"
				type="text"
				role="combobox"
				autocomplete="off"
				aria-autocomplete="list"
				aria-controls="{uid}-list"
				aria-expanded={expanded}
				aria-activedescendant={expanded && active >= 0 ? `${uid}-option-${active}` : undefined}
				aria-describedby="{uid}-hint"
				bind:value
				oninput={() => {
					open = value !== '';
					active = -1;
					message = '';
				}}
				{onkeydown}
				onblur={() => {
					open = false;
					active = -1;
				}}
				bind:this={input}
			/>
		</div>
		<ul id="{uid}-list" class="options" role="listbox" aria-label={text[lang].label} hidden={!expanded}>
			{#each suggestions as option, i (option)}
				<!-- キーボードでは入力欄側で操作するため、候補はマウス用のクリックだけを持つ -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<li
					id="{uid}-option-{i}"
					role="option"
					aria-selected={i === active}
					onpointerdown={(e) => e.preventDefault()}
					onclick={() => add(option)}
				>
					{option}
				</li>
			{/each}
		</ul>
	</div>
	<p id="{uid}-hint" class="hint">{text[lang].hint}</p>
	<!-- 追加と削除は、フォーカスが入力欄にあるまま変わるため、ライブリージョンで伝える。候補がないときは、開かない一覧の代わりにここへ出す -->
	<p role="status" class:visually-hidden={!noMatch} class:none={noMatch}>{noMatch ? text[lang].none : message}</p>
</div>

<style>
	.demo {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 0.25rem;
		width: min(100%, 20rem);
	}

	label {
		font-size: 0.875rem;
	}

	.combo {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
	}

	.field {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem;
		min-height: 2.75rem;
		padding: 0.25rem 0.4rem;
		border: 1px solid var(--color-muted);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	/* 入力欄だけでなく、トークンを含む欄全体にフォーカスの輪を付ける */
	.field:has(input:focus-visible) {
		outline: 2px solid var(--color-focus-outer);
		outline-offset: 2px;
		box-shadow: 0 0 0 2px var(--color-focus-inner);
	}

	input {
		flex: 1 1 6rem;
		min-width: 0;
		min-height: 2rem;
		padding: 0 0.25rem;
		border: 0;
		background: none;
	}

	/* :has() に対応しないブラウザでは、欄の輪が出ないので、入力欄自身の輪を残す */
	@supports selector(:has(a)) {
		input:focus-visible {
			outline: none;
			box-shadow: none;
		}
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.field ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		min-width: 0;
	}

	.field li {
		display: inline-flex;
		align-items: center;
		gap: 0.2rem;
		padding: 0.1rem 0.2rem 0.1rem 0.6rem;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		background: var(--color-surface);
		font-size: 0.875rem;
		overflow-wrap: anywhere;
	}

	.field button {
		display: grid;
		flex: none;
		place-items: center;
		width: 1.5rem;
		height: 1.5rem;
		padding: 0;
		border: 0;
		border-radius: 50%;
		background: none;
		cursor: pointer;
	}

	.field button:hover {
		background: var(--color-border);
	}

	.options {
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

	.options li {
		padding: 0.25em 0.5em;
		cursor: pointer;
	}

	.options li:hover {
		background: var(--color-surface);
	}

	[aria-selected='true'] {
		background: var(--color-accent);
		color: var(--color-accent-text);
	}

	[aria-selected='true']:hover {
		background: var(--color-accent);
	}

	p {
		margin: 0;
	}

	.hint {
		color: var(--color-muted);
		font-size: 0.8125rem;
	}

	.none {
		color: var(--color-muted);
		font-size: 0.875rem;
	}
</style>
