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

function getUserEncryptionKey() {
  return process.env.ENCRYPTION_KEY ?? "fd2aafcbf5c604e2613b68e9ef794dc5a18a2715927e9a968d3054c1f2be345a"
}

const userKey = getUserEncryptionKey();

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
  transforms: [
    {
      /**
       * Encrypts the given state using AES encryption with the provided user key.
       * @param {Object} state - The state to be encrypted.
       * @param {string} key - The user key used for encryption.
       * @return {string} The encrypted state in the format "IV:encryptedState".
       */
      in: (state, key) => {
        const iv = CryptoJS.lib.WordArray.random(128 / 8);

        const encryptedState = CryptoJS.AES.encrypt(JSON.stringify(state), userKey, {
          iv: iv,
          mode: CryptoJS.mode.CBC, 
          padding: CryptoJS.pad.Pkcs7,
        }).toString();

        return iv.toString(CryptoJS.enc.Hex) + ":" + encryptedState;
      },
      
      /**
       * Decrypts the encrypted state with the given IV and returns the decrypted state.
       * @param {string} encryptedStateWithIv - The encrypted state along with the IV, separated by a colon.
       * @return {Object} The decrypted state.
       */
      out: (encryptedStateWithIv) => {
        const parts = encryptedStateWithIv.split(":");
        const iv = CryptoJS.enc.Hex.parse(parts[0]);
        const encryptedState = parts[1];

        const decryptedState = CryptoJS.AES.decrypt(encryptedState, userKey, {
          iv: iv,
          mode: CryptoJS.mode.CBC, 
          padding: CryptoJS.pad.Pkcs7, 
        }).toString(CryptoJS.enc.Utf8);

        return JSON.parse(decryptedState);
      },
    },
  ],
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
