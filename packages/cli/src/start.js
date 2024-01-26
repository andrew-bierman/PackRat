const { Select } = require('enquirer');
const { spawn } = require('child_process');

function runApp(command, args) {
  const process = spawn(command, args, { stdio: 'inherit' });

  process.on('error', (error) => {
    console.error(`Error: ${error.message}`);
  });

  process.on('close', (code) => {
    console.log(`Process exited with code ${code}`);
  });
}

async function startApp() {
  const prompt = new Select({
    name: 'app',
    message: 'Choose an app to start',
    choices: ['Expo', 'Next', 'Server'],
  });

  const app = await prompt.run();

  switch (app) {
    case 'Expo':
      console.log('Starting Expo...');
      runApp('yarn', ['dev:expo']);
      break;
    case 'Next':
      console.log('Starting Next...');
      runApp('yarn', ['dev:next']);
      break;
    case 'Server':
      console.log('Starting Server...');
      runApp('yarn', ['dev:server']);
      break;
    default:
      console.log('No app selected');
      break;
  }
}

startApp().catch(console.error);
