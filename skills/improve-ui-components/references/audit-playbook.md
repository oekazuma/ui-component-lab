# Audit playbook

Adapted in part (finding format and prioritization) from the improve skill by shadcn (MIT License). See [../LICENSE-improve.md](../LICENSE-improve.md).

How to check one page. Do the six checks in order. Work on the local development server when Phase 1 started one (see `local-server.md`); otherwise work on the live site under the observe-only rules (SKILL.md Hard Rules 3 and 4).

Use whatever browser automation is available: a Playwright script if Playwright and its browsers are already installed (do not let `npx` download it), saved outside the repository, a browser tool such as Claude in Chrome or a built-in browser pane, or a headless browser. For signed-in pages, only the user's own signed-in browser. Prefer reading the accessibility tree and the DOM over screenshots; take a screenshot when the visual appearance is the point (color only, hidden labels, layout).

## 1. Identify the components

List every interactive or structural UI component on the page and map each to a Lab component `id`.

- Start from roles and elements: `role` attributes (`tablist`, `menu`, `menubar`, `dialog`, `alertdialog`, `combobox`, `listbox`, `grid`, `tree`, `switch`, `slider`, `radiogroup`, `feed`, `separator`), and native elements (`<select>`, `<input type="radio|checkbox|range|date|file|search|password">`, `<details>`, `<dialog>`, `<table>`, `<nav>`, `<progress>`, `<meter>`).
- Then match by appearance and purpose against `names`, `aliases`, `summary` and `appearance`. A row of links styled as tabs is still a set of links; a `<div>` that opens a list on click is a menu, listbox or combobox depending on what it holds. Record what the user sees and what the code says when they disagree; the disagreement is often the finding.
- Record for each component: a short description of where it is (its visible label or nearby heading), a selector, the Lab `id`, and how sure you are.
- Map each component to its source: search the repository for its visible text, label, class names or component name. Record `file:line`. If you cannot find it, say so; do not guess.

## 2. Check the choice of component

First write the job in one sentence without naming the component, such as "pick one of 12 prefectures" or "tell people the save worked". Then read the Lab entry's `usage` and every `related[].diff`, and the `usage` of each `related` entry too, because the line that names this situation is often on the other component. Ask whether the job on this page is the job the entry describes.

- Count what the decision depends on: the number of options (radio buttons versus select versus combobox), whether choosing moves to another page or changes content in place (links versus tabs), whether the choice applies at once or on submit (switch versus checkbox), whether the content is a few steps in order or freely switchable (stepper versus tabs), whether the message needs a response (alert dialog versus modal versus alert versus toast).
- A finding here names the better component, quotes the Lab line that decides it, and links both Lab pages (the current component and the suggested one).
- Some lines say to try doing without the component (a carousel, tabs, an accordion, a modal, a select). Report these too: the suggested fix is the simpler layout the line names, and the finding says what the page would look like after it. Use confidence MED unless the page clearly matches the line's condition.
- Do not report a choice as wrong only because another component is also possible. Report it when the Lab entry or its source says this situation calls for something else.
- Thresholds are often written from one side only ("With five or fewer options, use radio buttons instead" on `select`). A page clearly on the other side (12 radio buttons) may be reported as a choice finding with confidence MED: quote the threshold and say the finding reads it from the other side.
- `usage` lines that are not about choosing between components (target size, a "None of these" option) are checked here too; report them with Check `usage`.

## 3. Check for misuses

For each component, go through every item in the entry's `misuse`. For each, decide whether the page does the `pattern`.

- Check what you can observe without changing anything: initial checked states, labels and wording, what is visible versus hidden, color-only distinctions (take a screenshot), how prominent each option is, whether a carousel or banner moves on its own, what a close button or decline option says.
- When an item has `deceptive: true` and the page matches it, mark the finding as a deceptive pattern.
- The finding quotes the `pattern`, explains the `harm` as it applies to this page, and proposes the `instead`.

## 4. Check behavior and keyboard support

Compare what the component does with the entry's `keyboard` and `behavior`.

- On the local development server, when its backend is confirmed local (`local-server.md`, section 3): operate it fully. Press each key in `keyboard`, including keys that change values, and check focus movement, what is announced (`aria-*` states after each step), and that Escape closes what it opened and returns focus.
- On the live site: only keys that do not change anything (Hard Rule 4). For value-changing components, write "not exercised on the live site" and check only what can be read (roles, states, labels, `aria-controls`, tab order).
- When the Lab entry does not cover a key or state you need, open the APG pattern for that role (https://www.w3.org/WAI/ARIA/apg/patterns/) and cite it.
- A finding names the key, what was expected (with the Lab or APG line), and what happened. If a control has no handler at all, report it as behavior and say that it may be unfinished.

## 5. Check touch and pointer use

Repeat the page at a phone size with touch: for example Playwright's `viewport: { width: 375, height: 812 }`, `hasTouch: true`, `isMobile: true`. Emulating a phone only changes how you view the page, so it is allowed on the live site. A desktop-only pass misses this whole check.

**Target size.** Pass this read-only function to `page.evaluate()`, or call it in the page some other way. It lists targets smaller than 24 × 24 CSS px that WCAG 2.5.8 Target Size (Minimum) could fail, and counts those under 44 × 44 CSS px, which only Level AAA 2.5.5 asks for.

```js
() => {
	const selector = 'a[href],button,input:not([type=hidden]),select,textarea,summary,[role=button],[role=link],[role=tab],[role=checkbox],[role=radio],[role=switch],[role=menuitem],[role=option]';
	const box = (el) => {
		// A label activates its input, so it counts as part of the target
		const rects = [el, ...(el.labels ?? [])].map((e) => e.getBoundingClientRect()).filter((r) => r.width && r.height);
		if (!rects.length) return null;
		const left = Math.min(...rects.map((r) => r.left)), top = Math.min(...rects.map((r) => r.top));
		const right = Math.max(...rects.map((r) => r.right)), bottom = Math.max(...rects.map((r) => r.bottom));
		return { left, top, right, bottom, width: right - left, height: bottom - top, x: (left + right) / 2, y: (top + bottom) / 2 };
	};
	// A link inside a sentence is exempt (the Inline exception)
	const inline = (el) => el.tagName === 'A' && getComputedStyle(el).display === 'inline' && [...el.parentElement.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
	const visible = (el) => el.checkVisibility({ visibilityProperty: true, opacityProperty: true }) && !el.closest('[inert]') && getComputedStyle(el).pointerEvents !== 'none';
	const targets = [...document.querySelectorAll(selector)].filter((el) => visible(el) && !inline(el)).map((el) => ({ el, r: box(el) })).filter((t) => t.r);
	const small = (t) => t.r.width < 24 || t.r.height < 24;
	const circleTouches = (a, b) => {
		const dx = a.x - Math.max(b.left, Math.min(a.x, b.right)), dy = a.y - Math.max(b.top, Math.min(a.y, b.bottom));
		return Math.hypot(dx, dy) < 12;
	};
	const fails = targets.filter((t) => small(t) && targets.some((o) => o !== t && !o.el.contains(t.el) && !t.el.contains(o.el) && (small(o) ? Math.hypot(t.r.x - o.r.x, t.r.y - o.r.y) < 24 : circleTouches(t.r, o.r))));
	return {
		total: targets.length,
		under44: targets.filter((t) => t.r.width < 44 || t.r.height < 44).length,
		spacedButSmall: targets.filter((t) => small(t) && !fails.includes(t)).length,
		fails: fails.map((t) => ({ text: (t.el.getAttribute('aria-label') ?? t.el.textContent ?? '').trim().slice(0, 40), tag: t.el.tagName, width: Math.round(t.r.width), height: Math.round(t.r.height) }))
	};
}
```

Before reporting a listed target, open the page for 2.5.8 (https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) and rule out the exceptions the script cannot see: the same function on a control elsewhere on the page that meets the size, a native control whose size the author did not change, and a size that is essential. Sliders, color areas and other controls that pick a value by position count as one target. Report `under44` only as a note, not as a failure.

**Gestures.** Search the page's source for `touchstart`, `touchmove`, `pointerdown`, `pointermove`, `mousedown`, swipe, long press and drag handlers, and libraries that add them. A path-based or multi-finger gesture needs a single-tap alternative (WCAG 2.5.1), dragging needs one too (WCAG 2.5.7), and an action that runs on the press rather than the release needs a way to abort or undo it (WCAG 2.5.2). A handler on a pointer event often leaves the keyboard out, so on a local page press Enter or Space on that control too.

**Hover.** Find what only appears on hover: `:hover` rules that change `opacity`, `visibility` or `display`, and `mouseenter` or `pointerenter` handlers. Hover over the row or card on a desktop-size page and compare what appears, then Tab to the same control with the pointer elsewhere, to catch one that has focus but stays invisible. If a tap on the phone-size page has no other way to reach it, report it. Quote the Lab's lines where they fit (`tooltip`, `menu`, `mega-menu` and `header` under `misuse`); otherwise it goes in "Outside the Lab" as an observation, with no claimed harm.

**Fit and keyboards.** Note a `<meta name="viewport">` that blocks zooming (`user-scalable=no`, `maximum-scale`; WCAG 1.4.4 Resize Text, https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html, lists allowing zoom in the meta viewport as a technique), a page that scrolls sideways at 320 px, fixed bars that cover the focused item (WCAG 2.4.11), and fields whose `type`, `inputmode` or `autocomplete` brings up the wrong on-screen keyboard (`text-field` under `usage`).

Use Check `touch` for these findings. Base them on a Lab line if there is one, otherwise on the WCAG page you opened in this run (SKILL.md Hard Rule 6). On the live site, stick to reading and hovering: do not tap anything to find out what it does.

## 6. Automated scan (supplement)

If axe is already available (for example with `@axe-core/playwright` on the local server, or by injecting axe-core into a local page), run it with the WCAG 2.2 A/AA tags. Do not inject scripts into live pages. Attach each violation to the component it belongs to and fold it into checks 2–5. Violations that belong to no Lab component go to "Outside the Lab". An automated violation alone is never a reason to skip checks 1–5. Do not install axe without permission; if it is not available, list the scan under "Not checked".

## Finding format

Every finding, from you or a subagent, comes back in this shape:

```markdown
### [CHECK-NN] Short imperative title

- **Page**: <URL> (local: <local URL>, or "live site only")
- **Where**: <visible label or nearby heading>, selector `<selector>`
- **Source**: `path/file.ext:123` — one line on what is there (or "not found")
- **Component**: <Lab id> — <Lab page URL in the user's language>#<section>
- **Check**: choice | usage | misuse | deceptive | behavior | touch | outside-lab
- **Evidence**: the Lab field you relied on (quote it briefly) and its source URL, plus what you observed on the page (and how: read, keyboard on local server, screenshot)
- **Impact**: who is affected and how, in concrete terms
- **Effort**: S | M | L (for the fix, including tests)
- **Risk**: LOW | MED | HIGH, with one line on what the fix could break
- **Confidence**: HIGH | MED | LOW
- **Fix sketch**: 1–3 sentences
```

`CHECK` is `CHOICE`, `USAGE`, `MISUSE`, `DECEPTIVE`, `BEHAVIOR`, `TOUCH` or `OUTSIDE`.

## Prioritization

Order by leverage: impact ÷ effort, discounted by confidence and fix risk. Then:

1. Deceptive patterns float to the top: they work against the people using the site.
2. Behavior that blocks keyboard or screen reader users from completing a task (cannot open, cannot close, focus lost or trapped) floats above choice findings.
3. Findings with a clean verification story (a key to press and a result to expect) float above judgment calls.
4. "Not worth changing" is a valid verdict; record it with one line so it is not re-audited.
