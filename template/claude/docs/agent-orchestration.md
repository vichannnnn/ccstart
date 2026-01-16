# Agent Orchestration Guide

## Overview
This document defines the standard workflows for orchestrating multiple agents in Claude Code to complete complex tasks efficiently. Follow these patterns to ensure consistent and thorough task execution.

## Available Agents

- **Planner Agent** - Strategic planning and task breakdown
- **Checker Agent** - Quality assurance and code review
- **Backend Agent** - FastAPI and Python backend development
- **Frontend Agent** - React and TypeScript frontend development

## Core Agent Workflows

### 1. Feature Development Workflow
**Purpose**: Implement new features from conception to completion

**Flow**:
1. **Planner Agent** → Create detailed implementation plan and architecture
2. **Backend Agent** → Implement server-side logic (if needed)
3. **Frontend Agent** → Implement client-side components (if needed)
4. **Checker Agent** → Test, review, and validate the implementation

**Example Prompt**:
```
"I need to add user authentication to the app. First use the planner to design the auth system, backend to implement the API, frontend for the UI, and checker to validate."
```

### 2. Bug Fix Workflow
**Purpose**: Systematically identify and fix bugs

**Flow**:
1. **Planner Agent** → Investigate the bug and plan the fix
2. **Backend Agent** or **Frontend Agent** → Implement the fix
3. **Checker Agent** → Verify fix and check for regressions

### 3. Refactoring Workflow
**Purpose**: Improve code quality without changing functionality

**Flow**:
1. **Planner Agent** → Analyze current implementation and design refactoring approach
2. **Backend Agent** or **Frontend Agent** → Execute refactoring
3. **Checker Agent** → Ensure functionality remains intact

### 4. API Development Workflow
**Purpose**: Design and implement APIs

**Flow**:
1. **Planner Agent** → Design API architecture and endpoints
2. **Backend Agent** → Implement server-side logic
3. **Frontend Agent** → Create client integration (if needed)
4. **Checker Agent** → Test API functionality and security

### 5. UI Component Workflow
**Purpose**: Create user interface components

**Flow**:
1. **Planner Agent** → Design component architecture
2. **Frontend Agent** → Implement UI components
3. **Checker Agent** → Test accessibility and responsiveness

### 6. QA Workflow
**Purpose**: Comprehensive quality assurance for code changes

**Flow**:
1. **Planner Agent** → Analyze changes and identify test requirements
2. **Checker Agent** → Run automated tests and static analysis
3. **Backend Agent** or **Frontend Agent** → Fix any issues found during QA
4. **Checker Agent** → Verify fixes and perform final validation

**Activities**:
- Unit and integration testing
- Code coverage analysis
- Performance testing
- Security vulnerability scanning
- Accessibility compliance (for UI changes)
- Cross-browser/platform testing


## Orchestration Best Practices

### 1. Plan Before Implementation
- Use Planner Agent first for non-trivial tasks
- Create detailed plans before making changes
- Break down large tasks into smaller tickets

### 2. Sequential Execution
- Complete each agent's task before moving to the next
- Use TodoWrite to track progress through the workflow
- Don't skip agents unless explicitly instructed

### 3. Validation is Mandatory
- Always end with Checker Agent
- Run tests and linting
- Verify all acceptance criteria

### 4. Documentation Updates
- Update ROADMAP.md after completing workflows
- Mark tickets as complete with summaries
- Keep plans updated with outcomes

## Workflow Triggers

### When to use Feature Development Workflow:
- Adding new functionality
- Implementing user stories
- Creating new modules or services

### When to use Bug Fix Workflow:
- Fixing reported issues
- Addressing error messages
- Resolving unexpected behavior

### When to use Refactoring Workflow:
- Improving code readability
- Optimizing performance
- Updating deprecated code

### When to use API Development Workflow:
- Creating new endpoints
- Designing service interfaces
- Building integrations

### When to use UI Component Workflow:
- Building new UI elements
- Updating existing interfaces
- Implementing design changes

### When to use QA Workflow:
- After completing any feature implementation
- Before merging code to main branch
- When addressing production issues
- After major refactoring
- Before releases or deployments

## Example Multi-Agent Execution

```
User: "I need to add a payment processing feature"

Claude's Response Flow:
1. "I'll help you add payment processing. Let me start by using the planner agent to design the payment processing system."
   [Uses Planner Agent, creates plan]

2. "With the plan ready, I'll use the backend agent to implement the server-side payment processing."
   [Uses Backend Agent]

3. "Now I'll use the frontend agent to create the payment UI components."
   [Uses Frontend Agent]

4. "Finally, let me use the checker agent to verify the implementation and ensure security."
   [Uses Checker Agent]
```

### QA Workflow Example

```
User: "Can you run QA on the authentication feature we just implemented?"

Claude's Response Flow:
1. "I'll perform comprehensive QA on the authentication feature. Let me start with the planner agent to analyze what was changed and what needs testing."
   [Uses Planner Agent to review changes]

2. "Now I'll use the checker agent to run automated tests and perform security analysis."
   [Uses Checker Agent - finds issues with password validation]

3. "I found some issues with password validation. Let me use the backend agent to fix these."
   [Uses Backend Agent to implement fixes]

4. "Now let me run the checker agent again to verify all issues are resolved."
   [Uses Checker Agent - all tests pass]

5. "QA complete! All tests are passing, security checks are clean, and the authentication feature is ready for deployment."
```

## Workflow Customization

You can create custom workflows by:
1. Combining agents in different sequences
2. Adding conditional paths based on findings
3. Creating specialized workflows for your project

Remember: The goal is systematic, thorough task completion with proper validation at each step.
