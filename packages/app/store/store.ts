"use client"
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  type PersistConfig,
} from 'redux-persist';

// middleware
import apiMessageMiddleware from './middleware/apiMessageMiddleware';

// all reducers - TODO: move to separate folder
import weatherReducer from './weatherStore';
import dropdownReducer from './dropdownStore';
import authReducer from './authStore';
// import trailsReducer from './trailsStore';
import trailsReducer2 from './trailsStore_copy'; // TODO: remove. This was super hacky fix for trailsReducer not working. No idea why it's not working.
import searchReducer from './searchStore';
import parksReducer from './parksStore';
import itemsReducer from './itemsStore';
import packsReducer from './packsStore';
import favoritesReducer from './favoritesStore';
import feedReducer from './feedStore';
import singlePackReducer from './singlePackStore';
import singleTripReducer from './singleTripStore';
import tripsReducer from './tripsStore';
import gpxReducer from './gpxStore';
import destinationReducer from './destinationStore';
import chatReducer from './chatStore';
import globalItems from './globalItemsStore';
import userStore from './userStore';
import offlineQueue from './offlineQueue';
import progressReducer from './progressStore';
import { type Reducer } from 'react';

// combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  dropdown: dropdownReducer,
  search: searchReducer,
  weather: weatherReducer,
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
  userStore,
  offlineQueue,
  progress: progressReducer,
  // trails : trailsReducer
  trails: trailsReducer2, // TODO: remove. This was super hacky fix for trailsReducer not working. No idea why it's not working.
});
export type RootState = ReturnType<typeof rootReducer>;

let storage;
if (typeof window !== 'undefined') {
  console.log('Using localStorage in web environment');
  // Use localStorage in web environment
  storage = window.localStorage;
} else {
  console.log('Using AsyncStorage in React Native environment');
  // Use AsyncStorage in React Native environment
  storage = require('@react-native-async-storage/async-storage').default;
}

// configure persist store and whitelist reducers
const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['auth', 'globalItems', 'offlineQueue'], // add reducers to persist here
};

// create persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(apiMessageMiddleware),
});

export type AppDispatch = typeof store.dispatch;

// const persistor = persistStore(store); 

export { store,
  //  persistor 
  };
