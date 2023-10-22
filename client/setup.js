const fs = require('fs');
const dotenv = require('dotenv');
const { exec } = require('child_process');

dotenv.config();

// File paths
// const podfilePath = './ios/Podfile';
// const gradlefilePath = './android/gradle.properties';
// const podfilePath = './Podfile';
// const gradlefilePath = './gradle.properties';
// const appJsonPath = './app.json';

const replaceInFile = (filePath, query = null) => {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }

    let result;
    if (query)
      for (const [key, value] of Object.entries(query)) {
        const regex = new RegExp(key, 'g');
        result = data.replace(regex, value);
      }
    else result = data;
    fs.writeFile(filePath, result, 'utf8', function (err) {
      if (err) {
        console.error(`Error writing file ${filePath}:`, err);
      } else {
        console.log(
          `Successfully replaced all key, value pairs of ${query} in ${filePath}`,
        );
      }
    });
  });
};

/* New reusable function */

const fileDirectories = [
  {
    source: './Podfile.example',
    destination: './ios/Podfile',
    query: {
      MAPBOX_DOWNLOADS_TOKEN_FROM_ENV: process.env.MAPBOX_DOWNLOADS_TOKEN, // key value pair
    },
  },
  {
    source: './gradle.properties.example',
    destination: './android/gradle.properties',
    query: {
      MAPBOX_DOWNLOADS_TOKEN_FROM_ENV: process.env.MAPBOX_DOWNLOADS_TOKEN,
    },
  },
  {
    source: './app.example.json',
    destination: './app.json',
    query: {
      MAPBOX_DOWNLOADS_TOKEN_FROM_ENV: process.env.MAPBOX_DOWNLOADS_TOKEN,
    },
  },
  // Add more files here
];

fileDirectories.forEach(({ source, destination, query }) => {
  const commandToCopy = `cp ${source} ${destination}`;
  // Open a terminal and run the command
  exec(commandToCopy, (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', error);
      return;
    }
    replaceInFile(destination, query);
  });
});

// Assuming the env variables are MAPBOX_API_KEY, MAPBOX_ACCESS_TOKEN and MAPBOX_DOWNLOADS_TOKEN
// replaceInFile(
//   podfilePath,
//   'MAPBOX_DOWNLOADS_TOKEN_FROM_ENV',
//   process.env.MAPBOX_DOWNLOADS_TOKEN,
// );
// replaceInFile(
//   gradlefilePath,
//   'MAPBOX_DOWNLOADS_TOKEN_FROM_ENV',
//   process.env.MAPBOX_DOWNLOADS_TOKEN,
// );
// replaceInFile(
//   appJsonPath,
//   'MAPBOX_DOWNLOADS_TOKEN_FROM_ENV',
//   process.env.MAPBOX_DOWNLOADS_TOKEN,
// );
