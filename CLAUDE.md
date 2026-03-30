# claude-cc

Auto-resume Claude Code sessions per git branch.

## Architecture

Single bash script (`bin/cc`). Zero npm dependencies — only requires `bash` and the `claude` CLI.

## How session lookup works

1. Converts `pwd` to a project key by replacing `/` with `-`
2. Scans `~/.claude/projects/<project_key>/*.jsonl` for session files
3. For each session, reads lines to find the **first** `user` message containing a `gitBranch` field — this determines which branch the session "belongs to"
4. Among sessions matching the current branch, picks the one with the latest `timestamp` (ISO string comparison)
5. Runs `claude --resume <session-id>` if found, otherwise starts fresh

Sessions are matched by where they **started**, not where they last ran.

## Local testing

```bash
npm install -g .   # install from local path
cc                 # run from any git repo
```

## Publishing

```bash
npm publish        # requires npm login
```

## Key decisions

- **grep/sed for JSON parsing** — extracts string fields from JSONL lines using `grep -oE` with a pattern that matches `"field": "value"`, avoiding any external dependencies beyond standard POSIX tools
- **Fallback behavior** — outside a git repo or when no session exists, `cc` passes through to `claude "$@"` unchanged
- **First-branch matching** — a session belongs to the branch where it started, not the last branch seen in the conversation
