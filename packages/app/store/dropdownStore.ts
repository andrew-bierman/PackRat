import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const dropdownAdapter = createEntityAdapter();

export const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState: dropdownAdapter.getInitialState({
    currentTrail: '',
    currentPark: '',
  }),
  reducers: {
    /**
     * Adds a trail to the state.
     *
     * @param {Object} state - The current state object.
     * @param {Object} action - The action object.
     * @param {any} action.payload - The payload of the action.
     */
    addTrail: (state, action) => {
      dropdownAdapter.updateOne(state, {
        id: 'currentTrail',
        changes: { currentTrail: action.payload },
      });
      state.currentTrail = action.payload;
    },
    /**
     * Adds a park to the state.
     *
     * @param {Object} state - The current state.
     * @param {Object} action - The action object.
     * @param {any} action.payload - The payload of the action.
     */
    addPark: (state, action) => {
      dropdownAdapter.updateOne(state, {
        id: 'currentPark',
        changes: { currentPark: action.payload },
      });
      state.currentPark = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTrail, addPark } = dropdownSlice.actions;
export default dropdownSlice.reducer;
