import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
  useAddFavoriteMutation,
  useFetchFavoritesQuery,
  useFetchUserFavoritesQuery,
  useFetchFavoritePacksQuery,
} from 'store/customTrpc/customTRPCQueryHooks';

const favoritesAdapter = createEntityAdapter();
const favoritePacksAdapter = createEntityAdapter();

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: favoritesAdapter.getInitialState({
    isLoading: false,
    error: null,
    favoritePacks: favoritePacksAdapter.getInitialState(),
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(useAddFavoriteMutation.mutate, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(useAddFavoriteMutation.fulfilled, (state, action) => {
        favoritesAdapter.addOne(state, action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(useAddFavoriteMutation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(useFetchFavoritesQuery.mutate, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(useFetchFavoritesQuery.fulfilled, (state, action) => {
        favoritesAdapter.setAll(state, action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(useFetchFavoritesQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(useFetchUserFavoritesQuery.mutate, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(useFetchUserFavoritesQuery.fulfilled, (state, action) => {
        favoritesAdapter.setAll(state, action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(useFetchUserFavoritesQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(useFetchFavoritePacksQuery.mutate, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(useFetchFavoritePacksQuery.fulfilled, (state, action) => {
        favoritePacksAdapter.setAll(state.favoritePacks, action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(useFetchFavoritePacksQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectAll: selectAllFavorites, selectById: selectFavoriteById } =
  favoritesAdapter.getSelectors((state) => state.favorites);

export const {
  selectAll: selectAllFavoritePacks,
  selectById: selectFavoritePackById,
} = favoritePacksAdapter.getSelectors((state) => state.favorites.favoritePacks);

export default favoritesSlice.reducer;
