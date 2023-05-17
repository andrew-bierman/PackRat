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
- MERN stack: a collection of technologies including MongoDB, Express.js, React, and Node.js for building full-stack web applications.
- Redux: a predictable state container for JavaScript apps.
- Mapbox: a location data platform for mobile and web applications.

## Local installation 📲

PackRat consists of two main components: a client and a server. Follow the steps below to install and run both components.

### Client

1. Navigate to the `client` directory: `cd client`.
2. Create a new file called `.env` and add the necessary environment variables. You can copy the `.env.example` file and replace the values with your own.
3. Copy the `app.example.json` file and rename it to `app.json`. Open the file and replace the `MAPBOX_API_KEY` value with your own Mapbox API key.
4. Navigate to the ios directory
5. Copy the `Podfile.example` file and rename it to `Podfile`. Open the file and replace the `MAPBOX_ACCESS_TOKEN` value with your own Mapbox access token.
6. Navigate to the android directory. 
7. Copy the `gradle.properties.example` file and rename it to `gradle.properties`. Open the file and replace the `MAPBOX_DOWNLOADS_TOKEN` value with your own Mapbox downloads token.
8. Install dependencies using `npm install`.
9.  Start the app using `npm run dev`.
10. Install dependencies using `npm install`.
11. Start the app using `npm run ios` or `npm run android`.

### Server

1. Navigate to the `server` directory: `cd server`.
2. Create a new file called `.env` and add the necessary environment variables. You can copy the `.env.example` file and replace the values with your own.
3. Install dependencies using `npm install`.
4. Start the server using `npm start`.

Make sure to start the server before starting the client, as the client relies on the server for data.

Note that the client and server are designed to run concurrently in development mode. To do so, follow these steps:

This will start both the client and server simultaneously.

## Docker Installation 🐳

PackRat can also be installed using Docker. Follow the steps below to install and run the app using Docker.

### Dependencies

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repository: 

HTTPS:
```
git clone https://github.com/andrew-bierman/PackRat.git
```
SSH:
```
git clone git@github.com:andrew-bierman/PackRat.git
```


2. In the `client` directory, create a new file called `.env` and add the necessary environment variables. You can copy the `.env.example` file and replace the values with your own.
3. In the `server` directory, create a new file called `.env` and add the necessary environment variables. You can copy the `.env.example` file and replace the values with your own.
4. Run the following command to start the app
```
docker-compose build
docker-compose up
```
5. Navigate to `http://localhost:19000/` to view the app. The server will be running on `http://localhost:3000/`.
6. If you encounter errors, try running the following commands:
```
docker-compose down
docker-compose build
docker-compose up
```

## Contributing 🤝

Contributions to PackRat are welcome! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request.

## License 📝

PackRat is licensed under the terms of the [GNU General Public License v3.0](LICENSE). See `LICENSE` for more information.
