const { prompt } = require('enquirer');
const fs = require('fs');
const path = require('path');

// Adjust this path if your script is not located in the root of PackRat
const appsPath = path.join(__dirname, '../../../apps');

async function checkConfigFiles(appName, configFileNames) {
  console.log(`\nChecking ${appName}...`);
  const appDir = path.join(appsPath, appName);

  console.log('appDir:', appDir);

  for (const fileName of configFileNames) {
    const filePath = path.join(appDir, fileName);
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${fileName} exists.`);
    } else {
      console.error(`❌ ${fileName} does not exist.`);
    }
  }
}

async function checkPackageJsonDependencies(appName) {
  const packageJsonPath = path.join(appsPath, appName, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ package.json does not exist.');
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  console.log(`Dependencies for ${appName}:`);
  console.log(packageJson.dependencies);
  // Implement additional logic for version checks as needed
}

async function runDiagnostics() {
  const response = await prompt([
    {
      type: 'select',
      name: 'appName',
      message: 'Select an app to diagnose:',
      choices: ['bun-server', 'expo', 'next', 'tauri', 'vite'],
    },
  ]);

  const configFileNames = {
    expo: ['app.json'],
    next: ['next.config.js'],
    vite: ['vite.config.js'],
    // Assuming generic checks for Bun and Tauri, adjust based on real config files
    'bun-server': ['package.json'],
    tauri: ['package.json'],
  };

  await checkConfigFiles(response.appName, configFileNames[response.appName]);
  await checkPackageJsonDependencies(response.appName);
}

runDiagnostics().catch(console.error);
