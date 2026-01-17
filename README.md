# ccstart

[![npm version](https://img.shields.io/npm/v/ccstart.svg)](https://www.npmjs.com/package/ccstart)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/vichannnnn/claude-code/pulls)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/ccstart.svg)](https://www.npmjs.com/package/ccstart)

Quick setup for Claude Code projects with built-in agents, skills, hooks, and ticket tracking.

## Why ccstart?

Setting up new projects or repositories and plugging in Claude Code into it requires more than just generating a 
CLAUDE.md for most developers who wants a more customized workflow such as manual 
creation of agents, skills, hooks, and project structure. 

There isn't a standardized approach, leading to inconsistent setups and repeated boilerplate work across projects. 
We already have boilerplate for our codebase to build CRUD and stuff, having one for something heavily customized 
like Claude seems like the obvious solution.

ccstart provides a complete, opinionated scaffolding with basic agents, skills, and workflows out of the box so that we
can focus on immediately prompting and building while trying to keep context bloat and overengineering as low as 
possible.

## Quick Start Installation

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
├── CLAUDE.md                        # Project instructions for Claude
├── claude/
│   └── tickets/
│       ├── README.md                # Ticket format and structure guide
│       └── ticket-list.md           # Centralized ticket index
└── .claude/
    ├── agents/
    │   ├── planner.md               # Strategic planning
    │   ├── checker.md               # QA and code review
    │   ├── backend.md               
    │   └── frontend.md              
    ├── skills/
    │   ├── commit/                  # Conventional commits
    │   ├── create-pr/               # Structured pull requests
    │   ├── create-ticket/           # Ticket creation workflow
    │   ├── design-feature/          # Opinionated design phases
    │   ├── create-script/           # Python CLI generation for ideation
    │   ├── skill-creator/           # Create new skills
    │   └── update-claude-md/        # CLAUDE.md maintenance
    └── hooks/
        ├── ticket-reminder.sh       # Prompts ticket creation after planning
        └── claude-md-reminder.sh    # Enforces CLAUDE.md instructions every prompt
```

## The Integrated Workflow

ccstart components work together to provide a complete development workflow:

Generally, this is what I do personally:

1. **Start with `/design-feature`** - Establish requirements and acceptance criteria before writing code
2. **Persist requirements with `/create-ticket`** - Keep a clear record of work in the ticket system
3. **Use the Planner agent** - Break down implementation into actionable tasks
4. **Use Backend/Frontend agents** - Follow established patterns for consistent, high-quality code
5. **Use the Checker agent** - Review code for quality, security, and performance before merging
6. **Use `/commit` and `/create-pr`** - Maintain clean git history with conventional commits


## Agents

Agents in Claude's context basically works outside of your main context window, so you can use them for tasks and 
analysis that will not pollute your context and bloat unnecessarily. 

Invoke them with `@agent-name` in Claude Code or through natural language.


## Skills

Skills are basically macros, they can be explicitly invoked with `/skill-name` as if using slash commands, or 
through natural language by triggering keywords. 

They are best suited for repetitive action that you don't want to 
keep typing the same thing for.


## Hooks

Hooks are shell scripts that run automatically in response to Claude Code events, such as before prompting, after 
prompting. 

If you know what lifespans are in context of backend development, this is basically it but for lifecycle 
of prompt!

### ticket-reminder

**Triggers:** After exiting plan mode (PostToolUse on ExitPlanMode)

**Purpose:** Prompts Claude to create a ticket for significant features or bug fixes after a plan is approved. Helps ensure work is tracked without manual reminders.

### claude-md-reminder

**Triggers:** On every user prompt submission

**Purpose:** Reminds Claude to:
1. Review and respect all instructions in CLAUDE.md
2. Ask clarifying questions instead of making assumptions

## Ticket System

A lightweight task tracking system built into your project so that you can have persistency for your implementation 
plans across Claude session, while leaving an audit trace that Claude can refer back to whenever needed.

### Status Emojis

| Emoji | Status | Description |
|-------|--------|-------------|
| 🔴 | Todo | Not started |
| 🟡 | In Progress | Currently being worked on |
| 🟢 | Done | Completed |
| 🔵 | Blocked | Waiting on dependencies |
| ⚫ | Cancelled | No longer needed |

### File Structure

```
tickets/
├── ticket-list.md              # Centralized index of all tickets
├── README.md                   # Ticket format guide
├── TICKET-001-user-auth.md     # Individual ticket files
├── TICKET-002-api-docs.md
└── TICKET-003-testing.md
```

### Ticket Naming Convention

Format: `TICKET-XXX-brief-description.md`

Example: `TICKET-042-implement-dark-mode.md`

### ticket-list.md

The centralized index organizes tickets by priority (High/Medium/Low) with status emojis and links to individual ticket files. Update this file whenever you create, modify, or complete tickets.

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
  ccstart my-app --dry-run     # Preview changes without applying
```

## Interactive Setup

When you run `ccstart`, you'll be guided through selection prompts:

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

Use `--all-agents` to skip selection and include everything.

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
