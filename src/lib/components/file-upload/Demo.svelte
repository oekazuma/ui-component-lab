<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Attachments',
			hint: 'PDF, PNG or JPEG, up to 10 MB each. Or drag and drop files into this area.',
			none: 'No files selected.',
			remove: 'Remove',
			chosen: (n: number) => `${n} ${n === 1 ? 'file' : 'files'} selected`
		},
		ja: {
			label: '添付ファイル',
			hint: 'PDF・PNG・JPEG、1ファイル10MBまで。または、このエリア内にドラッグ＆ドロップしてください。',
			none: '未選択',
			remove: '解除',
			chosen: (n: number) => `${n}件のファイルを選択中`
		}
	};

	const uid = $props.id();
	let input: HTMLInputElement;
	let files = $state<FileList>();
	let dragging = $state(false);

	// FileList は直接書き換えられないため、残すファイルだけで DataTransfer から作り直す
	function remove(index: number) {
		const dt = new DataTransfer();
		Array.from(files ?? []).forEach((f, i) => i !== index && dt.items.add(f));
		files = dt.files;
		input.focus();
	}
</script>

<!-- ネイティブの <input type="file"> がファイル選択ボタンとドロップ先を兼ねる。
	ドラッグできない人もいるため、ボタンなしのドロップエリアだけにはしない -->
<div class="demo">
	<label for="{uid}-input">{text[lang].label}</label>
	<p id="{uid}-hint" class="hint">{text[lang].hint}</p>
	<div
		class="drop"
		class:dragging
		role="presentation"
		ondragover={(e) => {
			e.preventDefault();
			dragging = true;
		}}
		ondragleave={(e) => {
			if (!e.currentTarget.contains(e.relatedTarget as Node)) dragging = false;
		}}
		ondrop={(e) => {
			// 枠の余白に落としてもブラウザがファイルを開いてしまわないよう、ここで受け取る
			e.preventDefault();
			dragging = false;
			if (e.dataTransfer?.files.length) files = e.dataTransfer.files;
		}}
	>
		<input
			bind:this={input}
			id="{uid}-input"
			type="file"
			multiple
			accept=".pdf,.png,.jpg,.jpeg"
			aria-describedby="{uid}-hint"
			bind:files
		/>
	</div>
	<p aria-live="polite">{files?.length ? text[lang].chosen(files.length) : text[lang].none}</p>
	{#if files?.length}
		<ol>
			{#each Array.from(files) as file, i (file)}
				<li>
					<span>{file.name}（{Math.ceil(file.size / 1024)} KB）</span>
					<button type="button" class="btn" onclick={() => remove(i)}>
						{text[lang].remove}<span class="visually-hidden">: {file.name}</span>
					</button>
				</li>
			{/each}
		</ol>
	{/if}
</div>

<style>
	.demo {
		display: grid;
		gap: 0.25rem;
		width: min(100%, 22rem);
	}

	label {
		font-size: 0.875rem;
	}

	p,
	ol {
		margin: 0;
		font-size: 0.875rem;
	}

	.hint {
		color: var(--color-muted);
	}

	.drop {
		padding: 1rem;
		border: 2px dashed var(--color-border);
		border-radius: var(--radius);
		background: var(--color-bg);
	}

	.dragging {
		border-color: var(--color-accent);
		background: var(--color-surface);
	}

	input {
		max-width: 100%;
	}

	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.25rem 0;
		overflow-wrap: anywhere;
	}

	li .btn {
		padding: 0.1em 0.6em;
		font-size: 0.8125rem;
	}
</style>
