# ccstart

[![npm version](https://img.shields.io/npm/v/ccstart.svg)](https://www.npmjs.com/package/ccstart)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/vichannnnn/claude-code/pulls)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/ccstart.svg)](https://www.npmjs.com/package/ccstart)

Quick setup for Claude Code projects with built-in agents, skills, tickets, and orchestration workflows.

## Installation

```bash
# Create a new project
npx ccstart my-project

# Setup in current directory
npx ccstart .

# Install globally (optional)
npm install -g ccstart
ccstart my-project
```

## What You Get

```
my-project/
├── CLAUDE.md                 # Project instructions for Claude
├── claude/
│   ├── agents/               # 4 specialized agents
│   ├── docs/                 # ROADMAP.md + agent-orchestration.md
│   ├── skills/               # Workflow automation (commit, create-pr, etc.)
│   └── tickets/              # Task tracking system
└── .claude/
    ├── agents/               # Agents for Claude Code integration
    └── skills/               # Skills for Claude Code integration
```

## The Workflow

### How Claude Uses Your Project

1. **CLAUDE.md** provides context and instructions
2. **Agents** handle specialized tasks:
   - `planner` - Strategic planning and task breakdown
   - `checker` - Quality assurance and code review
   - `backend` - FastAPI/Python backend development
   - `frontend` - React/TypeScript frontend development
3. **Skills** automate common workflows:
   - `/commit` - Conventional commits
   - `/create-pr` - Structured pull requests
   - `/create-ticket` - Task ticket creation
   - `/design-feature` - Feature design phases
4. **Tickets** track tasks with status emojis

### Agent Orchestration Workflows

Pre-configured workflows that coordinate agents:

| Workflow | Flow |
|----------|------|
| Feature Development | Planner → Backend/Frontend → Checker |
| Bug Fix | Planner → Backend/Frontend → Checker |
| API Development | Planner → Backend → Frontend → Checker |
| UI Components | Planner → Frontend → Checker |
| Quality Assurance | Planner → Checker → Fix → Checker |

See `claude/docs/agent-orchestration.md` for detailed workflow documentation.

## Command Line Options

```bash
ccstart [project-name] [options]

Options:
  --force, -f     Skip all prompts and overwrite existing files
  --dry-run, -d   Show what would be done without making changes
  --agents        Interactive agent selection mode
  --all-agents    Include all agents without prompting
  --no-agents     Skip agent selection entirely
  --help, -h      Show help message

Examples:
  ccstart my-app --all-agents  # Include all agents
  ccstart . --force            # Overwrite in current directory
  ccstart --agents             # Preview available agents
```

## Key Features

- **Interactive Agent Selection** - Choose which agents to include during setup
- **Agent Orchestration Workflows** - Pre-defined workflows that coordinate multiple agents
- **Smart Conflict Resolution** - Handle existing files with skip/rename/overwrite options
- **Auto-detects Claude Code** - Creates .claude directory structure automatically
- **Dry Run Mode** - Preview changes before applying them
- **Force Mode** - Skip all prompts for automated workflows

## Quick Start

```bash
npx ccstart my-project
cd my-project

# Edit CLAUDE.md with your project details
# Start using Claude Code with pre-configured agents and workflows
```

## Local Development

```bash
# Method 1: npm link (Recommended)
cd /path/to/ccstart
npm link
ccstart test-project

# Method 2: Direct execution
node bin/create-project.js ../test-project

# Clean up
npm unlink -g ccstart
```

## Credits

Born from our discussions in TechOverflow with [vichannnnn](https://github.com/vichannnnn), [MrMarciaOng](https://github.com/MrMarciaOng), and [nasdin](https://github.com/nasdin)

## License

MIT
