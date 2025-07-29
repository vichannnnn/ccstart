# TICKET-002: Interactive Agent Selection with Claude Code Detection

## Description
Implement an interactive CLI interface for selecting agents during setup, replacing the manual copying process with a user-friendly multi-select prompt.

## Problem Statement
- Current agent selection requires manual copying after setup
- Users need to know which agents exist before they can choose them
- README suggests manual file operations which is not user-friendly
- No way to preview agent descriptions during selection

## Acceptance Criteria
- [x] Check if .claude directory exists in the project
- [x] Display warning and stop if Claude Code is not detected
- [x] Provide helpful message about installing/initializing Claude Code
- [x] Implement interactive multi-select for agents during setup
- [x] Show agent descriptions in the selection interface
- [x] Allow selecting all/none with single keystroke
- [x] Save only selected agents to project's agents/ directory
- [x] Add --all-agents flag to include all agents without prompting
- [x] Add --no-agents flag to skip agent selection entirely
- [x] Show selected count in real-time during selection

## Implementation Steps
- [x] Add check for .claude directory existence
- [x] Implement early exit with helpful error message if not found
- [x] Modify bin/create-project.js to add agent selection
- [x] Implement multi-select UI using inquirer.js checkbox prompt
- [x] Parse agent files to extract descriptions from frontmatter
- [x] Copy only selected agents to target directory
- [x] Update README to reflect new agent selection process
- [x] Handle edge cases (no selection, all selected)
- [x] Add loading states while copying agents

## Priority
High

## Status
Done

## Technical Considerations
- Use inquirer.js checkbox prompt for multi-select
- Parse agent files to extract descriptions from frontmatter
- Ensure Make commands work on all platforms
- Handle case where no agents are selected

## Example Behavior

### Claude Code Detection
```bash
$ npx ccsetup my-project
❌ Claude Code not detected in this project.

To use ccsetup, you need to initialize Claude Code first:
1. Install Claude Code CLI: https://docs.anthropic.com/claude-code/quickstart
2. Run 'claude init' in your project directory
3. Then run 'npx ccsetup' again

Aborting setup.
```

## Summary of Implementation

All features described in this ticket have already been implemented in the codebase:

1. **Claude Code Detection** (lines 119-123, 238-247):
   - `checkClaudeCode()` function checks for `.claude` directory
   - Early exit with helpful error message if Claude Code not detected
   - Clear instructions for initializing Claude Code

2. **Interactive Agent Selection** (lines 197-216, 285-303):
   - Uses `@inquirer/checkbox` for multi-select interface
   - Shows agent names with descriptions
   - Supports keyboard shortcuts (space, 'a' for toggle all, enter)
   - Shows selected count after selection

3. **CLI Flags** (lines 28-31, 45-46):
   - `--all-agents`: Includes all agents without prompting
   - `--no-agents`: Skips agent selection entirely
   - Both flags work as specified

4. **Agent Metadata Parsing** (lines 125-156):
   - `parseAgentFrontmatter()` extracts name, description, and tools
   - Handles YAML frontmatter in agent markdown files

5. **Selective Agent Copying** (lines 325-340):
   - Only copies selected agents to target directory
   - Handles edge cases (no selection, all selected)

The implementation is complete and functioning as specified in the ticket requirements.

### Agent Selection During Setup
```bash
$ npx ccsetup my-project
✓ Creating project structure...

? Select agents to include (Press <space> to select, <a> to toggle all)
❯◯ planner - Strategic planning and task breakdown
 ◯ coder - Implementation and development  
 ◯ checker - Testing and quality assurance
 ◯ researcher - Research and information gathering
 ◯ blockchain - Web3 and smart contract development
 ◯ frontend - UI/UX and frontend development
 ◯ backend - API design and server-side development
 ◯ shadcn - shadcn/ui component development

✓ Created project with 3 selected agents
✓ Setup complete! Run 'cd my-project && claude' to start
```