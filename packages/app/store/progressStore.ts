import { createSlice } from '@reduxjs/toolkit';

export const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    currentValue: 0,
    targetValue: 0,
  },
  reducers: {
    setCurrentProgress: (state, action) => {
      state.currentValue = action.payload;
    },
    setTargetProgress: (state, action) => {
      state.targetValue = action.payload;
    },
    resetProgress: (state) => {
      state.currentValue = 0;
      state.targetValue = 0;
    },
  },
});

export const { setCurrentProgress, setTargetProgress, resetProgress } =
  progressSlice.actions;

export default progressSlice.reducer;
