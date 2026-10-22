# Audit playbook

How to check one page. Do the five checks in order. Work on the local development server when Phase 1 started one (see `local-server.md`); otherwise work on the live site under the observe-only rules (SKILL.md Hard Rules 3 and 4).

Use whatever browser automation is available: a Playwright script (`npx playwright`), a browser tool such as Claude in Chrome or a built-in browser pane, or a headless browser. For signed-in pages, only the user's own signed-in browser. Prefer reading the accessibility tree and the DOM over screenshots; take a screenshot when the visual appearance is the point (color only, hidden labels, layout).

## 1. Identify the components

List every interactive or structural UI component on the page and map each to a Lab component `id`.

- Start from roles and elements: `role` attributes (`tablist`, `menu`, `menubar`, `dialog`, `alertdialog`, `combobox`, `listbox`, `grid`, `tree`, `switch`, `slider`, `radiogroup`, `feed`, `separator`), and native elements (`<select>`, `<input type="radio|checkbox|range|date|file|search|password">`, `<details>`, `<dialog>`, `<table>`, `<nav>`, `<progress>`, `<meter>`).
- Then match by appearance and purpose against `names`, `aliases`, `summary` and `appearance`. A row of links styled as tabs is still a set of links; a `<div>` that opens a list on click is a menu, listbox or combobox depending on what it holds. Record what the user sees and what the code says when they disagree; the disagreement is often the finding.
- Record for each component: a short description of where it is (its visible label or nearby heading), a selector, the Lab `id`, and how sure you are.
- Map each component to its source: search the repository for its visible text, label, class names or component name. Record `file:line`. If you cannot find it, say so; do not guess.

## 2. Check the choice of component

For each component, read the Lab entry's `usage` and every `related[].diff`, and ask whether the job on this page is the job the entry describes.

- Count what the decision depends on: the number of options (radio buttons versus select versus combobox), whether choosing moves to another page or changes content in place (links versus tabs), whether the choice applies at once or on submit (switch versus checkbox), whether the content is a few steps in order or freely switchable (stepper versus tabs), whether the message needs a response (alert dialog versus modal versus alert versus toast).
- A finding here names the better component, quotes the Lab line that decides it, and links both Lab pages (the current component and the suggested one).
- Do not report a choice as wrong only because another component is also possible. Report it when the Lab entry or its source says this situation calls for something else.

## 3. Check for misuses

For each component, go through every item in the entry's `misuse`. For each, decide whether the page does the `pattern`.

- Check what you can observe without changing anything: initial checked states, labels and wording, what is visible versus hidden, color-only distinctions (take a screenshot), how prominent each option is, whether a carousel or banner moves on its own, what a close button or decline option says.
- When an item has `deceptive: true` and the page matches it, mark the finding as a deceptive pattern.
- The finding quotes the `pattern`, explains the `harm` as it applies to this page, and proposes the `instead`.

## 4. Check behavior and keyboard support

Compare what the component does with the entry's `keyboard` and `behavior`.

- On the local development server: operate it fully. Press each key in `keyboard`, including keys that change values, and check focus movement, what is announced (`aria-*` states after each step), and that Escape closes what it opened and returns focus.
- On the live site: only keys that do not change anything (Hard Rule 4). For value-changing components, write "not exercised on the live site" and check only what can be read (roles, states, labels, `aria-controls`, tab order).
- When the Lab entry does not cover a key or state you need, open the APG pattern for that role (https://www.w3.org/WAI/ARIA/apg/patterns/) and cite it.
- A finding names the key, what was expected (with the Lab or APG line), and what happened.

## 5. Automated scan (supplement)

If you can run axe (for example with `@axe-core/playwright` on the local server, or by injecting axe-core into the page in your own browser session), run it with the WCAG 2.2 A/AA tags. Attach each violation to the component it belongs to and fold it into checks 2–4. Violations that belong to no Lab component go to "Outside the Lab". An automated violation alone is never a reason to skip checks 1–4.

## Finding format

Every finding, from you or a subagent, comes back in this shape:

```markdown
### [CHECK-NN] Short imperative title

- **Page**: <URL> (local: <local URL>, or "live site only")
- **Where**: <visible label or nearby heading>, selector `<selector>`
- **Source**: `path/file.ext:123` — one line on what is there (or "not found")
- **Component**: <Lab id> — <Lab page URL in the user's language>
- **Check**: choice | misuse | deceptive | behavior | outside-lab
- **Evidence**: the Lab field you relied on (quote it briefly) and its source URL, plus what you observed on the page (and how: read, keyboard on local server, screenshot)
- **Impact**: who is affected and how, in concrete terms
- **Effort**: S | M | L (for the fix, including tests)
- **Risk**: LOW | MED | HIGH, with one line on what the fix could break
- **Confidence**: HIGH | MED | LOW
- **Fix sketch**: 1–3 sentences
```

`CHECK` is `CHOICE`, `MISUSE`, `DECEPTIVE`, `BEHAVIOR` or `OUTSIDE`.

## Prioritization

Order by leverage: impact ÷ effort, discounted by confidence and fix risk. Then:

1. Deceptive patterns float to the top: they work against the people using the site.
2. Behavior that blocks keyboard or screen reader users from completing a task (cannot open, cannot close, focus lost or trapped) floats above choice findings.
3. Findings with a clean verification story (a key to press and a result to expect) float above judgment calls.
4. "Not worth changing" is a valid verdict; record it with one line so it is not re-audited.
