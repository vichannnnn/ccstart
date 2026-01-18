#!/bin/bash
: <<'FRONTMATTER'
---
name: claude-md-reminder
description: Reminds Claude to respect CLAUDE.md and ask clarifying questions on every prompt
---
FRONTMATTER

cat << 'EOF'
<user-prompt-submit-hook>
REMINDER: Before responding to this prompt:
1. Review and respect all instructions in CLAUDE.md
2. Ask clarifying questions if any requirements are unclear - do not make assumptions
3. If you just exited plan mode and the user approved a significant feature or bug fix, consider using /create-ticket to capture the implementation plan
</user-prompt-submit-hook>
EOF
