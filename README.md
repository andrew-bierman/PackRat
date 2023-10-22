# PackRat 🎒

PackRat is the ultimate adventure planner designed for those who love to explore the great outdoors. Our app helps users plan and organize their trips with ease, whether it's a weekend camping trip, a day hike, or a cross-country road trip.

With PackRat, you can create and manage trips, discover new destinations, and stay informed with up-to-date weather forecasts. Our app integrates with Mapbox to provide you with accurate maps and directions to your destinations, as well as suggestions for popular outdoor activities based on the location and season of your trip.

So pack your bags, grab your friends, and get ready for your next adventure with PackRat!

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
   - See the `.env.example` files in the `client` and `server` directories for the necessary environment variables.

#### Automated Setup 🛠️

1. Run the setup script from the `PackRat` directory.
```
yarn setup
```

#### Manual Setup 📝

1. Navigate to the `PackRat` directory if you are not already there.

2. Navigate to the `client` directory.

```
cd client
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


1. Navigate back to the `PackRat` directory.

```
cd ../..
```

9. Navigate to the `server` directory.

```
cd server
```

10. Duplicate the `.env.example` file and rename it to `.env`. Open the file and replace the values with your own.
        - If you have access to the development env file, skip this step. Otherwise, replace the values with your own.

```
cp .env.example .env
```

1.  Navigate back to the `PackRat` directory.

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

1. Navigate to the `client` directory.

```
cd client
```

2. Start the Expo server.

```
yarn start
```

4. Here you will be able to run the app on an iOS or Android simulator (or on your own device), or on the web. See the [Expo documentation](https://docs.expo.io/get-started/installation/) for more information on how to set up your development environment.

Note that the client and server are designed to run concurrently in development mode.

## Docker Installation 🐳

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

Contributions to PackRat are welcome! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request.

## License 📝

PackRat is licensed under the terms of the [GNU General Public License v3.0](LICENSE). See `LICENSE` for more information.
