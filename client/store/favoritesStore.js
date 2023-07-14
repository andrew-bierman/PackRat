import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../constants/api";

export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async (newFavorite) => {
    const response = await axios.post(`${api}/user/favorite`, newFavorite);
    return response.data;
  }
);

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async () => {
    const response = await axios.get(`${api}/user/favorite`);
    return response.data;
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFavorite.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default favoritesSlice.reducer;
