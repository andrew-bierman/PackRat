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

export const fetchPacks = createAsyncThunk("packs/fetchPacks", async (owner_id) => {
    const response = await axios.get(`${api}/pack/${owner_id}`);
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
                state.packs.push(action.payload);
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
                const index = state.packs.findIndex((pack) => pack.id === updatedPack.id);
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
            .addCase(fetchPacks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPacks.fulfilled, (state, action) => {
                state.packs = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchPacks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default packsSlice.reducer;
