# ccstart

[![npm version](https://img.shields.io/npm/v/ccstart.svg)](https://www.npmjs.com/package/ccstart)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/vichannnnn/claude-code/pulls)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/ccstart.svg)](https://www.npmjs.com/package/ccstart)

Quick setup for Claude Code projects with built-in agents, ticket system, planning tools and agent orchestration workflow.

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

## What's Included

- **CLAUDE.md** - Project instructions for Claude (references claude/ subdirectories)
- **claude/** - All Claude-related files in one organized directory:
  - **agents/** - 8 specialized AI agents (planner, coder, checker, researcher, etc.)
  - **tickets/** - Task tracking system with ticket templates
  - **plans/** - Project planning documents
  - **docs/** - ROADMAP.md and agent orchestration workflows
- **.claude/** - Claude Code configuration (created automatically):
  - **agents/** - Selected agents for Claude Code integration
  - **commands/** - Custom slash commands including `/update-claude-md`
  - **hooks/** - Automatic workflow detection
  - **settings.json.example** - Hook configuration

## Key Features

- 🎯 **Interactive Agent Selection** - Choose which agents to include during setup
- 🔄 **Agent Orchestration Workflows** - Pre-defined workflows that coordinate multiple agents
- 🔒 **Smart Conflict Resolution** - Handle existing files with skip/rename/overwrite options
- 📁 **Auto-detects Claude Code** - Creates .claude directory structure automatically
- 🏃 **Dry Run Mode** - Preview changes before applying them
- ⚡ **Force Mode** - Skip all prompts for automated workflows
- 🎭 **Workflow Commands** - Execute complex workflows with single commands
- 🪝 **Intelligent Hooks** - Automatically detect task patterns and suggest workflows

## Quick Start

```bash
npx ccstart my-project
cd my-project

# Edit CLAUDE.md with your project details
# Start using Claude Code with pre-configured agents and workflows
```

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

## Agent Orchestration

The template includes pre-configured workflows that automatically coordinate agents:

- **Feature Development** → Researcher → Planner → Coder → Checker
- **Bug Fix** → Researcher → Coder → Checker
- **API Development** → Planner → Backend → Frontend → Checker
- **Refactoring** → Researcher → Planner → Coder → Checker
- **UI Components** → Frontend → Shadcn → Checker
- **Quality Assurance** → Researcher → Checker → Coder → Checker

See `claude/docs/agent-orchestration.md` for detailed workflow documentation.

## Custom Commands & Hooks

### Slash Commands
- `/update-claude-md` - Automatically populate project information in CLAUDE.md
- `/workflow-*` commands - Execute orchestrated workflows (coming soon)

### Automatic Workflow Detection
Hooks automatically detect task patterns and suggest appropriate workflows:
- Feature requests → suggests `/workflow-feature`
- Bug reports → suggests `/workflow-bug`
- API tasks → suggests `/workflow-api`
- And more! (QA, refactoring, UI components, blockchain)

Hooks are automatically enabled - no setup required!

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