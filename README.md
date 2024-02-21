# PackRat 🎒

PackRat is the ultimate adventure planner designed for those who love to explore the great outdoors. Our app helps users plan and organize their trips with ease, whether it's a weekend camping trip, a day hike, or a cross-country road trip.

With PackRat, you can create and manage trips, discover new destinations, and stay informed with up-to-date weather forecasts. Our app integrates with Mapbox to provide you with accurate maps and directions to your destinations, as well as suggestions for popular outdoor activities based on the location and season of your trip.

So pack your bags, grab your friends, and get ready for your next adventure with PackRat!

> [!NOTE]
> This project is currently in alpha. Please report any issues or bugs you encounter. Thank you for your patience and support!

> [!IMPORTANT]
> This project is still in development and may contain bugs or issues. Please use the app with caution and report any problems you encounter. Thank you for your understanding and cooperation.

**Build & CI:**
![Node.js CI](https://github.com/andrew-bierman/PackRat/actions/workflows/node.js.yml/badge.svg)
![Node.js CI for Dev Environment](https://github.com/andrew-bierman/PackRat/actions/workflows/node.js.dev.yml/badge.svg)
![Docker Image CI](https://github.com/andrew-bierman/PackRat/actions/workflows/docker.node.yml/badge.svg)
![android-build-apk](https://github.com/andrew-bierman/PackRat/actions/workflows/build.yml/badge.svg)

**Repository Info:**
![GitHub tag](https://img.shields.io/github/tag/andrew-bierman/PackRat?include_prereleases=&sort=semver&color=blue)
![License](https://img.shields.io/badge/License-GNU-blue)
![issues - PackRat](https://img.shields.io/github/issues/andrew-bierman/PackRat)

<div align="center">

[![View Beta Site](https://img.shields.io/badge/View%20Beta%20Site-%20-brightgreen)](https://packrat.world)

</div>


## Table of Contents

- [PackRat 🎒](#packrat-)
  - [Table of Contents](#table-of-contents)
  - [Overview 🌐](#overview-)
  - [Documentation 📚](#documentation-)
  - [Features 🚀](#features-)
  - [Technologies used 💻](#technologies-used-)
  - [🗂 Folder layout](#-folder-layout)
  - [UI Kit](#ui-kit)
  - [🆕 Add new dependencies](#-add-new-dependencies)
    - [Pure JS dependencies](#pure-js-dependencies)
    - [Native dependencies](#native-dependencies)
  - [Update new dependencies](#update-new-dependencies)
    - [Pure JS dependencies](#pure-js-dependencies-1)
  - [Local installation 📲](#local-installation-)
    - [Dependencies](#dependencies)
    - [Environment Setup](#environment-setup)
      - [Automated Setup 🛠️](#automated-setup-️)
      - [Manual Setup 📝](#manual-setup-)
    - [Yarn Setup](#yarn-setup)
      - [Root](#root)
      - [Server](#server)
      - [Client](#client)
    - [Debugging Yarn Environment Setup - Windows](#debugging-yarn-environment-setup---windows)
  - [Docker Installation 🐳 \[Experimental\]](#docker-installation--experimental)
    - [Dependencies](#dependencies-1)
    - [Installation](#installation)
  - [How backend API's are setup](#how-backend-apis-are-setup)
  - [Contributing 🤝](#contributing-)
  - [👏 Special Thanks](#-special-thanks)
  - [License 📝](#license-)

## Overview 🌐

With **PackRat**, you can:
- Create and manage trips.
- Discover new destinations.
- Stay informed with up-to-date weather forecasts.
- Access accurate maps and directions with our integration to Mapbox.
- Get suggestions for popular outdoor activities based on your trip's location and season.

So pack your bags, grab your friends, and get ready for your next adventure with **PackRat**!

## Documentation 📚

> [!WARNING]
> While the app is in alpha, please be aware that there may be bugs or issues. We appreciate your patience and support as we work to improve the app. Data may be lost or corrupted during this time, so please use the app with caution. Thank you for your understanding and cooperation.
>
<div align="center">

[![view - Documentation](https://img.shields.io/badge/view-Documentation-blue?style=for-the-badge)](/docs/ "Go to project documentation")

</div>

## Features 🚀

- Create and manage trips: users can create new trips and manage existing ones by adding details such as dates, locations, and activities.
- Map integration: PackRat integrates with Mapbox to provide users with accurate maps and directions to their destinations.
- Activity suggestions: the app suggests popular outdoor activities based on the location and season of the trip.
- Packing list: users can create and manage packing lists for their trips to ensure they have everything they need.
- Weather forecast: PackRat provides up-to-date weather forecasts for the trip location to help users prepare accordingly.
- User authentication: the app uses user authentication to ensure privacy and data security.

## Technologies used 💻

PackRat is built using the following technologies:

- React Native: a JavaScript library for building user interfaces.
- Expo: a set of tools and services for building and deploying React Native applications.
- MongoDB: a document-oriented database program.
- Express.js: a web application framework for Node.js.
- Node.js: an open-source, cross-platform, back-end JavaScript runtime environment.
- Redux: a predictable state container for JavaScript apps.
- Mapbox: a location data platform for mobile and web applications.

## 🗂 Folder layout

The main folders are:

- `apps`
  - `expo` (native)
  - `next` (web) -- ssr not yet implemented
  - `tauri` (desktop) -- not yet implemented

- `packages` shared packages across apps
  - `ui` includes your custom UI kit that will be optimized by Tamagui
  - `app` you'll be importing most files from `app/`
    - `features` (don't use a `screens` folder. organize by feature.) [pending]
    - `provider` (all the providers that wrap the app, and some no-ops for Web.)
    - `api` - intended to be our services, but tRPC eliminated a lot of this need due to custom hooks. [mostly deprecated]
    - `assets` - images and branding
    - `auth` - auth provider and hook, currently set up for expo router auth. Once we have next js config done, will refactor to support next js auth somehow
    - `components` - built components from our primitive ui elements (root/packages/ui), and custom logic hooks (/hooks)
    - `config` - axios config, we have almost no axios needs with trpc. Once fully migrated away this will be removed.
    - `constants` - strings and arrays that don’t change
    - `context` - all react context stuff
    - `hooks` - custom hooks for logic and data fetching with trpc
    - `media` - media query in react native config
    - `public` - web only assets like favicon
    - `atoms` - jotai atoms for global state
    - `theme` - tracks dark and light mode theming logic and tamagui config
    - `utils` - utility functions that can be reused

## UI Kit

Note we're following the [design systems guide](https://tamagui.dev/docs/guides/design-systems) and creating our own package for components.

See `packages/ui` named `@packrat/ui` for how this works.

## 🆕 Add new dependencies

### Pure JS dependencies

If you're installing a JavaScript-only dependency that will be used across platforms, install it in `packages/app`:

```sh
cd packages/app
yarn add date-fns
cd ../..
yarn
```

### Native dependencies

If you're installing a library with any native code, you must install it in `expo`:

```sh
cd apps/expo
yarn add react-native-reanimated
cd ..
yarn
```

## Update new dependencies

### Pure JS dependencies

```sh
yarn upgrade-interactive
```

You can also install the native library inside of `packages/app` if you want to get autoimport for that package inside of the `app` folder. However, you need to be careful and install the _exact_ same version in both packages. If the versions mismatch at all, you'll potentially get terrible bugs. This is a classic monorepo issue. I use `lerna-update-wizard` to help with this (you don't need to use Lerna to use that lib).

You may potentially want to have the native module transpiled for the next app. If you get error messages with `Cannot use import statement outside a module`, you may need to use `transpilePackages` in your `next.config.js` and add the module to the array there.

## Local installation 📲

PackRat consists of two main components: a client and a server. Follow the steps below to install and run both components.

### Dependencies

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [Expo CLI](https://docs.expo.io/workflow/expo-cli/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)

### Environment Setup

1. Clone the repository:
   HTTPS:

```bash
git clone https://github.com/andrew-bierman/PackRat.git
```

SSH:

```bash
git clone git@github.com:andrew-bierman/PackRat.git
```

2. Navigate to the `PackRat` directory:

```
cd PackRat
```

3. Set up the environment variables for the client and server.
   - If you have access to the development env files, use those. Otherwise, replace the values with your own.
   - See the `.env.example` files in the `apps/expo` and `server` directories for the necessary environment variables.

#### Automated Setup 🛠️

1. Run the setup script from the `PackRat` directory.
```
yarn setup
```

#### Manual Setup 📝

1. Navigate to the `PackRat` directory if you are not already there.

2. Navigate to the `apps/expo` directory.

```
cd apps/expo
```

- Note that for the client to run, you need to also make the following changes:
     - Copy the `app.example.json` file and rename it to `app.json`. Open the file and replace the `MAPBOX_DOWNLOADS_TOKEN_FROM_ENV` value with your own Mapbox API key.
     - Navigate to the ios directory. Copy the `Podfile.example` file and rename it to `Podfile`. Open the file and replace the `MAPBOX_DOWNLOADS_TOKEN_FROM_ENV` value with your own Mapbox access token.
     - Navigate to the android directory. Copy the `gradle.properties.example` file and rename it to `gradle.properties`. Open the file and replace the `MAPBOX_DOWNLOADS_TOKEN_FROM_ENV` value with your own Mapbox downloads token.
     - See the [Mapbox documentation](https://docs.mapbox.com/help/getting-started/access-tokens/) for more information on how to obtain Mapbox API keys and access tokens.

2. Duplicate the `.env.example` file and rename it to `.env`. Open the file and replace the values with your own.
   - If you have access to the development env file, skip this step. Otherwise, replace the values with your own.

```
cp .env.example .env
```

1. Duplicate the `app.example.json` file and rename it to `app.json`. Open the file and replace the `MAPBOX_DOWNLOADS_TOKEN_FROM_ENV` value with your own Mapbox API key.

```
cp app.example.json app.json
```

4. Navigate to the ios directory.

```
cd ios
```

5. Duplicate the `Podfile.example` file and rename it to `Podfile`. Open the file and replace the `MAPBOX_DOWNLOADS_TOKEN_FROM_ENV` value with your own Mapbox access token.

```
cp Podfile.example Podfile
```

6. Navigate to the android directory.

```
cd ../android

```

7. Duplicate the `gradle.properties.example` file and rename it to `gradle.properties`. Open the file and replace the `MAPBOX_DOWNLOADS_TOKEN_FROM_ENV` value with your own Mapbox downloads token.

```
cp gradle.properties.example gradle.properties
```

- Note, for the replacement steps, these replaced values should now be strings with the mapbox secret key for download token, in the following format:

```
"sk..."
```


8. Navigate back to the `PackRat` directory.

```
cd ../..
```

9. Navigate to the `next` directory.

```
cd apps/next
```

10. Duplicate the `.env.example` file and rename it to `.env`. Open the file and replace the values with your own.
        - If you have access to the development env file, skip this step. Otherwise, replace the values with your own.

```
cp .env.example .env
```

11. Navigate back to the `PackRat` directory.

```
cd ..
```

10. Navigate to the `server` directory.

```
cd server
```

11. Duplicate the `.env.example` file and rename it to `.env`. Open the file and replace the values with your own.
        - If you have access to the development env file, skip this step. Otherwise, replace the values with your own.

```
cp .env.example .env
```

12.  Navigate back to the `PackRat` directory.

```
cd ..
```

### Yarn Setup

Recommended to open two terminal windows.

#### Root

1.  From the main`PackRat` directory.

```
yarn install
```


#### Server

1. Navigate to the `server` directory.

```
cd server
```

2. Start the server.

```
yarn start
```

#### Client

1. Navigate to the `expo` directory.

```
cd apps/expo
```
- Here you will be able to run the app on an iOS or Android simulator (or on your own device). See the [Expo documentation](https://docs.expo.io/get-started/installation/) for more information on how to set up your development environment.
- If it is your first time running the app, you may need to build the app using the following command.

```
yarn run ios
```
```
yarn run android
```

2. Navigate to the `next` directory.

```
cd apps/next
```

3. Start the Expo/Next server.

```
yarn start
```
Note that the client and server are designed to run concurrently in development mode.



### Debugging Yarn Environment Setup - Windows

**Check yarn and node version:**
```
yarn -v
```
```
node -v
```

**If node version < 18.0.0:**
- Update to latest: https://nodejs.org/en/download

**If yarn version >= 4.0.0:**
- Skip this process

**If you don't have yarn installed:**
- Run command prompt as an administrator
- Run `(corepack comes along with node js 18+)`
  ```
  corepack enable
  ```
- Run
  ```
  yarn set version stable
  ```
- Run
  ```
  yarn install
  ```
- Check yarn version(`yarn -v`): *version >= 4.0.2*
- Restart your code editor if opened

**If yarn version < 4.0.0:**
- Make sure you're using Node 18+
- Go to your windows root path  (`C:\Users\HP)`
- Delete any `.yarnrc.yml` file and `.yarn` folder
- Delete `yarn` folder from `C:\Program Files (x86)`
- Run command prompt as an administrator
- Run `(corepack comes along with node js 18+)`
  ```
  corepack enable
  ```
- Go into the project directory `cd \PackRat`
- Run
  ```
  yarn set version stable
  ```
- Run
  ```
  yarn install
  ```
- Restart your code editor if opened
- If you any encounter errors, try restarting your system.

## Docker Installation 🐳 [Experimental]

PackRat can also be installed using Docker. After setting up the development environment, follow the steps below to install and run the app using Docker.

### Dependencies

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Run the following command to start the app

```
docker-compose build
docker-compose up
```

2. Navigate to `http://localhost:8081/` to view the app. The server will be running on `http://localhost:3000/`.
3. If you encounter errors with edits to files not automatically applying, try running the following commands:

```
docker-compose down
docker-compose build
docker-compose up
```

3. To stop the app, run the following command:

```
docker-compose down
```

4. If you encounter issues with docker-compose, you can build the images manually by running the following commands from the root folder:

```
docker build -t packrat-client client/Dockerfile
docker build -t packrat-server server/Dockerfile
```

5. To run the images, run the following commands:

```
docker run -p 8081:8081 packrat-client
docker run -p 3000:3000 packrat-server
```

## How backend API's are setup
Please refer to README.md inside server folder.

## Contributing 🤝

> [!TIP]
> We have an active community of contributors and users who are happy to help. Join us on Discord to get involved!

Contributions to PackRat are welcome! To contribute, follow these steps:

1. Clone this repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push your changes to the remote branch.
5. Open a pull request.
6. Wait for your pull request to be reviewed and merged.
7. Celebrate! 🎉

## 👏 Special Thanks

- [React Native Developers](https://twitter.com/reactnative)
- [OpenStreetMap Developers](https://www.openstreetmap.org/)
- [RN MapBox Developers](https://github.com/rnmapbox/maps)
- [Cloudflare Developers](https://twitter.com/CloudflareDev)
- [Yusuke Wada](https://twitter.com/yusukebe) - Creator of Hono.js
- [Nate Birdman](https://twitter.com/natebirdman) - Creator of Tamagui
- [Fernando Rojo](https://twitter.com/fernandotherojo) - Creator of Zeego
- [Tanner Linsley](https://twitter.com/tannerlinsley) - Creator of TanStack
- [Expo Developers](https://twitter.com/expo) - Office hours
- [Shopify Developers](https://twitter.com/ShopifyDevs)

## License 📝

PackRat is licensed under the terms of the [GNU General Public License v3.0](LICENSE). See `LICENSE` for more information.