<script lang="ts">
	import type { Lang } from '#lib/types.js';

	let { lang }: { lang: Lang } = $props();

	const text = {
		en: {
			label: 'Attachments',
			hint: 'PDF, PNG or JPEG, up to 10 MB each. Or drag and drop files into this area.',
			none: 'No files selected.',
			remove: 'Remove',
			chosen: (n: number) => `${n} ${n === 1 ? 'file' : 'files'} selected`,
			hasErrors: 'Some of the chosen files have errors. Check the files marked below.',
			badType: '* Only PDF, PNG or JPEG files can be chosen.',
			tooLarge: '* This file is larger than 10 MB.',
			size: (s: string) => ` (${s})`,
			unit: ' '
		},
		ja: {
			label: '添付ファイル',
			hint: 'PDF・PNG・JPEG、1ファイル10MBまで。または、このエリア内にドラッグ＆ドロップしてください。',
			none: '未選択',
			remove: '解除',
			chosen: (n: number) => `${n}件のファイルを選択中`,
			hasErrors: '選択したファイルにエラーがあります。該当するファイルを確認してください。',
			badType: '＊PDF・PNG・JPEG形式のファイルだけが選択できます。',
			tooLarge: '＊ファイルサイズが10MBを超えています。',
			size: (s: string) => `（${s}）`,
			unit: ''
		}
	};

	const accept = ['.pdf', '.png', '.jpg', '.jpeg'];
	const maxSize = 10 * 1024 * 1024;

	// accept は選択画面の絞り込みにすぎず、ドロップには効かない。大きさもブラウザは見ないため、ここで確かめる
	function errorsOf(file: File) {
		const ext = file.name.match(/\.[^.]+$/)?.[0].toLowerCase() ?? '';
		return [
			...(accept.includes(ext) ? [] : [text[lang].badType]),
			...(file.size > maxSize ? [text[lang].tooLarge] : [])
		];
	}

	function formatSize(bytes: number) {
		const mb = bytes / 1024 / 1024;
		return mb >= 1
			? `${Number(mb.toFixed(1))}${text[lang].unit}MB`
			: `${Math.ceil(bytes / 1024)}${text[lang].unit}KB`;
	}

	const uid = $props.id();
	let input: HTMLInputElement;
	let files = $state<FileList>();
	let dragging = $state(false);
	let rows = $derived(Array.from(files ?? []).map((file) => ({ file, errors: errorsOf(file) })));
	let hasErrors = $derived(rows.some((r) => r.errors.length));

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
		class:invalid={hasErrors}
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
			accept={accept.join(',')}
			aria-describedby={hasErrors ? `${uid}-hint ${uid}-errors` : `${uid}-hint`}
			bind:files
		/>
	</div>
	<!-- DADS どおり、選んだ件数の次の行に全体のエラー文を置き、各行のファイル名の下にそのファイルのエラー文を置く -->
	<div aria-live="polite">
		<p>{files?.length ? text[lang].chosen(files.length) : text[lang].none}</p>
		{#if hasErrors}
			<p id="{uid}-errors" class="error">{text[lang].hasErrors}</p>
		{/if}
	</div>
	{#if rows.length}
		<ol>
			{#each rows as { file, errors }, i (file)}
				<li>
					<div>
						<span>{file.name}{text[lang].size(formatSize(file.size))}</span>
						{#each errors as error (error)}
							<p class="error">{error}</p>
						{/each}
					</div>
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
		/* 自動幅の列はファイル入力の最小幅（ボタン＋ファイル名）より縮まず、カードからはみ出すため 0 まで縮める */
		grid-template-columns: minmax(0, 1fr);
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

	.error {
		color: var(--color-danger);
	}

	.drop.invalid {
		border-color: var(--color-danger);
	}

	.drop.dragging {
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
