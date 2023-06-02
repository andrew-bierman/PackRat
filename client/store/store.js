import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherStore";
import dropdownReducer from "./dropdownStore";
import authReducer from "./authStore";
import trailsReducer from "./trailsStore";
import searchReducer from "./searchStore";
import parksReducer from "./parksStore";
import itemsReducer from "./itemsStore";
import packsReducer from "./packsStore";
import favoritesReducer from "./favoritesStore";
import feedReducer from "./feedStore";
import singlePackReducer from "./singlePackStore";
import singleTripReducer from "./singleTripStore";
import tripsReducer from "./tripsStore";
import usersReducer from "./userStore";

export default configureStore({
  reducer: {
    auth: authReducer,
    dropdown: dropdownReducer,
    search: searchReducer,
    weather: weatherReducer,
    trails: trailsReducer,
    parks: parksReducer,
    items: itemsReducer,
    packs: packsReducer,
    trips: tripsReducer,
    favorites: favoritesReducer,
    singlePack: singlePackReducer,
    singleTrip:singleTripReducer,
    feed: feedReducer,
    users: usersReducer
  },
});
