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
├── .claude/           # Claude Code configuration (auto-generated)
│   ├── agents/        # Project-specific agent overrides
│   └── commands/      # Custom slash commands for Claude Code
├── claude/            # Claude Code project organization
│   ├── agents/        # Custom agents for specialized tasks
│   ├── docs/          # Project documentation
│   ├── plans/         # Project plans and architectural documents
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

### Git Workflow

- Create descriptive commit messages
- Keep commits focused and atomic
- Review changes before committing

## Commit Convention and Pull Request Guidelines

### Commit Message Format
Follow the conventional commits specification:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks (updating dependencies, build process, etc.)
- `perf`: Performance improvements

**Examples:**
```
feat(auth): add password reset functionality
fix(api): handle null values in user response
docs: update API documentation for book endpoints
refactor(frontend): extract BookTable into separate components
chore(deps): update FastAPI to 0.104.1
```

### Pull Request Guidelines

**PR Title**: Use the same format as commit messages

**PR Description Template:**
```markdown
## Summary
Brief description of what this PR does and why it's needed.

## Changes
- List of specific changes made
- Technical implementation details if relevant

## Testing
- [ ] Tests pass (if applicable)
- [ ] Manual testing completed
- [ ] No console errors or warnings

## Manual Testing Steps
1. Describe steps to manually test the feature
2. Expected behavior and edge cases tested

## Screenshots (if UI changes)
Attach relevant screenshots here

## Related Issues
Closes #XXX (if applicable)

## Checklist
- [ ] Code follows project conventions
- [ ] Self-documented code without unnecessary comments
- [ ] All tests pass
- [ ] Documentation updated if needed
- [ ] No sensitive information exposed
```

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

## Agents

See @claude/agents/README.md for available agents and their purposes

## Agent Orchestration

After adding the agents you want to in `./claude/agents` folder, setup the workflow for Claude code to follow

## Custom Commands

Custom slash commands are available in `.claude/commands/`:
- **/update-claude-md** - Automatically updates this file with project-specific information
- See `.claude/commands/README.md` for creating your own commands

## Tickets

See @claude/tickets/README.md for ticket format and management approach

### Ticket Management
- **Ticket List**: Maintain @claude/tickets/ticket-list.md as a centralized index of all tickets
- **Update ticket-list.md** whenever you:
  - Create a new ticket (add to appropriate priority section)
  - Change ticket status (update emoji and move if completed)
  - Complete a ticket (move to completed section with date)
- **Status Emojis**: 🔴 Todo | 🟡 In Progress | 🟢 Done | 🔵 Blocked | ⚫ Cancelled

## Plans

See @claude/plans/README.md for planning documents and architectural decisions

## Development Context

- See @claude/docs/ROADMAP.md for current status and next steps
- Task-based development workflow with tickets in `claude/tickets` directory
- Use `claude/plans` directory for architectural decisions and implementation roadmaps

## Important Instructions

Before starting any task:

1. **Confirm understanding**: Always confirm you understand the request and outline your plan before proceeding
2. **Ask clarifying questions**: Never make assumptions - ask questions when requirements are unclear
3. **Create planning documents**: Before implementing any code or features, create a markdown file documenting the approach
4. **Use plans directory**: When discussing ideas or next steps, create timestamped files in the plans directory (e.g., `claude/plans/next-steps-YYYY-MM-DD-HH-MM-SS.md`) to maintain a record of decisions
5. **No code comments**: Never add comments to any code you write - code should be self-documenting
6. **Maintain ticket list**: Always update @claude/tickets/ticket-list.md when creating, updating, or completing tickets to maintain a clear project overview

## Additional Notes
<!-- auto-generated-start:notes -->
[Any other important information for Claude to know about this project]
<!-- auto-generated-end:notes -->