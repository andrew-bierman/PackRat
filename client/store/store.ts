import {
  combineReducers,
  configureStore,
  type Middleware,
} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import trailsReducer from './trailsStore';
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

// Assuming each of the above stores is typed, e.g.,:
// export default weatherSlice.reducer;
// export type WeatherState = ReturnType<typeof weatherSlice.reducer>;

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
  userStore,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // add reducers to persist here
};

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

const persistor = persistStore(store);

export { store, persistor };
