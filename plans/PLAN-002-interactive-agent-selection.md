# PLAN-002: Interactive Agent Selection with Claude Code Detection

## Executive Summary
Enhance the ccsetup CLI tool to include interactive agent selection during project setup, with Claude Code detection as a prerequisite. This will replace the current manual copying process with a user-friendly multi-select interface.

## Objectives
- [x] Detect Claude Code installation before setup
- [ ] Implement interactive multi-select for agent selection
- [ ] Show agent descriptions during selection
- [ ] Add CLI flags for automation (--all-agents, --no-agents)
- [ ] Copy only selected agents to the project

## Architecture

### Technical Approach
1. **Early Detection Pattern**: Check for .claude directory at the start of main()
2. **Dependency Addition**: Add @inquirer/checkbox for interactive selection
3. **Metadata Extraction**: Parse agent markdown files for frontmatter
4. **Selective Copying**: Modify recursive copy to filter based on selection

### Component Design
```
main()
├── parseArguments() - Enhanced with new flags
├── checkClaudeCode() - New function for detection
├── extractAgentMetadata() - New function to parse agents
├── selectAgents() - New interactive selection
└── copyFiles() - Modified to handle selective copying
```

## Implementation Phases

### Phase 1: Claude Code Detection
**Priority**: Critical
**Tasks**:
- Add checkClaudeCode() function to verify .claude directory exists
- Implement early exit with helpful error message
- Test various scenarios (no Claude, initialized Claude)

**Code Structure**:
```javascript
async function checkClaudeCode(targetPath) {
  const claudePath = path.join(targetPath, '.claude');
  if (!fs.existsSync(claudePath)) {
    console.error('❌ Claude Code not detected in this project.');
    console.error('\nTo use ccsetup, you need to initialize Claude Code first:');
    console.error('1. Install Claude Code CLI: https://docs.anthropic.com/claude-code/quickstart');
    console.error('2. Run \'claude init\' in your project directory');
    console.error('3. Then run \'npx ccsetup\' again\n');
    console.error('Aborting setup.');
    process.exit(1);
  }
}
```

### Phase 2: Dependency Setup
**Priority**: High
**Tasks**:
- Add @inquirer/checkbox to package.json dependencies
- Update package-lock.json
- Test installation process

### Phase 3: Agent Metadata Extraction
**Priority**: High
**Tasks**:
- Create extractAgentMetadata() function
- Parse frontmatter from agent markdown files
- Handle missing or malformed metadata gracefully

**Code Structure**:
```javascript
function extractAgentMetadata(agentPath) {
  const content = fs.readFileSync(agentPath, 'utf8');
  const lines = content.split('\n');
  
  // Extract name from first # heading
  const nameMatch = content.match(/^#\s+(.+)$/m);
  const name = nameMatch ? nameMatch[1] : path.basename(agentPath, '.md');
  
  // Extract description from ## Purpose section
  const purposeMatch = content.match(/##\s+Purpose\s*\n+(.+?)(?:\n|$)/);
  const description = purposeMatch ? purposeMatch[1].trim() : 'No description available';
  
  return { name, description, filename: path.basename(agentPath) };
}
```

### Phase 4: CLI Argument Enhancement
**Priority**: Medium
**Tasks**:
- Add --all-agents flag to options parsing
- Add --no-agents flag to options parsing
- Update help text with new options

### Phase 5: Interactive Selection Implementation
**Priority**: High
**Tasks**:
- Import and configure @inquirer/checkbox
- Create selectAgents() function with multi-select prompt
- Display agent names with descriptions
- Handle keyboard shortcuts (space, a, i)
- Show selection count in real-time

**Code Structure**:
```javascript
async function selectAgents(agents) {
  const checkbox = await import('@inquirer/checkbox');
  
  const choices = agents.map(agent => ({
    name: `${agent.name} - ${agent.description}`,
    value: agent.filename,
    short: agent.name
  }));
  
  const selected = await checkbox.default({
    message: 'Select agents to include (Press <space> to select, <a> to toggle all)',
    choices,
    loop: false
  });
  
  return selected;
}
```

### Phase 6: Selective Copying Logic
**Priority**: High
**Tasks**:
- Modify copyFilesRecursive() to accept filter function
- Implement agent filtering based on selection
- Ensure other template files are still copied
- Add progress indicators

### Phase 7: Missing Agent Fix
**Priority**: Low
**Tasks**:
- Copy backend.md from main agents/ to template/agents/
- Verify all agents have consistent structure

### Phase 8: Testing & Polish
**Priority**: Medium
**Tasks**:
- Test all scenarios (no selection, partial, all)
- Test CLI flags functionality
- Update README.md with new instructions
- Add loading states and success messages

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking existing functionality | High | Maintain backward compatibility, test thoroughly |
| @inquirer/checkbox incompatibility | Medium | Pin specific version, test on multiple Node versions |
| Claude Code detection false positives | Low | Check for .claude directory specifically |
| Large agent files slow parsing | Low | Optimize regex, add timeout |
| User confusion with selection | Medium | Clear instructions, keyboard hints |

## Success Metrics
- Claude Code detection prevents setup in 100% of cases without Claude
- Agent selection time reduced from manual copying to < 30 seconds
- Zero manual file operations required post-setup
- All acceptance criteria from ticket met
- No regression in existing functionality

## Testing Strategy
1. **Unit Tests**: Each new function tested independently
2. **Integration Tests**: Full setup flow with various selections
3. **Edge Cases**:
   - No Claude Code installed
   - No agents selected
   - All agents selected
   - Malformed agent files
   - Missing template directory

## Timeline Estimate
- Phase 1-2: 2-3 hours
- Phase 3-5: 4-6 hours  
- Phase 6: 3-4 hours
- Phase 7-8: 2-3 hours
- **Total**: 11-16 hours

## Notes
- Ensure backward compatibility for users who have already set up projects
- Consider future enhancement: agent dependency management
- Document the new setup process thoroughly in README