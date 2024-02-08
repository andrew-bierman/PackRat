'use client';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  type PersistConfig,
} from 'redux-persist';
import { Platform } from 'react-native';

// middleware
import apiMessageMiddleware from './middleware/apiMessageMiddleware';

// all reducers - TODO: move to separate folder
import weatherReducer from './weatherStore';
import dropdownReducer from './dropdownStore';
import authReducer from './authStore';
// import trailsReducer from './trailsStore';
import trailsReducer2 from './trailsStore_copy'; // TODO: remove. This was super hacky fix for trailsReducer not working. No idea why it's not working.
import searchReducer from './searchStore';
// import parksReducer from './parksStore';
import itemsReducer from './itemsStore';
import packsReducer from './packsStore';
import singlePackReducer from './singlePackStore';
import singleTripReducer from './singleTripStore';
import tripsReducer from './tripsStore';
import destinationReducer from './destinationStore';
import globalItems from './globalItemsStore';
// import userStore from './userStore';
import offlineQueue from './offlineQueue';
import progressReducer from './progressStore';
import { type Reducer } from 'react';
import storage from './customStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  dropdown: dropdownReducer,
  search: searchReducer,
  weather: weatherReducer,
  items: itemsReducer,
  packs: packsReducer,
  trips: tripsReducer,
  singlePack: singlePackReducer,
  singleTrip: singleTripReducer,
  destination: destinationReducer,
  globalItems,
  offlineQueue,
  progress: progressReducer,
  // trails : trailsReducer
  trails: trailsReducer2, // TODO: remove. This was super hacky fix for trailsReducer not working. No idea why it's not working.
});
export type RootState = ReturnType<typeof rootReducer>;

// configure persist store and whitelist reducers
const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  // storage: storage,
  storage: Platform.OS === 'web' ? storage : AsyncStorage,
  whitelist: ['auth', 'globalItems', 'offlineQueue'], // add reducers to persist here
};

// create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(apiMessageMiddleware),
});

export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
