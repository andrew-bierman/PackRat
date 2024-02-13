const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { MultiSelect } = require('enquirer');

const appFolderPath = path.join(__dirname, '../../app'); // Adjust to your app's folder path
const packageJsonPath = path.join(__dirname, '../../app/package.json'); // Adjust to the location of your package.json

// Read package.json and parse dependencies
let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const dependencies = Object.keys(packageJson.dependencies || {});
const devDependencies = Object.keys(packageJson.devDependencies || {});
const allDependencies = [...dependencies, ...devDependencies];

async function isDependencyUsed(dep) {
  const files = glob.sync(`${appFolderPath}/**/*.{js,jsx,ts,tsx}`, {
    nodir: true,
  });
  for (let file of files) {
    const fileContent = fs.readFileSync(file, 'utf8');
    if (
      fileContent.includes(`from '${dep}'`) ||
      fileContent.includes(`require('${dep}')`)
    ) {
      return true;
    }
  }
  return false;
}

async function offerToRemoveUnusedDependencies(unusedDependencies) {
  const prompt = new MultiSelect({
    name: 'dependenciesToRemove',
    message: 'Select dependencies to remove:',
    choices: unusedDependencies,
    hint: '(Use space to select, "a" to toggle all, "i" to invert selection. Press <Enter> when done.)',
  });

  // Directly use the result from prompt.run()
  const selectedDeps = await prompt.run();

  if (selectedDeps && selectedDeps.length > 0) {
    let changesMade = false;
    selectedDeps.forEach((dep) => {
      // Check and remove from dependencies and devDependencies
      if (
        packageJson.dependencies &&
        packageJson.dependencies.hasOwnProperty(dep)
      ) {
        delete packageJson.dependencies[dep];
        changesMade = true;
      }
      if (
        packageJson.devDependencies &&
        packageJson.devDependencies.hasOwnProperty(dep)
      ) {
        delete packageJson.devDependencies[dep];
        changesMade = true;
      }
    });

    if (changesMade) {
      // Write the updated packageJson back to package.json
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2),
        'utf8',
      );
      console.log(`Removed selected dependencies from package.json.`);
    } else {
      console.log('No dependencies selected for removal.');
    }
  } else {
    console.log('No dependencies selected for removal.');
  }
}

async function findAndOfferToRemoveUnusedDependencies() {
  const unusedDependencies = (
    await Promise.all(
      allDependencies.map(async (dep) => {
        const used = await isDependencyUsed(dep);
        return used ? null : dep;
      }),
    )
  ).filter((dep) => dep !== null);

  console.log('Unused Dependencies:');
  console.log(unusedDependencies.join('\n'));

  if (unusedDependencies.length > 0) {
    await offerToRemoveUnusedDependencies(unusedDependencies);
  } else {
    console.log('No unused dependencies found.');
  }
}

findAndOfferToRemoveUnusedDependencies();
