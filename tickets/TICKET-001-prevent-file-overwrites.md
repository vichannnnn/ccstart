# TICKET-001: Prevent File Overwrites in npx ccsetup

## Description
When running `npx ccsetup` on an existing project repository, the tool currently overwrites any existing files or folders with the same names (agents/, docs/, plans/, tickets/, CLAUDE.md). This could result in data loss if users accidentally run the command in a project that already has these directories or files.

## Problem Statement
- Running `npx ccsetup .` in an existing project overwrites files without warning
- Users might lose important project files if they have folders named agents/, docs/, etc.
- No backup or merge strategy for existing CLAUDE.md or other configuration files

## Acceptance Criteria
- [x] Check for existing files/folders before copying template files
- [x] Prompt user for confirmation if conflicts are detected
- [x] Offer options: skip, overwrite, ~~backup~~ rename
- [x] ~~Create backups of existing files before overwriting~~ (Implemented as rename with -ccsetup suffix instead)
- [x] Provide --force flag to skip all prompts and overwrite
- [x] Show clear summary of what will be created/skipped/overwritten

## Implementation Steps
- [x] Scan target directory for existing files/folders
- [x] Implement conflict detection logic
- [x] Add interactive prompts for conflict resolution
- [x] ~~Implement backup functionality~~ (Implemented as rename with -ccsetup suffix)
- [ ] Add merge strategy for CLAUDE.md (append or combine sections)
- [x] Update CLI with --force and --dry-run flags
- [x] Add comprehensive error handling
- [ ] Update documentation with new behavior

## Priority
High

## Status
Done

## Critical Security Fixes Implemented

### 1. CLI Flags Support
- Added `--force` flag to skip all prompts and overwrite existing files
- Added `--dry-run` flag to preview changes without making any modifications
- Added `--help` flag to display usage information
- Flags can use short forms: `-f`, `-d`, `-h`

### 2. Input Validation
- Validates project names to prevent path traversal attacks
- Rejects paths containing `..` or absolute paths
- Validates against invalid characters for file system compatibility
- Additional runtime path validation during file operations

### 3. Improved Error Handling
- Wrapped entire main function in try-catch block
- Added specific error handling for:
  - Permission errors (EACCES)
  - Disk space issues (ENOSPC)
  - Directory/file conflicts (EISDIR)
- Ensures readline interface is always closed properly
- Better error messages with context

### 4. Security Enhancements
- Path normalization and validation for all file operations
- Prevents source paths from escaping template directory
- Prevents destination paths from escaping target directory
- Safe handling of user input through proper sanitization

## Current Implementation
The script now offers three conflict resolution strategies:
1. **Skip** - Keep existing files unchanged
2. **Rename** - Keep existing files, save template files with `-ccsetup` suffix
3. **Overwrite** - Replace existing files with template versions

## Remaining Tasks
1. **Merge Strategy for CLAUDE.md**: Implement intelligent merging that:
   - Preserves user's project-specific sections
   - Updates boilerplate sections with latest template
   - Combines custom instructions with template structure
   - Suggested approach: Parse markdown sections and merge by heading
   
2. **CLI Flags**:
   - `--force`: Skip all prompts and overwrite existing files
   - `--dry-run`: Show what would be done without making changes

## Merge Strategy Proposal for CLAUDE.md
The merge strategy should:
1. Parse both existing and template CLAUDE.md into sections by headers
2. Preserve user-added sections not in template
3. Update template sections while keeping user modifications
4. Add new template sections that don't exist in user's file
5. Mark conflicts for manual resolution when both files modify same section

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

## Completion Summary

This ticket has been completed with all critical features implemented and security issues resolved. The QA workflow validated that:

1. **All Critical Security Issues Fixed**:
   - Path traversal attacks prevented
   - Input validation implemented
   - Comprehensive error handling added
   - Resource management improved

2. **CLI Flags Implemented**:
   - `--force` / `-f`: Skip prompts and overwrite existing files
   - `--dry-run` / `-d`: Preview changes without executing
   - `--help` / `-h`: Display usage information

3. **Core Functionality Working**:
   - Conflict detection properly identifies existing files
   - Interactive prompts offer skip/rename/overwrite options
   - File renaming with `-ccsetup` suffix handles collisions
   - Clear summary shows all operations performed

4. **Remaining Non-Critical Items**:
   - CLAUDE.md merge strategy (deferred to future enhancement)
   - Documentation updates

The implementation is **approved for deployment** and ready for production use.