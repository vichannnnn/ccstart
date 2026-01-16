# ROADMAP

## Overview

High-level overview of the project, what it does, the main features

## Development Workflow

1. **Task Planning**
   - Study the existing codebase and understand the current state
   - Use the **planner** agent to break down complex problems and create implementation roadmaps
   - Update `ROADMAP.md` to include the new task under Development
   - Priority tasks should be inserted after the last completed task

2. **Ticket Creation**
   - Study the existing codebase and understand the current state
   - Create a new ticket file in the `/tickets` directory
   - Name format: `TICKET-XXX-description.md` (e.g., `TICKET-001-user-auth.md`)
   - Include high-level specifications, relevant files, acceptance criteria, and implementation steps
   - Refer to last completed ticket in the `/tickets` directory for examples
   - Note that completed tickets show checked boxes and summary of changes
   - For new tickets, use empty checkboxes and no summary section

3. **Task Implementation**
   - Use the **backend** or **frontend** agent for implementing features
   - Follow the specifications in the ticket file
   - Implement features and functionality following project conventions
   - Update step progress within the ticket file after each step
   - Stop after completing each step and wait for further instructions

4. **Quality Assurance**
   - Use the **checker** agent for testing, security analysis, and code review
   - Verify all acceptance criteria are met
   - Run tests and ensure code quality standards
   - Document any issues found and their resolutions

5. **Roadmap Updates**
   - Mark completed tasks with checkmarks in the roadmap
   - Add reference to the ticket file (e.g., `See: /tickets/TICKET-001-user-auth.md`)
   - Update related plan documents if applicable

## Development

[Add development tasks here]

## Future Enhancements

[List potential future features and improvements]

## Completed Tasks Archive

[Move completed sections here to keep the active roadmap clean]
