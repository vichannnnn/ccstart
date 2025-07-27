# TICKET-002: Interactive Agent Selection with Claude Code Detection

## Description
Implement an interactive CLI interface for selecting agents during setup, replacing the manual copying process with a user-friendly multi-select prompt.

## Problem Statement
- Current agent selection requires manual copying after setup
- Users need to know which agents exist before they can choose them
- README suggests manual file operations which is not user-friendly
- No way to preview agent descriptions during selection

## Acceptance Criteria
- [ ] Check if .claude directory exists in the project
- [ ] Display warning and stop if Claude Code is not detected
- [ ] Provide helpful message about installing/initializing Claude Code
- [ ] Implement interactive multi-select for agents during setup
- [ ] Show agent descriptions in the selection interface
- [ ] Allow selecting all/none with single keystroke
- [ ] Save only selected agents to project's agents/ directory
- [ ] Add --all-agents flag to include all agents without prompting
- [ ] Add --no-agents flag to skip agent selection entirely
- [ ] Show selected count in real-time during selection

## Implementation Steps
- [ ] Add check for .claude directory existence
- [ ] Implement early exit with helpful error message if not found
- [ ] Modify bin/create-project.js to add agent selection
- [ ] Implement multi-select UI using inquirer.js checkbox prompt
- [ ] Parse agent files to extract descriptions from frontmatter
- [ ] Copy only selected agents to target directory
- [ ] Update README to reflect new agent selection process
- [ ] Handle edge cases (no selection, all selected)
- [ ] Add loading states while copying agents

## Priority
High

## Status
Todo

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