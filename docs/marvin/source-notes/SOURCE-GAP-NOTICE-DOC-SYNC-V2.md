# Source Gap Notice — Repository Governance Files

During the documentation generation, the project/file library provided the strategic Marvin documents, but did not expose the exact repository versions of:

- `CURRENT.md`;
- `DECISIONS.md`;
- `CHANGELOG.md`;
- `handoffs/2026-09-05-com-g1-closeout-claude-to-codex.md`;
- `specs/COM-G1-CODEX-INTAKE.md`.

The conversation contained their latest known state, so reconciliation drafts were generated.

These drafts MUST NOT overwrite unseen repository history blindly.

At DOC-SYNC:

1. read actual repo files;
2. preserve history;
3. append/merge decisions;
4. retain historical handoff;
5. create new handoff;
6. record actual Git hashes.

This gap does not affect the strategic V2 documents, but it prevents claiming that the repo governance files were directly patched in this chat.
