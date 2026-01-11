# Claude Code Project Instructions

## Project Overview
<!-- auto-generated-start:overview -->
ccstart is a quick setup tool for Claude Code projects that provides a well-organized structure with built-in AI agents, ticket system, planning tools, and agent orchestration workflows. It creates a comprehensive boilerplate that helps developers quickly initialize projects with best practices for AI-assisted development using Claude Code.
<!-- auto-generated-end:overview -->

## Key Objectives
<!-- auto-generated-start:objectives -->
- Provide a quick and easy way to initialize Claude Code projects with best practices
- Include pre-configured AI agents (planner, coder, checker, researcher, etc.) for specialized tasks
- Offer built-in ticket tracking and project planning systems
- Enable agent orchestration workflows for common development patterns
- Support interactive agent selection and conflict resolution during setup
<!-- auto-generated-end:objectives -->

## Project Structure

```
.
├── CLAUDE.md          # This file - project instructions for Claude
├── .claude/           # Claude Code configuration (auto-generated)
│   ├── agents/        # Project-specific agent overrides
│   └── skills/        # Skills copied from claude/skills/ for Claude Code
├── claude/            # Claude Code project organization
│   ├── agents/        # Custom agents for specialized tasks
│   ├── docs/          # Project documentation
│   ├── skills/        # Skill definitions (source of truth)
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
# Installation and Usage
npm install -g ccstart          # Install globally
npx ccstart my-project          # Create new project
ccstart . --agents              # Setup in current directory with agent selection

# Testing
npm test                        # Run tests
npm run test:watch              # Run tests in watch mode
npm run test:coverage           # Run tests with coverage

# Local Development
npm link                        # Link for local development
npm unlink -g ccstart           # Unlink after development

# CLI Options
ccstart --help                  # Show help
ccstart --all-agents            # Include all agents
ccstart --force                 # Skip prompts and overwrite
ccstart --dry-run               # Preview changes without applying
```
<!-- auto-generated-end:commands -->

## Important Context

[Add any project-specific context, dependencies, or requirements here]

## Agents

See @claude/agents/README.md for available agents and their purposes

## Agent Orchestration

After adding the agents you want to in `./claude/agents` folder, setup the workflow for Claude code to follow

## Skills

Skills are modular packages that extend Claude's capabilities with specialized workflows and domain knowledge. They are defined in `claude/skills/` and copied to `.claude/skills/` for Claude Code to use.

### Available Skills

- **/commit** - Generate and execute git commits following conventional commit format
- **/create-pr** - Create GitHub pull requests with structured descriptions
- **/create-ticket** - Create task tickets with proper numbering and update ticket-list.md
- **/design-feature** - Guide feature development through requirements and design phases
- **/design-principles** - Enforce a precise, minimal design system
- **/skill-creator** - Guide for creating new skills

### Adding Skills to Your Project

1. **Create a skill folder** in `claude/skills/`:
   ```
   claude/skills/
   └── my-skill/
       └── SKILL.md
   ```

2. **Write the SKILL.md** with required frontmatter:
   ```markdown
   ---
   name: my-skill
   description: Description of what this skill does and when to use it.
   ---

   # My Skill

   Instructions for using this skill...
   ```

3. **Copy to .claude/skills/** for Claude Code to detect:
   ```bash
   cp -r claude/skills/my-skill .claude/skills/
   ```

### Skill Structure

```
skill-name/
├── SKILL.md (required)     # Frontmatter + instructions
├── scripts/                # Executable code (optional)
├── references/             # Documentation to load as needed (optional)
└── assets/                 # Templates, images, etc. (optional)
```

See `claude/skills/skill-creator/SKILL.md` for detailed guidance on creating skills.

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

- See @claude/docs/ROADMAP.md for current status and next steps
- Task-based development workflow with tickets in `claude/tickets` directory

## Important Instructions

Before starting any task:

1. **Confirm understanding**: Always confirm you understand the request and outline your plan before proceeding
2. **Ask clarifying questions**: Never make assumptions - ask questions when requirements are unclear
3. **No code comments**: Never add comments to any code you write - code should be self-documenting
4. **Maintain ticket list**: Always update @claude/tickets/ticket-list.md when creating, updating, or completing tickets to maintain a clear project overview

## Additional Notes
<!-- auto-generated-start:notes -->
**Technology Stack:**
- Node.js CLI application
- Jest for testing
- @inquirer/checkbox for interactive agent selection
- No build process required - runs directly with Node.js

**Key Features:**
- Interactive agent selection during setup
- Pre-configured skills for common workflows (commit, create-pr, create-ticket, etc.)
- Conflict resolution for existing files
- Dry run mode for previewing changes
- Force mode for automated workflows
- Pre-configured agent orchestration workflows

**Development Workflow:**
This is the ccstart tool itself, not a project created by ccstart. When developing:
1. Use `npm link` for local testing
2. Test changes by running `ccstart` in test directories
3. Run tests with `npm test` before committing
4. Update version in package.json before publishing

**Available Agents:**
- planner: Strategic planning and architectural decisions
- coder: Implementation and bug fixes
- checker: Quality assurance and testing
- researcher: Information gathering from codebases and online
- frontend: UI/UX development
- backend: Server-side development
- blockchain: Web3 and smart contract development
- shadcn: shadcn/ui component implementation
<!-- auto-generated-end:notes -->