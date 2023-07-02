import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../constants/api";

const favoriteAdapter = createEntityAdapter();

const initialState = favoriteAdapter.getInitialState({
  favorites: [],
  isLoading: false,
  error: null,
});

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
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFavorite.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        favoriteAdapter.addOne(state.favorites, action.payload);
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
        favoriteAdapter.setAll(state.favorites, action.payload);
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

export const {
  selectAll: selectAllFavourites,
  selectById: selectFavouriteById,
} = favoriteAdapter.getSelectors((state) => state.favorites);

export const selectIsLoading = (state) => state.favorites.isLoading;
export const selectError = (state) => state.favorites.error;

export default favoritesSlice.reducer;
