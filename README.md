# ccstart

[![npm version](https://img.shields.io/npm/v/ccstart.svg)](https://www.npmjs.com/package/ccstart)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/vichannnnn/claude-code/pulls)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/ccstart.svg)](https://www.npmjs.com/package/ccstart)

Quick setup for Claude Code projects with built-in agents, skills, and tickets.

## Installation

```bash
# To set up in a specific directory
npx ccstart <project directory>

# Setup in current directory
npx ccstart .

# Install globally (optional)
npm install -g ccstart
ccstart <project directory>
```

## What You Get

```
my-project/
├── CLAUDE.md                 # Project instructions for Claude
├── claude/
│   └── tickets/              # Task tracking system
└── .claude/
    ├── agents/               # Agents for Claude Code integration
    ├── skills/               # Skills for Claude Code integration
    └── hooks/                # Hooks for Claude Code integration
```

## The Workflow

### How Claude Uses Your Project

1. **CLAUDE.md** provides context and instructions
2. **Agents** handle specialized tasks:
   - `planner` - Strategic planning and task breakdown
   - `checker` - Quality assurance and code review
   - `backend` - Backend architecture and API design
   - `frontend` - Frontend architecture and UI design
3. **Skills** automate common workflows:
   - `/commit` - Conventional commits
   - `/create-pr` - Structured pull requests
   - `/create-ticket` - Task ticket creation
   - `/design-feature` - Feature design phases
   - `/skill-creator` - Create new skills
   - `/update-claude-md` - Update CLAUDE.md sections
4. **Tickets** track tasks with status emojis

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

## Interactive Setup

When you run `ccstart`, you'll be guided through three selection prompts:

### Agent Selection

```
? Choose your agents: (Press <space> to select, <a> to toggle all)
❯◯ planner
     Strategic planning and task breakdown specialist
 ◯ checker
     Quality assurance and code review specialist
 ◯ backend
     Backend architecture and API design specialist
 ◯ frontend
     Frontend architecture and UI design specialist
```

### Skill Selection

```
? Choose your skills: (Press <space> to select, <a> to toggle all)
❯◯ commit
     Generate and execute git commits following conventional commit format
 ◯ create-pr
     Create GitHub pull requests with properly structured descriptions
 ◯ create-ticket
     Create task tickets with proper numbering and update ticket-list.md
 ◯ design-feature
     Guide feature development through requirements and design phases
 ◯ skill-creator
     Guide for creating new skills
 ◯ update-claude-md
     Update CLAUDE.md sections through interactive Q&A
```

Use `--all-agents` to skip agent selection and include all agents.

## Key Features

- **Interactive Agent & Skill Selection** - Choose which agents and skills to include during setup
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

Born from our discussions in TechOverflow with [vichannnnn](https://github.com/vichannnnn) and [MrMarciaOng](https://github.com/MrMarciaOng).

## License

MIT
