import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { addItemsGlobal, deleteGlobalItem } from './globalItemsStore';
import NetInfo from '@react-native-community/netinfo';

const items = {
  deleteItem: deleteGlobalItem,
  addGlobalItem: addItemsGlobal,
};
const offlineAdaptor = createEntityAdapter();

interface offlineRequestObj {
  method: string;
  data: any;
}
export const executeOfflineRequests = createAsyncThunk(
  'offline/execute',
  async (data: [], { dispatch }) => {
    data.forEach(async (item: offlineRequestObj) => {
      try {
        const method = items[item.method];
        await dispatch(method(item.data));
      } catch (err) {
        console.warn(err);
      }
    });
    return [];
  },
);

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
  extraReducers: (builder) => {
    builder.addCase(executeOfflineRequests.fulfilled, (state) => {
      state.requests = [];
    });
  },
});

export const { addOfflineRequest, setNetworkStatus, setOfflineRequests } =
  offlineSlice.actions;

export default offlineSlice.reducer;
