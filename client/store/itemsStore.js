import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../constants/api";

const itemsAdapter = createEntityAdapter();

const initialState = itemsAdapter.getInitialState({
  items: [],
  isLoading: false,
  error: null,
});

export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (itemId) => {
    const response = await axios.delete(`${api}/item`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        itemId,
      },
    });
    return response.data;
  }
);

export const editItem = createAsyncThunk("items/editItem", async (newItem) => {
  const response = await axios.put(`${api}/item/`, newItem);
  return response.data;
});

export const getItems = createAsyncThunk("items/getItems", async (packId) => {
  const response = await axios.get(`${api}/item/${packId}`);
  return response.data;
});

const itemsSlice = createSlice({
  name: "items",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(editItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editItem.fulfilled, (state, action) => {
        state.items = state.items.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          } else {
            return item;
          }
        });
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        itemsAdapter.setAll(state.items, action.payload);
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllItems,
  selectById: selectItemById ,
} = itemsAdapter.getSelectors((state) => state.items);

export const selectIsLoading = (state) => state.items.isLoading;
export const selectError = (state) => state.items.error;

export default itemsSlice.reducer;
