# Phase 1: Agent Orchestration System Design

## Overview
This document outlines the technical design for Phase 1 of the Agent Orchestration System, focusing on the foundation components needed to support basic workflow execution.

## Directory Structure
```
claude_code/
├── lib/                          # New directory for orchestration system
│   ├── workflow-parser.js        # Parse and validate workflow files
│   ├── execution-engine.js       # Core workflow execution logic
│   ├── context-manager.js        # Manage data between tasks
│   └── workflow-schema.js        # Schema definitions and validators
├── bin/
│   ├── create-project.js         # Existing
│   └── workflow-cli.js           # New CLI for workflow commands
├── workflows/                    # New directory for workflow definitions
│   └── examples/                 # Example workflow files
└── .claude/
    └── workflows/                # User workflow storage (in template)
```

## Phase 1 Components

### 1. Workflow Schema (workflow-schema.js)

```javascript
// Core schema structure for Phase 1
const WorkflowSchema = {
  version: { type: 'string', required: true, default: '1.0' },
  name: { type: 'string', required: true },
  description: { type: 'string' },
  
  tasks: {
    type: 'array',
    items: {
      id: { type: 'string', required: true, pattern: /^[a-zA-Z0-9_-]+$/ },
      agent: { type: 'string', required: true, enum: ['planner', 'coder', 'checker', 'frontend', 'backend', 'researcher', 'blockchain', 'shadcn', 'orchestrator'] },
      description: { type: 'string' },
      parameters: { type: 'object' },
      dependencies: { type: 'array', items: { type: 'string' } },
      // Phase 2: condition, retry, timeout
    }
  },
  
  settings: {
    timeout: { type: 'number', default: 3600 },
    on_failure: { type: 'string', enum: ['stop', 'continue'], default: 'stop' }
  }
};
```

### 2. Workflow Parser (workflow-parser.js)

Key responsibilities:
- Load YAML/JSON workflow files
- Validate against schema
- Check for circular dependencies
- Transform to internal execution format

```javascript
class WorkflowParser {
  constructor() {
    this.schema = WorkflowSchema;
  }
  
  parse(filePath) {
    // 1. Load file (support .yaml, .yml, .json)
    // 2. Parse content
    // 3. Validate against schema
    // 4. Build dependency graph
    // 5. Check for cycles
    // 6. Return normalized workflow object
  }
  
  validateDependencies(tasks) {
    // Ensure all dependency IDs exist
    // Detect circular dependencies using DFS
  }
}
```

### 3. Execution Engine (execution-engine.js)

For Phase 1, focus on sequential execution:

```javascript
class ExecutionEngine {
  constructor(contextManager) {
    this.contextManager = contextManager;
    this.state = new Map(); // task states
  }
  
  async execute(workflow) {
    // 1. Initialize all tasks as 'pending'
    // 2. Find tasks with no dependencies
    // 3. Execute tasks in order
    // 4. Update state after each task
    // 5. Handle failures based on settings
  }
  
  async executeTask(task, context) {
    // 1. Set task state to 'running'
    // 2. Prepare agent prompt with context
    // 3. Invoke agent (simulate for now)
    // 4. Capture output
    // 5. Update context
    // 6. Set task state to 'success' or 'failed'
  }
}
```

### 4. Context Manager (context-manager.js)

Manages data flow between tasks:

```javascript
class ContextManager {
  constructor() {
    this.context = {
      global: {},      // Workflow-wide variables
      tasks: {}        // Task-specific outputs
    };
  }
  
  interpolate(value, currentTaskId) {
    // Replace ${task_id.output} with actual values
    // Support basic expressions
  }
  
  setTaskOutput(taskId, output) {
    this.context.tasks[taskId] = { output, status: 'success' };
  }
  
  getContext(taskId) {
    // Return context available to a specific task
  }
}
```

### 5. CLI Interface (workflow-cli.js)

New CLI commands to add:

```javascript
#!/usr/bin/env node

const { program } = require('commander');
const WorkflowParser = require('../lib/workflow-parser');
const ExecutionEngine = require('../lib/execution-engine');

program
  .command('workflow:run <file>')
  .description('Execute a workflow file')
  .action(async (file) => {
    // 1. Parse workflow
    // 2. Display workflow summary
    // 3. Execute with progress updates
    // 4. Show results
  });

program
  .command('workflow:validate <file>')
  .description('Validate a workflow file')
  .action(async (file) => {
    // 1. Parse and validate
    // 2. Show validation results
    // 3. Display dependency graph
  });
```

## Integration with ccsetup

1. **Template Updates**: Add `.claude/workflows/` directory to template
2. **Package.json**: Add new dependencies:
   - `js-yaml` for YAML parsing
   - `commander` for CLI (if not present)
   - `chalk` for colored output
3. **Bin Script**: Update create-project.js to mention workflow capability

## Example Workflow for Testing

```yaml
# workflows/examples/hello-world.yaml
version: "1.0"
name: hello-world
description: Simple sequential workflow

tasks:
  - id: analyze
    agent: planner
    description: Analyze the codebase structure
    parameters:
      task: "Analyze the current project structure and suggest improvements"
  
  - id: implement
    agent: coder
    description: Implement suggested improvements
    dependencies: [analyze]
    parameters:
      task: "Implement the improvements suggested by the planner"
      context: "${analyze.output}"
  
  - id: review
    agent: checker
    description: Review the implementation
    dependencies: [implement]
    parameters:
      task: "Review the implemented changes for quality and correctness"

settings:
  timeout: 1800
  on_failure: stop
```

## Implementation Order

1. **workflow-schema.js** - Define data structures
2. **workflow-parser.js** - Parse and validate workflows
3. **context-manager.js** - Handle data flow
4. **execution-engine.js** - Execute workflows
5. **workflow-cli.js** - Command-line interface
6. **Integration tests** - Verify everything works

## Next Steps

After this design is approved:
1. Backend agent implements core libraries
2. Coder agent creates CLI integration
3. Checker agent validates implementation
4. Create example workflows for testing