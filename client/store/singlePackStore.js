// redux toolkit slice for single pack

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

import { api } from "../constants/api";

export const fetchSinglePack = createAsyncThunk(
    "packs/fetchSinglePack",
    async (packId) => {
        const response = await axios.get(`${api}/pack/p/${packId}`);
        return response.data;
    })

const singlePackSlice = createSlice({
    name: "singlePack",
    initialState: {
        singlePack: {},
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSinglePack.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSinglePack.fulfilled, (state, action) => {
                state.singlePack = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchSinglePack.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    }
})

export default singlePackSlice.reducer;