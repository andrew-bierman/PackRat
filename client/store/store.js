import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherStore";
import dropdownReducer from "./dropdownStore";
import authReducer from "./authStore";

export default configureStore({
  reducer: {
    weather: weatherReducer,
    dropdown: dropdownReducer,
    auth: authReducer
  },
});
