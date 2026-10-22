import type { ComponentData } from '#lib/types.js';

export default {
	id: 'one-time-code',
	category: 'input',
	names: { en: 'One-time code field', ja: '確認コードの入力' },
	aliases: [{ name: 'Input.OTP', source: 'Ant Design', url: 'https://ant.design/components/input#inputotp' }],
	summary: {
		en: 'A field for a short code sent by text message, email or an app, used once to confirm who is signing in.',
		ja: 'SMS やメール、アプリで届いた1回限りの短いコードを入れて、ログインする人が本人かを確かめる欄。'
	},
	appearance: {
		en: 'A short text box with a label such as “Security code” and a hint saying how the code was sent. Some services draw one box for each digit instead.',
		ja: '「確認コード」のようなラベルと、コードをどの方法で送ったかを伝える補足の文が付いた短い入力欄。数字1桁ごとに枠を並べる作りもある。'
	},
	behavior: [
		{
			en: '`autocomplete="one-time-code"` lets the browser or phone offer the code from the message, and `inputmode="numeric"` brings up a number keypad. The field is a text input, not `type="number"`.',
			ja: '`autocomplete="one-time-code"` を付けると、ブラウザやスマートフォンが届いたコードを入力の候補に出せる。`inputmode="numeric"` で数字のキーボードが出る。欄は `type="number"` ではなくテキスト入力にする。'
		},
		{
			en: 'This demo uses one field, as GOV.UK does, rather than one box per digit. In one field, a pasted or autofilled code goes in whole. Separate boxes fail WCAG when pasting the code fills only the first box.',
			ja: 'このデモは、GOV.UK と同じく、1桁ごとの枠ではなく1つの欄にしている。1つの欄なら、貼り付けたコードも自動入力されたコードもそのまま全部入る。1桁ごとの枠で、貼り付けても最初の枠にしか入らない作りは、WCAG を満たさない。'
		},
		{
			en: 'Spaces and hyphens are allowed and removed before checking, so a code can be entered the way it appears in the message.',
			ja: '空白やハイフンも受け付けて確かめる前に取り除くので、届いたままの形でコードを入力できる。'
		},
		{
			en: 'In this demo, nothing is sent, and any 6 digits are accepted. Pressing Continue with too few or too many digits shows an error below the field, links it with `aria-describedby`, and moves focus to the field. The field has no `maxlength`, so a pasted “123 456” is not cut off.',
			ja: 'このデモでは何も送られず、6桁の数字なら何でも通る。桁が足りないときや多すぎるときに「次へ」を押すと、欄の下にエラーを出して `aria-describedby` でつなぎ、フォーカスを欄へ移す。`maxlength` は付けていないので、貼り付けた「123 456」も途中で切れない。'
		}
	],
	keyboard: [
		{ key: 'Enter', action: { en: 'Submits the form (Continue in this demo).', ja: 'フォームを送信する（このデモでは「次へ」）。' } },
		{ key: 'Tab / Shift + Tab', action: { en: 'Moves focus into or out of the field.', ja: '入力欄へ、または入力欄から移動する。' } },
		{ key: '0–9', action: { en: 'Types the code.', ja: 'コードを入力する。' } }
	],
	variations: [
		{
			name: { en: 'One box per digit', ja: '1桁ごとの枠' },
			description: {
				en: 'A row of boxes, one for each digit, such as Ant Design’s Input.OTP. If used, pasting the whole code into the first box must fill every box, and the boxes need one shared label.',
				ja: 'Ant Design の Input.OTP のように、数字1桁ごとに枠を並べるもの。使うなら、最初の枠にコード全体を貼り付けるとすべての枠が埋まるようにし、枠全体に1つのラベルを付ける。'
			}
		}
	],
	usage: [
		{
			en: 'Say in the hint how the code was sent and how many digits it has. When people are signing in, do not show the phone number it was sent to.',
			ja: '補足の文で、コードをどの方法で送ったかと桁数を伝える。ログインのときは、送り先の電話番号を見せない。'
		},
		{
			en: 'Messages can take a few minutes to arrive. Offer a way to get a new code, and say what to do if the person cannot use their phone.',
			ja: 'メッセージが届くまで数分かかることがある。コードを送り直す手段を用意し、電話を使えない人がどうすればよいかも伝える。'
		},
		{
			en: 'Error messages should say what is wrong with the code, such as too few digits, or that it has expired and a new one was sent.',
			ja: 'エラーメッセージでは、「桁が足りない」「期限が切れたので新しいコードを送った」のように、コードの何が問題かを伝える。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'One box per digit that takes only one character when the code is pasted',
				ja: '1桁ごとの枠で、コードを貼り付けても1文字しか入らない'
			},
			harm: {
				en: 'People cannot paste the code and have to copy it by hand, digit by digit. Some people with cognitive disabilities, such as difficulties with memory or with numbers, cannot retype a one-time code.',
				ja: 'コードを貼り付けられず、1桁ずつ書き写すことになる。記憶や数の扱いに困難があるなど、認知に障害のある人の中には、確認コードを打ち直せない人もいる。'
			},
			instead: {
				en: 'Use one field. If the design needs separate boxes, make a paste into the first box fill all of them.',
				ja: '1つの欄にする。どうしても枠を分けるなら、最初の枠への貼り付けですべての枠が埋まるようにする。'
			}
		}
	],
	related: [
		{
			id: 'text-field',
			diff: {
				en: 'A one-time code field is a text field set up for a short code: numeric keypad, autofill from the message, and spaces allowed.',
				ja: '確認コードの入力は、短いコード向けに整えたテキストフィールドで、数字のキーボードが出て、届いたメッセージから自動で入力でき、空白も受け付ける。'
			}
		},
		{
			id: 'number-input',
			diff: {
				en: 'A one-time code is a string of digits, not a quantity, so it uses a text field with `inputmode="numeric"`; a number input is for values that go up and down.',
				ja: '確認コードは量ではなく数字の並びなので、`inputmode="numeric"` を付けたテキスト入力にする。数値入力は増減させる値に使う。'
			}
		},
		{
			id: 'password-field',
			diff: {
				en: 'A one-time code field takes a code sent for one sign-in and shows it as typed; a password field hides a secret that people choose and keep.',
				ja: '確認コードの入力は、1回のログインのために届いたコードを入れ、文字は隠さない。パスワード入力は、利用者が決めて使い続ける秘密を隠して入れる。'
			}
		}
	],
	sources: [
		{
			label: 'GOV.UK Design System: Confirm a phone number',
			url: 'https://design-system.service.gov.uk/patterns/confirm-a-phone-number/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'GOV.UK Design System: Password input',
			url: 'https://design-system.service.gov.uk/components/password-input/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'MDN: HTML attribute: autocomplete',
			url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete',
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
			label: 'Ant Design: Input',
			url: 'https://ant.design/components/input',
			checkedAt: '2026-10-22'
		}
	]
} satisfies ComponentData;
