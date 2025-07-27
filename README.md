# Claude Code Boilerplate

A structured project template for working with Claude Code - Anthropic's AI-powered coding assistant.

## Overview

This repository provides a standardized boilerplate structure for projects that leverage Claude Code's capabilities. It includes pre-configured directories, specialized AI agents, and workflows designed to maximize productivity when working with Claude as your coding partner.

## Features

- **Structured Project Organization**: Pre-defined directories for documentation, planning, tickets, and specialized agents
- **Specialized AI Agents**: Three purpose-built agents for different aspects of software development:
  - **Planner Agent**: Strategic planning and architecture design
  - **Coder Agent**: Implementation and code optimization
  - **Checker Agent**: Quality assurance and security review
- **Task Management System**: Ticket-based workflow for tracking features and bugs
- **Planning Framework**: Dedicated space for architectural decisions and implementation roadmaps
- **Claude-Optimized Instructions**: CLAUDE.md file with guidelines to help Claude understand your project

## Project Structure

```
claude-code/
├── README.md          # This file
├── CLAUDE.md          # Project-specific instructions for Claude
├── .gitignore         # Comprehensive ignore file for various environments
├── agents/            # Specialized AI agents
│   ├── README.md      # Agent documentation
│   ├── planner.md     # Strategic planning agent
│   ├── coder.md       # Implementation agent
│   └── checker.md     # QA and security agent
├── docs/              # Project documentation
│   └── ROADMAP.md     # Development roadmap and status
├── plans/             # Architectural plans and decisions
│   └── README.md      # Planning documentation
└── tickets/           # Task tickets and issues
    └── README.md      # Ticket format and guidelines
```

## Getting Started

1. **Clone this repository**:
   ```bash
   git clone https://github.com/vichannnnn/claude-code.git
   cd claude-code
   ```

2. **Customize CLAUDE.md**:
   - Update the project overview section
   - Add your specific objectives
   - Include any project-specific context or requirements

3. **Start with Planning**:
   - Use the planner agent to break down your project
   - Create plan documents in the `/plans` directory
   - Update the ROADMAP.md with your development phases

4. **Create Tickets**:
   - Break down features into tickets in the `/tickets` directory
   - Follow the ticket template provided in `/tickets/README.md`

5. **Implement Features**:
   - Use the coder agent for implementation
   - Follow the established project structure
   - Maintain clean, self-documenting code

6. **Quality Assurance**:
   - Use the checker agent for code review
   - Ensure security best practices
   - Validate functionality and performance

## Working with Claude Code

This boilerplate is designed to work seamlessly with Claude Code. When starting a new session:

1. Claude will automatically read the CLAUDE.md file to understand your project
2. Use the specialized agents by referring to them:
   - "Use the planner agent to design this feature"
   - "Use the coder agent to implement this function"
   - "Use the checker agent to review this code"
3. Claude will follow the task management workflow defined in the ROADMAP.md

## Development Workflow

1. **Planning Phase**: Create comprehensive plans before implementation
2. **Ticket Creation**: Document tasks with clear acceptance criteria
3. **Implementation**: Write clean, maintainable code
4. **Review**: Ensure quality and security standards
5. **Documentation**: Keep roadmap and tickets updated

## Best Practices

- Always confirm understanding before proceeding with tasks
- Ask clarifying questions when requirements are unclear
- Create planning documents for complex features
- Use timestamped files in plans directory for decision tracking
- Write self-documenting code without comments

## Contributing

This is a template repository. Feel free to fork and customize it for your specific needs. If you have improvements to the boilerplate structure, please submit a pull request.

## License

This boilerplate is provided as-is for use with Claude Code. Customize the license according to your project needs.

## Acknowledgments

Created for use with [Claude Code](https://claude.ai/code) - Anthropic's AI coding assistant.