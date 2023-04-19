import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherStore";
import dropdownReducer from "./dropdownStore";
import trailsReducer from "./trailsStore";

export default configureStore({
  reducer: {
    weather: weatherReducer,
    dropdown: dropdownReducer,
    trails: trailsReducer
  },
});
