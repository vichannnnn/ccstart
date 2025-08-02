# Agent Orchestration Guide

## Overview
This document defines the standard workflows for orchestrating multiple agents in Claude Code to complete complex tasks efficiently. Follow these patterns to ensure consistent and thorough task execution.

## Core Agent Workflows

### 1. Feature Development Workflow
**Purpose**: Implement new features from conception to completion

**Flow**:
1. **Researcher Agent** → Gather requirements and understand existing codebase
2. **Planner Agent** → Create detailed implementation plan and architecture
3. **Coder Agent** → Implement the feature following the plan
4. **Checker Agent** → Test, review, and validate the implementation

**Example Prompt**:
```
"I need to add user authentication to the app. First use the researcher agent to understand the current architecture, then the planner to design the auth system, coder to implement it, and checker to validate."
```

### 2. Bug Fix Workflow
**Purpose**: Systematically identify and fix bugs

**Flow**:
1. **Researcher Agent** → Investigate the bug and find root cause
2. **Coder Agent** → Implement the fix
3. **Checker Agent** → Verify fix and check for regressions

### 3. Refactoring Workflow
**Purpose**: Improve code quality without changing functionality

**Flow**:
1. **Researcher Agent** → Analyze current implementation and identify improvements
2. **Planner Agent** → Design refactoring approach
3. **Coder Agent** → Execute refactoring
4. **Checker Agent** → Ensure functionality remains intact

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
1. **Frontend Agent** → Design and implement UI components
2. **Shadcn Agent** → Apply shadcn/ui styling (if using React)
3. **Checker Agent** → Test accessibility and responsiveness

### 6. Blockchain Development Workflow
**Purpose**: Develop Web3 features and smart contracts

**Flow**:
1. **Planner Agent** → Design smart contract architecture
2. **Blockchain Agent** → Implement contracts and Web3 integration
3. **Checker Agent** → Security audit and testing

## Orchestration Best Practices

### 1. Always Start with Understanding
- Use Researcher Agent first for non-trivial tasks
- Understand existing code before making changes
- Document findings in plans directory

### 2. Plan Before Implementation
- Use Planner Agent for complex features
- Create detailed plans in `/plans` directory
- Break down large tasks into smaller tickets

### 3. Sequential Execution
- Complete each agent's task before moving to the next
- Use TodoWrite to track progress through the workflow
- Don't skip agents unless explicitly instructed

### 4. Validation is Mandatory
- Always end with Checker Agent
- Run tests and linting
- Verify all acceptance criteria

### 5. Documentation Updates
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

### When to use Blockchain Workflow:
- Smart contract development
- DeFi integrations
- Web3 features

## Example Multi-Agent Execution

```
User: "I need to add a payment processing feature"

Claude's Response Flow:
1. "I'll help you add payment processing. Let me start by using the researcher agent to understand your current architecture and any existing payment-related code."
   [Uses Researcher Agent]

2. "Based on my research, I'll now use the planner agent to design the payment processing system."
   [Uses Planner Agent, creates plan in /plans]

3. "With the plan ready, I'll use the backend agent to implement the server-side payment processing."
   [Uses Backend Agent]

4. "Now I'll use the frontend agent to create the payment UI components."
   [Uses Frontend Agent]

5. "Finally, let me use the checker agent to verify the implementation and ensure security."
   [Uses Checker Agent]
```

## Workflow Customization

You can create custom workflows by:
1. Combining agents in different sequences
2. Adding conditional paths based on findings
3. Creating specialized workflows for your project

Remember: The goal is systematic, thorough task completion with proper validation at each step.