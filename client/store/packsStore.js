import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../constants/api";
import { Toast } from "native-base";
import { InformUser } from "../utils/ToastUtils";
export const addPack = createAsyncThunk("packs/addPack", async (newPack) => {
  const response = await axios.post(`${api}/pack/`, newPack);
  return response.data;
});

export const deletePackItem = createAsyncThunk(
  "items/deletePackItem",
  async (item) => {
    console.log("item", item);
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.delete(`${api}/item`, {
      headers: {
        "Content-Type": "application/json",
       "Authorization": `Bearer ${token}` 
      },
      data: {
        itemId: item.itemId,
        packId: item.currentPackId,
      },
    });
    return response.data;
  }
);

export const changePackStatus = createAsyncThunk(
  "packs/changePackStatus",
  async (updatedPack) => {
    const token = await AsyncStorage.getItem('userToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.put(`${api}/pack`, updatedPack,config);
    return response.data;
  }
);

export const fetchUserPacks = createAsyncThunk(
  "packs/fetchUserPacks",
  async (ownerId) => {
    const token = await AsyncStorage.getItem('userToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.get(`${api}/pack/${ownerId}`,config);
    return response.data;
  }
);

export const addPackItem = createAsyncThunk(
  "items/addPackItem",
  async (newItem) => {
    console.log("calling apis");
    const token = await AsyncStorage.getItem('userToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.post(`${api}/item/`, newItem,config);
    return response.data;
  }
);

export const duplicatePackItem = createAsyncThunk(
  "items/duplicatePackItem",
  async (newItem) => {
    const token = await AsyncStorage.getItem('userToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.post(`${api}/pack/duplicate`, {
      packId: newItem.packId,
      ownerId: newItem.ownerId,
      items: newItem.items,
    },config);
    return response.data;
  }
);

export const scorePack = createAsyncThunk("packs/scorePack", async (packId) => {
  const token = await AsyncStorage.getItem('userToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.put(`${api}/pack/score/${packId}`,config);
  return response.data;
});

export const editPackItem = createAsyncThunk(
  "items/editPackItem",
  async (newItem) => {
    const token = await AsyncStorage.getItem('userToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.put(`${api}/item/`, newItem,config);
    return response.data;
  }
);

export const editItemsGlobalAsDuplicate = createAsyncThunk(
  "Items/editItemsGlobalAsDuplicate",
  async (item) => {
    const token = await AsyncStorage.getItem('userToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const { itemId, packId, name, weight, quantity, unit, type } = item;
    const response = await axios.put(`${api}/item/global/${itemId}`, {
      packId,
      name,
      weight,
      quantity,
      unit,
      type,
    },config);
    return response.data;
  }
);

export const selectItemsGlobal = createAsyncThunk(
  "Items/selectItemsGlobal",
  async (item) => {
    try {
      const itemId = item.selectedItem;
      const ownerId = item.ownerId;
      const packId = item.packId;
      const token = await AsyncStorage.getItem('userToken');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const response = await axios.post(`${api}/item/global/select/${packId}`, {
        itemId: itemId,
        ownerId: ownerId,
      },config);
      return response.data;
    } catch (error) {
      console.log("error", error.message);
    }
  }
);

export const updatePack = createAsyncThunk("packs/updatePack", async (pack) => {
  const token = await AsyncStorage.getItem('userToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.put(`${api}/pack`, {
    _id: pack["_id"],
    name: pack.name,
    is_public: pack.is_public,
  },config);
  return response.data;
});

export const deletePack = createAsyncThunk("packs/deletePack", async (pack) => {
  const token = await AsyncStorage.getItem('userToken');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.delete(`${api}/pack`, {
    data: { packId: pack.id },
    headers: {
      "Content-Type": "application/json",
    },
  },config);
  return response.data;
});

const packsAdapter = createEntityAdapter({
  selectId: (pack) => pack._id,
});

const initialState = packsAdapter.getInitialState({
  isLoading: false,
  error: null,
  isOpenEditModal: false,
});

const packsSlice = createSlice({
  name: "packs",
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
          console.log("packid", packId);
          // loop through each packId
          const existingPack = state.entities[packId];
          console.log("existingPack", existingPack);
          if (!existingPack) {
            return;
          }

          const updatedItems = existingPack.items.map((item) =>
            item._id === newItem._id ? newItem : item
          );
          console.log("updatediTEMS", updatedItems);

          packsAdapter.updateOne(state, {
            id: packId,
            changes: { items: updatedItems },
          });
        });

        state.isLoading = false;
        state.error = null;
        state.isOpenEditModal = false;
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

        let existing = state.entities[currentPackId];
        if (!existing) {
          return;
        }

        const updatedItems = existing.items.filter(
          (item) => item._id !== itemId
        );

        packsAdapter.updateOne(state, {
          id: currentPackId,
          changes: { items: updatedItems },
        });

        state.isLoading = false;
        state.error = null;
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
      .addCase(selectItemsGlobal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(selectItemsGlobal.fulfilled, (state, action) => {
        const { itemId, packId } = action.meta.arg;
        const existing = state.entities[packId];

        if (existing) {
          packsAdapter.updateOne(state, {
            id: packId,
            changes: { items: [...existing.items, action.payload.data] },
          });
        }

        state.isLoading = false;
        state.error = null;
      })
      .addCase(selectItemsGlobal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(editItemsGlobalAsDuplicate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editItemsGlobalAsDuplicate.fulfilled, (state, action) => {
        const { itemId, packId } = action.meta.arg;
        console.log("meta", itemId, packId);
        const existingPack = state.entities[packId];

        if (!existingPack) {
          return;
        }
        const updatedItems = existingPack.items.map((item) =>
          item._id === itemId ? action.payload : item
        );
        console.log("updated items", updatedItems);

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
          title: "Pack has been succesfully updated",
          placement: "bottom",
          duration: 2000,
          style: {
            backgroundColor: "green",
          },
        });
      })
      .addCase(updatePack.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        InformUser({
          title: "Error while Updating pack",
          placement: "bottom",
          duration: 2000,
          style: {
            backgroundColor: "red",
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
        console.log("here fyl");
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
