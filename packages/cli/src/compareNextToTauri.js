const fs = require('fs');
const path = require('path');
const klaw = require('klaw');
const diff = require('fast-diff');
const ignore = require('ignore'); // Ensure you have this line to import the ignore module

const ig = ignore().add([
  'src-tauri',
  '.next', // Ignore Next.js build directory
  'node_modules', // Ignore node_modules directories
  // Add any other files or directories you want to ignore
]);

// Define paths to the Next.js and Tauri project directories
const nextDir = path.join(__dirname, '../../../apps/next');
const tauriDir = path.join(__dirname, '../../../apps/tauri');

const compareFiles = (path1, path2) => {
  const content1 = fs.readFileSync(path1, 'utf8');
  const content2 = fs.readFileSync(path2, 'utf8');
  const result = diff(content1, content2);
  if (result.length > 1 || (result.length === 1 && result[0][0] !== 0)) {
    console.log(`Difference found in ${path.relative(tauriDir, path1)}`);
  }
};

const traverseDirectories = (baseDir, compareDir) => {
  klaw(baseDir)
    .on('data', (item) => {
      if (item.stats.isFile()) {
        const relativePath = path.relative(baseDir, item.path);
        if (!ig.ignores(relativePath)) {
          const comparePath = path.join(compareDir, relativePath);
          if (fs.existsSync(comparePath)) {
            compareFiles(item.path, comparePath);
          } else {
            console.log(
              `File does not exist in compare directory: ${relativePath}`,
            );
          }
        }
      }
    })
    .on('end', () => console.log('Comparison finished.'));
};

traverseDirectories(nextDir, tauriDir);
