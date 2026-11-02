import type { ComponentData } from '#lib/types.js';

export default {
	id: 'token-field',
	category: 'input',
	names: { en: 'Token field', ja: 'トークン入力' },
	aliases: [
		{ name: 'Tag picker', source: 'Fluent UI React v9', url: 'https://fluent2.microsoft.design/components/web/react/core/tagpicker/usage' },
		{ name: 'TextInputWithTokens', source: 'Primer', url: 'https://primer.style/product/components/text-input-with-tokens/' }
	],
	searchTerms: ['タグ入力', '複数選択コンボボックス', 'チップ入力', 'トークンフィールド', 'tags input', 'chip input', 'multi-select combobox'],
	summary: {
		en: 'A text field where each chosen value becomes a removable token, usually with suggestions as you type.',
		ja: '選んだ値が、外せるトークンとして並んでいく入力欄です。たいていは、入力に合わせて候補が出ます。'
	},
	appearance: {
		en: 'Looks like a text field with small rounded labels (tokens) inside it, each with a “×” button, and the text cursor after the last one. More tokens wrap onto new lines and make the field taller. Typing shows a list of suggestions below. This demo is an ingredients field that starts with one token, Garlic.',
		ja: '入力欄の中に、角丸の小さなラベル（トークン）が並び、それぞれに「×」のボタンが付いています。文字を入れるカーソルは最後のトークンの後ろにあります。トークンが増えると次の行に折り返し、欄が高くなります。文字を入力すると、下に候補のリストが出ます。このデモは食材の欄で、最初から「ニンニク」のトークンが1つあります。'
	},
	behavior: [
		{
			en: 'Choosing a suggestion turns it into a token, empties the text field and leaves it ready for the next value. The WAI-ARIA Authoring Practices describe this as a default action for an editable combobox: add the accepted value to a list of message recipients and clear the combobox so another can be added.',
			ja: '候補を選ぶとトークンになり、文字を入れる欄は空に戻って、次の値をすぐ入力できます。WAI-ARIA オーサリング プラクティスは、編集できるコンボボックスの既定の動作として、受け入れた値をメッセージの宛先の一覧に加えてコンボボックスを空にし、続けて追加できるようにする例を挙げています。'
		},
		{
			en: 'Typing narrows the suggestions. Carbon’s filterable multiselect shows the options that start with the typed characters.',
			ja: '入力すると候補が絞り込まれます。Carbon の絞り込めるマルチセレクトは、入力した文字で始まる選択肢を出します。'
		},
		{
			en: 'Each token can be removed with its own button. Backspace removes the last token in both Fluent’s tag picker and Primer’s TextInputWithTokens; Fluent says this should be communicated to the user to avoid confusion, and Primer also puts the removed token’s text back into the input.',
			ja: 'トークンは、それぞれのボタンで外せます。Fluent のタグピッカーと Primer の TextInputWithTokens はどちらも、Backspace で最後のトークンを外します。Fluent は、この動作を利用者に伝えて混乱を避けるよう案内しています。Primer は、外したトークンの文字を入力欄に戻します。'
		},
		{
			en: 'By default the tokens wrap and the field grows. Primer also offers a single line that scrolls sideways, a maximum height that scrolls vertically, and a version that shows only some of the tokens until the input is focused.',
			ja: '既定ではトークンは折り返し、欄が高くなります。Primer には、1行のまま横にスクロールする形、最大の高さを決めて縦にスクロールする形、入力欄にフォーカスがあるときだけすべてのトークンを見せ、ふだんは一部だけを見せる形もあります。'
		},
		{
			en: 'While text is still being composed with an input method (such as for Japanese), the arrow keys, Enter, Esc and Backspace go to the input method and do not move through suggestions, choose one or remove a token.',
			ja: '日本語入力などで変換している間は、矢印キー・Enter・Esc・Backspace は変換の操作に使われ、候補の移動や決定、トークンの削除には使われません。'
		},
		{
			en: 'In this demo, each token is an item of a named list with a real `<button>` whose name includes the value, such as “Remove Garlic”. The buttons are in the Tab order before the text field, so they can be reached without arrow keys.',
			ja: 'このデモでは、トークンは名前の付いたリストの項目で、それぞれに本物の `<button>` があります。ボタンの名前には「ニンニクを外す」のように値を含めます。ボタンは文字を入れる欄より前の Tab の順に並ぶので、矢印キーを使わずに届きます。'
		},
		{
			en: 'In this demo, a chosen value leaves the list of suggestions, and the list closes after each choice. ↓ opens it again. Fluent’s tag picker also closes its dropdown after a click on an item, while Carbon’s multiselect keeps its menu open.',
			ja: 'このデモでは、選んだ値は候補のリストから外れ、選ぶたびにリストが閉じます。↓ でもう一度開きます。Fluent のタグピッカーも項目をクリックするとドロップダウンを閉じますが、Carbon のマルチセレクトはメニューを開いたままにします。'
		},
		{
			en: 'In this demo, focus stays in the text field after a choice, and moves to the text field after a token is removed with its button or with Backspace, so typing can continue. It does not move to a neighbouring token.',
			ja: 'このデモでは、候補を選んだあともフォーカスは文字を入れる欄に残り、ボタンか Backspace でトークンを外したあとも文字を入れる欄に移るので、続けて入力できます。隣のトークンには移りません。'
		},
		{
			en: 'In this demo, Backspace in the empty field removes the last token and nothing else: it does not put the token’s text back, and holding the key removes only one token, so deleting typed text never carries on into the tokens.',
			ja: 'このデモでは、欄が空のときの Backspace は最後のトークンを外すだけで、トークンの文字は戻しません。キーを押し続けても外れるのは1つだけなので、入力した文字を消していく操作がそのままトークンにまで及ぶことはありません。'
		},
		{
			en: 'In this demo, a `role="status"` live region says what was added or removed and how many are chosen, and a line under the field, linked to it with `aria-describedby`, tells people about Backspace. When nothing matches the typed text, the same region says so and the list stays closed.',
			ja: 'このデモでは、`role="status"` のライブリージョンが、追加または削除した値と選択中の数を伝えます。欄の下の1行は `aria-describedby` で結び付けてあり、Backspace の動作を知らせます。入力した文字に合う候補がないときは、同じ領域がそう伝え、リストは開きません。'
		},
		{
			en: 'In this demo, only values in the list can become tokens; typed text that matches nothing is not turned into one. Other token fields accept typed text: Fluent’s tag picker lets people enter their own choice, Apple’s token field for native apps turns typed text into a token when a comma is typed (the app can add shortcuts such as Return), and React Aria’s tag field example turns comma-, space- or newline-separated text into tokens.',
			ja: 'このデモでは、リストにある値だけがトークンになります。何にも合わない入力は、トークンにしません。入力した文字をトークンにするトークン入力もあります。Fluent のタグピッカーは自分の選択肢を入力でき、Apple のネイティブアプリ向けのトークンフィールドはカンマを打つと入力した文字をトークンにし（アプリは Return などの操作を足せます）、React Aria の tag field の例は、カンマ・空白・改行で区切った文字をトークンにします。'
		}
	],
	keyboard: [
		{
			key: 'Tab / Shift + Tab',
			action: {
				en: 'Moves between the remove buttons of the tokens, in order, and the text field. The suggestions are not a tab stop.',
				ja: 'トークンの「外す」ボタンと文字を入れる欄の間を、順に移動します。候補のリストは Tab では止まりません。'
			}
		},
		{
			key: '↓',
			action: {
				en: 'Opens the suggestions and highlights the first one, or highlights the next one.',
				ja: '候補を開いて最初の候補を選びます。開いているときは次の候補を選びます。'
			}
		},
		{
			key: '↑',
			action: {
				en: 'Opens the suggestions and highlights the last one, or highlights the previous one.',
				ja: '候補を開いて最後の候補を選びます。開いているときは前の候補を選びます。'
			}
		},
		{
			key: 'Alt + ↓',
			action: {
				en: 'Opens the suggestions without highlighting one.',
				ja: '候補を選ばずにリストだけを開きます。'
			}
		},
		{
			key: 'Enter',
			action: {
				en: 'Adds the highlighted suggestion as a token, empties the field and closes the list. With none highlighted, it only closes the list.',
				ja: '選んでいる候補をトークンとして加え、入力欄を空にしてリストを閉じます。候補を選んでいないときは、リストを閉じるだけです。'
			}
		},
		{
			key: 'Esc',
			action: {
				en: 'Closes the list. If it is already closed, clears the typed text. The tokens stay.',
				ja: 'リストを閉じます。閉じているときは、入力した文字を消します。トークンは残ります。'
			}
		},
		{
			key: 'Backspace',
			action: {
				en: 'In the empty field, removes the last token. When the field has text, deletes a character as usual. Holding the key removes only one token.',
				ja: '欄が空のときは、最後のトークンを外します。文字があるときは、ふつうに1文字を消します。押し続けても外れるトークンは1つだけです。'
			}
		},
		{
			key: 'Enter / Space',
			action: {
				en: 'On a remove button, removes that token and moves focus to the text field.',
				ja: '「外す」ボタンでは、そのトークンを外し、文字を入れる欄にフォーカスを移します。'
			}
		},
		{
			key: '← / → / Home / End',
			action: {
				en: 'Moves the text cursor and removes the highlight from the suggestions.',
				ja: '入力欄の中でカーソルを動かし、候補の選択を外します。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Tokens beside a text field', ja: 'テキスト入力と並べるトークン' },
			description: {
				en: 'Fluent’s tag picker combines a text input with a dropdown, shows the selections as tags in the input, and wraps them by default. Primer’s TextInputWithTokens is described as an input for a value that is a list, for items that can be added or removed but not edited inline, usually paired with autocomplete. This demo is this kind.',
				ja: 'Fluent のタグピッカーは、テキスト入力とドロップダウンを組み合わせ、選んだものをタグとして入力欄に並べ、既定では折り返します。Primer の TextInputWithTokens は、値が一覧になる入力欄とされ、入力欄の中で編集はできず、追加と削除ができる項目のためのもので、たいていはオートコンプリートと組み合わせます。このデモはこの形です。'
			}
		},
		{
			name: { en: 'Tokens made from typed text', ja: '入力した文字からできるトークン' },
			description: {
				en: 'Apple’s token field, AppKit’s NSTokenField in native apps, turns the text people type into tokens that can be selected, dragged to reorder, or moved into another field; Mail’s address fields are the example. A token can carry a context menu, and suggestions can appear as people type.',
				ja: 'Apple のトークンフィールド（ネイティブアプリの AppKit の NSTokenField）は、入力した文字を、選んだり、ドラッグして並べ替えたり、別の欄へ移したりできるトークンにします。例は「メール」の宛先の欄です。トークンにはコンテキストメニューを付けられ、入力に合わせて候補を出すこともできます。'
			}
		},
		{
			name: { en: 'Tokens among running text', ja: '文章の中に混ざるトークン' },
			description: {
				en: 'React Aria’s TokenField, which is marked alpha, holds a sequence of text and token segments. Its examples tokenize #hashtags and @usernames in a message, complete @mentions and slash commands, and build structured search queries, besides tag inputs and multi-select comboboxes.',
				ja: 'React Aria の TokenField（alpha 版とされています）は、文字とトークンが連なった値を扱います。例として、メッセージの中の #ハッシュタグ や @ユーザー名 をトークンにするもの、@メンションやスラッシュコマンドを補うもの、構造のある検索条件を作るものがあり、タグ入力や複数選択のコンボボックスもその一つです。'
			}
		},
		{
			name: { en: 'A count instead of tokens', ja: 'トークンの代わりの件数' },
			description: {
				en: 'Carbon’s multiselect puts a checkbox in front of each option, keeps the menu open while people choose, and shows one tag in the field with the number of selected options and an “x” that clears them all.',
				ja: 'Carbon のマルチセレクトは、選択肢ごとにチェックボックスを置き、選んでいる間もメニューを開いたままにします。欄には、選んだ件数と、すべてを外す「x」の付いたタグが1つ出ます。'
			}
		},
		{
			name: { en: 'A clear-all action', ja: 'すべてを外す操作' },
			description: {
				en: 'Fluent’s tag picker has a secondary action slot for extra functionality, with “Clear all” as its example.',
				ja: 'Fluent のタグピッカーには、補助の操作を置く場所があり、例として「すべて消去」を挙げています。'
			}
		}
	],
	usage: [
		{
			en: 'Use it when people choose several values and typing helps them find each one, such as the recipients of a message. Carbon’s filterable multiselect narrows a long list of options by typing. Carbon lists checkboxes for choosing several options from a list.',
			ja: '複数の値を選ぶもので、入力すると探しやすくなるときに使います。たとえば、メッセージの宛先です。Carbon の絞り込めるマルチセレクトは、入力で長い選択肢の一覧を絞り込みます。Carbon は、一覧から複数を選ぶものとして、チェックボックスを挙げています。'
		},
		{
			en: 'Check the status and the platform of each source. Apple’s page is guidance for native apps: its example is Mail, it links AppKit’s NSTokenField, and it says token fields are not supported in iOS, iPadOS, tvOS, visionOS or watchOS. Its drag-to-reorder, context menu and comma conversion do not carry over to the web by themselves. Primer’s TextInputWithTokens is deprecated, and its accessibility page says not to use it until the issues are resolved. React Aria’s TokenField is marked alpha.',
			ja: '資料ごとに、状態と対象の環境を確かめます。Apple のページはネイティブアプリ向けの指針です。例は「メール」で、AppKit の NSTokenField にリンクし、トークンフィールドは iOS、iPadOS、tvOS、visionOS、watchOS では使えないとしています。そのため、ドラッグでの並べ替え、コンテキストメニュー、カンマでの変換は、そのままウェブに当てはまるわけではありません。Primer の TextInputWithTokens は非推奨で、アクセシビリティのページは、問題が解決するまで使わないよう案内しています。React Aria の TokenField は alpha 版とされています。'
		},
		{
			en: 'Make the tokens easy to find and operate. Primer’s accessibility page faults its component for tokens that can be reached only with arrow keys at the start of the input and for giving screen reader users no sign that tokens exist. A real button on each token, a named list of them and a status message avoid both.',
			ja: 'トークンを見つけやすく、操作しやすくします。Primer のアクセシビリティのページは、入力欄の先頭で矢印キーを使わないと届かないことと、トークンがあることがスクリーンリーダーの利用者に伝わらないことを、問題として挙げています。トークンごとの本物のボタン、名前の付いたリスト、状況を伝えるメッセージを置けば、どちらも避けられます。'
		},
		{
			en: 'Give the input an accessible name. Fluent says to set `aria-label` on its TagPickerInput so screen readers know what the input is for; this demo uses a visible label.',
			ja: '入力欄に、アクセシブルな名前を付けます。Fluent は、入力欄の目的をスクリーンリーダーに伝えるため、TagPickerInput に `aria-label` を付けるよう案内しています。このデモは、見えるラベルを使っています。'
		},
		{
			en: 'Say what was added or removed without moving focus. WCAG 4.1.3 asks for status messages that assistive technology can announce without taking focus, and the `status` role is a live region with an implicit `aria-live` of polite. A result such as “Added Basil” or “No results returned” is the kind of message it covers.',
			ja: '追加や削除は、フォーカスを動かさずに伝えます。WCAG 4.1.3 は、フォーカスを奪わずに支援技術が読み上げられる状況メッセージを求めています。`status` ロールは、`aria-live` が暗黙で polite のライブリージョンです。「バジルを追加しました」や「結果がありません」のようなメッセージが、その対象にあたります。'
		},
		{
			en: 'Keep the buttons out of the popup. The WAI-ARIA Authoring Practices say a listbox does not provide an accessible way to present interactive elements such as buttons, so the remove buttons sit on the tokens beside the input, not among the options. The popup can be a listbox, and the Combobox Pattern covers the input and popup.',
			ja: 'ボタンはポップアップの中に入れません。WAI-ARIA オーサリング プラクティスは、リストボックスではボタンのような操作できる要素を、アクセシブルに見せる方法がないとしています。そのため「外す」ボタンは、選択肢の中ではなく、入力欄のそばのトークンに置きます。ポップアップはリストボックスにでき、入力欄とポップアップはコンボボックスのパターンが扱います。'
		},
		{
			en: 'For tokens without an input, see React Aria’s TagGroup: a focusable list of labels with keyboard navigation, selection and removal.',
			ja: '入力欄のないトークンは、React Aria の TagGroup を参照します。キーボードで移動でき、選択と削除ができる、フォーカスできるラベルの一覧です。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Letting the tokens be reached only with arrow keys from the start of the input',
				ja: 'トークンに、入力欄の先頭から矢印キーでしか届かないようにする'
			},
			harm: {
				en: 'Primer’s accessibility page says this is not intuitive for keyboard, voice control and screen reader users, and that screen reader users get no sign that tokens are present and so are unlikely to find them.',
				ja: 'Primer のアクセシビリティのページは、キーボード、音声コントロール、スクリーンリーダーの利用者にとって直感的でないと述べています。スクリーンリーダーの利用者には、トークンがあることが伝わらず、見つけにくくなります。'
			},
			instead: {
				en: 'Give each token a real button in the Tab order, put the tokens in a named list, and announce additions and removals in a status message.',
				ja: 'トークンごとに本物のボタンを Tab の順に置き、トークンを名前の付いたリストに入れ、追加と削除は状況メッセージで伝えます。'
			}
		},
		{
			pattern: {
				en: 'Removing the last token with Backspace without telling anyone',
				ja: 'Backspace で最後のトークンを外すことを、だれにも知らせない'
			},
			harm: {
				en: 'Fluent says pressing Backspace removes the last tag in its tag picker and that this behavior should be communicated to the user to avoid confusion.',
				ja: 'Fluent は、タグピッカーでは Backspace で最後のタグが外れるとし、混乱を避けるため、この動作を利用者に伝えるよう案内しています。'
			},
			instead: {
				en: 'Say it in text next to the field, and announce each removal in a status message.',
				ja: '欄のそばの文でそう伝え、外すたびに状況メッセージで知らせます。'
			}
		}
	],
	related: [
		{
			id: 'combobox',
			diff: {
				en: 'A token field keeps several chosen values as removable tokens and empties the input after each choice; a combobox puts a single value into the field.',
				ja: 'トークン入力は選んだ複数の値を外せるトークンとして残し、選ぶたびに入力欄を空にします。コンボボックスは1つの値を入力欄に入れます。'
			}
		},
		{
			id: 'listbox',
			diff: {
				en: 'A token field lets people type to narrow the options and shows only the chosen values as tokens; a listbox shows its options in one list and has no text field to type in.',
				ja: 'トークン入力は入力で選択肢を絞り込み、選んだ値だけをトークンとして見せます。リストボックスは選択肢を1つの一覧で見せ、入力する欄はありません。'
			}
		},
		{
			id: 'tag',
			diff: {
				en: 'A token field is an input that makes removable tokens from what people choose; a tag is the label itself and takes no input.',
				ja: 'トークン入力は、選んだものから外せるトークンを作る入力欄です。タグはラベルそのもので、入力は受け付けません。'
			}
		},
		{
			id: 'checkbox',
			diff: {
				en: 'A token field picks several values from a long or open-ended list by typing; checkboxes show every option at once.',
				ja: 'トークン入力は長い一覧や決まっていない候補から入力で複数の値を選び、チェックボックスはすべての選択肢を一度に見せます。'
			}
		},
		{
			id: 'select',
			diff: {
				en: 'A token field lets people type to choose several values and shows each as a removable token; a select shows the chosen option in a closed box until it is opened.',
				ja: 'トークン入力は入力で複数の値を選び、それぞれを外せるトークンとして見せます。セレクトボックスは開くまで、選んだ値を閉じた箱の中にしか見せません。'
			}
		}
	],
	sources: [
		{
			label: 'Fluent 2: Tag picker',
			url: 'https://fluent2.microsoft.design/components/web/react/core/tagpicker/usage',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Primer: TextInputWithTokens',
			url: 'https://primer.style/product/components/text-input-with-tokens/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Primer: TextInputWithTokens (guidelines)',
			url: 'https://primer.style/product/components/text-input-with-tokens/guidelines/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Primer: TextInputWithTokens (accessibility)',
			url: 'https://primer.style/product/components/text-input-with-tokens/accessibility/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Apple Human Interface Guidelines: Token fields',
			url: 'https://developer.apple.com/design/human-interface-guidelines/token-fields',
			checkedAt: '2026-11-02'
		},
		{
			label: 'React Aria: TokenField',
			url: 'https://react-aria.adobe.com/TokenField',
			checkedAt: '2026-11-02'
		},
		{
			label: 'React Aria: TagGroup',
			url: 'https://react-aria.adobe.com/TagGroup',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Carbon Design System: Dropdown (usage)',
			url: 'https://carbondesignsystem.com/components/dropdown/usage/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'WAI-ARIA APG: Combobox Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'WAI-ARIA APG: Editable Combobox With List Autocomplete Example',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'WAI-ARIA APG: Listbox Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/listbox/',
			checkedAt: '2026-11-02'
		},
		{
			label: 'Understanding Success Criterion 4.1.3: Status Messages (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html',
			checkedAt: '2026-11-02'
		},
		{
			label: 'MDN: ARIA status role',
			url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role',
			checkedAt: '2026-11-02'
		}
	]
} satisfies ComponentData;
