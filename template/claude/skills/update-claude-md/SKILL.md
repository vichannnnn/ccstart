---
name: update-claude-md
description: Update CLAUDE.md sections through interactive Q&A. Use when the user wants to update project documentation, refresh CLAUDE.md content, or says "/update-claude-md". Guides user through questions to update auto-generated sections (overview, objectives, commands, notes).
---

# Update CLAUDE.md Skill

Update auto-generated sections in CLAUDE.md through interactive Q&A with the user.

## Target Sections

CLAUDE.md contains auto-generated sections marked with special comments:

```markdown
<!-- auto-generated-start:SECTION_NAME -->
[content]
<!-- auto-generated-end:SECTION_NAME -->
```

**Sections to update:**
- `overview` - Brief project description
- `objectives` - Key project objectives (bullet list)
- `commands` - Common project commands (code block)
- `notes` - Additional important information

## Workflow

1. Read current CLAUDE.md content
2. Ask user which sections to update (or update all)
3. For each section, ask targeted questions
4. Generate updated content based on responses
5. Replace content between section markers

## Questions by Section

### Overview
- "What does this project do in one or two sentences?"
- "What problem does it solve?"

### Objectives
- "What are the main goals of this project?"
- "What key features or capabilities should it provide?"

### Commands
- "What commands do you commonly run for development?"
- "What are the test, build, and run commands?"

### Notes
- "What technology stack does this project use?"
- "Are there any important dependencies or requirements?"
- "Any other context that would help when working on this project?"

## Update Process

1. Find section markers using pattern: `<!-- auto-generated-start:SECTION_NAME -->`
2. Replace content between start and end markers
3. Preserve marker comments
4. Keep all content outside markers unchanged

## Example

User: "/update-claude-md"

Assistant asks: "Which sections would you like to update?"
- Overview
- Objectives
- Commands
- Notes
- All sections

User selects "Overview"

Assistant asks: "What does this project do in one or two sentences?"

User responds: "It's a REST API for managing a book library with search and recommendations"

Assistant updates:
```markdown
<!-- auto-generated-start:overview -->
A REST API for managing a book library, providing search functionality and personalized book recommendations.
<!-- auto-generated-end:overview -->
```

## Guidelines

- Keep overview concise (1-3 sentences)
- Format objectives as bullet points starting with action verbs
- Include actual commands in the commands section, not placeholders
- Notes should capture technology-specific details and gotchas
