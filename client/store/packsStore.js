import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../constants/api";

export const addPack = createAsyncThunk("packs/addPack", async (newPack) => {
    const response = await axios.post(`${api}/pack/`, newPack);
    return response.data;
});

export const changePackStatus = createAsyncThunk("packs/changePackStatus", async (updatedPack) => {
    const response = await axios.put(`${api}/pack`, updatedPack);
    return response.data;
});

export const fetchUserPacks = createAsyncThunk("packs/fetchUserPacks", async (ownerId) => {
    const response = await axios.get(`${api}/pack/${ownerId}`);
    return response.data;
});

export const addPackItem = createAsyncThunk("items/addPackItem", async (newItem) => {
    const response = await axios.post(`${api}/item/`, newItem);
    return response.data;
});

const packsSlice = createSlice({
    name: "packs",
    initialState: {
        packs: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPack.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addPack.fulfilled, (state, action) => {
                state.packs.push(action.payload.createdPack);
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
                const updatedPack = action.payload;
                console.log('state.packs', state.packs)
                console.log('state.packs.packs', state.packs.packs)
                const index = state.packs.packs.findIndex((pack) => pack._id === updatedPack._id);
                if (index !== -1) {
                    state.packs[index] = updatedPack;
                }
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
                console.log("action.payload in fetch packs", action.payload)
                state.packs = action.payload;
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
                const { packId, newItem } = action.payload;
                const packIndex = state.packs.findIndex((pack) => pack._id === packId);
                if (packIndex !== -1) {
                    const updatedPack = {
                        ...state.packs[packIndex],
                        items: [...state.packs[packIndex].items, newItem],
                    };
                    const newPacks = [
                        ...state.packs.slice(0, packIndex),
                        updatedPack,
                        ...state.packs.slice(packIndex + 1),
                    ];
                    state.packs = newPacks;
                }
                state.isLoading = false;
                state.error = null;
            })


            .addCase(addPackItem.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    },
});

export const selectPacks = (state) => state.packs.packs;

export const selectIsLoading = (state) => state.packs.isLoading;

export const selectError = (state) => state.packs.error;

export const selectPackById = (state, packId) => state.packs.packs.find((pack) => pack._id === packId);

export default packsSlice.reducer;
