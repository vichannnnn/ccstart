---
name: create-ticket
description: Create task tickets with proper numbering, template structure, and ticket-list.md updates. Use when the user wants to create a ticket, add a task, or says "/create-ticket". Automatically finds the next ticket number, creates the ticket file, and updates the centralized ticket list.
---

# Create Ticket Skill

Create properly numbered tickets with consistent structure.

## Workflow

1. Scan `claude/tickets/` for existing `TICKET-XXX-*.md` files
2. Determine next ticket number (highest + 1, or 001 if none)
3. Create ticket file at `claude/tickets/TICKET-XXX-description.md`
4. Update `claude/tickets/ticket-list.md` with new entry

## Finding Next Ticket Number

```bash
ls claude/tickets/TICKET-*.md 2>/dev/null | grep -oE 'TICKET-[0-9]+' | sort -t'-' -k2 -n | tail -1
```

If no tickets exist, start with `TICKET-001`.

## Ticket Template

```markdown
# TICKET-XXX: [Title]

## Description
[Detailed description of the task]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Priority
High/Medium/Low

## Status
Todo

## Notes
[Any additional context or notes]
```

## Updating ticket-list.md

Add entry to appropriate priority section:

```markdown
### High Priority
- 🔴 [TICKET-XXX](./TICKET-XXX-description.md) - Title here
```

**Status emojis:**
| Status | Emoji |
|--------|-------|
| Todo | 🔴 |
| In Progress | 🟡 |
| Done | 🟢 |
| Blocked | 🔵 |
| Cancelled | ⚫ |

## File Naming

Convert title to kebab-case for filename:
- "User Authentication" → `TICKET-001-user-authentication.md`
- "Fix API Bug" → `TICKET-002-fix-api-bug.md`

## Example

User: "Create a ticket for adding user authentication"

Creates `claude/tickets/TICKET-001-user-authentication.md`:
```markdown
# TICKET-001: User Authentication

## Description
Implement user authentication system for the application.

## Acceptance Criteria
- [ ] Users can register with email/password
- [ ] Users can log in and receive session token
- [ ] Protected routes require authentication

## Priority
High

## Status
Todo

## Notes
Consider using JWT for session management.
```

Updates `claude/tickets/ticket-list.md`:
```markdown
### High Priority
- 🔴 [TICKET-001](./TICKET-001-user-authentication.md) - User Authentication
```
