---
name: commit
description: Generate and execute git commits following conventional commit format. Use when the user wants to commit changes, create a commit, or says "/commit". Analyzes staged/unstaged changes and creates properly formatted commit messages with type, optional scope, and descriptive subject.
---

# Commit Skill

Generate conventional commit messages and execute commits automatically.

## Workflow

1. Run `git status` (never use `-uall` flag) and `git diff` to analyze changes
2. Run `git log --oneline -5` to see recent commit style
3. Determine the appropriate commit type and scope from the changes
4. Stage all relevant changes with `git add`
5. Create the commit with a properly formatted message

## Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Use for |
|------|---------|
| `feat` | New feature or functionality |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, semicolons, no code change |
| `refactor` | Code change that neither fixes nor adds |
| `test` | Adding or modifying tests |
| `chore` | Maintenance, deps, build process |
| `perf` | Performance improvements |

### Scope

Optional. Include when it adds clarity about what area is affected:
- `feat(auth):` - authentication related
- `fix(api):` - API related
- `docs:` - scope omitted when obvious

### Subject

- Imperative mood ("add" not "added" or "adds")
- No period at end
- Max 50 characters
- Focus on the "why" not the "what"

### Body (optional)

Add when the subject alone doesn't fully explain the change. Wrap at 72 characters.

### Footer (optional)

- Breaking changes: `BREAKING CHANGE: description`
- Issue references: `Closes #123`

## Commit Message Construction

Use a HEREDOC for proper formatting:

```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <subject>

<body if needed>
EOF
)"
```

## Examples

Single file change:
```
fix(auth): handle expired tokens gracefully
```

Multiple related changes:
```
feat(api): add email notifications for shipped orders

Send confirmation email when order status changes to shipped.
Includes tracking number and estimated delivery date.
```

Breaking change:
```
refactor(config)!: migrate to environment-based configuration

BREAKING CHANGE: config.json no longer supported, use .env files
```
