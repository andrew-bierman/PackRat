const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

// File paths
// const podfilePath = './ios/Podfile';
// const gradlefilePath = './android/gradle.properties';
const podfilePath = './Podfile';
const gradlefilePath = './gradle.properties';
const appJsonPath = './app.json';

const replaceInFile = (filePath, replaceToken, newValue) => {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }

    const regex = new RegExp(replaceToken, 'g');
    const result = data.replace(regex, newValue);

    fs.writeFile(filePath, result, 'utf8', function (err) {
      if (err) {
        console.error(`Error writing file ${filePath}:`, err);
      } else {
        console.log(
          `Successfully replaced ${replaceToken} in ${filePath} with ${newValue}`,
        );
      }
    });
  });
};

// Assuming the env variables are MAPBOX_API_KEY, MAPBOX_ACCESS_TOKEN and MAPBOX_DOWNLOADS_TOKEN
replaceInFile(
  podfilePath,
  'MAPBOX_DOWNLOADS_TOKEN_FROM_ENV',
  process.env.MAPBOX_DOWNLOADS_TOKEN,
);
replaceInFile(
  gradlefilePath,
  'MAPBOX_DOWNLOADS_TOKEN_FROM_ENV',
  process.env.MAPBOX_DOWNLOADS_TOKEN,
);
replaceInFile(
  appJsonPath,
  'MAPBOX_DOWNLOADS_TOKEN_FROM_ENV',
  process.env.MAPBOX_DOWNLOADS_TOKEN,
);
