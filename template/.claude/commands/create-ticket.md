---
description: "Create task tickets with proper numbering, template structure, and ticket-list.md updates. Use when the user wants to create a ticket, add a task, or says /create-ticket."
allowedTools: ["Read", "Write", "Edit", "Glob", "Grep"]
---

Create a new task ticket following project conventions, with automatic numbering and ticket-list.md updates.

## Process

1. Determine next ticket number:
   - Read existing tickets in `claude/tickets/`
   - Find highest TICKET-XXX number
   - Increment for new ticket

2. Gather ticket information:
   - Ask for title (required)
   - Ask for description (required)
   - Ask for priority: High/Medium/Low (default: Medium)
   - Ask for acceptance criteria

3. Create ticket file:
   - Path: `claude/tickets/TICKET-XXX-brief-description.md`
   - Use kebab-case for description in filename
   - Apply template structure below

4. Update ticket-list.md:
   - Add entry to appropriate priority section
   - Use format: `- [emoji] [TICKET-XXX](./TICKET-XXX-description.md) - Title`
   - Status emoji: `[pending emoji]` for new tickets

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
[High/Medium/Low]

## Status
Todo

## Notes
[Any additional context or notes]
```

## Status Emojis

Use these emojis in ticket-list.md:
- `[pending]` Todo - Not started
- `[in progress]` In Progress - Currently being worked on
- `[done]` Done - Completed
- `[blocked]` Blocked - Waiting on dependencies
- `[cancelled]` Cancelled - No longer needed

## Example

For a ticket about user authentication:

**File**: `claude/tickets/TICKET-001-user-authentication.md`

**ticket-list.md entry**:
```markdown
### High Priority
- [pending] [TICKET-001](./TICKET-001-user-authentication.md) - User Authentication System
```

## Important

- Always update `claude/tickets/ticket-list.md` when creating a ticket
- Use incremental numbering (001, 002, 003...)
- Keep filenames descriptive but concise
- Set realistic acceptance criteria
