const fs = require('fs');
const path = require('path');
const klaw = require('klaw');
const diff = require('fast-diff');
const ignore = require('ignore');
const { prompt } = require('enquirer');

const ig = ignore().add([
  'src-tauri',
  '.next', // Ignore Next.js build directory
  'node_modules', // Ignore node_modules directories
  // Add any other files or directories you want to ignore
]);

// Define paths to the Next.js and Tauri project directories
const nextDir = path.join(__dirname, '../../../apps/next');
const tauriDir = path.join(__dirname, '../../../apps/tauri');

const copyFile = (source, target) => {
  fs.copyFileSync(source, target);
  console.log(
    `Copied ${path.relative(nextDir, source)} to ${path.relative(
      tauriDir,
      target,
    )}`,
  );
};

const compareFiles = async (path1, path2) => {
  const content1 = fs.readFileSync(path1, 'utf8');
  const content2 = fs.readFileSync(path2, 'utf8');
  const diffs = diff(content1, content2);

  if (diffs.some((part) => part[0] !== 0)) {
    // Check if there's any change
    console.log(`Difference found in ${path.relative(tauriDir, path1)}`);
    const response = await prompt({
      type: 'select',
      name: 'action',
      message: `What do you want to do with ${path.relative(nextDir, path1)}?`,
      choices: ['Copy to Tauri directory', 'Show diff', 'Do nothing'],
    });

    if (response.action === 'Copy to Tauri directory') {
      copyFile(path1, path2);
    } else if (response.action === 'Show diff') {
      // Format and display the diff
      diffs.forEach(([type, text]) => {
        switch (type) {
          case -1:
            console.log(`- ${text}`);
            break; // Removed text
          case 1:
            console.log(`+ ${text}`);
            break; // Added text
          default:
            console.log(`  ${text}`); // Unchanged text
        }
      });
    }
  }
};

const traverseDirectories = async (baseDir, compareDir) => {
  for await (const item of klaw(baseDir)) {
    if (item.stats.isFile()) {
      const relativePath = path.relative(baseDir, item.path);
      if (!ig.ignores(relativePath)) {
        const comparePath = path.join(compareDir, relativePath);
        if (fs.existsSync(comparePath)) {
          await compareFiles(item.path, comparePath);
        } else {
          console.log(
            `File does not exist in compare directory: ${relativePath}`,
          );
        }
      }
    }
  }
  console.log('Comparison finished.');
};

traverseDirectories(nextDir, tauriDir).catch(console.error);
