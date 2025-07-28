# ccsetup

[![npm version](https://img.shields.io/npm/v/ccsetup.svg)](https://www.npmjs.com/package/ccsetup)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/marcia-ong/ccsetup/pulls)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/ccsetup.svg)](https://www.npmjs.com/package/ccsetup)

Quick setup for Claude Code projects with built-in agents, ticket system, planning tools and agent orchestration workflow.

## Installation

```bash
# Create a new project
npx ccsetup my-project

# Setup in current directory
npx ccsetup .

# Install globally (optional)
npm install -g ccsetup
ccsetup my-project
```

## Command Line Options

```bash
ccsetup [project-name] [options]

Options:
  --force, -f     Skip all prompts and overwrite existing files
  --dry-run, -d   Show what would be done without making changes
  --agents        Interactive agent selection mode
  --all-agents    Include all agents without prompting
  --no-agents     Skip agent selection entirely
  --help, -h      Show help message

Examples:
  ccsetup                    # Create in current directory
  ccsetup my-project         # Create in new directory
  ccsetup . --force          # Overwrite files in current directory
  ccsetup my-app --dry-run   # Preview changes without creating files
  ccsetup --agents           # Interactive agent selection only
  ccsetup my-app --all-agents # Include all agents automatically
```

## What's Included

The boilerplate template creates:
- **CLAUDE.md** - Project instructions for Claude
- **agents/** - Specialized AI agents (planner, coder, checker, etc.)
- **tickets/** - Task tracking system
- **plans/** - Project planning documents
- **docs/** - Documentation with ROADMAP.md and agent-orchestration.md
- **.claude/** - Claude Code specific directory structure (created automatically)

## Key Features

- 🎯 **Interactive Agent Selection** - Choose which agents to include during setup
- 🔄 **Agent Orchestration Workflows** - Pre-defined workflows that automatically coordinate multiple agents for complex tasks
- 🔒 **Smart Conflict Resolution** - Handle existing files with skip/rename/overwrite options
- 📁 **.claude Directory Support** - Automatic creation of Claude Code directory structure
- 🏃 **Dry Run Mode** - Preview changes before applying them
- ⚡ **Force Mode** - Skip all prompts for automated workflows
- 🎨 **Standalone Agent Preview** - Explore available agents without setup
- 🎭 **Systematic Task Execution** - Agents work in sequence, building on each other's outputs

## Project Structure

- **templates/** - The boilerplate templates that will be copied to user's project
- **bin/** - CLI executable for ccsetup
- **agents/**, **docs/**, **plans/**, **tickets/** - Working files for ccsetup development (not part of the template)

## Usage

1. Create a new project:
   ```bash
   npx ccsetup my-awesome-project
   cd my-awesome-project
   ```

2. Edit `CLAUDE.md` with your project-specific instructions

3. Update `docs/ROADMAP.md` with your project goals

4. Start creating tickets in `tickets/` directory

## Claude Code Integration

ccsetup seamlessly integrates with Claude Code:

- **Automatic Detection** - Checks if Claude Code is initialized in your project
- **.claude Directory** - Creates Claude Code directory structure automatically
- **Agent Installation** - Copies agents to `.claude/agents/` for native Claude Code support
- **Smart Initialization** - Offers to create `.claude` directory if Claude Code isn't detected

When running in the current directory (`npx ccsetup .`), it will check for Claude Code and provide instructions if not found. For new projects, ccsetup will remind you to initialize Claude Code after setup.

## Using Agents

The boilerplate includes several specialized agents in the `agents/` directory:

- **planner.md** - Strategic planning and task breakdown
- **coder.md** - Implementation and development
- **checker.md** - Testing and quality assurance
- **researcher.md** - Research and information gathering
- **blockchain.md** - Web3 and smart contract development
- **frontend.md** - UI/UX and frontend development
- **backend.md** - API design and server-side development
- **shadcn.md** - shadcn/ui component development

### Interactive Agent Selection

During setup, ccsetup will prompt you to select which agents to include:

```bash
🤖 Select agents to include in your Claude Code project

Use arrow keys to navigate, space to select/deselect, 'a' to toggle all

Choose your agents:
◯ backend - Backend development specialist for API design and server optimization
◯ blockchain - Web3 and smart contract development expert
◯ checker - Quality assurance and code review specialist
◯ coder - Expert software developer for implementation
◯ frontend - Frontend development specialist for UI/UX
◯ planner - Strategic planning specialist for complex problems
◯ researcher - Research specialist for documentation and code analysis
◯ shadcn - shadcn/ui component library expert
```

You can also use flags to control agent selection:
- `--all-agents` - Include all available agents
- `--no-agents` - Skip agent selection entirely
- `--agents` - Preview available agents without creating a project

Example:
```bash
# Include all agents without prompting
npx ccsetup my-project --all-agents

# Create project without any agents
npx ccsetup my-project --no-agents

# Preview available agents only
npx ccsetup --agents
```

### Conflict Resolution

When existing files are detected, ccsetup offers smart conflict resolution:

```bash
⚠️  File conflicts detected. You will be asked how to handle each category.

📄 CLAUDE.md conflicts:
  - CLAUDE.md

Conflict resolution options:
  1) skip      (s) - Keep your existing files
  2) rename    (r) - Save template files with -ccsetup suffix
  3) overwrite (o) - Replace with template versions

Your choice for CLAUDE.md [s/r/o]: 
```

Categories are handled separately:
- **CLAUDE.md** - Project instructions (warns before overwriting)
- **Agents** - AI agent files
- **Documentation** - docs/ folder files
- **Plans** - plans/ folder files
- **Tickets** - tickets/ folder files

## Agent Orchestration Showcase

The template includes powerful agent orchestration workflows that guide Claude through complex tasks systematically. Here are real-world examples:

### 🚀 Feature Development Example

**Scenario**: Building a user authentication system

```bash
# In Claude Code, you would say:
"I need to add user authentication to my app. Use the feature development workflow to guide me through this."

# Claude will automatically orchestrate:
1. Researcher Agent → Analyzes existing codebase, identifies auth patterns
2. Planner Agent → Creates detailed implementation plan with JWT, sessions, etc.
3. Coder Agent → Implements auth endpoints, middleware, and UI components
4. Checker Agent → Tests security, validates implementation, checks edge cases
```

### 🐛 Bug Fix Example

**Scenario**: Users report login failures after 5 minutes

```bash
# You tell Claude:
"Users are getting logged out after 5 minutes. Use the bug fix workflow to investigate and fix this."

# Claude orchestrates:
1. Researcher Agent → Investigates session handling, token expiry, logs
2. Coder Agent → Fixes token refresh logic, updates session timeout
3. Checker Agent → Verifies fix, tests edge cases, ensures no regressions
```

### 🏗️ API Development Example

**Scenario**: Building a REST API for a blog platform

```bash
# You request:
"Help me build a complete REST API for blog posts with CRUD operations. Follow the API development workflow."

# Claude coordinates:
1. Planner Agent → Designs RESTful endpoints, database schema, auth strategy
2. Backend Agent → Implements controllers, models, middleware, validation
3. Frontend Agent → Creates API client, integration examples (if needed)
4. Checker Agent → Tests all endpoints, validates OpenAPI spec, security audit
```

### 🎨 UI Component Example

**Scenario**: Creating a responsive dashboard with shadcn/ui

```bash
# You ask:
"Create a dashboard with charts and stats cards using shadcn. Use the UI component workflow."

# Claude executes:
1. Frontend Agent → Designs component structure, responsive layout
2. Shadcn Agent → Implements with shadcn/ui components, themes, animations
3. Checker Agent → Tests responsiveness, accessibility, performance
```

### 🔍 Quality Assurance Example

**Scenario**: Comprehensive review before deployment

```bash
# You request:
"Run full QA on the authentication feature we just built."

# Claude performs:
1. Researcher Agent → Analyzes all changes, identifies test requirements
2. Checker Agent → Runs security scans, performance tests, accessibility checks
3. Coder Agent → Fixes any issues found
4. Checker Agent → Final validation, generates QA report
```

### 💡 How to Use Agent Orchestration

1. **Read the orchestration guide**:
   ```
   "Read docs/agent-orchestration.md to understand available workflows"
   ```

2. **Choose your workflow**:
   - Feature Development: Complex new features
   - Bug Fix: Investigating and fixing issues
   - Refactoring: Improving code quality
   - API Development: Building APIs
   - UI Components: Frontend development
   - Blockchain: Web3 features
   - QA: Quality assurance

3. **Let Claude guide you**:
   ```
   "I need to [your task]. Which workflow should we use?"
   ```

4. **Follow the flow**:
   - Claude will automatically use agents in the correct sequence
   - Each agent builds on the previous one's work
   - You get systematic, thorough results

The orchestration ensures nothing is missed and follows best practices automatically!

## Getting Started with Claude Code

After setting up your project with `ccsetup`:

1. **Open Claude Code** in your project directory:
   ```bash
   cd my-awesome-project
   claude
   ```

2. **Let Claude understand your project** by asking:
   - "Read the CLAUDE.md file to understand this project"
   - "Check the roadmap in docs/ROADMAP.md"
   - "What agents are available in the agents directory?"
   - "Read the README files in docs, tickets, and plans folders to understand the workflow"

3. **Start working** with Claude:
   - Use the planner agent: "Use the planner agent to help me design a user authentication system"
   - Create tickets: "Create a ticket for implementing user login"
   - Implement features: "Use the coder agent to implement the login functionality"
   - Review code: "Use the checker agent to review the code we just wrote"

4. **Important setup steps**:
   - **Update ROADMAP.md**: Define your project's goals, features, and development phases
   - **Read folder documentation**: Each folder (docs/, tickets/, plans/) has a README explaining its purpose and format
   - **Customize CLAUDE.md**: Add project-specific instructions, commands, and context

5. **Workflow tips**:
   - Always start with planning for complex features
   - Create tickets to track progress
   - Use the appropriate agent for each task
   - Keep CLAUDE.md updated with project-specific instructions
   - Follow the workflow defined in docs/ROADMAP.md

## Features

### Core Features
- ✅ Pre-configured project structure for Claude Code
- 🤖 Multiple specialized agents for different tasks
- 🎫 Built-in ticket and planning system
- 📋 Ready-to-use boilerplate with best practices
- 📁 Automatic .claude directory integration

### CLI Features
- 🎯 Interactive agent selection with descriptions
- 🔄 Smart conflict resolution (skip/rename/overwrite)
- 👀 Dry-run mode to preview changes
- ⚡ Force mode for CI/CD pipelines
- 🎨 Standalone agent preview mode
- 🛡️ Security validations for file operations

### Agent Orchestration
The template includes `docs/agent-orchestration.md` which defines workflows for:
- **Feature Development** - Researcher → Planner → Coder → Checker
- **Bug Fixes** - Researcher → Coder → Checker
- **Refactoring** - Researcher → Planner → Coder → Checker
- **API Development** - Planner → Backend → Frontend → Checker
- **UI Components** - Frontend → Shadcn → Checker
- **Blockchain** - Planner → Blockchain → Checker
- **Quality Assurance** - Researcher → Checker → Coder → Checker

## Credits

Born from our discussions in TechOverflow with [vichannnnn](https://github.com/vichannnnn) and [nasdin](https://github.com/nasdin)

## License

MIT