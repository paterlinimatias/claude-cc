# claude-cc

[![npm version](https://img.shields.io/npm/v/claude-cc.svg)](https://www.npmjs.com/package/claude-cc)
[![npm downloads](https://img.shields.io/npm/dm/claude-cc.svg)](https://www.npmjs.com/package/claude-cc)
[![license](https://img.shields.io/npm/l/claude-cc.svg)](LICENSE)

> Auto-resume Claude Code sessions per git branch.

`cc` is a thin wrapper around the [Claude Code](https://claude.ai/code) CLI that automatically resumes the last session for your current git branch — so you never lose context when switching between features.

---

## The problem

Every time you run `claude`, it starts a fresh session. If you're juggling multiple branches, you lose the conversation history and context you had for each one.

## The solution

`cc` detects your current branch and resumes the most recent Claude Code session that started on it. New branch → new session. Same branch → picks up where you left off.

```
$ git checkout feature/auth
$ cc
Resuming session for branch: feature/auth
```

---

## Install

```bash
npm install -g claude-cc
```

**Prerequisites**

- [`claude`](https://claude.ai/code) CLI installed (`npm install -g @anthropic-ai/claude-code`)
- `python3` available in your PATH

---

## Usage

Just use `cc` wherever you'd use `claude`:

```bash
cc                        # resume or start a session for the current branch
cc "fix the login bug"    # start with an initial prompt
cc --help                 # all claude flags are passed through
```

**Outside a git repo**, `cc` behaves exactly like `claude`.

---

## How it works

1. Reads the current branch with `git branch --show-current`
2. Looks up your local Claude Code session history at `~/.claude/projects/<project>/`
3. Finds the most recent session that **started** on the current branch
4. Runs `claude --resume <session-id>` if found, or a fresh `claude` if not

No config files, no server, no dependencies — just shell and Python stdlib.

---

## License

MIT