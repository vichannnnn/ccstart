# Claude Code Project Instructions

## Project Overview
<!-- auto-generated-start:overview -->
[Brief description of your project goes here]
<!-- auto-generated-end:overview -->

## Key Objectives
<!-- auto-generated-start:objectives -->
- [Objective 1]
- [Objective 2]
- [Objective 3]
<!-- auto-generated-end:objectives -->

## Project Structure

```
.
├── CLAUDE.md          # This file - project instructions for Claude
├── ROADMAP.md         # Project roadmap and goals
├── .claude/           # Claude Code configuration
│   ├── agents/        # Specialized agents for Claude Code
│   ├── skills/        # Skills for workflow automation
│   └── hooks/         # Event hooks for Claude Code
├── claude/            # Project organization
│   └── tickets/       # Task tickets and issues
└── [your project files and directories]
```

## Development Guidelines

### Code Style

- Follow existing code conventions in the project
- Use consistent naming patterns
- Maintain clean, readable code

### Testing

- Run tests before committing changes
- Add tests for new functionality
- Ensure all tests pass

## Common Commands
<!-- auto-generated-start:commands -->
```bash
# Add your common project commands here
# npm install
# npm run dev
# npm test
```
<!-- auto-generated-end:commands -->

## Important Context

[Add any project-specific context, dependencies, or requirements here]

## Skills

Skills extend Claude's capabilities with specialized workflows. Available skills:

**Git Workflow:**
- **/commit** - Generate and execute git commits following conventional commit format
- **/create-pr** - Create GitHub pull requests with structured descriptions

**Project Management:**
- **/create-ticket** - Create task tickets with proper numbering and update ticket-list.md
- **/design-feature** - Guide feature development through requirements and design phases

**Utilities:**
- **/create-script** - Codify processes into standalone Python scripts with CLI interfaces
- **/skill-creator** - Guide for creating new skills
- **/update-claude-md** - Update CLAUDE.md sections through interactive Q&A

See `.claude/skills/` for skill definitions

## Tickets

See @claude/tickets/README.md for ticket format and management approach

### Ticket Management
- **Ticket List**: Maintain @claude/tickets/ticket-list.md as a centralized index of all tickets
- **Update ticket-list.md** whenever you:
  - Create a new ticket (add to appropriate priority section)
  - Change ticket status (update emoji and move if completed)
  - Complete a ticket (move to completed section with date)
- **Status Emojis**: 🔴 Todo | 🟡 In Progress | 🟢 Done | 🔵 Blocked | ⚫ Cancelled

## Development Context

- See @ROADMAP.md for current status and next steps
- Task-based development workflow with tickets in `claude/tickets` directory

## Important Instructions

Before starting any task:

1. **Confirm understanding**: Always confirm you understand the request and outline your plan before proceeding
2. **Ask clarifying questions**: Never make assumptions - always ask questions when requirements are unclear
3. **No code comments**: Never add comments to any code you write - code should be self-documenting
4. **Maintain ticket list**: Always update @claude/tickets/ticket-list.md when creating, updating, or completing tickets to maintain a clear project overview

## Additional Notes
<!-- auto-generated-start:notes -->
[Any other important information for Claude to know about this project]
<!-- auto-generated-end:notes -->