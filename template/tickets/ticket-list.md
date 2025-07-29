# Ticket List

## Overview
This file maintains a centralized list of all tickets in the project. Update this file whenever you create, update, or complete tickets.

**Note**: Individual ticket files are stored in this same `/tickets` folder with the naming convention `TICKET-XXX-description.md` (e.g., `TICKET-001-user-authentication.md`, `TICKET-002-api-integration.md`)

## Ticket Status Legend
- 🔴 **Todo** - Not started
- 🟡 **In Progress** - Currently being worked on
- 🟢 **Done** - Completed
- 🔵 **Blocked** - Waiting on dependencies or external factors
- ⚫ **Cancelled** - No longer needed

## Active Tickets

### High Priority
_No high priority tickets yet_

### Medium Priority
_No medium priority tickets yet_

### Low Priority
_No low priority tickets yet_

## Completed Tickets
_No completed tickets yet_

## Cancelled/Archived Tickets
_No cancelled tickets yet_

---

## How to Use This File

1. **When creating a new ticket**:
   - Create the ticket file in `/tickets` folder (e.g., `TICKET-001-user-authentication.md`)
   - Use the template structure from `/tickets/README.md` for the ticket content
   - Add it to the appropriate priority section in this list
   - Include ticket number, title, and status emoji
   - Link to the full ticket file

2. **Format for ticket entries**:
   ```
   - 🔴 [TICKET-001](./TICKET-001-user-authentication.md) - User Authentication System
   ```
   
3. **File organization**:
   ```
   tickets/
   ├── ticket-list.md          # This file (centralized index)
   ├── TICKET-001-user-auth.md # Individual ticket file
   ├── TICKET-002-api-docs.md  # Individual ticket file
   └── TICKET-003-testing.md   # Individual ticket file
   ```

4. **When updating ticket status**:
   - Change the status emoji
   - Move completed tickets to "Completed Tickets" section
   - Add completion date for completed tickets

4. **Example of a populated list**:
   ```markdown
   ### High Priority
   - 🟡 [TICKET-001](./TICKET-001-user-authentication.md) - User Authentication System
   - 🔴 [TICKET-003](./TICKET-003-api-rate-limiting.md) - Implement API Rate Limiting

   ### Medium Priority
   - 🔵 [TICKET-002](./TICKET-002-email-notifications.md) - Email Notification Service (blocked: waiting for SMTP credentials)
   
   ### Completed Tickets
   - 🟢 [TICKET-000](./TICKET-000-project-setup.md) - Initial Project Setup (Completed: 2024-01-15)
   ```

5. **Best Practices**:
   - Keep this file updated in real-time
   - Review weekly to ensure accuracy
   - Use consistent naming conventions
   - Archive old completed tickets quarterly