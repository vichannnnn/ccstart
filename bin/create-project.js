#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectName = process.argv[2] || '.';
const targetDir = path.resolve(process.cwd(), projectName);
const templateDir = path.join(__dirname, '..', 'template');

console.log(`Creating Claude Code project in ${targetDir}...`);

if (projectName !== '.') {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
}

function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItem => {
      copyRecursive(path.join(src, childItem), path.join(dest, childItem));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

copyRecursive(templateDir, targetDir);

console.log('\n✅ Claude Code project created successfully!');
console.log('\nNext steps:');
if (projectName !== '.') {
  console.log(`  cd ${projectName}`);
}
console.log('  1. Edit CLAUDE.md to add your project-specific instructions');
console.log('  2. Update docs/ROADMAP.md with your project goals');
console.log('  3. Start creating tickets in the tickets/ directory');
console.log('  4. Create workflow files in .claude/workflows/ for multi-agent orchestration');
console.log('\nWorkflow commands:');
console.log('  ccworkflow validate <workflow.yaml>  - Validate a workflow file');
console.log('  ccworkflow run <workflow.yaml>       - Execute a workflow');
console.log('  ccworkflow list                      - List available workflows');
console.log('\nHappy coding with Claude! 🎉');