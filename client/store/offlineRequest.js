import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
  } from "@reduxjs/toolkit";
import { InformUser } from "../utils/ToastUtils";
import { deleteGlobalItem } from "./globalItemsStore";

const items = {
    deleteItem: deleteGlobalItem,
  }

const offlineAdaptor = createEntityAdapter();
export const executeOfflineRequests = createAsyncThunk(
    'offline/execute',
    async (data,  { dispatch }) => {
        data.forEach(async (item) => {
            try {
                let method = items[item.method]
                console.log(method, 'method')
                await dispatch(method(item.data))
            } catch (err) {
                console.warn(err)
            }
        })
        return [];
    }
)

const offlineSlice = createSlice({
    name: 'offline',
    initialState: offlineAdaptor.getInitialState({
        requests : [],
    }),
    reducers: {
        addOfflineRequest : (state, action) => {
            console.log(action.payload)
            return {
                ...state,
                requests : [...state.requests, action.payload]
            }
        },
    },
    extraReducers : (builder) => {
        builder.addCase(executeOfflineRequests.fulfilled, state => {
            state.requests = [];
        })
    }
})

export const { addOfflineRequest } = offlineSlice.actions;

export default offlineSlice.reducer;