import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherStore";
import dropdownReducer from "./dropdownStore";
import trailsReducer from "./trailsStore";
import searchReducer from "./searchStore";
import parksReducer from "./parksStore";

export default configureStore({
  reducer: {
    weather: weatherReducer,
    dropdown: dropdownReducer,
    trails: trailsReducer,
    parks: parksReducer,
    search: searchReducer,
  },
});
