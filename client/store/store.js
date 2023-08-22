import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import apiMessageMiddleware from "./middleware/apiMiddleware";
import CryptoJS from 'crypto-js';

// all reducers
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
import gpxReducer from "./gpxStore";
import destinationReducer from "./destinationStore";
import chatReducer from "./chatStore";
import globalItems from "./globalItemsStore";
import userStore from './userStore';
import bearerTokenMiddleware from "./middleware/bearerTokenMiddleware";

// combine reducers
const rootReducer = combineReducers({
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
  singleTrip: singleTripReducer,
  feed: feedReducer,
  gpx: gpxReducer,
  destination: destinationReducer,
  chat: chatReducer,
  globalItems,
  chat: chatReducer,
  userStore,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
  transforms: [
    {
      in: (state) => {
        const encryptedState = CryptoJS.AES.encrypt(JSON.stringify(state), process.env.ENCRYPTION_KEY).toString();
        return encryptedState;
      },
      out: (encryptedState) => {
        const bytes = CryptoJS.AES.decrypt(encryptedState, process.env.ENCRYPTION_KEY);
        const decryptedState = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedState;
      }
    }
  ]
};


// create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    })
      .concat(
        bearerTokenMiddleware,
        apiMessageMiddleware
      ),
});

const persistor = persistStore(store);

export { store, persistor };
