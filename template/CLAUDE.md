# Claude Code Project Instructions

## Project Overview

[Brief description of your project goes here]

## Key Objectives

- [Objective 1]
- [Objective 2]
- [Objective 3]

## Project Structure

```
.
├── CLAUDE.md          # This file - project instructions for Claude
├── .claude/           # Claude Code configuration (auto-generated)
│   └── agents/        # Project-specific agent overrides
├── agents/            # Custom agents for specialized tasks
├── docs/              # Project documentation
├── plans/             # Project plans and architectural documents
└── tickets/           # Task tickets and issues
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

## Common Commands

```bash
# Add your common project commands here
# npm install
# npm run dev
# npm test
```

## Important Context

[Add any project-specific context, dependencies, or requirements here]

## Agents

See @agents/README.md for available agents and their purposes

## Agent Orchestration

After adding the agents you want to in `./claude/agents` folder, setup the workflow for Claude code to follow

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

1. **Confirm understanding**: Always confirm you understand the request and outline your plan before proceeding
2. **Ask clarifying questions**: Never make assumptions - ask questions when requirements are unclear
3. **Create planning documents**: Before implementing any code or features, create a markdown file documenting the approach
4. **Use plans directory**: When discussing ideas or next steps, create timestamped files in the plans directory (e.g., `plans/next-steps-YYYY-MM-DD-HH-MM-SS.md`) to maintain a record of decisions
5. **No code comments**: Never add comments to any code you write - code should be self-documenting

## Additional Notes

[Any other important information for Claude to know about this project]
