import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { trpc } from '../trpc';

const itemsAdapter = createEntityAdapter();

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async (itemId) => {
    // const response = await axios.delete(`${api}/item`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   data: {
    //     itemId,
    //   },
    // });
    // return response.data;
    return await trpc.deleteItem.mutate({ itemId });
  },
);

export const editItem = createAsyncThunk('items/editItem', async (newItem) => {
  // const response = await axios.put(`${api}/item/`, newItem);
  // return response.data;
  return await trpc.editItem.mutate({
    _id: newItem._id,
    name: newItem.name,
    quantity: newItem.quantity,
    type: newItem.type,
    weight: newItem.weight,
    unit: newItem.unit,
  });
});

export const getItems = createAsyncThunk('items/getItems', async (packId) => {
  // const response = await axios.get(`${api}/item/${packId}`);
  // return response.data;
  return await trpc.getItems.query({ packId });
});

const initialState = itemsAdapter.getInitialState({
  items: [],
  isLoading: false,
  error: null,
});

const itemsSlice = createSlice({
  name: 'items',
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
