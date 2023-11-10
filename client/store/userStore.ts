import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { trpc } from '../trpc';

export const getUser = createAsyncThunk('user/getUser', async (userId) => {
  // const response = await axios.get(`${api}/user/${userId}`);
  // return response.data;
  return await trpc.getUserById.mutate({ userId });
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
