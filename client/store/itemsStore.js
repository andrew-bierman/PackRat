import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../constants/api";

const itemsAdapter = createEntityAdapter();

export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (itemId) => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.delete(`${api}/item`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      data: {
        itemId,
      },
    });
    return response.data;
  }
);

export const editItem = createAsyncThunk("items/editItem", async (newItem) => {
  const token = await AsyncStorage.getItem('userToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.put(`${api}/item/`, newItem,config);
  return response.data;
});

export const getItems = createAsyncThunk("items/getItems", async (packId) => {
  const token = await AsyncStorage.getItem('userToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.get(`${api}/item/${packId}`,config);
  return response.data;
});

const initialState = itemsAdapter.getInitialState({
  items: [],
  isLoading: false,
  error: null,
});

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        itemsAdapter.removeOne(state, action.payload.id);
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
        itemsAdapter.upsertOne(state, action.payload);
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
        itemsAdapter.setAll(state, action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default itemsSlice.reducer;
