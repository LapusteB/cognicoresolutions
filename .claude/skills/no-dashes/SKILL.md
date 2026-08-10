---
name: no-dashes
description: Use this skill whenever writing prose, copy, documentation, commit messages, or any user-facing text. Enforces a strict no-dash punctuation rule across all generated content.
---

# No Dashes Style Rule

When writing any prose, copy, documentation, commit messages, code comments, or user-facing text, never use:

- Em dashes (—)
- Hyphens used as sentence punctuation (" - " with spaces around it, used to set off a clause)
- Double hyphens used as punctuation ("--")

## What this does NOT restrict

- Hyphens inside compound words (e.g. "well-known", "data-driven", "multi-agent") are fine — those are spelling, not punctuation.
- Hyphens in code, file paths, CLI flags, URLs, or identifiers (e.g. "kebab-case-name", "--verbose" as a real CLI flag) are fine — this rule is about prose punctuation only, not code syntax.
- Minus signs in math or negative numbers are fine.

## Replacement rules

When you would normally reach for a dash to join or separate clauses, use one of these instead:

- Split into two sentences.
- Use a comma, colon, or semicolon where grammatically appropriate.
- Use parentheses if the clause is truly a side note.

## Self-check before finalizing any output

Before returning generated text, scan it for " - ", "--", and "—". If found, rewrite the sentence rather than just deleting the dash, so it still reads naturally.
