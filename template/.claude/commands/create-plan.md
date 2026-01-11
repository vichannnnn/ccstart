---
description: "Create timestamped planning documents for features, decisions, and architectural changes."
allowedTools: ["Read", "Write", "Glob"]
---

Create a planning document in the plans directory with proper timestamping and structure.

## Process

1. Gather planning requirements:
   - What topic/feature is being planned?
   - What is the context/motivation?
   - What are the goals?

2. Research if needed:
   - Check existing plans in `claude/plans/`
   - Review related code or documentation
   - Understand current state

3. Create document:
   - Path: `claude/plans/[topic]-YYYY-MM-DD-HH-MM-SS.md`
   - Use kebab-case for topic
   - Include timestamp for uniqueness

4. Apply template structure below

## Plan Template

```markdown
# Plan: [Topic]

## Date
[YYYY-MM-DD HH:MM:SS]

## Context
[Why this plan is needed. What problem are we solving?]

## Goals
- [Goal 1]
- [Goal 2]
- [Goal 3]

## Current State
[What exists today. Starting point for this plan.]

## Proposed Approach
[Technical approach and reasoning. Why this approach over alternatives?]

## Alternatives Considered
- [Alternative 1]: [Why not chosen]
- [Alternative 2]: [Why not chosen]

## Dependencies
- [Dependency 1]
- [Dependency 2]

## Risks and Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk 1] | Low/Medium/High | Low/Medium/High | [How to mitigate] |

## Success Metrics
- [How do we know this succeeded?]
- [Measurable outcome]

## Next Steps
- [ ] Step 1
- [ ] Step 2
- [ ] Step 3

## References
- [Link or reference 1]
- [Link or reference 2]
```

## Plan Types

Use descriptive topic prefixes:
- `feature-*` - New feature planning
- `refactor-*` - Refactoring plans
- `architecture-*` - Architectural decisions
- `migration-*` - Migration plans
- `investigation-*` - Research/investigation docs
- `next-steps-*` - General planning

## Examples

- `claude/plans/feature-user-auth-2024-01-15-10-30-00.md`
- `claude/plans/refactor-api-layer-2024-01-15-14-45-00.md`
- `claude/plans/architecture-caching-2024-01-15-16-00-00.md`

## Important

- Always include timestamp in filename for uniqueness
- Context section explains "why" not just "what"
- Include alternatives considered for important decisions
- Keep plans focused and actionable
