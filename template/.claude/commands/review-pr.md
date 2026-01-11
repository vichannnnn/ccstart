---
description: "Review pull requests with systematic quality checks. Use when the user wants to review a PR, check a pull request, or says /review-pr."
allowedTools: ["Bash", "Read", "Grep", "Glob", "WebFetch"]
---

Perform a comprehensive pull request review using systematic quality checks.

## Arguments

Pass PR number or URL as argument: `/review-pr 123` or `/review-pr https://github.com/org/repo/pull/123`

## Process

1. Fetch PR information:
   - Run `gh pr view $ARGUMENTS` to get PR details
   - Run `gh pr diff $ARGUMENTS` to see all changes

2. Analyze changes:
   - Review each changed file
   - Understand the purpose of changes
   - Check for patterns and anti-patterns

3. Apply review checklist (below)

4. Generate review summary:
   - List critical issues requiring changes
   - List suggestions for improvement
   - Provide approval recommendation

## Review Checklist

### Code Quality
- [ ] Follows project conventions and style
- [ ] Functions are single-purpose and well-named
- [ ] No code duplication
- [ ] Error handling is appropriate
- [ ] No unnecessary complexity

### Security
- [ ] Input validation present where needed
- [ ] No sensitive data exposure (keys, passwords, tokens)
- [ ] Authentication/authorization checks in place
- [ ] No SQL injection or XSS vulnerabilities

### Performance
- [ ] No obvious performance issues
- [ ] Database queries are efficient
- [ ] No N+1 query problems
- [ ] Appropriate caching where needed

### Testing
- [ ] New code has test coverage
- [ ] Edge cases are tested
- [ ] Tests are meaningful, not just for coverage

### Documentation
- [ ] Complex logic is understandable
- [ ] Public APIs are documented
- [ ] Breaking changes are noted

## Output Format

```markdown
## PR Review: #[number]

### Summary
[Brief overview of what PR does]

### Critical Issues
- [Issue 1 - must fix before merge]
- [Issue 2 - must fix before merge]

### Suggestions
- [Suggestion 1 - nice to have]
- [Suggestion 2 - nice to have]

### Positive Notes
- [Good thing 1]
- [Good thing 2]

### Recommendation
[ ] Approve
[ ] Request Changes
[ ] Comment
```
