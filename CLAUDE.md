# Claude Code Project Instructions

## Project Overview
ccsetup is a boilerplate generator designed to help developers quickly set up their Claude Code environment with pre-configured structure, specialized agents, ticket system, and planning tools. It provides a ready-to-use project structure optimized for AI-assisted development workflows.

## Key Objectives
- Provide instant Claude Code project setup with a single command
- Include pre-built specialized agents for common development tasks
- Establish organized workflow with tickets, plans, and documentation
- Enable developers to start AI-assisted development immediately

## Project Structure
```
.
├── CLAUDE.md          # This file - project instructions for Claude
├── agents/            # Custom agents for specialized tasks
├── docs/              # Project documentation
├── plans/             # Project plans and architectural documents
└── tickets/           # Task tickets and issues
```

## Development Guidelines

### Agent Orchestration
- **IMPORTANT**: Follow the agent workflows defined in @docs/agent-orchestration.md
- Always use the appropriate workflow for your task type (Feature Development, Bug Fix, Refactoring, etc.)
- Execute agents sequentially as defined in the orchestration guide
- Track progress through workflows using TodoWrite

### Code Style
- Follow existing code conventions in the project
- Use consistent naming patterns
- Maintain clean, readable code

### Testing
- Run tests before committing changes
- Add tests for new functionality
- Ensure all tests pass
- **IMPORTANT**: Only create test files within the project directory
- Never use external paths like /tmp, /var, or ~/
- Use project-relative paths for all test files and directories

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
feat(agents): add backend development agent
fix(setup): handle existing file conflicts during installation
docs: update agent selection instructions in README
refactor(cli): extract agent parsing into separate module
chore(deps): update inquirer to 9.2.0
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
```bash
# Install dependencies
npm install

# Run the setup script locally
node bin/index.js <project-name>

# Test the package locally
npm link
ccsetup my-test-project

# Publish to npm
npm publish
```

## Important Context
- This is an npm package published as `ccsetup`
- The main entry point is `bin/index.js` which creates the boilerplate structure
- Templates are stored in the `templates/` directory and copied to new projects
- The package creates a complete Claude Code project structure with agents, documentation, and workflow templates
- Users can customize which agents to include by copying only needed ones to their project

## Agents
See @agents/README.md for available agents and their purposes

## Tickets
See @tickets/README.md for ticket format and management approach

## Plans
See @plans/README.md for planning documents and architectural decisions

## Development Context 

- See @docs/ROADMAP.md for current status and next steps
- Task-based development workflow with tickets in `/tickets` directory
- Use `/plans` directory for architectural decisions and implementation roadmaps

## Important Instructions

Before starting any task:
1. **Follow Agent Orchestration**: Refer to @docs/agent-orchestration.md and follow the appropriate workflow for your task type
2. **Confirm understanding**: Always confirm you understand the request and outline your plan before proceeding
3. **Ask clarifying questions**: Never make assumptions - ask questions when requirements are unclear
4. **Create planning documents**: Before implementing any code or features, create a markdown file documenting the approach
5. **Use plans directory**: When discussing ideas or next steps, create timestamped files in the plans directory (e.g., `plans/next-steps-YYYY-MM-DD-HH-MM-SS.md`) to maintain a record of decisions
6. **No code comments**: Never add comments to any code you write - code should be self-documenting
7. **Sequential agent execution**: When using multiple agents, execute them in the order specified in the orchestration workflows

## File Management Rules

### CRITICAL: Working Directory Restrictions
1. **ALWAYS** work exclusively within the project directory
2. **NEVER** create or modify files outside the project root
3. **NEVER** use absolute paths to external directories (e.g., /tmp, /var, /usr, ~/)
4. **ALWAYS** use project-relative paths for all file operations

### Test File Organization
- Place test files in designated test directories:
  - `__test__/` or `__tests__/` for JavaScript/TypeScript projects
  - `test/` for general test files and fixtures
  - `spec/` for specification-based tests
  - Follow project-specific conventions if different
- Mirror source code structure in test directories
- Use appropriate naming conventions (*.test.js, *.spec.ts, test_*.py)

### Example File Operations
```bash
# CORRECT - Project relative paths
mkdir -p __test__/unit
touch __test__/unit/component.test.js
echo "data" > test/fixtures/sample.json

# INCORRECT - External paths (NEVER DO THIS)
# touch /tmp/test.js
# mkdir ~/test-files
# echo "data" > /var/tmp/output.txt
```

## Additional Notes
[Any other important information for Claude to know about this project]