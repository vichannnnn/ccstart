# Workflow Definitions

This directory contains workflow definitions for the Claude Code Agent Orchestration System.

## What are Workflows?

Workflows allow you to define complex multi-agent tasks as a series of steps with dependencies. Think of it as "Airflow for Agents" - you can:
- Chain multiple agents together
- Define dependencies between tasks
- Pass context between agents
- Handle errors gracefully
- Execute tasks in parallel (Phase 2)

## Creating a Workflow

Create a YAML or JSON file in this directory with your workflow definition:

```yaml
version: "1.0"
name: my-workflow
description: Description of what this workflow does

tasks:
  - id: task1
    agent: planner
    description: First task description
    parameters:
      task: "What the planner should do"
    
  - id: task2
    agent: coder
    dependencies: [task1]
    parameters:
      task: "Implement based on plan: ${task1.output}"

settings:
  timeout: 3600
  on_failure: stop
```

## Running Workflows

```bash
# Validate a workflow
ccworkflow validate my-workflow.yaml

# Execute a workflow
ccworkflow run my-workflow.yaml

# Execute with verbose output
ccworkflow run my-workflow.yaml --verbose

# List all workflows
ccworkflow list
```

## Available Agents

- `planner` - Strategic planning and architecture design
- `coder` - General implementation and coding
- `checker` - Code review and quality assurance
- `frontend` - Frontend development specialist
- `backend` - Backend development specialist
- `researcher` - Research and information gathering
- `blockchain` - Blockchain and Web3 specialist
- `shadcn` - shadcn/ui component specialist
- `orchestrator` - Multi-agent coordination (can nest workflows)

## Example Workflows

See `/workflows/examples/` in the ccsetup package for example workflows.