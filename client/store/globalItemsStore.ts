import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { trpc } from '../trpc';

export const addItemsGlobal = createAsyncThunk(
  'Items/addItemsGlobal',
  async (newItem) => {
    // const response = await axios.post(`${api}/item/global`, newItem);
    // return response.data;
    return await trpc.addItemGlobal.mutate({
      name: newItem.name,
      packId: newItem.packId,
      quantity: newItem.quantity,
      type: newItem.type,
      weight: newItem.weight,
      unit: newItem.unit,
    });
  },
);

export const getItemsGlobal = createAsyncThunk(
  'Items/getItemsGlobal',
  async ({ limit, page }) => {
    try {
      // const response = await axios.get(
      //   `${api}/item/global?limit=${limit}&page=${page}`,
      // );
      // return response.data;
      return await trpc.getItemsGlobally.query({ limit, page });
    } catch (error) {
      console.log('error', error.message);
    }
  },
);

export const deleteGlobalItem = createAsyncThunk(
  'items/deleteGlobalItem',
  async (item) => {
    // const response = await axios.delete(`${api}/item/global/${item}`);
    // return response.data;
    return await trpc.deleteGlobalItem.mutate({ itemId: item });
  },
);

export const editGlobalItem = createAsyncThunk(
  'items/editGlobalItem',
  async (newItem) => {
    // const response = await axios.put(`${api}/item/`, newItem);
    // return response.data;
    return await trpc.addItem({
      name: newItem.name,
      packId: newItem.packId,
      quantity: newItem.quantity,
      type: newItem.type,
      weight: newItem.weight,
      unit: newItem.unit,
      ownerId: newItem.ownerId,
    });
  },
);

const itemsAdapter = createEntityAdapter({
  selectId: (item) => item._id, // Assuming the unique identifier field is '_id'
});

const itemsSlice = createSlice({
  name: 'globalItems',
  initialState: itemsAdapter.getInitialState({
    globalItems: [],
    isLoading: false,
    error: null,
  }),
  reducers: {
    deleteItemOffline: (state, action) => {
      return {
        ...state,
        globalItems: {
          ...state.globalItems,
          items: state?.globalItems?.items?.filter(
            (item) => item._id !== action.payload,
          ),
        },
      };
    },
    addItemOffline: (state, action) => {
      console.log(action.payload, 'add item offline');
      return {
        ...state,
        globalItems: {
          ...state.globalItems,
          items: [...state.globalItems.items, action.payload],
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemsGlobal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addItemsGlobal.fulfilled, (state, action) => {
        itemsAdapter.addOne(state, { ...action.payload });
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
        itemsAdapter.setAll(state, action.payload);
        state.globalItems = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getItemsGlobal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteGlobalItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteGlobalItem.fulfilled, (state, action) => {
        itemsAdapter.removeOne(state, action.payload._id);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteGlobalItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { deleteItemOffline, addItemOffline } = itemsSlice.actions;

export default itemsSlice.reducer;
