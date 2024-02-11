import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const offlineAdaptor = createEntityAdapter();

const offlineSlice = createSlice({
  name: 'offline',
  initialState: offlineAdaptor.getInitialState({
    requests: [],
    isConnected: false,
  }),
  reducers: {
    addOfflineRequest: (state, action) => {
      return {
        ...state,
        requests: [...state.requests, action.payload],
      };
    },
    setOfflineRequests: (state, action) => {
      return {
        ...state,
        requests: action.payload,
      };
    },
    setNetworkStatus: (state, action) => {
      return {
        ...state,
        isConnected: action.payload,
      };
    },
  },
});

export const { addOfflineRequest, setNetworkStatus, setOfflineRequests } =
  offlineSlice.actions;

export default offlineSlice.reducer;
