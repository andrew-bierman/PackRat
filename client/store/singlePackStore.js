// redux toolkit slice for single pack

import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import axios from "axios";

import { api } from "../constants/api";

export const singlePackAdapter = createEntityAdapter({
  selectId: (singlePack) => singlePack._id,
});

// Step 2: Create the initial state using the entity adapter
const initialState = singlePackAdapter.getInitialState({
  singlePack: {},
  isLoading: false,
  error: null,
});

export const fetchSinglePack = createAsyncThunk(
  "packs/fetchSinglePack",
  async (packId) => {
    const response = await axios.get(`${api}/pack/p/${packId}`);
    return response.data;
  }
);
export const selectItemsGlobal = createAsyncThunk(
  "Items/selectItemsGlobal",
  async (item) => {
    try {
      const itemId = item.selectedItem;
      const ownerId = item.ownerId;
      const packId = item.packId;

      const response = await axios.post(`${api}/item/global/select/${packId}`, {
        itemId: itemId,
        ownerId: ownerId,
      });
      return response.data;
    } catch (error) {
      console.log("error", error.message);
    }
  }
);

export const updateExistingSinglePack = createAsyncThunk(
  "packs/updateExistingSinglePack",
  async (pack) => {
    return pack;
  }
);
export const addNewSinglePack = createAsyncThunk(
  "packs/addNewSinglePack",
  async (pack) => {
    return pack;
  }
);

const singlePackSlice = createSlice({
  name: "singlePack",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSinglePack.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSinglePack.fulfilled, (state, action) => {
        singlePackAdapter.setAll(state.singlePack, action.payload);
        state.singlePack = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchSinglePack.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(selectItemsGlobal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(selectItemsGlobal.fulfilled, (state, action) => {
        state.singlePack.items.push(action.payload.data);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(selectItemsGlobal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateExistingSinglePack.fulfilled, (state, action) => {
        const index = state.singlePack.items.findIndex(
          (x) => x._id === action.payload._id
        );
        if (index === -1) return;
        const data = JSON.parse(JSON.stringify(state.singlePack));
        data.items[index] = {
          ...data.items[index],
          name: action.payload.name,
          quantity: parseInt(`${action.payload.quantity}`),
          type: action.payload.type,
          unit: action.payload.unit,
          weight: parseInt(`${action.payload.weight}`),
        };

        state.singlePack = data;
      })
      .addCase(addNewSinglePack.fulfilled, (state, action) => {
        const data = JSON.parse(JSON.stringify(state.singlePack));
        data.items.push({
          ...action.payload,
          category: { name: action.payload.type },
          quantity: parseInt(`${action.payload.quantity}`),
          weight: parseInt(`${action.payload.weight}`),
        });

        state.singlePack = data;
      });
  },
});

export const {
  selectById: selectSinglePackById,
  selectAll: selectAllSinglePacks,
} = singlePackAdapter.getSelectors((state) => state.singlePack);

export default singlePackSlice.reducer;
