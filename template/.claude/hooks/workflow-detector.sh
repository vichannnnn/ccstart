#!/bin/bash
# workflow-detector.sh - Detects workflow patterns in user prompts
# and suggests appropriate workflow commands

input=$(cat)

# Store original input for passthrough
original_input="$input"

# Initialize suggestions array
suggestions=""

# Detect feature requests
if echo "$input" | grep -iE "(implement|add|create|build|develop).*(feature|functionality|component|system)" > /dev/null; then
  suggestions="${suggestions}🚀 Detected feature development task. Consider using: /workflow-feature [your feature description]\n"
fi

# Detect bug reports
if echo "$input" | grep -iE "(fix|bug|error|issue|broken|not working|problem|crash)" > /dev/null; then
  suggestions="${suggestions}🐛 Detected bug fix task. Consider using: /workflow-bug [issue description]\n"
fi

# Detect API development
if echo "$input" | grep -iE "(api|endpoint|rest|graphql|route).*(create|implement|build|design)" > /dev/null; then
  suggestions="${suggestions}🔌 Detected API development task. Consider using: /workflow-api [API description]\n"
fi

# Detect QA/testing requests
if echo "$input" | grep -iE "(test|qa|quality|review|audit|check).*(feature|code|implementation|system)" > /dev/null; then
  suggestions="${suggestions}🧪 Detected QA task. Consider using: /workflow-qa [what to test]\n"
fi

# Detect refactoring needs
if echo "$input" | grep -iE "(refactor|improve|optimize|clean up|restructure).*(code|implementation|architecture)" > /dev/null; then
  suggestions="${suggestions}🔧 Detected refactoring task. Consider using: /workflow-refactor [what to refactor]\n"
fi

# Detect UI component development
if echo "$input" | grep -iE "(ui|interface|component|frontend|design).*(create|implement|build|develop)" > /dev/null; then
  suggestions="${suggestions}🎨 Detected UI development task. Consider using: /workflow-ui [component description]\n"
fi

# Detect blockchain/web3 development
if echo "$input" | grep -iE "(blockchain|smart contract|web3|defi|nft|crypto)" > /dev/null; then
  suggestions="${suggestions}⛓️ Detected blockchain task. Consider using: /workflow-blockchain [blockchain feature]\n"
fi

# If we detected any patterns, add suggestions as additional context
if [ -n "$suggestions" ]; then
  # Create JSON response with additional context
  context="💡 Workflow Suggestions:\\n${suggestions}\\nThese commands will automatically orchestrate the appropriate agents for your task."
  
  # Escape for JSON
  context=$(echo -n "$context" | sed 's/"/\\"/g')
  
  # Output JSON with additional context
  echo "{\"additionalContext\": \"$context\"}"
else
  # No patterns detected, pass through without modification
  echo "$original_input"
fi