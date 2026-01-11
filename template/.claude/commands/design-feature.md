---
description: "Guide feature development through contract establishment and UI design phases. Use when discussing, designing, or planning a new feature that is not yet implemented."
allowedTools: ["Read", "Write", "Grep", "Glob", "TodoWrite"]
---

Facilitate feature design before implementation. Ensure requirements are clarified, acceptance criteria defined, and approach documented before any code is written.

## Process

### Phase 1: Requirements Gathering

Ask clarifying questions to understand:
- What problem does this feature solve?
- Who are the users/stakeholders?
- What are the expected inputs and outputs?
- What are the edge cases?
- Are there existing patterns to follow?

### Phase 2: Research Existing Code

1. Search codebase for related functionality
2. Identify patterns and conventions to follow
3. Find files that will need modification
4. Note any dependencies or constraints

### Phase 3: Contract Establishment

Define the feature contract:
- **Inputs**: What data/parameters does it accept?
- **Outputs**: What does it return/produce?
- **Side Effects**: What state changes occur?
- **Error Handling**: What can go wrong?
- **Acceptance Criteria**: How do we know it's done?

### Phase 4: Design Documentation

Create planning document at:
`claude/plans/feature-[name]-YYYY-MM-DD.md`

Include:
- Feature overview
- Technical approach
- Files to modify/create
- Dependencies
- Risk assessment
- Implementation steps

### Phase 5: Task Breakdown

Use TodoWrite to create actionable tasks:
- Break into small, testable units
- Order by dependencies
- Each task should be completable in one session

## Output Format

```markdown
# Feature Design: [Feature Name]

## Date
[YYYY-MM-DD]

## Overview
[What this feature does and why]

## Requirements
- [Requirement 1]
- [Requirement 2]

## Acceptance Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]

## Technical Approach
[How we'll implement this]

## Files Affected
- `path/to/file1.ts` - [what changes]
- `path/to/file2.ts` - [what changes]

## Dependencies
- [Dependency 1]
- [Dependency 2]

## Risks
- [Risk 1]: [Mitigation]
- [Risk 2]: [Mitigation]

## Implementation Steps
1. [ ] Step 1
2. [ ] Step 2
3. [ ] Step 3
```

## Important

- Ask questions before assuming requirements
- Research existing code before proposing changes
- Create plan document before writing code
- Get user confirmation on approach before implementation
