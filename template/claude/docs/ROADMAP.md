# ROADMAP

## Overview

High-level overview of the project, what it does, the main features

## Development Workflow

1. **Task Planning**
   - Study the existing codebase and understand the current state
   - Use the **planner** agent to break down complex problems and create implementation roadmaps
   - Create a plan document in the `/plans` directory for complex features
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
   - Use the **coder** agent for implementing features, fixing bugs, and optimizing code
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
   - Mark completed tasks with ✅ in the roadmap
   - Add reference to the ticket file (e.g., `See: /tickets/TICKET-001-user-auth.md`)
   - Update related plan documents if applicable

## Development

### Project Setup and Boilerplate
- [x] Create Claude Code boilerplate structure ✅
  - Set up CLAUDE.md with project instructions
  - Create agents directory with planner, coder, and checker agents
  - Establish docs, plans, and tickets directories
  - Add README files to all directories

### [Add your project tasks here]
- [ ] Task description
  - Subtask 1
  - Subtask 2
  - See: /tickets/TICKET-XXX-description.md

## Future Enhancements

[List potential future features and improvements]

## Completed Tasks Archive

[Move completed sections here to keep the active roadmap clean]