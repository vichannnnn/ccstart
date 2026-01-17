#!/bin/bash
: <<'FRONTMATTER'
---
name: ticket-reminder
description: Reminds Claude to create a ticket for significant features or bug fixes after plan approval
hooks:
  - event: PostToolUse
    matcher: ExitPlanMode
---
FRONTMATTER

cat << 'EOF'
<post-tool-use-hook>
REMINDER: After the user approves this plan, consider whether this feature or bug fix justifies creating a ticket:
- If this is a significant feature, enhancement, or bug fix, use /create-ticket to create a ticket that captures the plan
- Include the implementation details from the plan in the ticket
- Skip ticket creation for trivial changes (typos, minor tweaks, quick fixes)
</post-tool-use-hook>
EOF
