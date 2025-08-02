# TICKET-002: Consolidated Claude Directory Structure with CLAUDE.md Replacement

## Description
Restructure the ccsetup to create a single `claude/` directory containing all subdirectories (agents, docs, plans, tickets) and replace the root CLAUDE.md with a template that references these paths within the `claude/` directory.

## Problem Statement
- Current setup creates 4 separate directories in the project root which can clutter the workspace
- The CLAUDE.md template needs to be updated to reference the new structure
- Users want a cleaner project structure with all Claude-related files in one directory
- The existing CLAUDE.md should be replaced with the new template that properly links to claude/ subdirectories

## Acceptance Criteria
- [x] Create a single `claude/` directory instead of 4 separate directories
- [x] Copy all subdirectories (agents, docs, plans, tickets) into `claude/`
- [x] Create new CLAUDE.md template that references `@claude/agents/`, `@claude/docs/`, etc.
- [x] Replace existing CLAUDE.md in root with the new template from `claude/CLAUDE.md`
- [x] Update conflict resolution to handle the new structure
- [x] Maintain interactive agent selection functionality
- [x] Copy selected agents to `claude/agents/` directory
- [x] Update "Next steps" message to reference `claude/` paths

## Implementation Steps
- [x] Create new CLAUDE.md template in `template/claude/` that references subdirectories
- [x] Modify scanTemplate function to handle `claude/` directory specially
- [x] Skip individual directories (agents, docs, plans, tickets) in root
- [x] Process claude subdirectories and copy them maintaining structure  
- [x] Handle CLAUDE.md from claude directory to replace root CLAUDE.md
- [x] Update conflict categories to include 'claude' directory
- [x] Update agent paths to read from `template/claude/agents/`
- [x] Update .claude/agents initialization to copy from `template/claude/agents/`
- [x] Update all path references in messages to use `claude/` prefix

## Priority
High

## Status
Done

## Technical Considerations
- Maintain backward compatibility with existing projects
- Handle conflicts when claude/ directory already exists
- Ensure CLAUDE.md replacement is handled with care (prompt for confirmation)
- Preserve interactive agent selection functionality
- Update all hardcoded paths to use claude/ prefix

## Example Behavior

### New Directory Structure
```bash
$ npx ccsetup my-project
✓ Creating Claude Code project...

# Creates structure:
my-project/
├── CLAUDE.md          # Replaced with template referencing claude/ paths
├── .claude/           # Claude Code configuration
│   └── agents/        # Selected agents copied here
└── claude/            # All Claude-related files in one place
    ├── agents/        # Agent templates
    ├── docs/          # Documentation
    ├── plans/         # Planning documents
    └── tickets/       # Task tickets
```

### CLAUDE.md Replacement
```bash
⚠️  File conflicts detected. You will be asked how to handle each category.

📄 CLAUDE.md conflicts:
  - CLAUDE.md

Conflict resolution options:
  1) skip      (s) - Keep your existing files
  2) rename    (r) - Save template files with -ccsetup suffix
  3) overwrite (o) - Replace with template versions

Your choice for CLAUDE.md [s/r/o]: o
⚠️  Are you sure you want to overwrite CLAUDE.md? This will replace your existing project instructions with the ccsetup template! (yes/no): yes
```

## Summary of Implementation

The ticket has been updated to reflect the new consolidated directory structure feature:

1. **Single Claude Directory**:
   - All Claude-related files now go into a `claude/` directory
   - Cleaner project root with just one Claude-specific directory
   - Template structure updated to include `template/claude/`

2. **CLAUDE.md Replacement**:
   - New CLAUDE.md template created in `template/claude/CLAUDE.md`
   - References updated to use `@claude/agents/`, `@claude/docs/`, etc.
   - Root CLAUDE.md gets replaced with the new template
   - Confirmation prompt when overwriting existing CLAUDE.md

3. **Updated File Handling**:
   - `scanTemplate` function modified to handle claude/ directory specially
   - CLAUDE.md from claude/ directory copies to root
   - Agent selection reads from `template/claude/agents/`
   - .claude/agents still populated with selected agents

4. **Maintained Features**:
   - Interactive agent selection still works
   - All CLI flags preserved
   - Conflict resolution updated for new structure
   - Next steps messaging updated to reference claude/ paths

The implementation provides a cleaner, more organized structure while maintaining all existing functionality.