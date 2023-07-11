import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../constants/api";

export const addItemsGlobal = createAsyncThunk(
  "Items/addItemsGlobal",
  async (newItem) => {
    const response = await axios.post(`${api}/item/global`, newItem);
    return response.data;
  }
);
export const getItemsGlobal = createAsyncThunk(
  "Items/getItemsGlobal",
  async (limit, page) => {
    const response = await axios.get(
      `${api}/item/global?limit=${limit}&page=${page}`
    );
    return response.data;
  }
);

const itemsSlice = createSlice({
  name: "globalItems",
  initialState: {
    globalItems: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItemsGlobal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addItemsGlobal.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addItemsGlobal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getItemsGlobal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getItemsGlobal.fulfilled, (state, action) => {
        state.globalItems = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getItemsGlobal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default itemsSlice.reducer;
