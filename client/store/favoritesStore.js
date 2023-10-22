import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { trpc } from '../trpc';

export const addFavorite = createAsyncThunk(
  'favorites/addFavorite',
  async (newFavorite) => {
    // const response = await axios.post(`${api}/favorite`, newFavorite);
    // return response.data;
    return await trpc.addToFavorite.mutate({
      packId: newFavorite.packId,
      userId: newFavorite.userId,
    });
  },
);

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async () => {
    // const response = await axios.get(`${api}/favorite`);
    // return response.data;
    return await trpc.addToFavorite.mutate({ packId: '', userId: '' });
  },
);

export const fetchUserFavorites = createAsyncThunk(
  'favorites/fetchUserFavorites',
  async (userId) => {
    // const response = await axios.get(`${api}/favorite/user/${userId}`);
    // return response.data;
    return await trpc.getUserFavorites.query({ userId });
  },
);

export const fetchFavoritePacks = createAsyncThunk(
  'favorites/fetchFavoritePacks',
  async (userId) => {
    // const response = await axios.get(`${api}/favorite/user/${userId}/packs`);
    // return response.data;
    return await trpc.getFavoritePacksByUser.query({ userId });
  },
);

const favoritesAdapter = createEntityAdapter();
const favoritePacksAdapter = createEntityAdapter();

const initialState = favoritesAdapter.getInitialState({
  isLoading: false,
  error: null,
  favoritePacks: favoritePacksAdapter.getInitialState(),
});

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  /**
   * Generates the extra reducers for the given builder.
   * @param {object} builder - The builder object.
   */
  extraReducers: (builder) => {
    builder
      .addCase(addFavorite.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        favoritesAdapter.addOne(state, action.payload);
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
        favoritesAdapter.setAll(state, action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserFavorites.fulfilled, (state, action) => {
        favoritesAdapter.setAll(state, action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchUserFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFavoritePacks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavoritePacks.fulfilled, (state, action) => {
        favoritePacksAdapter.setAll(state.favoritePacks, action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchFavoritePacks.rejected, (state, action) => {
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
