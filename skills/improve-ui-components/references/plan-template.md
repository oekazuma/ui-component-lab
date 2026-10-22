# Handoff plan template

Adapted from the improve skill by shadcn (MIT License). See [../LICENSE-improve.md](../LICENSE-improve.md).

Every plan is written for an executor that has **zero context**: it has not seen the audit, the page, the other plans or this conversation. It may be a smaller model. Assume it follows explicit instructions well and is weak at filling gaps or knowing when to stop.

Three properties make a plan executable:

1. Self-contained context. Everything needed is in the file (page URL, where on the page, source paths with excerpts, the Lab evidence, conventions, commands).
2. Verification gates. Every step ends with a command or a browser check and its expected result. The executor never has to judge whether it worked.
3. Hard boundaries and escape hatches. An explicit out-of-scope list, and "STOP and report" conditions instead of improvising when reality does not match the plan.

File naming: `plans/NNN-short-slug.md`, numbered in recommended execution order, continuing any numbers already in `plans/`.

---

## Template

```markdown
# Plan NNN: <Imperative title — what will be true after this plan>

> **Executor instructions**: Follow this plan step by step. Run every
> verification and confirm the expected result before moving to the next
> step. If anything in "STOP conditions" occurs, stop and report — do not
> improvise. When done, update the status row for this plan in
> `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat <planned-at SHA>..HEAD -- <in-scope paths>`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1 | P2 | P3
- **Effort**: S | M | L
- **Risk**: LOW | MED | HIGH
- **Depends on**: plans/NNN-*.md (or "none")
- **Category**: ui-choice | ui-misuse | ui-behavior | ui-a11y | ui-outside-lab
- **Deceptive pattern**: yes | no
- **Planned at**: commit `<short SHA>`, <YYYY-MM-DD>
- **Issue**: <GitHub issue URL — only when published via `--issues`; omit otherwise>

## Why this matters

2–5 sentences: what people using the page run into today, who is affected,
and what improves when this lands. Intent is what lets a correct judgment
call happen when a detail is off.

## Where on the page

- **Page**: <live URL> (local: <local URL> when checked on the dev server)
- **Location**: <visible label or nearby heading>, selector `<selector>`
- **What it is now**: <the component as built, e.g. "12 radio buttons in a
  `fieldset` labelled 'Prefecture'">
- **How it was observed**: read from the DOM | operated on the local server |
  read only on the live site (not operated)

## Evidence

- **UI Component Lab**: <component name> — <Lab page URL>, field
  `<usage | related | misuse | keyboard | behavior>`: "<short quote>"
- **Suggested component** (choice findings): <name> — <Lab page URL>
- **Original source**: <label> — <URL> (from the Lab entry's `sources`, or
  an APG / WCAG / DADS page opened during the audit, with its section)

## Current state

- The relevant files, each with one line on its role:
  - `src/routes/signup/+page.svelte` — the form; the radio group is at lines 40–88
- Excerpts of the code as it exists today (short, with `file:line` markers).
- The repo conventions that apply, with one exemplar file to match.
- Design system components or tokens to reuse, quoted from the repo.

## Commands you will need

| Purpose    | Command        | Expected on success |
|------------|----------------|---------------------|
| Dev server | `pnpm dev`     | serves on <origin>  |
| Typecheck  | `pnpm check`   | exit 0              |
| Tests      | `pnpm test`    | all pass            |
| Lint       | `pnpm lint`    | exit 0              |

(Exact commands from this repo, verified during recon. If the repo has no type check or tests, say so; the browser checks below become the gate.)

## Scope

**In scope** (the only files you should modify):
- ...

**Out of scope** (do NOT touch, even though they look related):
- ... — why

## Git workflow

- Branch: `advisor/NNN-<slug>` (or the repo's convention)
- Commit per step or logical unit; match the repo's message style (example from `git log`)
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: <imperative title>

What to do, precisely, with exact files and symbols. Include the target
markup or code shape when it is load-bearing.

**Verify**: `<command>` → <expected output>

### Step 2: ...

## How to verify in the browser

Run on the local development server (`<command>`, then open `<local URL>`):

1. <action, e.g. "Tab to the 'Prefecture' field"> → <expected, e.g. "focus
   lands on the select; its accessible name is 'Prefecture'">
2. <key, e.g. "Press ↓"> → <expected state change and announcement>
3. <Escape / close> → <expected focus return>

Never perform these checks on the live site: they change values.

## Test plan

- New or updated tests, in which file, covering which cases (the keys and
  states from "How to verify in the browser", plus an accessibility scan if
  the repo has one).
- The existing test to model after.
- Verification: `<test command>` → all pass, including N new tests.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `<typecheck command>` exits 0
- [ ] `<test command>` exits 0; new tests for <X> exist and pass
- [ ] Every step in "How to verify in the browser" gives the expected result
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The code at the locations in "Current state" does not match the excerpts.
- The page no longer shows the component described in "Where on the page".
- A step's verification fails twice after a reasonable fix attempt.
- The fix appears to require touching an out-of-scope file, or changing a
  shared design system component used on pages outside this plan.
- <plan-specific assumption> turns out to be false.

## Maintenance notes

- What future changes will interact with this.
- What a reviewer should scrutinize in the PR.
- Any follow-up deferred out of this plan, and why.
```

---

## Index file: `plans/README.md`

Same format as improve's, so improve's `execute` and `reconcile` can use it. When the file already exists, keep its header and rows, add new rows to the same table, and add one line under the table: "Plans NNN–MMM: generated by the improve-ui-components skill on <date>."

```markdown
# Implementation Plans

Generated by the improve-ui-components skill on <date>. Execute in the order
below unless dependencies say otherwise. Each executor: read the plan fully
before starting, honor its STOP conditions, and update your row when done.

## Execution order & status

| Plan | Title | Priority | Effort | Depends on | Status |
|------|-------|----------|--------|------------|--------|
| 001  | ...   | P1       | S      | —          | TODO   |

Status values: TODO | IN PROGRESS | DONE | BLOCKED (with one-line reason) | REJECTED (with one-line rationale)

## Dependency notes

- 002 requires 001 because <reason>.

## Findings considered and rejected

- <finding>: not worth doing because <one line>. (So nobody re-audits it.)

## Findings not planned yet

- <finding>: <Check>, <Impact> / <Effort>. Left out by the default selection; plan it with `plan <description>`.

## Not checked

- <page or component>: <why, e.g. "needs login; no signed-in browser available"
  or "value-changing behavior not exercised on the live site">
```

## Quality bar — check before finishing each plan

- Could an executor that has never seen this repo or the page do it with only the plan and the repo?
- Does "Evidence" cite a Lab page URL and the exact field, and is every non-Lab source one you opened in this run?
- Is every verification a command or a browser check with an expected result, not "make sure it works"?
- Does every step name exact files and symbols?
- Are the STOP conditions specific to this plan's risks?
- No secret values anywhere in the file.
- "Planned at" SHA is filled in, and the drift-check paths match the Scope section.
