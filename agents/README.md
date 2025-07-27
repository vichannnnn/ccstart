# Agents

This directory contains custom agents for specialized tasks.

## Overview
Agents are specialized prompts or tools that help Claude perform specific tasks more effectively.

## Creating a New Agent
1. Create a new markdown file in this directory
2. Name it descriptively (e.g., `code-reviewer.md`, `test-generator.md`)
3. Define the agent's purpose, capabilities, and instructions

## Example Agent Structure
```markdown
# Agent Name

## Purpose
[What this agent does]

## Capabilities
- [Capability 1]
- [Capability 2]

## Instructions
[Detailed instructions for the agent]
```

## Available Agents
- **planner** - Strategic planning specialist for breaking down complex problems and creating implementation roadmaps
- **coder** - Expert software developer for implementing features, fixing bugs, and optimizing code
- **checker** - Quality assurance and code review specialist for testing, security analysis, and validation
- **researcher** - Research specialist for both online sources and local codebases, gathering comprehensive information from multiple sources
- **blockchain** - Blockchain and Web3 expert for smart contracts, DeFi protocols, and blockchain architecture
- **frontend** - Frontend development specialist for UI/UX, responsive design, and modern web frameworks
- **backend** - Backend development specialist for API design, database architecture, and server-side optimization
- **shadcn** - shadcn/ui component library expert for building beautiful, accessible React interfaces