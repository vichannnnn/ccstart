---
description: "Generate and execute git commits following conventional commit format. Use when the user wants to commit changes, create a commit, or says /commit."
allowedTools: ["Bash", "Read", "Grep"]
---

Analyze staged and unstaged changes and create properly formatted commit messages following conventional commits specification.

## Process

1. Run `git status` to check for staged/unstaged changes
2. Run `git diff --staged` to analyze what will be committed
3. Run `git log --oneline -5` to see recent commit style
4. Determine the appropriate commit type based on changes
5. Generate a concise commit message with:
   - Type and optional scope
   - Clear subject line (imperative mood, <50 characters)
   - Body if changes are complex
6. Execute the commit with the generated message

## Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks (dependencies, build process)
- `perf`: Performance improvements

## Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Rules

- Subject line in imperative mood ("add" not "added")
- No period at end of subject
- Subject line under 50 characters
- Body wrapped at 72 characters
- Use body to explain "what" and "why", not "how"

## If No Changes Staged

If no changes are staged, offer to:
1. Show unstaged changes with `git diff`
2. Stage specific files
3. Stage all changes with `git add .`

Then proceed with commit after staging.
