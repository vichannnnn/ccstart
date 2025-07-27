#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const projectName = process.argv[2] || '.';
const targetDir = path.resolve(process.cwd(), projectName);
const templateDir = path.join(__dirname, '..', 'template');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question) {
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

async function main() {
  console.log(`Creating Claude Code project in ${targetDir}...`);

  if (projectName !== '.') {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
  }

  const fileConflicts = [];
  const dirConflicts = [];
  const allItems = [];

  function scanTemplate(src, dest, relativePath = '') {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    
    if (isDirectory) {
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
      }
    }
  }

  scanTemplate(templateDir, targetDir);

  let conflictStrategy = 'skip';
  
  if (dirConflicts.length > 0) {
    console.log('\n⚠️  The following directories already exist:');
    dirConflicts.forEach(dir => console.log(`  - ${dir}/`));
  }

  if (fileConflicts.length > 0) {
    console.log('\n⚠️  The following files already exist:');
    fileConflicts.forEach(file => console.log(`  - ${file}`));
    
    console.log('\n📋 This choice will apply to ALL conflicting files listed above.');
    console.log('\nConflict resolution options:');
    console.log('  1) skip      (s) - Keep your existing files, only copy new files');
    console.log('  2) rename    (r) - Keep your files, save template files with -ccsetup suffix');
    console.log('  3) overwrite (o) - Replace ALL existing files with template versions');
    console.log('\nExamples: type "skip", "s", or "1" for the first option');
    
    const userInput = await prompt('\nYour choice [skip/rename/overwrite or s/r/o]: ');
    conflictStrategy = normalizeConflictStrategy(userInput);
    
    if (!conflictStrategy) {
      console.log(`\n❌ Invalid option: "${userInput}". Please use: skip/s/1, rename/r/2, or overwrite/o/3`);
      rl.close();
      process.exit(1);
    }
    
    if (conflictStrategy === 'overwrite') {
      const confirm = await prompt('⚠️  Are you sure you want to overwrite existing files? This cannot be undone! (yes/no): ');
      if (confirm !== 'yes') {
        console.log('Operation cancelled.');
        rl.close();
        process.exit(0);
      }
    }
  }

  const strategyDescriptions = {
    skip: 'Keeping all existing files, copying only new files',
    rename: 'Keeping existing files, saving templates with -ccsetup suffix',
    overwrite: 'Replacing existing files with template versions'
  };
  
  console.log(`\n✨ ${strategyDescriptions[conflictStrategy]}...`);
  
  let skippedCount = 0;
  let copiedCount = 0;
  let renamedCount = 0;
  let overwrittenCount = 0;
  
  for (const item of allItems) {
    if (item.type === 'directory') {
      if (!item.exists && !fs.existsSync(item.dest)) {
        fs.mkdirSync(item.dest, { recursive: true });
      }
    } else {
      if (item.exists) {
        if (conflictStrategy === 'skip') {
          skippedCount++;
          continue;
        } else if (conflictStrategy === 'rename') {
          const ext = path.extname(item.dest);
          const baseName = path.basename(item.dest, ext);
          const dirName = path.dirname(item.dest);
          let newDest = path.join(dirName, `${baseName}-ccsetup${ext}`);
          let counter = 1;
          while (fs.existsSync(newDest)) {
            newDest = path.join(dirName, `${baseName}-ccsetup-${counter}${ext}`);
            counter++;
          }
          fs.copyFileSync(item.src, newDest);
          renamedCount++;
          console.log(`  📄 Created: ${path.relative(targetDir, newDest)}`);
        } else if (conflictStrategy === 'overwrite') {
          fs.copyFileSync(item.src, item.dest);
          overwrittenCount++;
          console.log(`  ♻️  Replaced: ${item.relativePath}`);
        }
      } else {
        fs.copyFileSync(item.src, item.dest);
        copiedCount++;
      }
    }
  }

  console.log('\n✅ Claude Code project created successfully!');
  
  // Show summary of what happened
  if (fileConflicts.length > 0 || copiedCount > 0) {
    console.log('\n📊 Summary:');
    if (copiedCount > 0) console.log(`  ✨ ${copiedCount} new files copied`);
    if (skippedCount > 0) console.log(`  ⏭️  ${skippedCount} existing files kept unchanged`);
    if (renamedCount > 0) console.log(`  📄 ${renamedCount} template files saved with -ccsetup suffix`);
    if (overwrittenCount > 0) console.log(`  ♻️  ${overwrittenCount} files replaced with template versions`);
  }
  
  console.log('\nNext steps:');
  if (projectName !== '.') {
    console.log(`  cd ${projectName}`);
  }
  console.log('  1. Edit CLAUDE.md to add your project-specific instructions');
  console.log('  2. Update docs/ROADMAP.md with your project goals');
  console.log('  3. Start creating tickets in the tickets/ directory');
  
  if (fileConflicts.length > 0 && conflictStrategy === 'rename') {
    console.log('\n💡 Tip: Review the -ccsetup files to see template examples');
    console.log('   You can compare them with your existing files or copy sections you need');
  }
  
  console.log('\nHappy coding with Claude! 🎉');
  
  rl.close();
}

main().catch(err => {
  console.error('Error:', err);
  rl.close();
  process.exit(1);
});