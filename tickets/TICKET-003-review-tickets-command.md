# TICKET-003: Review Tickets Command Implementation

## Description
Implement a `/review-tickets` slash command that uses the planner agent to analyze all tickets in the project and provide comprehensive status reports. This command will help project managers and developers quickly understand project progress, identify blockers, and plan next steps.

## Acceptance Criteria
- [ ] Command successfully invokes planner agent with review task
- [ ] Generates comprehensive report including:
  - [ ] Ticket overview with status distribution
  - [ ] Progress assessment with visual indicators
  - [ ] Dependencies analysis between tickets
  - [ ] Resource planning recommendations
  - [ ] Actionable next steps
- [ ] Report uses clear formatting and visual elements (text-based charts)
- [ ] Command is documented in `.claude/commands/README.md`
- [ ] Works with various ticket formats and statuses

## Priority
Medium

## Status
Todo

## Implementation Steps
- [ ] Create `/review-tickets.md` command file in `.claude/commands/`
- [ ] Define command prompt for planner agent with specific analysis requirements
- [ ] Test command with sample tickets to ensure comprehensive analysis
- [ ] Add visual progress indicators using text-based charts
- [ ] Document command usage in commands README
- [ ] Test edge cases (empty tickets directory, malformed tickets)
- [ ] Ensure command provides actionable insights
- [ ] Add support for filtering by status or priority (optional enhancement)

## Technical Details
- Uses planner agent for analysis and recommendations
- Reads all markdown files in `/tickets` directory
- Parses ticket format to extract status, priority, and completion
- Generates structured report with executive summary
- Provides execution roadmap based on dependencies

## Dependencies
- Planner agent must be available and properly configured
- Tickets must follow standard format defined in `/tickets/README.md`
- `.claude/commands/` directory structure must exist

## Notes
- Command has already been implemented and tested successfully
- This ticket documents the completed work for tracking purposes
- Future enhancements could include CSV export or integration with project management tools