---
description: "Create GitHub pull requests with properly structured descriptions. Use when the user explicitly asks to create a PR, open a pull request, or says /create-pr."
allowedTools: ["Bash", "Read", "Grep", "Glob"]
---

Create a GitHub pull request with a well-structured description following project conventions.

## Process

1. Verify current branch status:
   - Run `git branch --show-current` to get current branch
   - Run `git status` to check for uncommitted changes
   - Check if branch is pushed to remote

2. Determine base branch:
   - Check for `main` or `master` branch
   - Use remote tracking branch if available

3. Analyze changes:
   - Run `git log [base]..HEAD --oneline` to see commits
   - Run `git diff [base]...HEAD --stat` for change summary
   - Review key files changed

4. Generate PR description:
   - Summarize the overall purpose
   - List specific changes made
   - Include testing notes
   - Reference related issues

5. Create PR:
   - Use `gh pr create` with title and body
   - Use HEREDOC for proper body formatting

## PR Description Format

```markdown
## Summary
Brief description of what this PR does and why it's needed.

## Changes
- List of specific changes made
- Technical implementation details if relevant

## Test Plan
- [ ] Tests pass
- [ ] Manual testing completed
- [ ] No console errors or warnings

## Related Issues
Closes #XXX (if applicable)
```

## Rules

- PR title follows conventional commit format
- Summary explains the "why", not just "what"
- Changes are specific and actionable
- Always include test plan
- Link related issues when applicable

## Command Example

```bash
gh pr create --title "feat(auth): add password reset" --body "$(cat <<'EOF'
## Summary
Add password reset functionality for users.

## Changes
- Add reset password endpoint
- Create email template
- Add token validation

## Test Plan
- [ ] Tests pass
- [ ] Manual testing completed
EOF
)"
```
