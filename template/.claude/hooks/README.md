# Claude Code Hooks

This directory contains hooks that automatically enhance Claude's behavior based on your interactions.

## Available Hooks

### workflow-detector.sh
Automatically detects when you're describing a task that matches one of our workflow patterns and suggests the appropriate workflow command.

**Detects:**
- Feature development requests
- Bug reports and fixes
- API development tasks
- QA and testing requests
- Refactoring needs
- UI component development

### How It Works
When you type a message to Claude, the hook analyzes it for patterns and adds helpful context suggesting the appropriate workflow command.

## Setup

1. **Enable hooks in Claude Code settings**:
   Create or update `.claude/settings.json`:
   ```json
   {
     "hooks": {
       "UserPromptSubmit": [
         {
           "hooks": [
             {
               "type": "command",
               "command": ".claude/hooks/workflow-detector.sh"
             }
           ]
         }
       ]
     }
   }
   ```

2. **Make hooks executable**:
   ```bash
   chmod +x .claude/hooks/*.sh
   ```

## Examples

### Input: "I need to add user authentication to my app"
**Hook adds**: "Detected feature request. Consider using /workflow-feature command for systematic implementation."

### Input: "Fix the bug where users get logged out after 5 minutes"
**Hook adds**: "Detected bug report. Consider using /workflow-bug command for systematic debugging."

### Input: "Create REST API for managing blog posts"
**Hook adds**: "Detected API development task. Consider using /workflow-api command."

## Creating Custom Hooks

You can create your own hooks by:
1. Adding a new script to this directory
2. Updating `.claude/settings.json` to reference it
3. Using exit codes and JSON output to control behavior

See Claude Code documentation for more details on hook development.