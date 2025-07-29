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
  agents: false
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
  } else if (!arg.startsWith('-')) {
    projectName = arg;
  }
}

// Show help if requested
if (flags.help) {
  console.log(`
Usage: ccsetup [project-name] [options]

Options:
  --force, -f     Skip all prompts and overwrite existing files
  --dry-run, -d   Show what would be done without making changes
  --agents        Interactive agent selection mode
  --all-agents    Include all agents without prompting
  --no-agents     Skip agent selection entirely
  --help, -h      Show this help message

Examples:
  ccsetup                    # Create in current directory
  ccsetup my-project         # Create in new directory
  ccsetup . --force          # Overwrite files in current directory
  ccsetup my-app --dry-run   # Preview changes without creating files
  ccsetup --agents           # Interactive agent selection only
  ccsetup my-app --all-agents # Include all agents automatically
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
async function initializeClaudeDirectory(selectedAgentFiles, conflictStrategy, dryRun) {
  const claudeDir = path.join(targetDir, '.claude');
  const claudeAgentsDir = path.join(claudeDir, 'agents');
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
          let newDest = path.join(dirName, `${baseName}-ccsetup${ext}`);
          let counter = 1;
          while (fs.existsSync(newDest)) {
            newDest = path.join(dirName, `${baseName}-ccsetup-${counter}${ext}`);
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
          let newDest = path.join(dirName, `${baseName}-ccsetup${ext}`);
          let counter = 1;
          while (fs.existsSync(newDest)) {
            newDest = path.join(dirName, `${baseName}-ccsetup-${counter}${ext}`);
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
    const templateAgentsDir = path.join(templateDir, 'agents');
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
            let newDest = path.join(dirName, `${baseName}-ccsetup${ext}`);
            let counter = 1;
            while (fs.existsSync(newDest)) {
              newDest = path.join(dirName, `${baseName}-ccsetup-${counter}${ext}`);
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
    
    return {
      createdItems,
      skippedItems,
      copiedAgents,
      skippedAgents
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
    
    if (lines[0] !== '---') {
      return null;
    }
    
    let name = '';
    let description = '';
    let inFrontmatter = true;
    let lineIndex = 1;
    
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
  const agentsDir = path.join(templateDir, 'agents');
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
  console.log(`${colors.dim}Use arrow keys to navigate, space to select/deselect, 'a' to toggle all${colors.reset}\n`);
  
  const selectedFiles = await checkbox({
    message: `${colors.bold}Choose your agents:${colors.reset}`,
    choices,
    pageSize: 10,
    loop: false
  });
  
  // Validate selected files to prevent path traversal
  const validatedFiles = selectedFiles.filter(file => {
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
        console.log(`${colors.dim}2. Run: ${colors.reset}${colors.cyan}npx ccsetup${colors.reset}`);
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
          console.log('ccsetup can create the .claude directory structure for you.\n');
          const answer = await prompt('Would you like to create .claude directory? (yes/no): ');
          if (answer !== 'yes') {
            console.log('\nTo manually initialize Claude Code:');
            console.log('1. Install Claude Code CLI: https://docs.anthropic.com/claude-code/quickstart');
            console.log('2. Run \'claude init\' in your project directory');
            console.log('3. Then run \'npx ccsetup\' again\n');
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
    'agents': [],
    'docs': [],
    'plans': [],
    'tickets': []
  };
  
  // Store conflict strategies per category
  const conflictStrategies = {
    'CLAUDE.md': 'skip',
    'agents': 'skip',
    'docs': 'skip',
    'plans': 'skip',
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
  } else if (!flags.dryRun) {
    // Close readline interface before using inquirer
    if (rl) {
      rl.close();
      rl = null;
    }
    
    // Interactive selection
    selectedAgentFiles = await selectAgents(availableAgents);
    console.log(`\n✅ Selected ${selectedAgentFiles.length} agent${selectedAgentFiles.length === 1 ? '' : 's'}`);
    
    // Recreate readline interface after agent selection
    if (!flags.force && !flags.dryRun) {
      rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    }
  } else {
    // In dry-run mode, show what would happen
    console.log(`\nWould prompt for agent selection from ${availableAgents.length} available agents`);
    selectedAgentFiles = availableAgents.map(a => a.file).filter(validateAgentFile); // Include all for scanning purposes
  }

  function scanTemplate(src, dest, relativePath = '', skipAgents = false) {
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
        
        // Skip agents directory if we're handling it separately
        if (skipAgents && path.basename(src) === 'agents') {
          // Only scan selected agents
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
          
          // Add selected agent files
          for (const agentFile of selectedAgentFiles) {
            // Additional validation before processing
            if (!validateAgentFile(agentFile)) {
              console.warn(`⚠️  Skipping invalid agent file: ${agentFile}`);
              continue;
            }
            
            // Ensure we're only dealing with basenames
            const safeAgentFile = path.basename(agentFile);
            const agentSrc = path.join(src, safeAgentFile);
            const agentDest = path.join(dest, safeAgentFile);
            const agentRelPath = path.join(relativePath, safeAgentFile);
            
            // Validate that the source path is within the template agents directory
            const normalizedAgentSrc = path.normalize(agentSrc);
            const normalizedTemplateAgentsDir = path.normalize(src);
            if (!normalizedAgentSrc.startsWith(normalizedTemplateAgentsDir)) {
              console.warn(`⚠️  Skipping agent file outside template directory: ${agentFile}`);
              continue;
            }
            
            if (fs.existsSync(agentSrc)) {
              allItems.push({
                src: agentSrc,
                dest: agentDest,
                type: 'file',
                relativePath: agentRelPath,
                exists: fs.existsSync(agentDest)
              });
              
              if (fs.existsSync(agentDest)) {
                fileConflicts.push(agentRelPath);
                conflictsByCategory['agents'].push(agentRelPath);
              }
            }
          }
          
          // Always include README.md
          const readmeSrc = path.join(src, 'README.md');
          const readmeDest = path.join(dest, 'README.md');
          if (fs.existsSync(readmeSrc)) {
            allItems.push({
              src: readmeSrc,
              dest: readmeDest,
              type: 'file',
              relativePath: path.join(relativePath, 'README.md'),
              exists: fs.existsSync(readmeDest)
            });
            
            if (fs.existsSync(readmeDest)) {
              const readmePath = path.join(relativePath, 'README.md');
              fileConflicts.push(readmePath);
              conflictsByCategory['agents'].push(readmePath);
            }
          }
          
          return; // Don't recurse into agents directory
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
            path.join(relativePath, childItem),
            skipAgents
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
          } else if (relativePath.startsWith('agents/')) {
            conflictsByCategory['agents'].push(relativePath);
          } else if (relativePath.startsWith('docs/')) {
            conflictsByCategory['docs'].push(relativePath);
          } else if (relativePath.startsWith('plans/')) {
            conflictsByCategory['plans'].push(relativePath);
          } else if (relativePath.startsWith('tickets/')) {
            conflictsByCategory['tickets'].push(relativePath);
          }
        }
      }
    } catch (error) {
      throw new Error(`Error scanning template: ${error.message}`);
    }
  }

  scanTemplate(templateDir, targetDir, '', true);

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
          { key: 'agents', name: 'Agents', emoji: '🤖' },
          { key: 'docs', name: 'Documentation', emoji: '📚' },
          { key: 'plans', name: 'Plans', emoji: '📋' },
          { key: 'tickets', name: 'Tickets', emoji: '🎫' }
        ];
        
        for (const category of categories) {
          if (conflictsByCategory[category.key].length > 0) {
            console.log(`\n${category.emoji} ${category.name} conflicts:`);
            conflictsByCategory[category.key].forEach(file => console.log(`  - ${file}`));
            
            console.log('\nConflict resolution options:');
            console.log('  1) skip      (s) - Keep your existing files');
            console.log('  2) rename    (r) - Save template files with -ccsetup suffix');
            console.log('  3) overwrite (o) - Replace with template versions');
            
            const userInput = await prompt(`Your choice for ${category.name} [s/r/o]: `);
            const strategy = normalizeConflictStrategy(userInput);
            
            if (!strategy) {
              console.log(`\n❌ Invalid option: "${userInput}". Please use: skip/s/1, rename/r/2, or overwrite/o/3`);
              if (rl) rl.close();
              process.exit(1);
            }
            
            if (strategy === 'overwrite' && category.key === 'CLAUDE.md') {
              const confirm = await prompt('⚠️  Are you sure you want to overwrite CLAUDE.md? This will lose your project instructions! (yes/no): ');
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
      } else {
        if (item.exists) {
          // Determine which category this file belongs to
          let strategy = 'skip'; // default
          if (item.relativePath === 'CLAUDE.md') {
            strategy = conflictStrategies['CLAUDE.md'];
          } else if (item.relativePath.startsWith('agents/')) {
            strategy = conflictStrategies['agents'];
          } else if (item.relativePath.startsWith('docs/')) {
            strategy = conflictStrategies['docs'];
          } else if (item.relativePath.startsWith('plans/')) {
            strategy = conflictStrategies['plans'];
          } else if (item.relativePath.startsWith('tickets/')) {
            strategy = conflictStrategies['tickets'];
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
            let newDest = path.join(dirName, `${baseName}-ccsetup${ext}`);
            let counter = 1;
            while (fs.existsSync(newDest)) {
              newDest = path.join(dirName, `${baseName}-ccsetup-${counter}${ext}`);
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

  // Initialize .claude directory and copy agents
  let claudeInitResult = null;
  // Always initialize .claude directory structure (it will handle existing directories)
  console.log(`\n🔧 ${claudeStatus.hasClaudeDir ? 'Updating' : 'Initializing'} .claude directory structure...`);
  claudeInitResult = await initializeClaudeDirectory(selectedAgentFiles, conflictStrategies['agents'], flags.dryRun);
  
  if (claudeInitResult.createdItems.length > 0) {
    console.log(`  ✅ Created ${claudeInitResult.createdItems.length} items in .claude directory`);
  }
  if (claudeInitResult.copiedAgents > 0) {
    console.log(`  🤖 Copied ${claudeInitResult.copiedAgents} agents to .claude/agents`);
  }
  if (claudeInitResult.skippedAgents > 0) {
    console.log(`  ⏭️  Skipped ${claudeInitResult.skippedAgents} existing agents in .claude/agents`);
  }

  console.log(`\n✅ Claude Code project ${flags.dryRun ? 'would be' : ''} created successfully!`);
  
  // Show summary of what happened
  if (fileConflicts.length > 0 || copiedCount > 0 || selectedAgentFiles.length > 0 || claudeInitResult) {
    console.log('\n📊 Summary:');
    if (copiedCount > 0) console.log(`  ✨ ${copiedCount} new files ${flags.dryRun ? 'would be' : ''} copied`);
    if (skippedCount > 0) console.log(`  ⏭️  ${skippedCount} existing files ${flags.dryRun ? 'would be' : ''} kept unchanged`);
    if (renamedCount > 0) console.log(`  📄 ${renamedCount} template files ${flags.dryRun ? 'would be' : ''} saved with -ccsetup suffix`);
    if (overwrittenCount > 0) console.log(`  ♻️  ${overwrittenCount} files ${flags.dryRun ? 'would be' : ''} replaced with template versions`);
    if (!flags.noAgents && !flags.dryRun) {
      console.log(`  🤖 ${selectedAgentFiles.length} agent${selectedAgentFiles.length === 1 ? '' : 's'} ${flags.dryRun ? 'would be' : ''} included in /agents`);
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
    console.log('  2. Update docs/ROADMAP.md with your project goals');
    console.log('  3. Start creating tickets in the tickets/ directory');
    
    if (renamedCount > 0) {
      console.log('\n💡 Tip: Review the -ccsetup files to see template examples');
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