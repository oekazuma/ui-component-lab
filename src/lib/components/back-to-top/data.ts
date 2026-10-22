import type { ComponentData } from '#lib/types.js';

export default {
	id: 'back-to-top',
	category: 'navigation',
	names: { en: 'Back to top button', ja: 'スクロールトップボタン' },
	aliases: [
		{ name: 'スクロールトップボタン', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/scroll-top-button/' }
	],
	summary: {
		en: 'A button that returns a long page to its top in one step.',
		ja: '長いページの先頭へ、ひと操作で戻るためのボタンです。'
	},
	appearance: {
		en: 'A small button with an upward arrow and a label such as “Back to top”, usually in the lower right corner of the screen. It often appears only after the page has been scrolled down.',
		ja: '上向きの矢印と「ページの先頭へ」のようなラベルを付けた小さなボタンで、多くは画面の右下の隅にあります。ページを下までスクロールしてから現れることが多いです。'
	},
	behavior: [
		{
			en: 'Pressing it scrolls back to the top of the page.',
			ja: '押すと、ページの先頭までスクロールして戻ります。'
		},
		{
			en: 'The browser already does the same with the Home key, and Safari on iPhone does it when the status bar at the top of the screen is tapped.',
			ja: 'ブラウザでは、すでに Home キーで同じことができます。iPhone の Safari では、画面上端のステータスバーをタップしても同じことができます。'
		},
		{
			en: 'In this demo, the article scrolls inside its own box so the page stays still, and it starts partway down. The button stays in the lower right of the box, appears only after scrolling about half the height of the box, and moves focus to the article’s title when pressed, so the next Tab starts from the top instead of from the hidden button.',
			ja: 'このデモでは、ページを動かさないよう、記事を専用の枠の中でスクロールさせ、途中までスクロールした状態で始めます。ボタンは枠の右下にとどまり、枠の高さの半分ほどスクロールしてから現れます。押すと記事のタイトルへフォーカスを移し、次に Tab キーを押したとき、消えたボタンの位置からではなく先頭から移るようにしています。'
		},
		{
			en: 'In this demo, the box itself can take focus, so with focus in the box, Home and End also scroll it to the start and the end.',
			ja: 'このデモでは枠そのものにもフォーカスでき、枠にフォーカスがあるときは Home キーと End キーでも先頭と末尾へスクロールします。'
		}
	],
	keyboard: [
		{ key: 'Enter / Space', action: { en: 'Returns to the top.', ja: '先頭へ戻ります。' } },
		{
			key: 'Home / End',
			action: {
				en: 'With focus in the box, scrolls to the start / end. This is the browser’s own feature.',
				ja: '枠にフォーカスがあるとき、先頭・末尾へスクロールします。ブラウザの機能です。'
			}
		}
	],
	usage: [
		{
			en: 'The Digital Agency Design System no longer recommends this component: it has accessibility problems and does not make pages easier to use, since the browser can already return to the top. If you use it anyway, keep in mind the people it gets in the way of.',
			ja: 'デジタル庁デザインシステムは、この部品の使用を推奨していません。アクセシビリティの問題があり、ブラウザでも先頭へ戻れるので使いやすさも上がらない、という理由によります。それでも使う場合は、不利益を受ける人がいることを踏まえて慎重に使います。'
		},
		{
			en: 'Nielsen Norman Group takes a different view: most people do not know shortcuts such as the Home key, so for pages longer than about four screens it suggests one button per page in the lower right corner, labeled in words, and small enough not to cover content. It also suggests showing it only once people have scrolled a few screens and start scrolling back up, and notes that other techniques, such as navigation at the bottom of the page or sticky menus, may work better.',
			ja: 'Nielsen Norman Group は、Home キーのような方法を知らない人が多いとして、画面およそ4つ分より長いページでは、ボタンをページに1つだけ右下の隅に置き、文字のラベルを付け、内容を覆わない小ささにすることを勧めています。何画面か下までスクロールして上へ戻ろうとしたときに初めて出すことも提案し、ページ下部のナビゲーションや固定のメニューなど、ほかの方法のほうが合う場合もあるとしています。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Keeping the button fixed over the content at all times',
				ja: 'ボタンを内容の上に重ねて、常に画面に固定しておく'
			},
			harm: {
				en: 'A fixed button always hides part of the content, which gets in the way of reading, especially for people who zoom in.',
				ja: '固定したボタンは常に内容の一部を隠し、特に画面を拡大して見ている人の閲覧を妨げます。'
			},
			instead: {
				en: 'Consider leaving it out, since the Home key and the browser already return to the top. If you add it, show it only once people have scrolled a few screens and start scrolling back up, and keep it small.',
				ja: 'Home キーやブラウザの機能で先頭へ戻れるので、置かないことを検討します。置くなら、何画面か下までスクロールして上へ戻ろうとしたときに初めて出し、小さくします。'
			}
		},
		{
			pattern: {
				en: 'Placing the button at the end of the page’s source as the way back for keyboard users',
				ja: 'ボタンをページのソースの最後に置き、キーボードの利用者が先頭へ戻る手段にする'
			},
			harm: {
				en: 'Keyboard users have to move focus all the way to the end of the page to reach it, so they cannot use it to go back from partway down.',
				ja: 'キーボードの利用者は、ページの最後までフォーカスを移さないとボタンに届かず、途中から先頭へ戻るのには使えません。'
			},
			instead: {
				en: 'Do not count on it for keyboard users. The Home key returns to the top, and headings and landmarks let them move around the page.',
				ja: 'キーボードの利用者向けの手段としては当てにしません。先頭へは Home キーで戻れ、ページの中は見出しやランドマークで移れます。'
			}
		}
	],
	related: [
		{
			id: 'link',
			diff: {
				en: 'A back to top button only returns to the top of the current page; a link moves to any page or place.',
				ja: 'スクロールトップボタンは今のページの先頭へ戻るだけで、リンクはどのページや場所へも移れます。'
			}
		},
		{
			id: 'button',
			diff: {
				en: 'A back to top button is a button for one job, returning to the top, that often floats over the page; a button runs any action in its place in the layout.',
				ja: 'スクロールトップボタンは先頭へ戻ることだけを受け持ち、ページの上に浮かぶことが多いです。ボタンはレイアウトの中の決まった場所で、さまざまな操作を実行します。'
			}
		},
		{
			id: 'skip-link',
			diff: {
				en: 'A back to top button returns to the top after reading; a skip link at the very top jumps past the header to the main content.',
				ja: 'スクロールトップボタンは読み進めたあとに先頭へ戻り、スキップリンクはページの先頭からヘッダーを飛ばして本文へ移ります。'
			}
		}
	],
	sources: [
		{
			label: 'デジタル庁デザインシステムウェブサイト「スクロールトップボタン」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/scroll-top-button/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'Nielsen Norman Group: Back-to-Top Button Design Guidelines',
			url: 'https://www.nngroup.com/articles/back-to-top/',
			checkedAt: '2026-10-22'
		}
	]
} satisfies ComponentData;
