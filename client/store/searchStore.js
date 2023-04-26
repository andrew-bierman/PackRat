import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchResults: [],
    selectedSearchResult: {},
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchResults(state, action) {
            state.searchResults = action.payload;
        },
        setSelectedSearchResult(state, action) {
            state.selectedSearchResult = action.payload;
        },
        clearSearchResults(state) {
            state.searchResults = [];
        }

    },
});

export const { setSearchResults, setSelectedSearchResult, clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
