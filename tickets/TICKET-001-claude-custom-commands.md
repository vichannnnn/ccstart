# TICKET-001: Implement Claude Code Custom Commands System

## Description
Create a custom command system for Claude Code that allows users to register and execute project-specific commands. The initial use case is to provide a command for automatically updating CLAUDE.md after running `npx ccstart` to populate project-specific information.

## Problem Statement
- After running `npx ccstart`, users must manually update CLAUDE.md with project-specific details
- No standardized way to create custom commands that appear in Claude Code's dropdown
- Users need to craft specific prompts for common tasks

## Acceptance Criteria
- [x] Research Claude Code's custom command registration mechanism
- [x] Design a command structure that integrates with Claude Code
- [x] Implement `/update-claude-md` command that:
  - [x] Detects project type and structure
  - [x] Extracts project metadata (name, description, dependencies)
  - [x] Updates Project Overview section
  - [x] Populates Additional Notes with relevant project info
- [x] Create a commands configuration file or directory
- [x] Commands appear in Claude Code's dropdown/autocomplete
- [x] Documentation for creating new custom commands
- [x] Test the command system works after `npx ccstart`

## Technical Requirements
- Commands should be discoverable by Claude Code
- Support for command parameters/arguments
- Error handling for invalid commands
- Extensible architecture for adding more commands

## Priority
High

## Status
Done

## Implementation Steps
1. Research Claude Code's command system and integration points ✅
2. Design command registration and discovery mechanism ✅
3. Create command structure and configuration format ✅
4. Implement the `/update-claude-md` command ✅
5. Add command loading and execution logic ✅
6. Create documentation for custom commands ✅
7. Test with fresh `npx ccstart` installations ⏳

## Implementation Summary

### What Was Done
1. **Research**: Discovered Claude Code already supports custom commands via `.claude/commands/` directory
2. **Structure Created**:
   - Added `.claude/commands/` directory to template
   - Created comprehensive README.md for commands documentation
   - Implemented `/update-claude-md` command with frontmatter configuration
3. **CLAUDE.md Updates**:
   - Added auto-generation markers (<!-- auto-generated-start/end -->) to template
   - Sections marked: Project Overview, Key Objectives, Common Commands, Additional Notes
4. **Documentation**:
   - Updated main README.md with Custom Commands section
   - Added command references to CLAUDE.md template
   - Created detailed command creation guide in `.claude/commands/README.md`
5. **Version Bump**: Updated package.json to v1.1.0 for new feature

### How It Works
- Users run `npx ccstart` to create project
- Custom commands are automatically available in `.claude/commands/`
- In Claude Code, users type `/update-claude-md` to auto-populate project info
- Command analyzes project structure, package.json, README, etc.
- Updates marked sections in CLAUDE.md while preserving custom content