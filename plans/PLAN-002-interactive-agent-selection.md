# PLAN-002: Interactive Agent Selection

## Executive Summary
Implement an interactive agent selection feature during project setup that allows users to choose which specialized agents to include in their Claude Code project, replacing the all-or-nothing approach with a customizable selection process.

## Objectives
- [x] Allow users to select specific agents during setup
- [x] Provide interactive checkbox selection UI
- [x] Support CLI flags for automation (--all-agents, --no-agents)
- [x] Initialize .claude/agents with only selected agents
- [x] Restructure to consolidated claude/ directory

## Architecture

### Component Structure
1. **Agent Discovery**
   - Read available agents from template/claude/agents/
   - Parse agent metadata from frontmatter
   - Build agent list with names and descriptions

2. **Interactive Selection**
   - Use @inquirer/checkbox for multi-select UI
   - Display agent name and description
   - Allow space to select/deselect, enter to confirm

3. **CLI Flag Support**
   - `--agents`: Interactive selection mode
   - `--all-agents`: Include all agents without prompting
   - `--no-agents`: Skip agent selection entirely

4. **Directory Structure**
   - Source: template/claude/agents/
   - Destination: .claude/agents/ (for Claude Code integration)
   - Project reference: claude/agents/ (for documentation)

## Implementation Phases

### Phase 1: Agent Discovery System
- Implement scanAgents() function
- Parse frontmatter for metadata
- Build agent data structure

### Phase 2: Interactive UI
- Integrate @inquirer/checkbox
- Create selection prompt
- Handle user choices

### Phase 3: CLI Integration
- Add new CLI flags
- Implement flag logic
- Update help documentation

### Phase 4: Directory Restructure
- Consolidate into claude/ directory
- Update all path references
- Maintain backward compatibility

## Technical Implementation

### Agent Metadata Format
```yaml
---
name: Planner Agent
description: Strategic planning specialist for complex problems
category: planning
---
```

### Selection Flow
1. Detect --agents, --all-agents, or --no-agents flags
2. If interactive, show checkbox selection
3. Copy only selected agents to .claude/agents/
4. Reference available agents in claude/agents/

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking existing projects | High | Maintain backward compatibility |
| Complex frontmatter parsing | Medium | Use gray-matter library |
| User confusion with paths | Low | Clear documentation and messages |

## Success Metrics
- Users can select individual agents
- CLI flags work as expected
- Clean consolidated directory structure
- No regression in existing functionality

## Implementation Notes
This plan was created retroactively after the feature was successfully implemented in TICKET-002. The implementation included the additional enhancement of consolidating all Claude-related directories into a single claude/ directory for better project organization.

## Key Decisions Made
1. Used @inquirer/checkbox for familiar multi-select UI
2. Frontmatter parsing with gray-matter for reliability
3. Consolidated directory structure for cleaner projects
4. Maintained .claude/agents for Claude Code compatibility

## Outcome
Successfully implemented with all objectives achieved. The feature provides a much better user experience by allowing customization of agent selection while maintaining automation options through CLI flags.