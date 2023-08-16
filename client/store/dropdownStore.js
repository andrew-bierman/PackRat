import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const dropdownAdapter = createEntityAdapter();

export const dropdownSlice = createSlice({
  name: "dropdown",
  initialState: dropdownAdapter.getInitialState({
    currentTrail: "",
    currentPark: "",
  }),
  reducers: {
    addTrail: (state, action) => {
      dropdownAdapter.updateOne(state, { id: "currentTrail", changes: { currentTrail: action.payload } });
      state.currentTrail = action.payload;
    },
    addPark: (state, action) => {
      dropdownAdapter.updateOne(state, { id: "currentPark", changes: { currentPark: action.payload } });
      state.currentPark = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTrail, addPark } = dropdownSlice.actions;
export default dropdownSlice.reducer;
