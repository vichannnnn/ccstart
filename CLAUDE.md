# Claude Code Project Instructions

## Project Overview
<!-- auto-generated-start:overview -->
ccstart is a quick setup tool for Claude Code projects that provides a well-organized structure with built-in AI agents, ticket system, and planning tools.
<!-- auto-generated-end:overview -->

## Key Objectives
<!-- auto-generated-start:objectives -->
- Provide a quick and easy way to initialize Claude Code projects with best practices
- Include pre-configured AI agents (planner, checker, backend, frontend) for specialized tasks
- Offer built-in ticket tracking and project planning systems
- Support interactive agent selection and conflict resolution during setup
<!-- auto-generated-end:objectives -->

## Project Structure

```
.
├── CLAUDE.md          # This file - instructions for ccstart development
├── bin/               # CLI entry point
│   └── create-project.js
├── template/          # Template files copied to new projects
│   └── claude/
│       ├── CLAUDE.md  # Template CLAUDE.md for user projects
│       ├── ROADMAP.md # Project roadmap template
│       ├── agents/    # Agent definitions (copied to .claude/agents/)
│       ├── skills/    # Skill definitions (copied to .claude/skills/)
│       ├── hooks/     # Hook definitions (copied to .claude/hooks/)
│       └── tickets/   # Ticket system templates (copied to claude/tickets/)
├── package.json
└── README.md
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
# Installation and Usage
npm install -g ccstart          # Install globally
npx ccstart my-project          # Create new project
ccstart . --agents              # Setup in current directory with agent selection

# CLI Options
ccstart --help                  # Show help
ccstart --all-agents            # Include all agents
ccstart --force                 # Skip prompts and overwrite
ccstart --dry-run               # Preview changes without applying

# Local Development
npm link                        # Link for local development
npm unlink -g ccstart           # Unlink after development
```
<!-- auto-generated-end:commands -->

## Skills (Provided to Users)

ccstart includes pre-configured skills in the template that users get when they create a new project:

- **/commit** - Generate and execute git commits following conventional commit format
- **/create-pr** - Create GitHub pull requests with structured descriptions
- **/create-ticket** - Create task tickets with proper numbering and update ticket-list.md
- **/design-feature** - Guide feature development through requirements and design phases
- **/skill-creator** - Guide for creating new skills
- **/update-claude-md** - Update CLAUDE.md sections through interactive Q&A

Skills are located in `template/claude/skills/` and copied to `.claude/skills/` in user projects during setup.

## Important Instructions

Before starting any task:

1. **Confirm understanding**: Always confirm you understand the request and outline your plan before proceeding
2. **Ask clarifying questions**: Never make assumptions - ask questions when requirements are unclear
3. **No code comments**: Never add comments to any code you write - code should be self-documenting

## Additional Notes
<!-- auto-generated-start:notes -->
**Technology Stack:**
- Node.js CLI application
- @inquirer/checkbox for interactive agent selection
- No build process required - runs directly with Node.js

**Key Features:**
- Interactive set-up customization through CLI
- Pre-configured skills for common workflows (commit, create-pr, create-ticket, etc.)
- Conflict resolution for existing files
- Dry run mode for previewing changes
- Force mode for automated workflows
**Development Workflow:**
This is the ccstart tool itself, not a project created by ccstart. When developing:
1. Use `npm link` for local testing
2. Test changes by running `ccstart` in test directories
3. Run tests with `npm test` before committing
4. Update version in package.json before publishing

**Available Agents:**
- planner: Strategic planning and task breakdown
- checker: Quality assurance and code review
- backend: Backend architecture and API design
- frontend: Frontend architecture and UI design
<!-- auto-generated-end:notes -->
