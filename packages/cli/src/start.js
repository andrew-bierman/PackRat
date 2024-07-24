const { Select } = require('enquirer');
const { spawn } = require('child_process');

const runApp = (command, args) => {
  const process = spawn(command, args, { stdio: 'inherit' });

  process.on('error', (error) => console.error(`Error: ${error.message}`));
  process.on('close', (code) =>
    console.log(`Process exited with code ${code}`),
  );
};

const startApp = async () => {
  const prompt = new Select({
    name: 'app',
    message: 'Choose an app to start',
    choices: ['Expo', 'Vite', 'Next', 'Server'],
  });

  try {
    const app = await prompt.run();

    const commands = {
      Expo: ['yarn', ['dev:expo']],
      Vite: ['yarn', ['dev:vite']],
      Next: ['yarn', ['dev:next']],
      Server: ['yarn', ['dev:server']],
    };

    if (commands[app]) {
      console.log(`Starting ${app}...`);
      runApp(...commands[app]);
    } else {
      console.log('No app selected');
    }
  } catch (error) {
    console.error(`Prompt error: ${error.message}`);
  }
};

startApp().catch(console.error);
