
# How TRPC and REST API's are working on backend

### API Reference

Our TRPC server is seamlessly integrated with the REST API using the `express.use()` function. This integration allows us to call all our endpoints from the frontend as simple functions, eliminating the need for Axios requests.

We've taken a streamlined approach to keep our codebase clean and reduce redundancy. By installing our backend as a library on the frontend, we can leverage the same functions in both places, simplifying development. Additionally, we've organized our REST API endpoints within the server folder. This structure provides a fallback option in case any issues arise with the TRPC setup, minimizing production downtime.

As we move forward, we have the flexibility to switch between REST API and TRPC based on our specific use cases and requirements. Moreover, it's worth noting that you can treat TRPC endpoints just like REST API endpoints when calling them from the frontend.
TRPC Endpoints
```
    /api/trpc
```
REST API Endpoints
```
    / or /api/
```

This setup allows us to maintain a user-friendly and efficient development process while ensuring adaptability to changing needs.
## Documentation

Refer swagger for REST api endpoints

#### Available TRPC Endpoint Functions

Here is a list of available TRPC endpoint functions provided by the appRouter, categorized by their respective domains:

User Routes

    getUserById: Retrieve user information by ID.
    signIn: Sign in a user.
    signUp: Sign up a new user.
    resetPassword: Request a password reset.
    getGoogleAuthURL: Get Google authentication URL.
    googleSignin: Sign in using Google credentials.
    editUser: Edit user profile.
    deleteUser: Delete a user account.
    getMe: Retrieve the current user's information.
    emailExists: Check if an email exists.
    checkCode: Check a verification code.
    getUsers: Retrieve a list of users.
    resetPasswordEmail: Send a password reset email.
    updatePassword: Update user password.

Weather Routes

    getWeather: Get weather information.
    getWeatherWeek: Get weather forecast for a week.

Trips Routes

    getPublicTripsRoute: Get public trips.
    getTrips: Get user-specific trips.
    getTripById: Get a specific trip by ID.
    addTrip: Add a new trip.
    editTrip: Edit an existing trip.
    deleteTrip: Delete a trip.

Templates Routes

    getTemplates: Get templates.
    getTemplateById: Get a specific template by ID.
    addTemplate: Add a new template.
    editTemplate: Edit an existing template.
    deleteTemplate: Delete a template.

Password Reset Routes

    requestPasswordResetEmailAndToken: Request a password reset email and token.
    handlePasswordReset: Handle a password reset request.

Packs Routes

    getPublicPacks: Get public packs.
    getPacks: Get user-specific packs.
    getPackById: Get a specific pack by ID.
    addPack: Add a new pack.
    editPack: Edit an existing pack.
    deletePack: Delete a pack.
    scorePack: Score a pack.
    duplicatePublicPack: Duplicate a public pack.

OSM Routes

    getPhotonResults: Get results from the Photon geocoding service.
    getTrailsOSM: Get trails information from OpenStreetMap (OSM).
    getParksOSM: Get parks information from OpenStreetMap (OSM).
    getOsm: Get general information from OpenStreetMap (OSM).
    postSingleGeoJSON: Post a single GeoJSON object.
    getDestination: Get destination information.
    getPhotonDetails: Get detailed information from the Photon geocoding service.

Open AI Routes

    getAIResponse: Get responses from the OpenAI API.
    getUserChats: Retrieve user chats.

Item Routes

    getItems: Get a list of items.
    getItemById: Get an item by its ID.
    searchItemsByName: Search for items by name.
    addItem: Add a new item.
    editItem: Edit an existing item.
    deleteItem: Delete an item.
    addItemGlobal: Add an item globally.
    getItemsGlobally: Get globally available items.
    addGlobalItemToPack: Add a globally available item to a pack.
    editGlobalItemAsDuplicate: Edit a globally available item as a duplicate.
    deleteGlobalItem: Delete a globally available item.

Trails Routes

    getTrails: Get trails information.

Parks Route

    getParks: Get parks information.

Geo Code Routes

    getGeoCode: Get geocoding information.

Favorite Routes

    addToFavorite: Add an item to favorites.
    getUserFavorites: Get user favorites.
    getFavoritePacksByUser: Get favorite packs by user.


## Acknowledgements

 - [TRPC Quickstart](https://trpc.io/docs/quickstart)
 - [React Query Integration](https://trpc.io/docs/client/react/setup)
