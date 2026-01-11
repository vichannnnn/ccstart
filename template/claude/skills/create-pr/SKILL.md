---
name: create-pr
description: Create GitHub pull requests with properly structured descriptions. Use when the user explicitly asks to create a PR, open a pull request, or says "/create-pr". Analyzes commits and changes to generate clear PR descriptions with summary, changes list, and UI changes when applicable.
---

# Create PR Skill

Create GitHub pull requests with structured descriptions.

## Workflow

1. Run `git status` to check for uncommitted changes and remote tracking
2. Run `git diff <base-branch>...HEAD` to see all changes since branching
3. Run `git log <base-branch>..HEAD --oneline` to see all commits
4. Analyze changes to draft PR title and description
5. Push branch if needed with `git push -u origin <branch>`
6. Create PR with `gh pr create`

## PR Format

**Title:** Use conventional commit format: `<type>(<scope>): <subject>`

**Body:**
```markdown
## Summary
<What this PR does and why - 1-3 sentences>

## Changes
- <Specific change 1>
- <Specific change 2>
- <Specific change 3>

## UI Changes
<Text description of visual/layout changes - omit section if no UI changes>
```

## Creating the PR

Use HEREDOC for proper formatting:

```bash
gh pr create --title "<type>(<scope>): <subject>" --body "$(cat <<'EOF'
## Summary
<description>

## Changes
- <change 1>
- <change 2>
EOF
)"
```

## Examples

**Backend PR:**
```markdown
## Summary
Add email notifications when orders are shipped. Customers receive
an automated email with tracking information when their order status
changes to "shipped".

## Changes
- Add `ShippingNotificationService` to handle email dispatch
- Integrate with SendGrid API for email delivery
- Add email template for shipping confirmation
- Update `OrderController` to trigger notification on status change
```

**PR with UI changes:**
```markdown
## Summary
Add dark mode toggle to application settings.

## Changes
- Add `ThemeContext` for managing theme state
- Create `DarkModeToggle` component in settings page
- Update CSS variables for dark theme colors
- Persist theme preference to localStorage

## UI Changes
- New toggle switch in Settings > Appearance section
- Toggle positioned right-aligned with "Dark Mode" label on left
- Switch uses primary brand color when enabled
```
