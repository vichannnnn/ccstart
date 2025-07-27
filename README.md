# ccsetup

Quick setup for Claude Code projects with built-in agents, ticket system, and planning tools.

## Installation

```bash
npx ccsetup my-project
# or
npx ccsetup .  # in current directory
```

## What's Included

- **CLAUDE.md** - Project instructions for Claude
- **agents/** - Specialized AI agents (planner, coder, checker, etc.)
- **tickets/** - Task tracking system
- **plans/** - Project planning documents
- **docs/** - Documentation with ROADMAP.md

## Usage

1. Create a new project:
   ```bash
   npx ccsetup my-awesome-project
   cd my-awesome-project
   ```

2. Edit `CLAUDE.md` with your project-specific instructions

3. Update `docs/ROADMAP.md` with your project goals

4. Start creating tickets in `tickets/` directory

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

### Selecting Agents for Your Project

You can customize which agents to use by:

1. Copy only the agents you need to `./claude/agents/` in your project
2. Remove any agents you don't need from the `agents/` directory
3. Create custom agents by adding new `.md` files

Example:
```bash
# After running ccsetup
mkdir -p ./claude/agents
cp agents/coder.md agents/checker.md ./claude/agents/
# Now Claude will only have access to coder and checker agents
```

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

- Pre-configured project structure for Claude Code
- Multiple specialized agents for different tasks
- Built-in ticket and planning system
- Ready-to-use boilerplate

## Credits

Born from our discussions in TechOverflow with [vichannnnn](https://github.com/vichannnnn) and [nasdin](https://github.com/nasdin)

## License

MIT