#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Parse CLI arguments
const args = process.argv.slice(2);
const flags = {
  force: false,
  dryRun: false,
  help: false,
  allAgents: false,
  noAgents: false,
  agents: false,
  allSkills: false,
  noSkills: false,
  allHooks: false,
  noHooks: false
};

let projectName = '.';

// Process arguments
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--force' || arg === '-f') {
    flags.force = true;
  } else if (arg === '--dry-run' || arg === '-d') {
    flags.dryRun = true;
  } else if (arg === '--help' || arg === '-h') {
    flags.help = true;
  } else if (arg === '--all-agents') {
    flags.allAgents = true;
  } else if (arg === '--no-agents') {
    flags.noAgents = true;
  } else if (arg === '--agents') {
    flags.agents = true;
  } else if (arg === '--all-skills') {
    flags.allSkills = true;
  } else if (arg === '--no-skills') {
    flags.noSkills = true;
  } else if (arg === '--all-hooks') {
    flags.allHooks = true;
  } else if (arg === '--no-hooks') {
    flags.noHooks = true;
  } else if (!arg.startsWith('-')) {
    projectName = arg;
  }
}

// Show help if requested
if (flags.help) {
  console.log(`
Usage: ccstart [project-name] [options]

Options:
  --force, -f     Skip all prompts and overwrite existing files
  --dry-run, -d   Show what would be done without making changes
  --agents        Interactive agent selection mode
  --all-agents    Include all agents without prompting
  --no-agents     Skip agent selection entirely
  --all-skills    Include all skills without prompting
  --no-skills     Skip skill selection entirely
  --all-hooks     Include all hooks without prompting
  --no-hooks      Skip hook selection entirely
  --help, -h      Show this help message

Examples:
  ccstart                    # Create in current directory
  ccstart my-project         # Create in new directory
  ccstart . --force          # Overwrite files in current directory
  ccstart my-app --dry-run   # Preview changes without creating files
  ccstart --agents           # Interactive agent selection only
  ccstart my-app --all-agents # Include all agents automatically
  ccstart my-app --all-skills # Include all skills automatically
`);
  process.exit(0);
}

// Validate project name
function validateProjectName(name) {
  // Check for path traversal attempts
  if (name.includes('..') || path.isAbsolute(name)) {
    throw new Error('Invalid project name: Path traversal or absolute paths are not allowed');
  }
  
  // Check for invalid characters
  const invalidChars = /[<>:"|?*\0]/;
  if (invalidChars.test(name)) {
    throw new Error('Invalid project name: Contains invalid characters');
  }
  
  return true;
}

// Validate conflicting flags
if (flags.allAgents && flags.noAgents) {
  console.error('Error: Cannot use --all-agents and --no-agents together');
  process.exit(1);
}

if (flags.allSkills && flags.noSkills) {
  console.error('Error: Cannot use --all-skills and --no-skills together');
  process.exit(1);
}

if (flags.allHooks && flags.noHooks) {
  console.error('Error: Cannot use --all-hooks and --no-hooks together');
  process.exit(1);
}

// Validate the project name
if (projectName !== '.') {
  try {
    validateProjectName(projectName);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

const targetDir = path.resolve(process.cwd(), projectName);
const templateDir = path.join(__dirname, '..', 'template');

// Create readline interface only if needed
let rl = null;
if (!flags.force && !flags.dryRun) {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

function prompt(question) {
  if (!rl) {
    throw new Error('Readline interface not initialized');
  }
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.toLowerCase().trim());
    });
  });
}

function normalizeConflictStrategy(input) {
  const normalized = input.toLowerCase().trim();
  
  // Accept abbreviations and variations
  if (normalized === 's' || normalized === 'skip' || normalized === '1') return 'skip';
  if (normalized === 'r' || normalized === 'rename' || normalized === '2') return 'rename';
  if (normalized === 'o' || normalized === 'overwrite' || normalized === '3') return 'overwrite';
  
  return null;
}

// Function to validate agent files for security
function validateAgentFile(file) {
  // Ensure the file is just a basename without directory separators
  const basename = path.basename(file);
  if (file !== basename) {
    return false;
  }
  // Additional validation: ensure it's a markdown file
  if (!file.endsWith('.md')) {
    return false;
  }
  // Reject files with suspicious patterns
  if (file.includes('..') || file.includes('./') || file.includes('\\')) {
    return false;
  }
  return true;
}

// Function to check if Claude Code is installed
function checkClaudeCode() {
  const claudeDir = path.join(targetDir, '.claude');
  const claudeCodeFile = path.join(targetDir, 'claude_code.txt');
  const hasClaudeDir = fs.existsSync(claudeDir);
  const hasClaudeCodeFile = fs.existsSync(claudeCodeFile);
  
  return {
    isInstalled: hasClaudeDir || hasClaudeCodeFile,
    hasClaudeDir: hasClaudeDir,
    hasClaudeCodeFile: hasClaudeCodeFile
  };
}

// Function to initialize .claude directory structure
async function initializeClaudeDirectory(selectedAgentFiles, selectedSkillDirs, selectedHookFiles, conflictStrategy, dryRun) {
  const claudeDir = path.join(targetDir, '.claude');
  const claudeAgentsDir = path.join(claudeDir, 'agents');
  const claudeSkillsDir = path.join(claudeDir, 'skills');
  const templateClaudeDir = path.join(templateDir, '.claude');
  
  const createdItems = [];
  const skippedItems = [];
  
  try {
    // Create .claude directory
    if (!fs.existsSync(claudeDir)) {
      if (!dryRun) {
        fs.mkdirSync(claudeDir, { recursive: true });
      }
      createdItems.push('.claude/');
      if (dryRun) {
        console.log('  📁 Would create directory: .claude/');
      }
    } else {
      skippedItems.push('.claude/');
    }
    
    // Create .claude/agents directory
    if (!fs.existsSync(claudeAgentsDir)) {
      if (!dryRun) {
        fs.mkdirSync(claudeAgentsDir, { recursive: true });
      }
      createdItems.push('.claude/agents/');
      if (dryRun) {
        console.log('  📁 Would create directory: .claude/agents/');
      }
    } else {
      skippedItems.push('.claude/agents/');
    }
    
    // Copy .claude/README.md
    const claudeReadmeSrc = path.join(templateClaudeDir, 'README.md');
    const claudeReadmeDest = path.join(claudeDir, 'README.md');
    if (fs.existsSync(claudeReadmeSrc)) {
      if (!fs.existsSync(claudeReadmeDest)) {
        if (!dryRun) {
          fs.copyFileSync(claudeReadmeSrc, claudeReadmeDest);
        }
        createdItems.push('.claude/README.md');
        if (dryRun) {
          console.log('  ✨ Would copy: .claude/README.md');
        }
      } else {
        if (conflictStrategy === 'overwrite') {
          if (!dryRun) {
            fs.copyFileSync(claudeReadmeSrc, claudeReadmeDest);
          }
          if (dryRun) {
            console.log('  ♻️  Would replace: .claude/README.md');
          }
        } else if (conflictStrategy === 'rename') {
          const ext = path.extname(claudeReadmeDest);
          const baseName = path.basename(claudeReadmeDest, ext);
          const dirName = path.dirname(claudeReadmeDest);
          let newDest = path.join(dirName, `${baseName}-ccstart${ext}`);
          let counter = 1;
          while (fs.existsSync(newDest)) {
            newDest = path.join(dirName, `${baseName}-ccstart-${counter}${ext}`);
            counter++;
          }
          if (!dryRun) {
            fs.copyFileSync(claudeReadmeSrc, newDest);
          }
          const relativePath = path.relative(claudeDir, newDest);
          createdItems.push(relativePath);
          if (dryRun) {
            console.log(`  📄 Would create: ${relativePath}`);
          } else {
            console.log(`  📄 Created: ${relativePath}`);
          }
        } else {
          skippedItems.push('.claude/README.md');
          if (dryRun) {
            console.log('  ⏭️  Would skip: .claude/README.md');
          }
        }
      }
    }
    
    // Copy .claude/agents/README.md
    const agentsReadmeSrc = path.join(templateClaudeDir, 'agents', 'README.md');
    const agentsReadmeDest = path.join(claudeAgentsDir, 'README.md');
    if (fs.existsSync(agentsReadmeSrc)) {
      if (!fs.existsSync(agentsReadmeDest)) {
        if (!dryRun) {
          fs.copyFileSync(agentsReadmeSrc, agentsReadmeDest);
        }
        createdItems.push('.claude/agents/README.md');
        if (dryRun) {
          console.log('  ✨ Would copy: .claude/agents/README.md');
        }
      } else {
        if (conflictStrategy === 'overwrite') {
          if (!dryRun) {
            fs.copyFileSync(agentsReadmeSrc, agentsReadmeDest);
          }
          if (dryRun) {
            console.log('  ♻️  Would replace: .claude/agents/README.md');
          }
        } else if (conflictStrategy === 'rename') {
          const ext = path.extname(agentsReadmeDest);
          const baseName = path.basename(agentsReadmeDest, ext);
          const dirName = path.dirname(agentsReadmeDest);
          let newDest = path.join(dirName, `${baseName}-ccstart${ext}`);
          let counter = 1;
          while (fs.existsSync(newDest)) {
            newDest = path.join(dirName, `${baseName}-ccstart-${counter}${ext}`);
            counter++;
          }
          if (!dryRun) {
            fs.copyFileSync(agentsReadmeSrc, newDest);
          }
          const relativePath = path.relative(claudeDir, newDest);
          createdItems.push(relativePath);
          if (dryRun) {
            console.log(`  📄 Would create: ${relativePath}`);
          } else {
            console.log(`  📄 Created: ${relativePath}`);
          }
        } else {
          skippedItems.push('.claude/agents/README.md');
          if (dryRun) {
            console.log('  ⏭️  Would skip: .claude/agents/README.md');
          }
        }
      }
    }
    
    // Copy selected agents to .claude/agents
    const templateAgentsDir = path.join(templateDir, 'claude', 'agents');
    let copiedAgents = 0;
    let skippedAgents = 0;
    
    for (const agentFile of selectedAgentFiles) {
      // Validate agent file before processing
      if (!validateAgentFile(agentFile)) {
        console.warn(`⚠️  Skipping invalid agent file: ${agentFile}`);
        continue;
      }
      
      // Use basename to ensure safety
      const safeAgentFile = path.basename(agentFile);
      const agentSrc = path.join(templateAgentsDir, safeAgentFile);
      const agentDest = path.join(claudeAgentsDir, safeAgentFile);
      
      // Additional validation: ensure source is within template directory
      const normalizedAgentSrc = path.normalize(agentSrc);
      const normalizedTemplateAgentsDir = path.normalize(templateAgentsDir);
      if (!normalizedAgentSrc.startsWith(normalizedTemplateAgentsDir)) {
        console.warn(`⚠️  Skipping agent file outside template directory: ${agentFile}`);
        continue;
      }
      
      if (fs.existsSync(agentSrc)) {
        if (!fs.existsSync(agentDest)) {
          if (!dryRun) {
            fs.copyFileSync(agentSrc, agentDest);
          }
          copiedAgents++;
          createdItems.push(`.claude/agents/${safeAgentFile}`);
          if (dryRun) {
            console.log(`  ✨ Would copy: .claude/agents/${safeAgentFile}`);
          }
        } else {
          if (conflictStrategy === 'overwrite') {
            if (!dryRun) {
              fs.copyFileSync(agentSrc, agentDest);
            }
            copiedAgents++;
            if (dryRun) {
              console.log(`  ♻️  Would replace: .claude/agents/${safeAgentFile}`);
            }
          } else if (conflictStrategy === 'rename') {
            const ext = path.extname(agentDest);
            const baseName = path.basename(agentDest, ext);
            const dirName = path.dirname(agentDest);
            let newDest = path.join(dirName, `${baseName}-ccstart${ext}`);
            let counter = 1;
            while (fs.existsSync(newDest)) {
              newDest = path.join(dirName, `${baseName}-ccstart-${counter}${ext}`);
              counter++;
            }
            if (!dryRun) {
              fs.copyFileSync(agentSrc, newDest);
            }
            copiedAgents++;
            const relativePath = path.relative(claudeDir, newDest);
            createdItems.push(relativePath);
            if (dryRun) {
              console.log(`  📄 Would create: ${relativePath}`);
            } else {
              console.log(`  📄 Created: ${relativePath}`);
            }
          } else {
            skippedAgents++;
            skippedItems.push(`.claude/agents/${safeAgentFile}`);
            if (dryRun) {
              console.log(`  ⏭️  Would skip: .claude/agents/${safeAgentFile}`);
            }
          }
        }
      }
    }

    // Create .claude/skills directory
    if (!fs.existsSync(claudeSkillsDir)) {
      if (!dryRun) {
        fs.mkdirSync(claudeSkillsDir, { recursive: true });
      }
      createdItems.push('.claude/skills/');
      if (dryRun) {
        console.log('  📁 Would create directory: .claude/skills/');
      }
    } else {
      skippedItems.push('.claude/skills/');
    }

    // Copy selected skills to .claude/skills (copy entire directories)
    const templateSkillsDir = path.join(templateDir, 'claude', 'skills');
    let copiedSkills = 0;
    let skippedSkillsCount = 0;

    function copyDirRecursive(src, dest) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      const entries = fs.readdirSync(src, { withFileTypes: true });
      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
          copyDirRecursive(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    }

    for (const skillDir of selectedSkillDirs) {
      if (!validateSkillDir(skillDir)) {
        console.warn(`⚠️  Skipping invalid skill directory: ${skillDir}`);
        continue;
      }

      const safeSkillDir = path.basename(skillDir);
      const skillSrc = path.join(templateSkillsDir, safeSkillDir);
      const skillDest = path.join(claudeSkillsDir, safeSkillDir);

      const normalizedSkillSrc = path.normalize(skillSrc);
      const normalizedTemplateSkillsDir = path.normalize(templateSkillsDir);
      if (!normalizedSkillSrc.startsWith(normalizedTemplateSkillsDir)) {
        console.warn(`⚠️  Skipping skill directory outside template directory: ${skillDir}`);
        continue;
      }

      if (fs.existsSync(skillSrc) && fs.statSync(skillSrc).isDirectory()) {
        if (!fs.existsSync(skillDest)) {
          if (!dryRun) {
            copyDirRecursive(skillSrc, skillDest);
          }
          copiedSkills++;
          createdItems.push(`.claude/skills/${safeSkillDir}/`);
          if (dryRun) {
            console.log(`  ✨ Would copy: .claude/skills/${safeSkillDir}/`);
          }
        } else {
          if (conflictStrategy === 'overwrite') {
            if (!dryRun) {
              copyDirRecursive(skillSrc, skillDest);
            }
            copiedSkills++;
            if (dryRun) {
              console.log(`  ♻️  Would replace: .claude/skills/${safeSkillDir}/`);
            }
          } else if (conflictStrategy === 'rename') {
            let newDest = path.join(claudeSkillsDir, `${safeSkillDir}-ccstart`);
            let counter = 1;
            while (fs.existsSync(newDest)) {
              newDest = path.join(claudeSkillsDir, `${safeSkillDir}-ccstart-${counter}`);
              counter++;
            }
            if (!dryRun) {
              copyDirRecursive(skillSrc, newDest);
            }
            copiedSkills++;
            const relativePath = path.relative(claudeDir, newDest);
            createdItems.push(`${relativePath}/`);
            if (dryRun) {
              console.log(`  📄 Would create: ${relativePath}/`);
            } else {
              console.log(`  📄 Created: ${relativePath}/`);
            }
          } else {
            skippedSkillsCount++;
            skippedItems.push(`.claude/skills/${safeSkillDir}/`);
            if (dryRun) {
              console.log(`  ⏭️  Would skip: .claude/skills/${safeSkillDir}/`);
            }
          }
        }
      }
    }

    // Copy .claude/commands directory
    const claudeCommandsDir = path.join(claudeDir, 'commands');
    const templateCommandsDir = path.join(templateDir, '.claude', 'commands');
    
    if (fs.existsSync(templateCommandsDir)) {
      // Create .claude/commands directory
      if (!fs.existsSync(claudeCommandsDir)) {
        if (!dryRun) {
          fs.mkdirSync(claudeCommandsDir, { recursive: true });
        }
        createdItems.push('.claude/commands/');
        if (dryRun) {
          console.log('  📁 Would create directory: .claude/commands/');
        }
      }
      
      // Copy all files from template commands directory
      const commandFiles = fs.readdirSync(templateCommandsDir);
      for (const commandFile of commandFiles) {
        const commandSrc = path.join(templateCommandsDir, commandFile);
        const commandDest = path.join(claudeCommandsDir, commandFile);
        
        if (fs.statSync(commandSrc).isFile()) {
          if (!fs.existsSync(commandDest)) {
            if (!dryRun) {
              fs.copyFileSync(commandSrc, commandDest);
            }
            createdItems.push(`.claude/commands/${commandFile}`);
            if (dryRun) {
              console.log(`  ✨ Would copy: .claude/commands/${commandFile}`);
            }
          } else {
            if (conflictStrategy === 'overwrite') {
              if (!dryRun) {
                fs.copyFileSync(commandSrc, commandDest);
              }
              if (dryRun) {
                console.log(`  ♻️  Would replace: .claude/commands/${commandFile}`);
              }
            } else if (conflictStrategy === 'rename') {
              const ext = path.extname(commandFile);
              const baseName = path.basename(commandFile, ext);
              let newDest = path.join(claudeCommandsDir, `${baseName}-ccstart${ext}`);
              let counter = 1;
              while (fs.existsSync(newDest)) {
                newDest = path.join(claudeCommandsDir, `${baseName}-ccstart-${counter}${ext}`);
                counter++;
              }
              if (!dryRun) {
                fs.copyFileSync(commandSrc, newDest);
              }
              const relativePath = path.relative(claudeDir, newDest);
              createdItems.push(relativePath);
              if (dryRun) {
                console.log(`  📄 Would create: ${relativePath}`);
              }
            } else {
              skippedItems.push(`.claude/commands/${commandFile}`);
              if (dryRun) {
                console.log(`  ⏭️  Would skip: .claude/commands/${commandFile}`);
              }
            }
          }
        }
      }
    }
    
    // Copy .claude/hooks directory
    const claudeHooksDir = path.join(claudeDir, 'hooks');
    const templateHooksDir = path.join(templateDir, 'hooks');
    
    if (fs.existsSync(templateHooksDir)) {
      // Create .claude/hooks directory
      if (!fs.existsSync(claudeHooksDir)) {
        if (!dryRun) {
          fs.mkdirSync(claudeHooksDir, { recursive: true });
        }
        createdItems.push('.claude/hooks/');
        if (dryRun) {
          console.log('  📁 Would create directory: .claude/hooks/');
        }
      }
      
      // Copy all files from template hooks directory
      const hookFiles = fs.readdirSync(templateHooksDir);
      for (const hookFile of hookFiles) {
        const hookSrc = path.join(templateHooksDir, hookFile);
        const hookDest = path.join(claudeHooksDir, hookFile);
        
        if (fs.statSync(hookSrc).isFile()) {
          if (!fs.existsSync(hookDest)) {
            if (!dryRun) {
              fs.copyFileSync(hookSrc, hookDest);
              // Make shell scripts executable
              if (hookFile.endsWith('.sh')) {
                fs.chmodSync(hookDest, '755');
              }
            }
            createdItems.push(`.claude/hooks/${hookFile}`);
            if (dryRun) {
              console.log(`  ✨ Would copy: .claude/hooks/${hookFile}`);
            }
          } else {
            if (conflictStrategy === 'overwrite') {
              if (!dryRun) {
                fs.copyFileSync(hookSrc, hookDest);
                if (hookFile.endsWith('.sh')) {
                  fs.chmodSync(hookDest, '755');
                }
              }
              if (dryRun) {
                console.log(`  ♻️  Would replace: .claude/hooks/${hookFile}`);
              }
            } else if (conflictStrategy === 'rename') {
              const ext = path.extname(hookFile);
              const baseName = path.basename(hookFile, ext);
              let newDest = path.join(claudeHooksDir, `${baseName}-ccstart${ext}`);
              let counter = 1;
              while (fs.existsSync(newDest)) {
                newDest = path.join(claudeHooksDir, `${baseName}-ccstart-${counter}${ext}`);
                counter++;
              }
              if (!dryRun) {
                fs.copyFileSync(hookSrc, newDest);
                if (newDest.endsWith('.sh')) {
                  fs.chmodSync(newDest, '755');
                }
              }
              const relativePath = path.relative(claudeDir, newDest);
              createdItems.push(relativePath);
              if (dryRun) {
                console.log(`  📄 Would create: ${relativePath}`);
              }
            } else {
              skippedItems.push(`.claude/hooks/${hookFile}`);
              if (dryRun) {
                console.log(`  ⏭️  Would skip: .claude/hooks/${hookFile}`);
              }
            }
          }
        }
      }
    }
    
    // Copy settings.json.example if it doesn't exist
    const settingsExampleSrc = path.join(templateDir, 'settings.json.example');
    const settingsExampleDest = path.join(claudeDir, 'settings.json.example');
    
    if (fs.existsSync(settingsExampleSrc) && !fs.existsSync(settingsExampleDest)) {
      if (!dryRun) {
        fs.copyFileSync(settingsExampleSrc, settingsExampleDest);
      }
      createdItems.push('.claude/settings.json.example');
      if (dryRun) {
        console.log('  ✨ Would copy: .claude/settings.json.example');
      }
    }
    
    // Also create settings.json from the example if it doesn't exist
    const settingsJsonDest = path.join(claudeDir, 'settings.json');
    if (fs.existsSync(settingsExampleSrc) && !fs.existsSync(settingsJsonDest)) {
      if (!dryRun) {
        fs.copyFileSync(settingsExampleSrc, settingsJsonDest);
      }
      createdItems.push('.claude/settings.json');
      if (dryRun) {
        console.log('  ✨ Would create: .claude/settings.json (with hooks enabled)');
      }
    }
    
    return {
      createdItems,
      skippedItems,
      copiedAgents,
      skippedAgents,
      copiedSkills,
      skippedSkillsCount
    };
    
  } catch (error) {
    throw new Error(`Failed to initialize .claude directory: ${error.message}`);
  }
}

// Function to parse agent frontmatter
function parseAgentFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    // Find the start of frontmatter (---) within the first 5 lines
    // This handles: markdown files, shell scripts with shebang, heredoc wrappers
    let startIndex = -1;
    const maxSearchLines = Math.min(5, lines.length);
    for (let i = 0; i < maxSearchLines; i++) {
      if (lines[i] === '---') {
        startIndex = i;
        break;
      }
    }

    if (startIndex === -1) {
      return null;
    }

    let name = '';
    let description = '';
    let inFrontmatter = true;
    let lineIndex = startIndex + 1;

    while (lineIndex < lines.length && inFrontmatter) {
      const line = lines[lineIndex];
      if (line === '---') {
        inFrontmatter = false;
      } else if (line.startsWith('name:')) {
        name = line.substring(5).trim();
      } else if (line.startsWith('description:')) {
        description = line.substring(12).trim();
      }
      lineIndex++;
    }

    return { name, description };
  } catch (error) {
    return null;
  }
}

// Function to get available agents
function getAvailableAgents() {
  const agentsDir = path.join(templateDir, 'claude', 'agents');
  const agents = [];
  
  try {
    const files = fs.readdirSync(agentsDir);
    for (const file of files) {
      if (file.endsWith('.md') && file !== 'README.md') {
        const filePath = path.join(agentsDir, file);
        const metadata = parseAgentFrontmatter(filePath);
        if (metadata && metadata.name) {
          agents.push({
            file,
            name: metadata.name,
            description: metadata.description || 'No description available'
          });
        }
      }
    }
  } catch (error) {
    console.error('Warning: Could not read agents directory:', error.message);
  }
  
  return agents.sort((a, b) => a.name.localeCompare(b.name));
}

// Function to validate skill directories for security
function validateSkillDir(dir) {
  const basename = path.basename(dir);
  if (dir !== basename) {
    return false;
  }
  if (dir.includes('..') || dir.includes('./') || dir.includes('\\')) {
    return false;
  }
  return true;
}

// Function to get available skills
function getAvailableSkills() {
  const skillsDir = path.join(templateDir, 'claude', 'skills');
  const skills = [];

  try {
    const dirs = fs.readdirSync(skillsDir);
    for (const dir of dirs) {
      const skillDirPath = path.join(skillsDir, dir);
      if (fs.statSync(skillDirPath).isDirectory()) {
        const skillFiles = fs.readdirSync(skillDirPath);
        const skillMdFile = skillFiles.find(f => f.toLowerCase() === 'skill.md');
        if (skillMdFile) {
          const filePath = path.join(skillDirPath, skillMdFile);
          const metadata = parseAgentFrontmatter(filePath);
          if (metadata && metadata.name) {
            skills.push({
              dir,
              name: metadata.name,
              description: metadata.description || 'No description available'
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Warning: Could not read skills directory:', error.message);
  }

  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

// Function to get available hooks
function getAvailableHooks() {
  const hooksDir = path.join(templateDir, 'hooks');
  const hooks = [];

  try {
    if (!fs.existsSync(hooksDir)) {
      return hooks;
    }
    const files = fs.readdirSync(hooksDir);
    for (const file of files) {
      if (file === 'README.md' || file.startsWith('.')) {
        continue;
      }
      const filePath = path.join(hooksDir, file);
      if (fs.statSync(filePath).isFile()) {
        const metadata = parseAgentFrontmatter(filePath);
        hooks.push({
          file,
          name: metadata && metadata.name ? metadata.name : file.replace(/\.[^.]+$/, ''),
          description: metadata && metadata.description ? metadata.description : 'No description available'
        });
      }
    }
  } catch (error) {
    console.error('Warning: Could not read hooks directory:', error.message);
  }

  return hooks.sort((a, b) => a.name.localeCompare(b.name));
}

// Dynamic import for ESM module
async function importCheckbox() {
  try {
    const module = await import('@inquirer/checkbox');
    return module.default;
  } catch (error) {
    console.error('Error: Failed to load @inquirer/checkbox. Please ensure it is installed.');
    console.error('Run: npm install @inquirer/checkbox');
    process.exit(1);
  }
}

async function selectAgents(availableAgents) {
  const checkbox = await importCheckbox();
  
  // ANSI color codes
  const colors = {
    cyan: '\x1b[36m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    reset: '\x1b[0m'
  };
  
  const choices = availableAgents.map(agent => ({
    name: `${colors.cyan}${colors.bold}${agent.name}${colors.reset}\n     ${colors.dim}${agent.description}${colors.reset}`,
    value: agent.file,
    checked: false
  }));
  
  console.log('\n🤖 Select agents to include in your Claude Code project\n');
  console.log(`${colors.dim}Agents run in separate context windows with their own conversation history,${colors.reset}`);
  console.log(`${colors.dim}ideal for specialized tasks that don't need your main session context.${colors.reset}\n`);
  console.log(`${colors.dim}Use arrow keys to navigate, space to select, <a> to toggle all${colors.reset}\n`);

  const selectedFiles = await checkbox({
    message: `${colors.bold}Choose your agents:${colors.reset}`,
    choices,
    pageSize: 10,
    loop: false
  });

  const filesToProcess = selectedFiles;

  // Validate selected files to prevent path traversal
  const validatedFiles = filesToProcess.filter(file => {
    // Use centralized validation function
    if (!validateAgentFile(file)) {
      console.warn(`⚠️  Skipping invalid agent file: ${file}`);
      return false;
    }
    // Ensure it exists in available agents
    if (!availableAgents.some(agent => agent.file === file)) {
      console.warn(`⚠️  Skipping unknown agent file: ${file}`);
      return false;
    }
    return true;
  });

  return validatedFiles;
}

async function selectSkills(availableSkills) {
  const checkbox = await importCheckbox();

  const colors = {
    cyan: '\x1b[36m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    reset: '\x1b[0m'
  };

  const choices = availableSkills.map(skill => ({
    name: `${colors.magenta}${colors.bold}${skill.name}${colors.reset}\n     ${colors.dim}${skill.description}${colors.reset}`,
    value: skill.dir,
    checked: false
  }));

  console.log('\n⚡ Select skills to include in your Claude Code project\n');
  console.log(`${colors.dim}Think of skills as macros - best suited for repetitive actions like${colors.reset}`);
  console.log(`${colors.dim}committing code, creating PRs, or generating tickets.${colors.reset}\n`);
  console.log(`${colors.dim}Use arrow keys to navigate, space to select, <a> to toggle all${colors.reset}\n`);

  const selectedDirs = await checkbox({
    message: `${colors.bold}Choose your skills:${colors.reset}`,
    choices,
    pageSize: 10,
    loop: false
  });

  const dirsToProcess = selectedDirs;

  const validatedDirs = dirsToProcess.filter(dir => {
    if (!validateSkillDir(dir)) {
      console.warn(`⚠️  Skipping invalid skill directory: ${dir}`);
      return false;
    }
    if (!availableSkills.some(skill => skill.dir === dir)) {
      console.warn(`⚠️  Skipping unknown skill directory: ${dir}`);
      return false;
    }
    return true;
  });

  return validatedDirs;
}

async function selectHooks(availableHooks) {
  const checkbox = await importCheckbox();

  const colors = {
    cyan: '\x1b[36m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    reset: '\x1b[0m'
  };

  const choices = availableHooks.map(hook => ({
    name: `${colors.yellow}${colors.bold}${hook.name}${colors.reset}\n     ${colors.dim}${hook.description}${colors.reset}`,
    value: hook.file,
    checked: false
  }));

  console.log('\n🪝 Select hooks to include in your Claude Code project\n');
  console.log(`${colors.dim}Hooks are shell scripts that run automatically before or after${colors.reset}`);
  console.log(`${colors.dim}Claude Code actions, enabling custom validation and workflows.${colors.reset}\n`);
  console.log(`${colors.dim}Use arrow keys to navigate, space to select, <a> to toggle all${colors.reset}\n`);

  const selectedFiles = await checkbox({
    message: `${colors.bold}Choose your hooks:${colors.reset}`,
    choices,
    pageSize: 10,
    loop: false
  });

  const filesToProcess = selectedFiles;

  const validatedFiles = filesToProcess.filter(file => {
    if (!availableHooks.some(hook => hook.file === file)) {
      console.warn(`⚠️  Skipping unknown hook file: ${file}`);
      return false;
    }
    return true;
  });

  return validatedFiles;
}

async function main() {
  try {
    // Ensure template directory exists
    if (!fs.existsSync(templateDir)) {
      throw new Error(`Template directory not found: ${templateDir}`);
    }

    // Handle --agents flag for agent selection only
    if (flags.agents) {
      console.log('🤖 Interactive Agent Selection\n');
      const availableAgents = getAvailableAgents();
      
      if (availableAgents.length === 0) {
        console.log('No agents available for selection.');
        process.exit(0);
      }
      
      // Perform interactive selection
      const selectedAgentFiles = await selectAgents(availableAgents);
      
      if (selectedAgentFiles.length === 0) {
        console.log('\n❌ No agents selected.');
      } else {
        // ANSI color codes
        const colors = {
          cyan: '\x1b[36m',
          green: '\x1b[32m',
          yellow: '\x1b[33m',
          bold: '\x1b[1m',
          dim: '\x1b[2m',
          reset: '\x1b[0m'
        };
        
        console.log(`\n${colors.green}${colors.bold}✅ You selected ${selectedAgentFiles.length} agent${selectedAgentFiles.length === 1 ? '' : 's'}:${colors.reset}\n`);
        
        // Show selected agents with descriptions
        selectedAgentFiles.forEach(file => {
          const agent = availableAgents.find(a => a.file === file);
          if (agent) {
            console.log(`  ${colors.cyan}${colors.bold}${agent.name}${colors.reset}`);
            console.log(`     ${colors.dim}${agent.description}${colors.reset}\n`);
          }
        });
        
        console.log(`${colors.yellow}${colors.bold}📝 Next Steps:${colors.reset}`);
        console.log(`${colors.dim}1. Make sure Claude Code is initialized: ${colors.reset}${colors.cyan}claude init${colors.reset}`);
        console.log(`${colors.dim}2. Run: ${colors.reset}${colors.cyan}npx ccstart${colors.reset}`);
        console.log(`${colors.dim}3. Select the same agents when prompted${colors.reset}\n`);
      }
      
      process.exit(0);
    }

    // Additional path validation
    const normalizedTarget = path.normalize(targetDir);
    const normalizedCwd = path.normalize(process.cwd());
    
    // Ensure target is within or equal to cwd for safety
    if (projectName !== '.' && !normalizedTarget.startsWith(normalizedCwd)) {
      throw new Error('Target directory must be within the current working directory');
    }

    if (flags.dryRun) {
      console.log('🔍 DRY RUN MODE - No files will be created or modified\n');
    }

    // Check for Claude Code installation
    const claudeStatus = checkClaudeCode();
    if (projectName === '.') {
      if (flags.dryRun) {
        console.log('⚠️  Note: Claude Code detection skipped in dry-run mode for current directory\n');
      } else if (!claudeStatus.isInstalled && !claudeStatus.hasClaudeDir) {
        // Offer to create .claude directory
        if (flags.force) {
          console.log('📁 Creating .claude directory structure...\n');
        } else {
          console.log('⚠️  Claude Code not detected in this project.');
          console.log('ccstart can create the .claude directory structure for you.\n');
          const answer = await prompt('Would you like to create .claude directory? (yes/no): ');
          if (answer !== 'yes') {
            console.log('\nTo manually initialize Claude Code:');
            console.log('1. Install Claude Code CLI: https://docs.anthropic.com/claude-code/quickstart');
            console.log('2. Run \'claude init\' in your project directory');
            console.log('3. Then run \'npx ccstart\' again\n');
            console.log('Aborting setup.');
            if (rl) rl.close();
            process.exit(0);
          }
          console.log('');
        }
      }
    }

    // Escape targetDir for safe display
    const safeTargetDir = targetDir.replace(/[^\w\s\-./\\:]/g, '');
    console.log(`${flags.dryRun ? 'Would create' : 'Creating'} Claude Code project in ${safeTargetDir}...`);

    if (projectName !== '.') {
      if (!fs.existsSync(targetDir)) {
        if (!flags.dryRun) {
          try {
            fs.mkdirSync(targetDir, { recursive: true });
          } catch (error) {
            if (error.code === 'EACCES') {
              throw new Error(`Permission denied: Cannot create directory ${targetDir}`);
            } else if (error.code === 'ENOSPC') {
              throw new Error('No space left on device');
            }
            throw error;
          }
        } else {
          console.log(`Would create directory: ${targetDir}`);
        }
      }

      // Check Claude Code in new directory after creation
      const newDirClaudeStatus = checkClaudeCode();
      if (!flags.dryRun && !newDirClaudeStatus.isInstalled) {
        console.log('\n⚠️  Note: Claude Code is not initialized in the new project directory.');
        console.log('After setup, remember to:');
        console.log(`1. cd ${JSON.stringify(projectName)}`);
        console.log('2. Run \'claude init\' to initialize Claude Code\n');
      }
    }

  const fileConflicts = [];
  const dirConflicts = [];
  const allItems = [];
  
  // Group conflicts by category
  const conflictsByCategory = {
    'CLAUDE.md': [],
    'claude': [],
    'agents': [],
    'docs': [],
    'tickets': []
  };

  // Store conflict strategies per category
  const conflictStrategies = {
    'CLAUDE.md': 'skip',
    'claude': 'skip',
    'agents': 'skip',
    'docs': 'skip',
    'tickets': 'skip'
  };

  // Get available agents for selection
  const availableAgents = getAvailableAgents();
  let selectedAgentFiles = [];
  

  // Determine which agents to include
  if (flags.noAgents) {
    selectedAgentFiles = [];
    console.log('\n⏭️  Skipping agent selection (--no-agents flag)');
  } else if (flags.allAgents) {
    selectedAgentFiles = availableAgents.map(a => a.file).filter(validateAgentFile);
    console.log(`\n✅ Including all ${selectedAgentFiles.length} agents (--all-agents flag)`);
  } else {
    if (rl) {
      rl.close();
      rl = null;
    }

    selectedAgentFiles = await selectAgents(availableAgents);
    console.log(`\n✅ Selected ${selectedAgentFiles.length} agent${selectedAgentFiles.length === 1 ? '' : 's'}`);

    if (!flags.force && !flags.dryRun) {
      rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    }
  }

  // Get available skills for selection
  const availableSkills = getAvailableSkills();
  let selectedSkillDirs = [];

  // Determine which skills to include
  if (flags.noSkills) {
    selectedSkillDirs = [];
    console.log('⏭️  Skipping skill selection (--no-skills flag)');
  } else if (flags.allSkills) {
    selectedSkillDirs = availableSkills.map(s => s.dir).filter(validateSkillDir);
    console.log(`✅ Including all ${selectedSkillDirs.length} skills (--all-skills flag)`);
  } else {
    if (rl) {
      rl.close();
      rl = null;
    }

    selectedSkillDirs = await selectSkills(availableSkills);
    console.log(`\n✅ Selected ${selectedSkillDirs.length} skill${selectedSkillDirs.length === 1 ? '' : 's'}`);

    if (!flags.force && !flags.dryRun) {
      rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    }
  }

  // Get available hooks for selection
  const availableHooks = getAvailableHooks();
  let selectedHookFiles = [];

  // Determine which hooks to include
  if (flags.noHooks) {
    selectedHookFiles = [];
    console.log('⏭️  Skipping hook selection (--no-hooks flag)');
  } else if (flags.allHooks) {
    selectedHookFiles = availableHooks.map(h => h.file);
    console.log(`✅ Including all ${selectedHookFiles.length} hooks (--all-hooks flag)`);
  } else if (availableHooks.length === 0) {
    console.log('\n📝 No hooks available yet');
    selectedHookFiles = [];
  } else {
    if (rl) {
      rl.close();
      rl = null;
    }

    selectedHookFiles = await selectHooks(availableHooks);
    console.log(`\n✅ Selected ${selectedHookFiles.length} hook${selectedHookFiles.length === 1 ? '' : 's'}`);

    if (!flags.force && !flags.dryRun) {
      rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    }
  }

  function scanTemplate(src, dest, relativePath = '') {
    try {
      // Validate paths to prevent traversal
      const normalizedSrc = path.normalize(src);
      const normalizedDest = path.normalize(dest);
      
      if (!normalizedSrc.startsWith(path.normalize(templateDir))) {
        throw new Error('Source path escapes template directory');
      }
      
      if (!normalizedDest.startsWith(path.normalize(targetDir))) {
        throw new Error('Destination path escapes target directory');
      }
      
      const exists = fs.existsSync(src);
      const stats = exists && fs.statSync(src);
      const isDirectory = exists && stats.isDirectory();
      
      if (isDirectory) {
        // Skip .claude directory as it will be handled separately
        if (path.basename(src) === '.claude') {
          return; // Don't process .claude directory in regular template scan
        }
        
        // Handle claude directory specially
        if (path.basename(src) === 'claude') {
          // Add the claude directory
          allItems.push({ 
            src, 
            dest, 
            type: 'directory',
            relativePath,
            exists: fs.existsSync(dest) 
          });
          
          if (fs.existsSync(dest)) {
            dirConflicts.push(relativePath || '.');
            conflictsByCategory['claude'].push(relativePath);
          }
          
          // Process claude subdirectories - only tickets now (agents and skills go to .claude/)
          const claudeSubdirs = ['tickets'];
          claudeSubdirs.forEach(subdir => {
            const subdirSrc = path.join(src, subdir);
            const subdirDest = path.join(dest, subdir);
            const subdirRelPath = path.join(relativePath, subdir);

            if (fs.existsSync(subdirSrc)) {
              scanTemplate(subdirSrc, subdirDest, subdirRelPath);
            }
          });

          // Note: skills are now only copied to .claude/skills/ via initializeClaudeDirectory

          // Note: agents are now only copied to .claude/agents/ via initializeClaudeDirectory

          // Handle CLAUDE.md from claude directory - it goes to root
          const claudeMdSrc = path.join(src, 'CLAUDE.md');
          const claudeMdDest = path.join(targetDir, 'CLAUDE.md'); // Note: goes to root
          if (fs.existsSync(claudeMdSrc)) {
            allItems.push({
              src: claudeMdSrc,
              dest: claudeMdDest,
              type: 'file',
              relativePath: 'CLAUDE.md',
              exists: fs.existsSync(claudeMdDest),
              isClaudeMdReplacement: true
            });
            
            if (fs.existsSync(claudeMdDest)) {
              fileConflicts.push('CLAUDE.md');
              conflictsByCategory['CLAUDE.md'].push('CLAUDE.md');
            }
          }
          
          return; // Don't recurse into claude directory subdirs as we handled them above
        }
        
        allItems.push({ 
          src, 
          dest, 
          type: 'directory',
          relativePath,
          exists: fs.existsSync(dest) 
        });
        
        if (fs.existsSync(dest)) {
          dirConflicts.push(relativePath || '.');
        }
        
        fs.readdirSync(src).forEach(childItem => {
          scanTemplate(
            path.join(src, childItem), 
            path.join(dest, childItem),
            path.join(relativePath, childItem)
          );
        });
      } else {
        allItems.push({ 
          src, 
          dest, 
          type: 'file',
          relativePath,
          exists: fs.existsSync(dest) 
        });
        
        if (fs.existsSync(dest)) {
          fileConflicts.push(relativePath);
          
          // Categorize the conflict
          if (relativePath === 'CLAUDE.md') {
            conflictsByCategory['CLAUDE.md'].push(relativePath);
          } else if (relativePath.startsWith('claude/agents/')) {
            conflictsByCategory['agents'].push(relativePath);
          } else if (relativePath.startsWith('claude/docs/')) {
            conflictsByCategory['docs'].push(relativePath);
          } else if (relativePath.startsWith('claude/skills/')) {
            conflictsByCategory['docs'].push(relativePath);
          } else if (relativePath.startsWith('claude/tickets/')) {
            conflictsByCategory['tickets'].push(relativePath);
          }
        }
      }
    } catch (error) {
      throw new Error(`Error scanning template: ${error.message}`);
    }
  }

  scanTemplate(templateDir, targetDir, '');

  // Handle force flag
  if (flags.force) {
    // Set all strategies to overwrite
    Object.keys(conflictStrategies).forEach(key => {
      conflictStrategies[key] = 'overwrite';
    });
    if (fileConflicts.length > 0 || dirConflicts.length > 0) {
      console.log('\n⚠️  Force mode enabled - existing files will be overwritten');
    }
  } else {
    // Show conflicts if not in force mode
    if (dirConflicts.length > 0) {
      console.log('\n⚠️  The following directories already exist:');
      dirConflicts.forEach(dir => console.log(`  - ${dir}/`));
    }

    if (fileConflicts.length > 0) {
      console.log('\n⚠️  File conflicts detected. You will be asked how to handle each category.');
      
      if (!flags.dryRun) {
        // Ask for resolution strategy for each category with conflicts
        const categories = [
          { key: 'CLAUDE.md', name: 'CLAUDE.md', emoji: '📄' },
          { key: 'claude', name: 'Claude Directory', emoji: '📁' },
          { key: 'agents', name: 'Agents', emoji: '🤖' },
          { key: 'docs', name: 'Documentation', emoji: '📚' },
          { key: 'tickets', name: 'Tickets', emoji: '🎫' }
        ];
        
        for (const category of categories) {
          if (conflictsByCategory[category.key].length > 0) {
            console.log(`\n${category.emoji} ${category.name} conflicts:`);
            conflictsByCategory[category.key].forEach(file => console.log(`  - ${file}`));
            
            console.log('\nConflict resolution options:');
            console.log('  1) skip      (s) - Keep your existing files');
            console.log('  2) rename    (r) - Save template files with -ccstart suffix');
            console.log('  3) overwrite (o) - Replace with template versions');
            
            const userInput = await prompt(`Your choice for ${category.name} [s/r/o]: `);
            const strategy = normalizeConflictStrategy(userInput);
            
            if (!strategy) {
              console.log(`\n❌ Invalid option: "${userInput}". Please use: skip/s/1, rename/r/2, or overwrite/o/3`);
              if (rl) rl.close();
              process.exit(1);
            }
            
            if (strategy === 'overwrite' && category.key === 'CLAUDE.md') {
              const confirm = await prompt('⚠️  Are you sure you want to overwrite CLAUDE.md? This will replace your existing project instructions with the ccstart template! (yes/no): ');
              if (confirm !== 'yes') {
                conflictStrategies[category.key] = 'skip';
                console.log('Keeping existing CLAUDE.md');
                continue;
              }
            }
            
            conflictStrategies[category.key] = strategy;
          }
        }
      }
    }
  }

  console.log(`\n✨ ${flags.dryRun ? 'Would apply' : 'Applying'} conflict resolution strategies...`);
  
  let skippedCount = 0;
  let copiedCount = 0;
  let renamedCount = 0;
  let overwrittenCount = 0;
  
  // Helper function to copy directories recursively
  function copyDirRecursiveSync(src, dest) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        copyDirRecursiveSync(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  for (const item of allItems) {
    try {
      if (item.type === 'directory') {
        if (!item.exists && !fs.existsSync(item.dest)) {
          if (!flags.dryRun) {
            fs.mkdirSync(item.dest, { recursive: true });
          } else {
            console.log(`  📁 Would create directory: ${item.relativePath || '.'}/`);
          }
        }
      } else if (item.type === 'skill-directory') {
        // Handle skill directory (copy entire directory)
        let strategy = 'skip';
        if (item.relativePath.startsWith('claude/skills/')) {
          strategy = conflictStrategies['docs'];
        }

        if (item.exists) {
          if (strategy === 'skip') {
            skippedCount++;
            if (flags.dryRun) {
              console.log(`  ⏭️  Would skip: ${item.relativePath}/`);
            }
            continue;
          } else if (strategy === 'rename') {
            let newDest = `${item.dest}-ccstart`;
            let counter = 1;
            while (fs.existsSync(newDest)) {
              newDest = `${item.dest}-ccstart-${counter}`;
              counter++;
            }
            if (!flags.dryRun) {
              copyDirRecursiveSync(item.src, newDest);
            }
            renamedCount++;
            console.log(`  📄 ${flags.dryRun ? 'Would create' : 'Created'}: ${path.relative(targetDir, newDest)}/`);
          } else if (strategy === 'overwrite') {
            if (!flags.dryRun) {
              copyDirRecursiveSync(item.src, item.dest);
            }
            overwrittenCount++;
            console.log(`  ♻️  ${flags.dryRun ? 'Would replace' : 'Replaced'}: ${item.relativePath}/`);
          }
        } else {
          if (!flags.dryRun) {
            copyDirRecursiveSync(item.src, item.dest);
          } else {
            console.log(`  ✨ Would copy: ${item.relativePath}/`);
          }
          copiedCount++;
        }
      } else {
        if (item.exists) {
          // Determine which category this file belongs to
          let strategy = 'skip'; // default
          if (item.relativePath === 'CLAUDE.md' || item.isClaudeMdReplacement) {
            strategy = conflictStrategies['CLAUDE.md'];
          } else if (item.relativePath.startsWith('claude/')) {
            if (item.relativePath.startsWith('claude/agents/')) {
              strategy = conflictStrategies['agents'];
            } else if (item.relativePath.startsWith('claude/docs/')) {
              strategy = conflictStrategies['docs'];
            } else if (item.relativePath.startsWith('claude/skills/')) {
              strategy = conflictStrategies['docs'];
            } else if (item.relativePath.startsWith('claude/tickets/')) {
              strategy = conflictStrategies['tickets'];
            } else {
              strategy = conflictStrategies['claude'];
            }
          }
          
          if (strategy === 'skip') {
            skippedCount++;
            if (flags.dryRun) {
              console.log(`  ⏭️  Would skip: ${item.relativePath}`);
            }
            continue;
          } else if (strategy === 'rename') {
            const ext = path.extname(item.dest);
            const baseName = path.basename(item.dest, ext);
            const dirName = path.dirname(item.dest);
            let newDest = path.join(dirName, `${baseName}-ccstart${ext}`);
            let counter = 1;
            while (fs.existsSync(newDest)) {
              newDest = path.join(dirName, `${baseName}-ccstart-${counter}${ext}`);
              counter++;
            }
            if (!flags.dryRun) {
              fs.copyFileSync(item.src, newDest);
            }
            renamedCount++;
            console.log(`  📄 ${flags.dryRun ? 'Would create' : 'Created'}: ${path.relative(targetDir, newDest)}`);
          } else if (strategy === 'overwrite') {
            if (!flags.dryRun) {
              fs.copyFileSync(item.src, item.dest);
            }
            overwrittenCount++;
            console.log(`  ♻️  ${flags.dryRun ? 'Would replace' : 'Replaced'}: ${item.relativePath}`);
          }
        } else {
          if (!flags.dryRun) {
            // Ensure directory exists before copying file
            const destDir = path.dirname(item.dest);
            if (!fs.existsSync(destDir)) {
              fs.mkdirSync(destDir, { recursive: true });
            }
            fs.copyFileSync(item.src, item.dest);
          } else {
            console.log(`  ✨ Would copy: ${item.relativePath}`);
          }
          copiedCount++;
        }
      }
    } catch (error) {
      if (error.code === 'EACCES') {
        throw new Error(`Permission denied: ${item.relativePath}`);
      } else if (error.code === 'ENOSPC') {
        throw new Error('No space left on device');
      } else if (error.code === 'EISDIR') {
        throw new Error(`Cannot overwrite directory with file: ${item.relativePath}`);
      }
      throw new Error(`Failed to process ${item.relativePath}: ${error.message}`);
    }
  }

  // Initialize .claude directory and copy agents, skills, hooks
  let claudeInitResult = null;
  // Always initialize .claude directory structure (it will handle existing directories)
  console.log(`\n🔧 ${claudeStatus.hasClaudeDir ? 'Updating' : 'Initializing'} .claude directory structure...`);
  claudeInitResult = await initializeClaudeDirectory(selectedAgentFiles, selectedSkillDirs, selectedHookFiles, conflictStrategies['agents'], flags.dryRun);

  if (claudeInitResult.createdItems.length > 0) {
    console.log(`  ✅ Created ${claudeInitResult.createdItems.length} items in .claude directory`);
  }
  if (claudeInitResult.copiedAgents > 0) {
    console.log(`  🤖 Copied ${claudeInitResult.copiedAgents} agents to .claude/agents`);
  }
  if (claudeInitResult.skippedAgents > 0) {
    console.log(`  ⏭️  Skipped ${claudeInitResult.skippedAgents} existing agents in .claude/agents`);
  }
  if (claudeInitResult.copiedSkills > 0) {
    console.log(`  ⚡ Copied ${claudeInitResult.copiedSkills} skills to .claude/skills`);
  }
  if (claudeInitResult.skippedSkillsCount > 0) {
    console.log(`  ⏭️  Skipped ${claudeInitResult.skippedSkillsCount} existing skills in .claude/skills`);
  }

  console.log(`\n✅ Claude Code project ${flags.dryRun ? 'would be ' : ''}created successfully!`);
  
  // Show summary of what happened
  if (fileConflicts.length > 0 || copiedCount > 0 || selectedAgentFiles.length > 0 || selectedSkillDirs.length > 0 || claudeInitResult) {
    console.log('\n📊 Summary:');
    if (copiedCount > 0) console.log(`  ✨ ${copiedCount} new files ${flags.dryRun ? 'would be ' : ''}copied`);
    if (skippedCount > 0) console.log(`  ⏭️  ${skippedCount} existing files ${flags.dryRun ? 'would be ' : ''}kept unchanged`);
    if (renamedCount > 0) console.log(`  📄 ${renamedCount} template files ${flags.dryRun ? 'would be ' : ''}saved with -ccstart suffix`);
    if (overwrittenCount > 0) console.log(`  ♻️  ${overwrittenCount} files ${flags.dryRun ? 'would be ' : ''}replaced with template versions`);
    if (!flags.noAgents && !flags.dryRun) {
      console.log(`  🤖 ${selectedAgentFiles.length} agent${selectedAgentFiles.length === 1 ? '' : 's'} ${flags.dryRun ? 'would be ' : ''}included in .claude/agents`);
    }
    if (!flags.noSkills && !flags.dryRun) {
      console.log(`  ⚡ ${selectedSkillDirs.length} skill${selectedSkillDirs.length === 1 ? '' : 's'} ${flags.dryRun ? 'would be ' : ''}included in .claude/skills`);
    }
    if (claudeInitResult && claudeInitResult.createdItems.length > 0) {
      console.log(`  📁 ${claudeInitResult.createdItems.length} items created in .claude directory`);
    }
  }
  
  if (!flags.dryRun) {
    console.log('\nNext steps:');
    if (projectName !== '.') {
      // Escape project name to prevent command injection
      const escapedProjectName = JSON.stringify(projectName);
      console.log(`  cd ${escapedProjectName}`);
      const finalClaudeStatus = checkClaudeCode();
      if (!finalClaudeStatus.isInstalled) {
        console.log('  claude init    # Initialize Claude Code in the project');
      }
    }
    console.log('  1. Edit CLAUDE.md to add your project-specific instructions');
    console.log('  2. Update ROADMAP.md with your project goals');
    console.log('  3. Start creating tickets in the claude/tickets/ directory');
    
    if (renamedCount > 0) {
      console.log('\n💡 Tip: Review the -ccstart files to see template examples');
      console.log('   You can compare them with your existing files or copy sections you need');
    }
    
    console.log('\nHappy coding with Claude! 🎉');
  }
  
  } catch (error) {
    throw error;
  } finally {
    if (rl) {
      rl.close();
    }
  }
}

main().catch(err => {
  console.error('Error:', err.message || err);
  if (rl) {
    rl.close();
  }
  process.exit(1);
});