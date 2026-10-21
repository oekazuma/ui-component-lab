# Plan 015: The plans no longer contain local machine paths

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat a8151b0..HEAD -- plans`
> Any change other than this file (`plans/015-scrub-local-paths.md`) and the `015` row in `plans/README.md` is a STOP condition.

## Status

| Priority | Effort | Risk | Depends on | Category | Planned at |
|---|---|---|---|---|---|
| P3 | S | LOW | none | docs (maintainer request) | commit `a8151b0`, 2026-10-21 |

## Why this matters

`plans/` was committed to the public repo in `a8151b0`. The plans were written for executors running on the maintainer's machine, so 14 of them contain absolute paths under `/Users/<user>/…` (the maintainer’s home directory). These are not secrets, but they expose the local username and directory layout, and they don't work for anyone else. Replace them with portable equivalents. Plans 001–014 are all DONE, so this only changes the record, not any pending work.

## Current state

Every absolute path in `plans/` at `a8151b0` (from `grep -rhoE '/(Users|tmp|private/tmp)/[^ `"'"'"')<>]*' plans | sort | uniq -c`):

| Count | Path |
|---|---|
| 14 | `/Users/<user>/Library/pnpm/bin/pnpm` |
| 2 | `/Users/<user>/…/worktrees/<session>/plans/assets/og.png` |
| 1 | `/Users/<user>/…/worktrees/<session>/plans/assets/make-og.mjs` |

Files: `plans/001`–`plans/014` (all fourteen numbered plans). `plans/README.md` and `plans/assets/*` contain none. (`plans/assets/make-*.mjs` reference `/System/Library/Fonts/…`, the macOS system font location. That is not a personal path, so leave it.)

Every pnpm occurrence sits in the same sentence pattern, for example:
> If `pnpm` on PATH fails with a vite-plus "Failed to resolve package manager" error, use `/Users/<user>/Library/pnpm/bin/pnpm` (with `--store-dir "$TMPDIR/pnpm10-store/v10"` for install).

The two asset paths are in `plans/014-brand-refresh-og-image.md` (the "Current state" bullets and the Step 3 `cp` command).

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Find remaining paths | `grep -rnE '/Users/[A-Za-z]|/private/tmp/[A-Za-z]|/tmp/claude' plans --exclude=015-scrub-local-paths.md` | no output when done |

No install or build is needed; this plan touches markdown only.

## Scope

**In scope**: `plans/001-*.md` … `plans/014-*.md`.

**Out of scope**:
- `plans/assets/*`: the system font paths are fine.
- Anything outside `plans/`.
- Rewriting git history. The old text stays in commit `a8151b0`. That is acceptable, since the paths are not secrets. Do not force-push.

## Git workflow

- Branch: `advisor/015-scrub-local-paths` from `origin/main` (at or after `a8151b0`).
- One commit, e.g. `Remove local machine paths from the plans`.
- Do NOT push.

## Steps

### Step 1: Replace the pnpm path

In all fourteen plans, replace the backticked pnpm path `` `/Users/<user>/Library/pnpm/bin/pnpm` `` by:

`` a standalone pnpm binary (one from `which -a pnpm` that is not under `vite-plus`) ``

Run:

```sh
sed -i '' -E 's#`/Users/[^/`]+/Library/pnpm/bin/pnpm`#a standalone pnpm binary (one from `which -a pnpm` that is not under `vite-plus`)#g' plans/0{0[1-9],1[0-4]}-*.md
```

The pattern avoids spelling out the username, and the brace glob covers exactly 001–014, so this file (015) is left alone. On macOS use `sed -i ''`; GNU sed takes `sed -i`. Run it in zsh or bash so the braces expand.

**Verify**: `grep -rlE '/Users/[A-Za-z][^/]*/Library/pnpm' plans` → no output; `grep -l 'not under `vite-plus`' plans/0{0[1-9],1[0-4]}-*.md | wc -l` → `14`.

### Step 2: Make the asset paths repo-relative

In `plans/014-brand-refresh-og-image.md`, replace the absolute prefix of the three `plans/assets/…` paths (two `og.png`, one `make-og.mjs`) with nothing, so they become `plans/assets/…`:

```sh
sed -i '' -E 's#/Users/[^ `]*/(plans/assets/)#\1#g' plans/014-brand-refresh-og-image.md
```

The `cp` command becomes `cp plans/assets/og.png static/og.png`, run from the repo root.

**Verify**: `grep -rnE '/Users/[A-Za-z]|/private/tmp/[A-Za-z]|/tmp/claude' plans --exclude=015-scrub-local-paths.md` → no output.

### Step 3: Read the changed sentences

`git diff --word-diff plans | grep -c '{+'` should be about 17 (one per replaced path). Read three or four hunks and confirm each sentence still reads correctly. No other words should have changed.

## Test plan

- The grep in Step 2 is the test.

## Done criteria

- [ ] `grep -rnE '/Users/[A-Za-z]|/private/tmp/[A-Za-z]|/tmp/claude' plans --exclude=015-scrub-local-paths.md` → no output
- [ ] Only `plans/0*.md` files modified (`git diff --stat`)
- [ ] One commit on `advisor/015-scrub-local-paths`

## STOP conditions

- A path appears in a sentence that does not match the patterns above (report it; do not guess a replacement).
- Any change would be needed outside `plans/0*.md`.

## Maintenance notes

- Future plans should avoid machine-specific paths. Put environment workarounds in the dispatch prompt instead of the plan file.
