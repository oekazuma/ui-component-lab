import type { ComponentData } from '#lib/types.js';

export default {
	id: 'command-palette',
	category: 'overlay',
	names: { en: 'Command palette', ja: 'コマンドパレット' },
	aliases: [],
	summary: {
		en: 'A dialog with a search field that narrows a list of commands or pages as you type, then runs or opens the chosen one.',
		ja: '検索欄に入力すると操作やページの一覧が絞り込まれ、選んだものを実行したり開いたりするダイアログ。'
	},
	appearance: {
		en: 'A box in the middle of the screen, over a dimmed page, with a large search field at the top and a list of commands below it. The highlighted command is shaded.',
		ja: '暗くしたページの上、画面の中ほどに箱が出る。上に大きな検索欄、その下に操作の一覧があり、選んでいる操作に色が付く。'
	},
	behavior: [
		{
			en: 'This site’s header search (“Search by name”, opened with ⌘K or Ctrl + K) is a command palette whose commands open the component pages.',
			ja: 'このサイトのヘッダーの検索窓（「名前で検索」。⌘K か Ctrl + K で開く）がこの部品で、選ぶと部品のページを開く。'
		},
		{
			en: 'It is a modal dialog that holds a combobox. Typing narrows the list, and the arrow keys highlight a command while focus stays in the field; `aria-activedescendant` tells screen readers which command is highlighted.',
			ja: 'コンボボックスを入れたモーダルダイアログ。入力すると一覧が絞り込まれ、矢印キーで操作を選ぶ間もフォーカスは入力欄に残る。選んでいる操作は `aria-activedescendant` でスクリーンリーダーに伝える。'
		},
		{
			en: 'The list is shown the whole time the palette is open, so the field keeps `aria-expanded="true"`.',
			ja: '開いている間は一覧を常に表示するので、入力欄の `aria-expanded` は `true` のままにする。'
		},
		{
			en: 'A native `<dialog>` opened with `showModal()` makes the rest of the page inert, moves focus to the field, and closes with Esc. In this demo, focus then goes back to the button that opened it.',
			ja: 'ネイティブの `<dialog>` を `showModal()` で開くと、ページのほかの部分が操作できなくなり、フォーカスが入力欄へ移り、Esc で閉じる。このデモでは、閉じると開いたボタンへフォーカスが戻る。'
		},
		{
			en: 'Command palettes are often opened with ⌘K or Ctrl + K. This demo opens only with its button, so that it does not clash with the site’s own shortcut. Its commands only show which one was run.',
			ja: 'コマンドパレットは ⌘K や Ctrl + K で開くことが多い。このデモはサイト自身のショートカットとぶつからないよう、ボタンでだけ開く。操作を選んでも、選んだ操作を表示するだけ。'
		},
		{
			en: 'While text is still being composed with an input method (such as for Japanese), the arrow keys and Enter go to the input method and do not move through or run commands.',
			ja: '日本語入力などで変換している間は、矢印キーと Enter は変換の操作に使われ、操作の移動や実行には使われない。'
		}
	],
	keyboard: [
		{
			key: 'Enter',
			action: {
				en: 'On the button, opens the palette. In the palette, runs the highlighted command and closes it.',
				ja: 'ボタンでは、パレットを開く。パレットでは、選んでいる操作を実行して閉じる。'
			}
		},
		{
			key: '↑ / ↓',
			action: {
				en: 'Highlights the previous / next command. From the first it goes to the last, and from the last to the first.',
				ja: '前・次の操作を選ぶ。最初からは最後へ、最後からは最初へ回る。'
			}
		},
		{
			key: 'Esc',
			action: {
				en: 'Closes the palette without running anything and returns focus to the button.',
				ja: '何も実行せずにパレットを閉じ、ボタンへフォーカスを戻す。'
			}
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Opening the palette with a single character key, such as / or K on its own',
				ja: '/ や K だけのように、1文字のキーでパレットを開く'
			},
			harm: {
				en: 'People who use speech input can open it by accident, because what they say is typed as letters. Keyboard users who press a key by mistake, including people with limited dexterity, lose their place when focus jumps to the palette.',
				ja: '音声入力を使う人は、話した言葉が文字として入力されるため、意図せず開いてしまう。手の動きに制約のある人など、キーを押し間違えたキーボード利用者は、フォーカスがパレットへ移って作業の場所を見失う。'
			},
			instead: {
				en: 'Use a shortcut with a modifier key, such as ⌘K or Ctrl + K. If a single character key is used, let people turn it off or change it to include a modifier key.',
				ja: '⌘K や Ctrl + K のように、修飾キーを含むショートカットにする。1文字のキーを使うなら、無効にしたり修飾キーを含むキーに変えたりできるようにする。'
			}
		}
	],
	related: [
		{
			id: 'combobox',
			diff: {
				en: 'A command palette puts a combobox in a dialog and runs or opens the chosen item; a combobox puts the chosen value into the field.',
				ja: 'コマンドパレットはコンボボックスをダイアログに入れ、選んだものを実行したり開いたりする。コンボボックスは選んだ値を入力欄に入れる。'
			}
		},
		{
			id: 'search-field',
			diff: {
				en: 'A command palette narrows a list as you type and goes straight to the chosen item; a search field sends the typed words and shows the results on a page.',
				ja: 'コマンドパレットは入力に合わせて一覧を絞り込み、選んだものへ直接移る。検索ボックスは入力した語を送り、結果をページに出す。'
			}
		},
		{
			id: 'modal',
			diff: {
				en: 'A command palette is a modal dialog that holds only a search field and a list of commands; a modal can hold any content.',
				ja: 'コマンドパレットは検索欄と操作の一覧だけを持つモーダルダイアログで、モーダルはどんな内容でも持てる。'
			}
		}
	],
	sources: [
		{
			label: 'WAI-ARIA APG: Combobox Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'MDN: <dialog>',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog',
			checkedAt: '2026-10-22'
		},
		{
			label: 'React Aria: Autocomplete',
			url: 'https://react-aria.adobe.com/Autocomplete',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Understanding Success Criterion 2.1.4: Character Key Shortcuts (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html',
			checkedAt: '2026-10-22'
		}
	]
} satisfies ComponentData;
