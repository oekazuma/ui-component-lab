import type { ComponentData } from '#lib/types.js';

export default {
	id: 'callout',
	category: 'feedback',
	names: { en: 'Callout', ja: '注釈ブロック' },
	aliases: [
		{ name: '注釈ブロック', source: 'デジタル庁デザインシステム', url: 'https://design.digital.go.jp/dads/components/notice-block/' },
		{ name: 'Inset text', source: 'GOV.UK Design System', url: 'https://design-system.service.gov.uk/components/inset-text/' }
	],
	summary: {
		en: 'A block set apart from the surrounding text that holds helpful extra information, such as help with a step or an example.',
		ja: '周りの文章と区別して、手続きの助けになる補足や具体例を載せるブロック。'
	},
	appearance: {
		en: 'A paragraph inside a border, sometimes with a light background or a short title. Some have a thick border only on the left edge.',
		ja: '枠線で囲んだ段落。薄い背景色や短いタイトルが付くこともある。左端の線だけを太くしたものもある。'
	},
	behavior: [
		{
			en: 'It does nothing on its own. It is part of the page content and is read in order with the text around it.',
			ja: 'それ自体は何の動作もしない。ページの内容の一部で、周りの文章と同じ順に読まれる。'
		},
		{
			en: 'Unlike an alert, it has no `role="alert"`, so screen readers do not announce it out of turn.',
			ja: 'アラートと違って `role="alert"` を持たないので、スクリーンリーダーが割り込んで読み上げることはない。'
		},
		{
			en: 'In this demo, a callout under the description of a procedure gives examples of the documents to bring. The title is bold text, not a heading, so it does not add an entry to the page’s outline.',
			ja: 'このデモでは、手続きの説明の下に注釈ブロックを置き、持っていく書類の例を挙げている。タイトルは見出しではなく太字にして、ページの見出しの構成に項目を増やさないようにしている。'
		}
	],
	keyboard: [
		{
			key: '—',
			action: {
				en: 'None. A callout is not a control and does not take focus. Links inside it are reached with Tab as usual.',
				ja: 'なし。注釈ブロックは操作する部品ではなく、フォーカスを受けない。中にリンクがあれば、ふだんどおり Tab キーで移る。'
			}
		}
	],
	variations: [
		{
			name: { en: 'Border only', ja: '枠線だけ' },
			description: {
				en: 'A colored border around the text, with no title.',
				ja: '本文を色の付いた枠線で囲むだけで、タイトルを付けないもの。'
			}
		},
		{
			name: { en: 'With a title', ja: 'タイトル付き' },
			description: {
				en: 'A short title above the text and a light background, as in this demo.',
				ja: 'このデモのように、本文の上に短いタイトルを置き、薄い背景色を付けたもの。'
			}
		},
		{
			name: { en: 'Left border with a disclosure', ja: '左端の線とディスクロージャー' },
			description: {
				en: 'A thick left border, with a disclosure inside that folds away extra information people can skip.',
				ja: '左端の線を太くし、中のディスクロージャーに、読まなくても進められる補足を畳んでおくもの。'
			}
		}
	],
	usage: [
		{
			en: 'Use it for extra information that helps with a step, such as help with what to enter, documents to prepare, or examples that show the difference between choices.',
			ja: '入力内容のヘルプ、用意する書類、選択肢の違いが分かる例など、手続きを進める助けになる補足に使う。'
		},
		{
			en: 'Put conditions on the input itself, such as which characters are allowed, in the support text of the text field instead.',
			ja: '入力できる文字の種類のように、入力そのものに付く条件は、テキストフィールドのサポートテキストに書く。'
		},
		{
			en: 'Do not use it to change the subject like a sidebar column, or just to emphasize part of the text.',
			ja: 'コラムのように話題を切り替えたり、本文の一部を強調したりするためには使わない。'
		},
		{
			en: 'Fold information into a disclosure inside it only when people can finish the step without reading it.',
			ja: '中のディスクロージャーに畳むのは、読まなくても手続きを進められる補足だけにする。'
		}
	],
	misuse: [
		{
			pattern: {
				en: 'Putting information that everyone must see only in a callout',
				ja: '全員が必ず読む必要のある情報を、注釈ブロックにだけ書く'
			},
			harm: {
				en: 'On a busy page, or next to other eye-catching elements, some people do not notice the block.',
				ja: '要素の多いページや、ほかに目立つ要素が近くにある場所では、このブロックに気づかない人がいる。'
			},
			instead: {
				en: 'Put it in the main text. For very important content, such as legal information, use a warning that is made to stand out.',
				ja: '本文に書く。法的な情報のように特に重要な内容は、目立たせるための警告の表示を使う。'
			}
		},
		{
			pattern: {
				en: 'Putting many callouts on one page',
				ja: '1つのページに注釈ブロックをいくつも置く'
			},
			harm: {
				en: 'The more it is used, the less it works at setting information apart for readers.',
				ja: '多く使うほど、読む人に情報を区別して見せる効果が薄れる。'
			},
			instead: {
				en: 'Keep it for the few pieces of extra information that help the most, and write the rest in the main text.',
				ja: '特に役立ついくつかの補足だけに使い、それ以外は本文に書く。'
			}
		}
	],
	related: [
		{
			id: 'alert',
			diff: {
				en: 'A callout sets apart helpful extra information and is never announced on its own; an alert tells the user something important, and content added to it is announced right away.',
				ja: '注釈ブロックは役立つ補足を区別して見せるだけで、ひとりでに読み上げられることはない。アラートは重要なことを知らせ、中身を入れるとすぐに読み上げられる。'
			}
		},
		{
			id: 'emergency-banner',
			diff: {
				en: 'A callout sits next to the content it adds to; an emergency banner takes over the top of the page to warn about an urgent danger.',
				ja: '注釈ブロックは補足する内容のそばに置き、緊急時バナーはページの上部を占めて差し迫った危険を知らせる。'
			}
		}
	],
	sources: [
		{
			label: 'デジタル庁デザインシステムウェブサイト「注釈ブロック」をもとに作成',
			url: 'https://design.digital.go.jp/dads/components/notice-block/',
			checkedAt: '2026-10-22'
		},
		{
			label: 'GOV.UK Design System: Inset text',
			url: 'https://design-system.service.gov.uk/components/inset-text/',
			checkedAt: '2026-10-22'
		}
	]
} satisfies ComponentData;
