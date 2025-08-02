# Claude Code Custom Commands

This directory contains custom slash commands for Claude Code. These commands enhance your development workflow by providing project-specific functionality.

## Available Commands

### /update-claude-md
Updates the CLAUDE.md file with project-specific information automatically detected from your codebase.

Usage: `/update-claude-md`

## Creating Custom Commands

To create a new custom command:

1. Create a new `.md` file in this directory (e.g., `my-command.md`)
2. The filename becomes the command name (e.g., `/my-command`)
3. Add your command prompt or instructions in the file

### Command Structure

Basic command:
```markdown
Analyze the codebase and provide a summary of the architecture
```

Command with frontmatter:
```markdown
---
description: "Analyze project architecture"
allowedTools: ["Read", "Grep", "LS"]
model: "claude-3-sonnet-20240229"
---

Analyze the codebase structure and provide:
1. Project architecture overview
2. Key components and their relationships
3. Technology stack summary
```

### Using Arguments

Commands can accept arguments using `$ARGUMENTS`:
```markdown
Search for all occurrences of "$ARGUMENTS" in the codebase and list the files
```

Usage: `/search-term useState`

### Executing Bash Commands

You can include bash commands to be executed:
```markdown
Run the following command and analyze the output:
```bash
npm test
```
```

## Command Naming

- Use lowercase letters and hyphens
- Be descriptive but concise
- Examples: `update-docs`, `run-tests`, `analyze-deps`

## Subdirectories

You can organize commands in subdirectories for namespacing:
- `.claude/commands/git/status.md` → `/git/status`
- `.claude/commands/npm/audit.md` → `/npm/audit`