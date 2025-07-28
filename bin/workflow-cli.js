#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const WorkflowParser = require('../lib/workflow-parser');
const ExecutionEngine = require('../lib/execution-engine');
const ContextManager = require('../lib/context-manager');

program
  .name('workflow')
  .description('Claude Code Workflow Orchestration CLI')
  .version('1.0.0');

program
  .command('run <file>')
  .description('Execute a workflow file')
  .option('-v, --verbose', 'Show detailed execution logs')
  .option('-d, --dry-run', 'Validate and show execution plan without running')
  .action(async (file, options) => {
    try {
      const filePath = path.resolve(file);
      console.log(chalk.blue(`Loading workflow from: ${filePath}\n`));
      
      const parser = new WorkflowParser();
      const workflow = parser.parse(filePath);
      
      console.log(chalk.green('✓ Workflow validated successfully'));
      console.log(`  Name: ${workflow.name}`);
      console.log(`  Tasks: ${workflow.tasks.length}`);
      if (workflow.description) {
        console.log(`  Description: ${workflow.description}`);
      }
      
      if (options.dryRun) {
        console.log(chalk.yellow('\n🔍 Dry run mode - showing execution plan:\n'));
        console.log(parser.generateDependencyGraph(workflow));
        return;
      }
      
      const contextManager = new ContextManager();
      const engine = new ExecutionEngine(contextManager);
      
      if (options.verbose) {
        engine.attachConsoleReporter();
      } else {
        engine.on('workflow:start', ({ workflow }) => {
          console.log(chalk.blue(`\n🚀 Executing workflow: ${workflow}`));
        });
        engine.on('workflow:complete', () => {
          console.log(chalk.green('\n✅ Workflow completed successfully!'));
        });
        engine.on('workflow:error', ({ error }) => {
          console.log(chalk.red(`\n❌ Workflow failed: ${error}`));
        });
      }
      
      const summary = await engine.execute(workflow);
      
      if (!options.verbose) {
        console.log(chalk.blue('\n📊 Summary:'));
        console.log(`  Success rate: ${summary.successCount}/${summary.successCount + summary.failureCount} tasks`);
        console.log(`  Status: ${summary.overallStatus}`);
      }
      
    } catch (error) {
      console.error(chalk.red(`\n❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('validate <file>')
  .description('Validate a workflow file without executing')
  .action(async (file) => {
    try {
      const filePath = path.resolve(file);
      console.log(chalk.blue(`Validating workflow: ${filePath}\n`));
      
      const parser = new WorkflowParser();
      const workflow = parser.parse(filePath);
      
      console.log(chalk.green('✅ Workflow is valid!\n'));
      console.log('Workflow Details:');
      console.log(`  Name: ${workflow.name}`);
      console.log(`  Version: ${workflow.version}`);
      console.log(`  Tasks: ${workflow.tasks.length}`);
      console.log(`  Timeout: ${workflow.settings.timeout}s`);
      console.log(`  On Failure: ${workflow.settings.on_failure}`);
      
      console.log('\nTasks:');
      for (const task of workflow.tasks) {
        console.log(`  - ${task.id} (${task.agent})`);
        if (task.dependencies.length > 0) {
          console.log(`    Dependencies: ${task.dependencies.join(', ')}`);
        }
      }
      
      console.log('\n' + parser.generateDependencyGraph(workflow));
      
    } catch (error) {
      console.error(chalk.red(`\n❌ Validation failed: ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List available workflow files')
  .option('-p, --path <path>', 'Directory to search for workflows', '.')
  .action(async (options) => {
    try {
      const searchPaths = [
        path.join(process.cwd(), '.claude', 'workflows'),
        path.join(process.cwd(), 'workflows'),
        path.resolve(options.path)
      ];
      
      console.log(chalk.blue('🔍 Searching for workflow files...\n'));
      
      let foundWorkflows = false;
      
      for (const searchPath of searchPaths) {
        if (!fs.existsSync(searchPath)) {
          continue;
        }
        
        const files = findWorkflowFiles(searchPath);
        if (files.length > 0) {
          foundWorkflows = true;
          console.log(chalk.cyan(`📁 ${searchPath}:`));
          
          for (const file of files) {
            try {
              const parser = new WorkflowParser();
              const workflow = parser.parse(file);
              const relativePath = path.relative(process.cwd(), file);
              console.log(`  - ${relativePath}`);
              console.log(`    Name: ${workflow.name}`);
              if (workflow.description) {
                console.log(`    Description: ${workflow.description}`);
              }
              console.log(`    Tasks: ${workflow.tasks.length}`);
              console.log('');
            } catch (error) {
              console.log(`  - ${path.relative(process.cwd(), file)} ${chalk.red('(invalid)')}`);
            }
          }
        }
      }
      
      if (!foundWorkflows) {
        console.log(chalk.yellow('No workflow files found.'));
        console.log('\nCreate workflow files in:');
        console.log('  - .claude/workflows/');
        console.log('  - workflows/');
      }
      
    } catch (error) {
      console.error(chalk.red(`\n❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

function findWorkflowFiles(dir) {
  const files = [];
  const supportedExtensions = ['.yaml', '.yml', '.json'];
  
  function scanDir(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        scanDir(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (supportedExtensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }
  
  scanDir(dir);
  return files;
}

program.parse(process.argv);