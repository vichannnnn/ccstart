# PLAN-001: Claude Code Custom Commands Implementation

## Executive Summary
Design and implement a custom command system for Claude Code that allows projects to define their own commands, starting with an `/update-claude-md` command to automatically populate project-specific information after running `npx ccstart`.

## Objectives
- [ ] Create a standardized way to define custom commands in Claude Code projects
- [ ] Implement automatic CLAUDE.md updating functionality
- [ ] Ensure commands are discoverable and appear in Claude Code's interface
- [ ] Provide extensible architecture for future commands

## Architecture

### Command Structure
```
claude/
├── commands/
│   ├── README.md
│   ├── update-claude-md.md
│   └── [other-commands].md
├── CLAUDE.md
└── .claude-commands.json (optional config)
```

### Command Definition Format
Each command will be defined as a markdown file with:
```markdown
# Command: /update-claude-md

## Description
Automatically updates CLAUDE.md with project-specific information

## Usage
/update-claude-md [--type <project-type>]

## Parameters
- --type: Optional project type (auto-detected if not provided)

## Actions
1. Analyze project structure
2. Extract metadata from package.json, README, etc.
3. Update CLAUDE.md sections
4. Preserve custom content
```

### Integration Approach
1. **Slash Commands**: Utilize Claude Code's slash command system
2. **Command Discovery**: Claude reads from `claude/commands/` directory
3. **Execution**: Commands trigger specific agent workflows

## Implementation Phases

### Phase 1: Research & Foundation
- Investigate Claude Code's command registration API
- Study existing slash commands implementation
- Determine best integration method
- Create command directory structure

### Phase 2: Command System Core
- Implement command parser and loader
- Create command execution framework
- Add command registration logic
- Ensure dropdown/autocomplete integration

### Phase 3: Update-Claude-MD Command
- Implement project analysis logic:
  - Detect project type (Node.js, Python, etc.)
  - Extract package.json/pyproject.toml data
  - Identify key directories and files
  - Detect testing frameworks
  - Find build/lint commands
- Create CLAUDE.md update logic:
  - Parse existing CLAUDE.md
  - Update specific sections
  - Preserve user customizations
  - Add detected information

### Phase 4: Testing & Documentation
- Test with various project types
- Create command development guide
- Add examples for common commands
- Update ccstart templates

## Technical Approach

### Command Detection
```javascript
// In claude/commands/.claude-commands.json
{
  "commands": [
    {
      "name": "update-claude-md",
      "description": "Update CLAUDE.md with project info",
      "agent": "researcher",
      "workflow": "analyze-and-update"
    }
  ]
}
```

### CLAUDE.md Update Strategy
1. **Section Markers**: Use HTML comments to mark auto-generated sections
   ```markdown
   ## Project Overview
   <!-- auto-generated-start -->
   [Auto-populated content]
   <!-- auto-generated-end -->
   ```

2. **Smart Merging**: Preserve manually added content outside markers

3. **Information Sources**:
   - package.json: name, description, scripts, dependencies
   - README.md: Extract project description if available
   - Directory structure: Identify project layout
   - Config files: Detect frameworks and tools

### Example Update Flow
```
User: /update-claude-md
Claude: I'll analyze your project and update CLAUDE.md...
[Uses researcher agent to gather project info]
[Updates CLAUDE.md with findings]
Claude: Updated CLAUDE.md with:
- Project name and description
- Detected frameworks: React, Express
- Test command: npm test
- Build command: npm run build
- Key directories structure
```

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Command conflicts | Medium | Namespace commands with project prefix |
| CLAUDE.md corruption | High | Backup before updates, use markers |
| Command discovery fails | High | Fallback to manual command list |
| Complex project structures | Medium | Provide manual override options |

## Success Metrics
- Commands appear in Claude Code dropdown
- `/update-claude-md` successfully updates project info
- No manual CLAUDE.md editing required for basic info
- Easy to add new custom commands
- Commands work across different project types

## Future Commands
- `/create-ticket`: Generate ticket from conversation
- `/update-roadmap`: Update ROADMAP.md progress
- `/run-workflow`: Execute predefined agent workflows
- `/project-stats`: Show project statistics
- `/setup-[tool]`: Configure specific tools

## Notes
- Commands should follow Claude Code's native patterns
- Consider using agent orchestration for complex commands
- Ensure backward compatibility with existing projects