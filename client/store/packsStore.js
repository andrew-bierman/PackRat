import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../constants/api";

export const addPack = createAsyncThunk("packs/addPack", async (newPack) => {
  const response = await axios.post(`${api}/pack/`, newPack);
  return response.data;
});

// update backend logic to support this
export const deletePackItem = createAsyncThunk(
  "items/deletePackItem",
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

export const changePackStatus = createAsyncThunk(
  "packs/changePackStatus",
  async (updatedPack) => {
    const response = await axios.put(`${api}/pack`, updatedPack);
    return response.data;
  }
);

export const fetchUserPacks = createAsyncThunk(
  "packs/fetchUserPacks",
  async (ownerId) => {
    const response = await axios.get(`${api}/pack/${ownerId}`);
    return response.data;
  }
);

export const addPackItem = createAsyncThunk(
  "items/addPackItem",
  async (newItem) => {
    const response = await axios.post(`${api}/item/`, newItem);
    return response.data;
  }
);

export const scorePack = createAsyncThunk("packs/scorePack", async (packId) => {
  const response = await axios.put(`${api}/pack/score/${packId}`);
  return response.data;
});

export const editPackItem = createAsyncThunk(
  "items/editPackItem",
  async (newItem) => {
    const response = await axios.put(`${api}/item/`, newItem);
    return response.data;
  }
);

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
          existingPack.items.push(action.payload.newItem);
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
          // loop through each packId
          const existingPack = state.entities[packId];
          if (!existingPack) {
            return;
          }

          const updatedItems = existingPack.items.map((item) =>
            item._id === newItem._id ? newItem : item
          );

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
        const deletedItem = action.payload;
        const packIds = deletedItem.packs; // packIds is an array of pack Ids

        packIds.forEach((packId) => {
          // loop through each packId
          const existingPack = state.entities[packId];
          if (!existingPack) {
            return;
          }

          const updatedItems = existingPack.items.filter(
            (item) => item._id !== deletedItem._id
          );

          packsAdapter.updateOne(state, {
            id: packId,
            changes: { items: updatedItems },
          });
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
      });
  },
});

export const { selectAll: selectAllPacks, selectById: selectPackById } =
  packsAdapter.getSelectors((state) => state.packs);

export const selectIsLoading = (state) => state.packs.isLoading;
export const selectError = (state) => state.packs.error;

export const { openModal, closeModal } = packsSlice.actions;

export default packsSlice.reducer;
