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
// import trailsReducer from './trailsStore';
import offlineQueue from './offlineQueue';
import progressReducer from './progressStore';
import { type Reducer } from 'react';
import storage from './customStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// combine reducers
const rootReducer = combineReducers({
  offlineQueue,
  progress: progressReducer,
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
