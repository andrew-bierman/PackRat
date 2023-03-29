import { createSlice } from "@reduxjs/toolkit";

export const dropdownSlice = createSlice({
  name: "dropdown",
  initialState: {
    currentTrail: "",
    currentPark: "",
  },
  reducers: {
    addTrail: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.currentTrail = action.payload;
    },
    addPark: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.currentPark = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTrail, addPark } = dropdownSlice.actions;
export default dropdownSlice.reducer;
