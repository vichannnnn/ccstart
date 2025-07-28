# Agent Orchestration Examples

## Overview
This document provides practical examples of using the orchestrator agent to coordinate multi-agent workflows for common development tasks.

## Example 1: Building a Full-Stack Feature

### Scenario
"I need to build a user profile feature with avatar upload, bio editing, and social links."

### Orchestration Approach
```
User: Use the orchestrator agent to help me build a complete user profile feature with avatar upload, bio editing, and social links.

Orchestrator Response:
I'll coordinate multiple agents to build this feature. Here's the workflow:

1. Planning Phase (Planner Agent)
   - Design database schema
   - API endpoint specifications  
   - Component architecture

2. Backend Implementation (Backend Agent)
   - User profile API endpoints
   - Avatar upload handling
   - Data validation

3. Frontend Implementation (Frontend Agent)
   - Profile display component
   - Edit profile form
   - Avatar upload UI

4. Quality Assurance (Checker Agent)
   - Security review
   - Performance optimization
   - Cross-browser testing
```

## Example 2: Debugging Production Issue

### Scenario
"Users are reporting slow page loads on the dashboard."

### Orchestration Approach
```
User: Use the orchestrator agent to investigate and fix slow dashboard performance.

Orchestrator Response:
I'll coordinate a systematic investigation:

1. Research Phase (Researcher Agent)
   - Analyze performance metrics
   - Review recent changes
   - Identify bottlenecks

2. Frontend Analysis (Frontend Agent)
   - Check bundle sizes
   - Review render performance
   - Identify unnecessary re-renders

3. Backend Analysis (Backend Agent)
   - Database query optimization
   - API response times
   - Caching opportunities

4. Implementation (Coder Agent)
   - Apply optimizations
   - Add performance monitoring

5. Verification (Checker Agent)
   - Performance benchmarks
   - Load testing
```

## Example 3: Adding Blockchain Integration

### Scenario
"Add Web3 wallet connection and NFT display to the application."

### Orchestration Approach
```
User: Use the orchestrator agent to add Web3 wallet connection and NFT gallery.

Orchestrator Response:
I'll coordinate blockchain integration across the stack:

1. Architecture Planning (Planner + Blockchain Agents)
   - Wallet integration strategy
   - Smart contract interactions
   - Security considerations

2. Backend Setup (Backend + Blockchain Agents)
   - Web3 provider configuration
   - Wallet authentication
   - NFT metadata API

3. Frontend Implementation (Frontend + Blockchain Agents)
   - Wallet connection UI
   - NFT gallery component
   - Transaction status handling

4. Security Audit (Checker + Blockchain Agents)
   - Smart contract security
   - Private key handling
   - CORS and API security
```

## Example 4: Refactoring Legacy Code

### Scenario
"Refactor the old jQuery codebase to modern React."

### Orchestration Approach
```
User: Use the orchestrator agent to plan and execute jQuery to React migration.

Orchestrator Response:
I'll coordinate a phased migration approach:

1. Analysis Phase (Researcher + Planner Agents)
   - Inventory jQuery dependencies
   - Identify component boundaries
   - Create migration roadmap

2. Component Creation (Frontend Agent)
   - Convert jQuery plugins to React
   - Create reusable components
   - Implement state management

3. Incremental Migration (Coder Agent)
   - Module-by-module conversion
   - Maintain backward compatibility
   - Update build configuration

4. Testing & Validation (Checker Agent)
   - Feature parity testing
   - Performance comparison
   - Browser compatibility
```

## Orchestration Best Practices

### 1. Clear Task Definition
```
❌ "Help me build a feature"
✅ "Use the orchestrator to build a real-time chat feature with typing indicators, message history, and file sharing"
```

### 2. Specify Constraints
```
"Use the orchestrator to redesign the homepage with these constraints:
- Must maintain current SEO structure
- Page load time under 2 seconds
- Mobile-first approach
- Use existing design system"
```

### 3. Iterative Refinement
```
"Use the orchestrator to:
1. First, create a basic implementation
2. Then, gather feedback via checker agent
3. Finally, refine based on findings"
```

### 4. Domain-Specific Coordination
```
"Use the orchestrator to build a DeFi dashboard:
- Blockchain agent for smart contract integration
- Frontend agent for UI with shadcn components
- Backend agent for price feeds and caching"
```

## Common Patterns

### Sequential Execution
Best for: Tasks with clear dependencies
```
Research → Plan → Implement → Test → Deploy
```

### Parallel Execution
Best for: Independent features
```
Frontend Team: Build UI components
Backend Team: Create API endpoints
(Merge results after both complete)
```

### Feedback Loop
Best for: Quality improvement
```
Implement → Review → Fix Issues → Review → Ship
```

### Specialist Consultation
Best for: Domain expertise
```
Main flow: Planner → Coder → Checker
Consult: Blockchain agent for Web3 features
Consult: Shadcn agent for UI components
```