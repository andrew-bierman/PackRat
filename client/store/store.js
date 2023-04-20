import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherStore";
import dropdownReducer from "./dropdownStore";
import trailsReducer from "./trailsStore";
import searchReducer from "./searchStore";

export default configureStore({
  reducer: {
    weather: weatherReducer,
    dropdown: dropdownReducer,
    trails: trailsReducer,
    search: searchReducer,
  },
});
