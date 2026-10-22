import type { ComponentData } from '#lib/types.js';

export default {
	id: 'password-field',
	category: 'input',
	names: { en: 'Password field', ja: 'パスワード入力' },
	aliases: [
		{ name: 'Password input', source: 'GOV.UK Design System', url: 'https://design-system.service.gov.uk/components/password-input/' },
		{ name: 'Password input', source: 'Carbon Design System', url: 'https://carbondesignsystem.com/components/text-input/usage/#password-input' },
		{ name: 'Input.Password', source: 'Ant Design', url: 'https://ant.design/components/input#inputpassword' }
	],
	summary: {
		en: 'A field for a password that hides what is typed, with a button to show it.',
		ja: '入力した文字を伏せ字で隠し、ボタンで表示もできるパスワードの欄。'
	},
	appearance: {
		en: 'A text box with a label above it, where each character typed appears as a dot. A “Show” button sits next to or inside the box.',
		ja: '上にラベルのある入力欄で、入力した文字は1文字ずつ黒丸で表示される。欄の横か中に「表示」ボタンがある。'
	},
	behavior: [
		{
			en: 'The password is hidden at first, because people may not be somewhere private. Pressing Show changes the field to plain text so they can check what they typed, and the button becomes Hide.',
			ja: '人目のある場所で使うこともあるので、最初は隠しておく。「表示」を押すと普通の文字で表示され、入力を確かめられる。ボタンは「隠す」に変わる。'
		},
		{
			en: 'The button’s text changes between Show and Hide, so it does not use `aria-pressed`: the APG Button pattern uses `aria-pressed` only when the label stays the same. The button names its field with `aria-label`, such as “Show password”, and a polite live region says whether the password is now visible.',
			ja: 'ボタンの文言が「表示」と「隠す」で入れ替わるので、`aria-pressed` は付けない。APG の Button パターンでは、`aria-pressed` はラベルを変えないときに使う。ボタンには「パスワードを表示」のように欄の名前を含めた `aria-label` を付け、表示したかどうかを `aria-live="polite"` の領域で知らせる。'
		},
		{
			en: 'Use `autocomplete="current-password"` when signing in, and `autocomplete="new-password"` when creating or changing a password. With `new-password`, the browser does not fill in a saved password and can suggest a strong one.',
			ja: 'ログインでは `autocomplete="current-password"`、パスワードを作るときや変えるときは `autocomplete="new-password"` を付ける。`new-password` なら、ブラウザは保存済みのパスワードを入れず、強いパスワードを提案できる。'
		},
		{
			en: '`spellcheck="false"` and `autocapitalize="off"` stop the browser from checking or changing the text. Some spellcheck tools send what is typed to a server.',
			ja: '`spellcheck="false"` と `autocapitalize="off"` で、ブラウザが文字を校正したり大文字に変えたりしないようにする。校正の機能には、入力をサーバーへ送るものがある。'
		},
		{
			en: 'Browsers, password managers and screen readers can add their own Show buttons, or reveal the password by other means, so the button text may not always match what is on screen.',
			ja: 'ブラウザやパスワードマネージャー、スクリーンリーダーが独自の表示ボタンを足したり、別の方法で表示を切り替えたりするので、ボタンの文言と実際の表示が食い違うことがある。'
		},
		{
			en: 'In this demo, the field is for creating a password, so it uses `new-password`. Pressing Save hides the password again before saving, so the browser does not offer it as a suggestion in other fields. With fewer than 8 characters, an error appears below the field. The password is not sent or kept anywhere.',
			ja: 'このデモはパスワードを作る欄なので `new-password` を付けている。「保存」を押すと、ブラウザがほかの欄の入力候補として覚えないよう、表示していたパスワードを隠してから保存する。8文字未満なら欄の下にエラーを出す。パスワードはどこにも送らず、残さない。'
		}
	],
	keyboard: [
		{
			key: 'Enter',
			action: {
				en: 'In the field, submits the form (Save in this demo). On the Show / Hide button, shows or hides the password.',
				ja: '入力欄では、フォームを送信する（このデモでは「保存」）。「表示」「隠す」ボタンでは、パスワードを表示する、または隠す。'
			}
		},
		{
			key: 'Space',
			action: { en: 'On the Show / Hide button, shows or hides the password.', ja: '「表示」「隠す」ボタンで、パスワードを表示する、または隠す。' }
		},
		{
			key: 'Tab / Shift + Tab',
			action: { en: 'Moves between the field and the Show / Hide button.', ja: '入力欄と「表示」「隠す」ボタンの間を移動する。' }
		}
	],
	usage: [
		{
			en: 'A Show button lets people check what they typed, so there is no need for a second “Confirm password” field.',
			ja: '「表示」ボタンで入力を確かめられるので、確認のための2つ目のパスワード欄は要らない。'
		},
		{
			en: 'When there are several password fields, give each Show button a different name, such as “Show password” and “Show new password”.',
			ja: 'パスワードの欄が複数あるときは、「パスワードを表示」「新しいパスワードを表示」のように、表示ボタンごとに違う名前を付ける。'
		},
		{
			en: 'Set a minimum length of at least 8 characters and no maximum. State any rules about characters before people type.',
			ja: '最小の長さは8文字以上にし、最大の長さは決めない。使える文字に決まりがあれば、入力の前に示す。'
		},
		{
			en: 'When sign-in fails, do not say whether the username or the password was wrong, and clear the password field. Saying which was wrong helps attackers.',
			ja: 'ログインに失敗したときは、ユーザー名とパスワードのどちらが違ったかを伝えず、パスワードの欄を空にする。どちらが違ったかを伝えると、不正にログインしようとする人の手がかりになる。'
		},
		{
			en: 'Use this field only for passwords. For codes sent by text message or for other secret answers, use a text field.',
			ja: 'この欄はパスワードにだけ使う。SMS で届く確認コードや、ほかの秘密の答えには、テキストフィールドを使う。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Blocking paste into the password field',
				ja: 'パスワードの欄への貼り付けを禁止する'
			},
			harm: {
				en: 'People cannot paste from a password manager and have to type the password from memory or copy it character by character. This is hard for people with cognitive disabilities, such as difficulties with memory or reading.',
				ja: 'パスワードマネージャーから貼り付けられず、パスワードを思い出して入力するか、1文字ずつ書き写すことになる。記憶や読むことに困難があるなど、認知に障害のある人には難しい。'
			},
			instead: {
				en: 'Allow paste, and set the right `autocomplete` value so browsers and password managers can fill the field.',
				ja: '貼り付けを許し、ブラウザやパスワードマネージャーが入力できるよう、適切な `autocomplete` の値を付ける。'
			}
		},
		{
			pattern: {
				en: 'Limiting the length with `maxlength`',
				ja: '`maxlength` で長さを打ち切る'
			},
			harm: {
				en: 'A password pasted or filled in by a password manager is cut off, and nothing tells people that it was.',
				ja: '貼り付けたパスワードや、パスワードマネージャーが入れたパスワードが途中で切れても、利用者には何の知らせもない。'
			},
			instead: {
				en: 'Do not set a maximum. If one is truly needed, let people type past it and say so in an error message.',
				ja: '最大の長さは決めない。どうしても要るなら、超えても入力できるようにし、超えたことをエラーメッセージで伝える。'
			}
		}
	],
	related: [
		{
			id: 'text-field',
			diff: {
				en: 'A password field hides what is typed and has a button to show it; a text field always shows the text.',
				ja: 'パスワード入力は入力した文字を隠し、表示するボタンが付く。テキストフィールドは文字を常に見せる。'
			}
		},
		{
			id: 'one-time-code',
			diff: {
				en: 'A password field takes a secret that people choose and keep; a one-time code field takes a short code sent to them for one sign-in, and shows it as typed.',
				ja: 'パスワード入力は利用者が決めて使い続ける秘密を入れる。確認コードの入力は、1回のログインのために届いた短いコードを入れ、文字は隠さない。'
			}
		}
	],
	sources: [
		{
			label: 'GOV.UK Design System: Password input',
			url: 'https://design-system.service.gov.uk/components/password-input/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'GOV.UK Frontend: password-input.mjs',
			url: 'https://github.com/alphagov/govuk-frontend/blob/main/packages/govuk-frontend/src/govuk/components/password-input/password-input.mjs',
			checkedAt: '2026-10-22'
		},
		{
			label: 'GOV.UK Design System: Ask users for passwords',
			url: 'https://design-system.service.gov.uk/patterns/passwords/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'WAI-ARIA APG: Button Pattern',
			url: 'https://www.w3.org/WAI/ARIA/apg/patterns/button/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Understanding Success Criterion 3.3.8: Accessible Authentication (Minimum) (WCAG 2.2)',
			url: 'https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html',
			checkedAt: '2026-10-22'
		},
		{
			label: 'WCAG 2.2 Techniques: F109: Failure of Success Criterion 3.3.8 and 3.3.9 due to preventing password or code re-entry in the same format',
			url: 'https://www.w3.org/WAI/WCAG22/Techniques/failures/F109',
			checkedAt: '2026-10-22'
		},
		{
			label: 'MDN: HTML attribute: autocomplete',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Carbon Design System: Text input',
			url: 'https://carbondesignsystem.com/components/text-input/usage/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Ant Design: Input',
			url: 'https://ant.design/components/input',
			checkedAt: '2026-10-22'
		}
	]
} satisfies ComponentData;
