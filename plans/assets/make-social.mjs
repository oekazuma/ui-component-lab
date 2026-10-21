// GitHub social preview（1280×640）の下書きを作る: node make-og.mjs <resvg-js のパス> <出力 PNG>
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';

const [, , resvgDir, out] = process.argv;
const { Resvg } = createRequire(import.meta.url)(resvgDir);

const accent = '#1f5fd1';
const text = '#1b1d22';
const muted = '#555b66';
const font = 'Hiragino Sans';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="640" viewBox="0 0 1280 640">
	<rect width="1280" height="640" fill="#ffffff"/>
	<rect y="616" width="1280" height="24" fill="${accent}"/>
	<g transform="translate(120 116) scale(1.75)"><rect width="64" height="64" rx="14" fill="#1f5fd1"/>
	<g fill="#fff"><rect x="23" y="8" width="18" height="5" rx="2.5"/><path d="M26 12 H38 V26 L51 47.5 A4.5 4.5 0 0 1 47.1 54 H16.9 A4.5 4.5 0 0 1 13 47.5 L26 26 Z"/></g>
	<rect x="20" y="40" width="24" height="10" rx="5" fill="#1f5fd1"/>
	<circle cx="39" cy="45" r="3.4" fill="#fff"/></g>
	<text x="120" y="330" font-family="${font}" font-weight="600" font-size="84" fill="${text}">UI Component Lab</text>
	<text font-family="${font}" font-weight="300" font-size="36" fill="${muted}">
		<tspan x="120" y="422">そのUI、なんて名前？ 呼び方と動きを、触って覚えよう。</tspan>
		<tspan x="120" y="474" font-size="29">What’s that UI called? Learn the name and the behavior by trying it.</tspan>
	</text>
</svg>`;

const png = new Resvg(svg, {
	font: {
		loadSystemFonts: false,
		fontFiles: [
			'/System/Library/Fonts/ヒラギノ角ゴシック W3.ttc',
			'/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc'
		],
		defaultFontFamily: font
	}
})
	.render()
	.asPng();
writeFileSync(out, png);
console.log('wrote', out, png.length, 'bytes');
