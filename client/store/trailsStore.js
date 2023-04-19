import { createSlice } from "@reduxjs/toolkit";
import { defaultWeatherObject } from "../constants/defaultWeatherObj";
import { defaultWeekObj } from "../constants/defaultWeekObj";

export const trailsSlice = createSlice({
    name: "trails",
    initialState: {
        trailsDetails: []
    },
    reducers: {
        getTrails: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.trailsDetails = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { getTrails } = trailsSlice.actions;
export default trailsSlice.reducer;
