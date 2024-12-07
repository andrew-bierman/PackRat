import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { Toast } from 'native-base';
import { InformUser } from '../utils/ToastUtils';
import { trpc } from '../trpc';
export const addPack = createAsyncThunk('packs/addPack', async (newPack) => {
  // console.log(newPack, "this is new pack")
  return await trpc.addPack.mutate(newPack);
});

export const deletePackItem = createAsyncThunk(
  'items/deletePackItem',
  async (item) => {
    console.log('item', item);
    // const response = await axios.delete(`${api}/item`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   data: {
    //     itemId: item.itemId,
    //     packId: item.currentPackId,
    //   },
    // });
    // return response.data;
    return await trpc.deleteItem.mutate({
      itemId: item.itemId,
      packId: item.currentPackId,
    });
  },
);

export const changePackStatus = createAsyncThunk(
  'packs/changePackStatus',
  async (updatedPack) => {
    // const response = await axios.put(`${api}/pack`, updatedPack);
    // return response.data;
    return await trpc.editPack.mutate(updatePack);
  },
);

export const fetchUserPacks = createAsyncThunk(
  'packs/fetchUserPacks',
  async (input) => {
    const { ownerId, queryString } = input;
    // const response = await axios.get(
    //   `${api}/pack/${ownerId}/?queryBy=${queryString || 'Most Recent'}`,
    // );
    // return response.data;
    return (await trpc.getPacks.query({ ownerId, queryBy: queryString }))
      ?.packs;
  },
);

export const addPackItem = createAsyncThunk(
  'items/addPackItem',
  async (newItem) => {
    // console.log("calling apis");
    // const response = await axios.post(`${api}/item/`, newItem);

    // return response.data;
    return await trpc.addItem.mutate(newItem);
  },
);

export const duplicatePackItem = createAsyncThunk(
  'items/duplicatePackItem',
  async (newItem) => {
    // const response = await axios.post(`${api}/pack/duplicate`, {
    //   packId: newItem.packId,
    //   ownerId: newItem.ownerId,
    //   items: newItem.items,
    // });
    // return response.data;
    return await trpc.duplicatePublicPack.mutate({
      packId: newItem.packId,
      ownerId: newItem.ownerId,
      items: newItem.items,
    });
  },
);

export const scorePack = createAsyncThunk('packs/scorePack', async (packId) => {
  // const response = await axios.put(`${api}/pack/score/${packId}`);
  // return response.data;
  return await trpc.scorePack.mutate({ packId });
});

export const editPackItem = createAsyncThunk(
  'items/editPackItem',
  async (newItem) => {
    // console.log(newItem, 'new Item here');
    // const response = await axios.put(`${api}/item/`, newItem);
    // console.log(response.data, 'new item response');
    // return response.data;
    return await trpc.editItem.mutate(newItem);
  },
);

export const editItemsGlobalAsDuplicate = createAsyncThunk(
  'Items/editItemsGlobalAsDuplicate',
  async (item) => {
    // const { itemId, packId, name, weight, quantity, unit, type } = item;
    // const response = await axios.put(`${api}/item/global/${itemId}`, {
    //   packId,
    //   name,
    //   weight,
    //   quantity,
    //   unit,
    //   type,
    // });
    // return response.data;
    return await trpc.editGlobalItemAsDuplicate.mutate({
      itemId: item.itemId,
      packId: item.packId,
      name: item.name,
      weight: item.weight,
      quantity: item.quantity,
      unit: item.unit,
      type: item.type,
    });
  },
);

export const updatePack = createAsyncThunk('packs/updatePack', async (pack) => {
  // const response = await axios.put(`${api}/pack`, {
  //   _id: pack._id,
  //   name: pack.name,
  //   is_public: pack.is_public,
  // });
  // return response.data;
  return await trpc.editPack.mutate({
    packId: pack._id,
    name: pack.name,
    is_public: pack.is_public,
  });
});

export const deletePack = createAsyncThunk('packs/deletePack', async (pack) => {
  // const response = await axios.delete(`${api}/pack`, {
  //   data: { packId: pack.id },
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // return response.data;
  return await trpc.deletePack.mutate({ packId: pack._id });
});

const packsAdapter = createEntityAdapter({
  selectId: (pack) => pack._id,
});
// console.log("🚀 ~ file: packsStore.js:143 ~ packsAdapter:", packsAdapter)

const initialState = packsAdapter.getInitialState({
  isLoading: false,
  error: null,
  isOpenEditModal: false,
  update: false,
});

const packsSlice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpenEditModal = true;
    },
    closeModal: (state) => {
      state.isOpenEditModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPack.pending, (state) => {
        state.isLoading = true;

        state.error = null;
      })
      .addCase(addPack.fulfilled, (state, action) => {
        packsAdapter.addOne(state, action.payload.createdPack);
        state.isLoading = false;
        state.error = null;
        state.update = true;
      })
      .addCase(addPack.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(changePackStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changePackStatus.fulfilled, (state, action) => {
        packsAdapter.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        });
        state.isLoading = false;
        state.error = null;
      })
      .addCase(changePackStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserPacks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserPacks.fulfilled, (state, action) => {
        packsAdapter.setAll(state, action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchUserPacks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addPackItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addPackItem.fulfilled, (state, action) => {
        const existingPack = state.entities[action.payload.packId];
        if (existingPack) {
          packsAdapter.updateOne(state, {
            id: action.payload.packId,
            changes: { items: [...existingPack.items, action.payload.newItem] },
          });
        }
        state.isLoading = false;
        state.error = null;
        state.update = !state.update;
      })
      .addCase(addPackItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(editPackItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editPackItem.fulfilled, (state, action) => {
        const newItem = action.payload;
        const packIds = newItem.packs; // packIds is an array of pack Ids

        packIds.forEach((packId) => {
          console.log('packid', packId);
          // loop through each packId
          const existingPack = state.entities[packId];
          console.log('existingPack', existingPack);
          if (!existingPack) {
            return;
          }

          const updatedItems = existingPack.items.map((item) =>
            item._id === newItem._id ? newItem : item,
          );
          console.log('updatediTEMS', updatedItems);

          packsAdapter.updateOne(state, {
            id: packId,
            changes: { items: updatedItems },
          });
        });

        state.isLoading = false;
        state.error = null;
        state.isOpenEditModal = false;
        state.update = !state.update;
      })

      .addCase(editPackItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(deletePackItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePackItem.fulfilled, (state, action) => {
        const { itemId, currentPackId } = action.meta.arg;

        const existing = state.entities[currentPackId];
        if (!existing) {
          return;
        }

        const updatedItems = existing.items.filter(
          (item) => item._id !== itemId,
        );

        packsAdapter.updateOne(state, {
          id: currentPackId,
          changes: { items: updatedItems },
        });

        state.isLoading = false;
        state.error = null;
        state.update = !state.update;
      })

      .addCase(deletePackItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(scorePack.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(scorePack.fulfilled, (state, action) => {
        packsAdapter.updateOne(state, {
          id: action.payload.updatedPack._id,
          changes: action.payload.updatedPack,
        });
        state.isLoading = false;
        state.error = null;
      })
      .addCase(scorePack.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(editItemsGlobalAsDuplicate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editItemsGlobalAsDuplicate.fulfilled, (state, action) => {
        const { itemId, packId } = action.meta.arg;
        const existingPack = state.entities[packId];

        if (!existingPack) {
          return;
        }
        const updatedItems = existingPack.items.map((item) =>
          item._id === itemId ? action.payload : item,
        );
        console.log('updated items', updatedItems);

        packsAdapter.updateOne(state, {
          id: packId,
          changes: { items: updatedItems },
        });
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editItemsGlobalAsDuplicate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(duplicatePackItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(duplicatePackItem.fulfilled, (state, action) => {
        isLoading = false;
        state.error = null;
      })
      .addCase(duplicatePackItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updatePack.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePack.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        InformUser({
          title: 'Pack has been succesfully updated',
          placement: 'bottom',
          duration: 2000,
          style: {
            backgroundColor: 'green',
          },
        });
      })
      .addCase(updatePack.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        InformUser({
          title: 'Error while Updating pack',
          placement: 'bottom',
          duration: 2000,
          style: {
            backgroundColor: 'red',
          },
        });
      })
      .addCase(deletePack.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePack.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        console.log('here fyl');
      })
      .addCase(deletePack.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectAll: selectAllPacks, selectById: selectPackById } =
  packsAdapter.getSelectors((state) => state.packs);

export const selectIsLoading = (state) => state.packs.isLoading;
export const selectError = (state) => state.packs.error;

export const { openModal, closeModal } = packsSlice.actions;

export default packsSlice.reducer;
