# claude-cc

[![npm version](https://img.shields.io/npm/v/claude-cc.svg)](https://www.npmjs.com/package/claude-cc)
[![npm downloads](https://img.shields.io/npm/dm/claude-cc.svg)](https://www.npmjs.com/package/claude-cc)
[![license](https://img.shields.io/npm/l/claude-cc.svg)](LICENSE)

> Auto-resume Claude Code sessions per git branch.

`cc` wraps the [Claude Code](https://claude.ai/code) CLI and automatically resumes the last session for your current branch — so switching branches never loses your context.

---

![demo](https://raw.githubusercontent.com/paterlinimatias/claude-cc/master/demo.gif)

---

## Install

```bash
npm install -g claude-cc
```

Requires [`claude`](https://claude.ai/code) (`curl -fsSL https://claude.ai/install.sh | bash`) and `python3`.

---

## Usage

Use `cc` instead of `claude`:

```bash
$ git checkout feature/a
$ cc
Resuming session for branch: feature/a

$ git checkout feature/b
$ cc
Resuming session for branch: feature/b

$ git checkout -b feature/c
$ cc
Starting new session for branch: feature/c
```

Each branch gets its own session. `cc` accepts the same flags as `claude` — outside a git repo it behaves identically.

---

## How it works

1. Reads the current branch with `git branch --show-current`
2. Scans `~/.claude/projects/<project>/` for session history
3. Finds the most recent session that **started** on this branch
4. Runs `claude --resume <session-id>`, or a fresh `claude` if none found

No config, no server, no dependencies — just bash and Python stdlib.

---

## License

MIT
