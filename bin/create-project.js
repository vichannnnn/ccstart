#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

if (fs.existsSync(path.join(targetDir, '.git'))) {
  console.log('Git repository already exists, skipping git init...');
} else {
  console.log('Initializing git repository...');
  execSync('git init', { cwd: targetDir, stdio: 'inherit' });
}

console.log('\n✅ Claude Code project created successfully!');
console.log('\nNext steps:');
if (projectName !== '.') {
  console.log(`  cd ${projectName}`);
}
console.log('  1. Edit CLAUDE.md to add your project-specific instructions');
console.log('  2. Update docs/ROADMAP.md with your project goals');
console.log('  3. Start creating tickets in the tickets/ directory');
console.log('\nHappy coding with Claude! 🎉');