#!/bin/bash
cd /Users/hima/Desktop/claude_code
rm -rf test-ccstart
git add -A
git commit -m "feat: rename package from ccsetup to ccstart

- Update package name to ccstart for better branding
- Update all documentation references
- Update bin command to use ccstart
- Update all error messages and help text
- Update .npmignore to exclude backup files
- Maintain all existing functionality

BREAKING CHANGE: Package name changed from ccsetup to ccstart.
Users will need to use 'npx ccstart' instead of 'npx ccsetup'"