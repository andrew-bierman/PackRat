import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const dropdownAdapter = createEntityAdapter();

const initialState = dropdownAdapter.getInitialState({
  currentTrail: "",
  currentPark: "",
})

export const dropdownSlice = createSlice({
  name: "dropdown",
  initialState: initialState,
  reducers: {
    addTrail: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      dropdownAdapter.addOne(state.currentTrail, action.payload);
      state.currentTrail = action.payload;
    },
    addPark: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      dropdownAdapter.addOne(state.currentPark, action.payload);
      state.currentPark = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTrail, addPark } = dropdownSlice.actions;

export const {
  selectAll: selectAllDropdowns,
  selectById: selectDropdownById,
} = dropdownAdapter.getSelectors((state) => state.dropdown);

export const selectIsLoading = (state) => state.dropdown.isLoading;
export const selectError = (state) => state.dropdown.error;

export default dropdownSlice.reducer;
