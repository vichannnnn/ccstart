# PLAN-002: Workflow Automation Commands

## Executive Summary
Create custom slash commands for each agent orchestration workflow, transforming manual workflow execution into automated sequences that can be triggered with a single command plus context.

## Problem Statement
- Current workflows require manual agent sequencing
- Users must know which agents to use and in what order
- No automatic execution of orchestration patterns
- Workflows are guidelines rather than executable automation

## Solution
Create slash commands that:
1. Accept user context through arguments
2. Automatically execute the appropriate agent sequence
3. Pass context between agents in the workflow
4. Track progress through the workflow steps

## Command Structure

### Basic Format
```
/workflow-<type> <description of task>
```

### Planned Commands
1. `/workflow-feature` - Feature Development (Researcher → Planner → Coder → Checker)
2. `/workflow-bug` - Bug Fix (Researcher → Coder → Checker)
3. `/workflow-refactor` - Refactoring (Researcher → Planner → Coder → Checker)
4. `/workflow-api` - API Development (Planner → Backend → Frontend → Checker)
5. `/workflow-ui` - UI Components (Frontend → Shadcn → Checker)
6. `/workflow-blockchain` - Blockchain (Planner → Blockchain → Checker)
7. `/workflow-qa` - Quality Assurance (Researcher → Checker → Coder → Checker)

## Implementation Approach

### Command Template Structure
```markdown
---
description: "Execute [workflow name] workflow for the given task"
allowedTools: ["Task", "TodoWrite", "Read", "Write", "Edit", "Grep", "LS", "Bash"]
---

I'll execute the [workflow name] workflow for: $ARGUMENTS

Let me break this down into steps using our specialized agents:

## Step 1: [First Agent]
[Instructions to use first agent with context from $ARGUMENTS]

## Step 2: [Second Agent]
[Instructions to use second agent, building on results from Step 1]

[Continue for all agents in workflow...]

I'll track progress through each step and ensure systematic completion of your request.
```

### Example: Feature Development Command
```markdown
---
description: "Execute feature development workflow for the given task"
allowedTools: ["Task", "TodoWrite", "Read", "Write", "Edit", "Grep", "LS", "Bash"]
---

I'll execute the Feature Development workflow for: $ARGUMENTS

This workflow follows our proven pattern:
1. **Research** - Understand existing codebase and requirements
2. **Planning** - Design the implementation approach
3. **Coding** - Implement the feature
4. **Checking** - Test and validate the implementation

Let me start by using the TodoWrite tool to track our progress through each phase.

## Phase 1: Research
First, I'll use the researcher agent to analyze your codebase and understand the requirements for "$ARGUMENTS".

[Uses Task tool with researcher agent]

## Phase 2: Planning
Based on the research findings, I'll now use the planner agent to create a detailed implementation plan.

[Uses Task tool with planner agent]

## Phase 3: Implementation
With our plan ready, I'll use the coder agent to implement the feature.

[Uses Task tool with coder agent]

## Phase 4: Validation
Finally, I'll use the checker agent to test and validate our implementation.

[Uses Task tool with checker agent]
```

## Benefits
1. **Single Command Execution**: Users type one command instead of managing multiple agents
2. **Context Preservation**: Arguments passed through entire workflow
3. **Automatic Sequencing**: No need to manually coordinate agents
4. **Progress Tracking**: Built-in TodoWrite integration
5. **Discoverability**: Commands appear in Claude's slash command menu

## Implementation Steps
1. Create command files in `.claude/commands/workflows/` directory
2. Implement each workflow command with proper agent sequencing
3. Add TodoWrite integration for progress tracking
4. Include context passing between agent steps
5. Test each workflow with real examples
6. Update documentation

## Usage Examples

### Feature Development
```
/workflow-feature add user authentication with email and password
```

### Bug Fix
```
/workflow-bug fix memory leak in image upload component
```

### API Development
```
/workflow-api create CRUD endpoints for product catalog
```

### Quality Assurance
```
/workflow-qa review and test the checkout process
```

## Success Metrics
- Workflows execute end-to-end without manual intervention
- Context properly passed between agents
- Users can trigger complex workflows with single command
- Reduced time from task request to completion
- Improved consistency in task execution

## Hook-Based Automatic Execution

### UserPromptSubmit Hook
Automatically detect workflow triggers in user prompts and execute appropriate workflows:

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command", 
            "command": "claude-workflow-detector.sh"
          }
        ]
      }
    ]
  }
}
```

### Workflow Detection Script
```bash
#!/bin/bash
# claude-workflow-detector.sh

input=$(cat)

# Detect feature requests
if echo "$input" | grep -iE "(implement|add|create|build).*(feature|functionality|component)" > /dev/null; then
  echo '{"additionalContext": "Detected feature request. Consider using /workflow-feature command for systematic implementation."}'
  exit 0
fi

# Detect bug reports
if echo "$input" | grep -iE "(fix|bug|error|issue|broken|not working)" > /dev/null; then
  echo '{"additionalContext": "Detected bug report. Consider using /workflow-bug command for systematic debugging."}'
  exit 0
fi

# Detect API development
if echo "$input" | grep -iE "(api|endpoint|rest|graphql).*(create|implement|build)" > /dev/null; then
  echo '{"additionalContext": "Detected API development task. Consider using /workflow-api command."}'
  exit 0
fi

# Detect QA requests
if echo "$input" | grep -iE "(test|qa|quality|review).*(feature|code|implementation)" > /dev/null; then
  echo '{"additionalContext": "Detected QA request. Consider using /workflow-qa command."}'
  exit 0
fi

exit 0
```

### Advanced Hook: Auto-Execute Workflows
```bash
#!/bin/bash
# auto-workflow-executor.sh

input=$(cat)

# Auto-execute feature workflow
if echo "$input" | grep -iE "^(please |can you )?implement .* feature" > /dev/null; then
  feature=$(echo "$input" | sed -E 's/.*(implement|create|add) (.*) feature.*/\2/')
  echo "{\"transformedPrompt\": \"/workflow-feature $feature\"}"
  exit 0
fi

# Auto-execute bug workflow
if echo "$input" | grep -iE "^fix (the )?(bug|issue|problem)" > /dev/null; then
  issue=$(echo "$input" | sed -E 's/.*fix (the )?(.*)/\2/')
  echo "{\"transformedPrompt\": \"/workflow-bug $issue\"}"
  exit 0
fi

echo "$input"
```

### PreToolUse Hooks for Workflow Steps
Ensure proper sequencing and context preservation:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Task",
        "hooks": [
          {
            "type": "command",
            "command": "workflow-context-manager.sh"
          }
        ]
      }
    ]
  }
}
```

## Benefits of Hook Integration
1. **Zero-friction workflows** - Users don't need to know commands
2. **Intelligent detection** - Automatically identifies task types
3. **Guided execution** - Suggests appropriate workflows
4. **Fully automatic option** - Can transform prompts to workflow commands
5. **Context preservation** - Hooks can manage state between agents

## Future Enhancements
- Conditional branching based on agent outputs
- Workflow templates for common scenarios
- Integration with ticket system
- Automatic plan/ticket creation
- Workflow history and analytics
- Machine learning for better pattern detection