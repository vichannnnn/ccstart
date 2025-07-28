# Claude Custom Commands

This directory contains custom slash commands for Claude Code. These commands extend Claude's capabilities with project-specific workflows.

## Available Commands

### `/review-tickets`
Reviews all tickets in the project and provides a comprehensive status report.

**Usage**: `/review-tickets`

**What it does**:
- Analyzes all tickets in `/tickets/` directory
- Provides progress overview and status
- Identifies dependencies and blockers
- Suggests prioritization and execution order
- Recommends resource allocation

## Creating Custom Commands

To create a new custom command:

1. Create a new `.md` file in this directory
2. Name it after your command (e.g., `my-command.md` for `/my-command`)
3. Write the prompt/instructions for what the command should do
4. The command will be available immediately as `/command-name`

## Command Structure

Commands should follow this structure:

```markdown
# Command Name

Brief description of what this command does.

## Task for [Agent Name] Agent

Detailed instructions for the agent...

## Expected Output

What format/structure the output should have...
```

## Best Practices

1. **Be Specific**: Clearly define what the command should accomplish
2. **Specify Agent**: Indicate which agent should handle the task
3. **Define Output**: Describe the expected format and structure
4. **Keep Focused**: Each command should do one thing well

## Example Commands Ideas

- `/generate-changelog` - Generate changelog from recent commits
- `/update-roadmap` - Update ROADMAP.md based on completed tickets
- `/create-release` - Prepare a new release with all necessary steps
- `/audit-security` - Run security audit using checker agent
- `/document-api` - Generate API documentation