# TICKET-001: Prevent File Overwrites in npx ccsetup

## Description
When running `npx ccsetup` on an existing project repository, the tool currently overwrites any existing files or folders with the same names (agents/, docs/, plans/, tickets/, CLAUDE.md). This could result in data loss if users accidentally run the command in a project that already has these directories or files.

## Problem Statement
- Running `npx ccsetup .` in an existing project overwrites files without warning
- Users might lose important project files if they have folders named agents/, docs/, etc.
- No backup or merge strategy for existing CLAUDE.md or other configuration files

## Acceptance Criteria
- [ ] Check for existing files/folders before copying template files
- [ ] Prompt user for confirmation if conflicts are detected
- [ ] Offer options: skip, overwrite, backup, or merge
- [ ] Create backups of existing files before overwriting (e.g., CLAUDE.md.backup)
- [ ] Provide --force flag to skip all prompts and overwrite
- [ ] Show clear summary of what will be created/skipped/overwritten

## Implementation Steps
- [ ] Scan target directory for existing files/folders
- [ ] Implement conflict detection logic
- [ ] Add interactive prompts for conflict resolution
- [ ] Implement backup functionality
- [ ] Add merge strategy for CLAUDE.md (append or combine sections)
- [ ] Update CLI with --force and --dry-run flags
- [ ] Add comprehensive error handling
- [ ] Update documentation with new behavior

## Priority
High

## Status
Todo

## Technical Considerations
- Use inquirer.js or similar for interactive prompts
- Consider file comparison for intelligent merging
- Ensure cross-platform compatibility (Windows/Mac/Linux)
- Handle edge cases like symlinks and permissions

## Example Behavior
```bash
$ npx ccsetup .
⚠️  Existing files detected:
  - CLAUDE.md (will be backed up)
  - agents/ (3 files will be added)
  - docs/ROADMAP.md (will be skipped)

? How would you like to proceed? (Use arrow keys)
❯ Continue with smart merge
  Overwrite all
  Skip existing files  
  Cancel operation

✓ Created backup: CLAUDE.md.backup
✓ Added 3 new agents to agents/
✓ Skipped docs/ROADMAP.md
✓ Created plans/
✓ Created tickets/
```