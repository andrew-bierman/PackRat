/**
 * Redux store for managing chat-related state.
 */

import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { trpc } from '../trpc';

// Create entity adapter for chats
const chatAdapter = createEntityAdapter({
  selectId: (chat) => chat._id,
});

// Async thunk for getting user chats
export const getUserChats = createAsyncThunk(
  'chat/getUserChats',
  async (userId) => {
    try {
      // const response = await axios.get(`${api}/openai/user-chats/${userId}`);
      // return response.data;
      return await trpc.getUserChats.query({ userId });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);

// Async thunk for getting AI response
export const getAIResponse = createAsyncThunk(
  'chat/getAIResponse',
  async ({ userId, conversationId, userInput }) => {
    try {
      // const response = await axios.post(`${api}/openai/ai-response`, {
      //   userId,
      //   conversationId,
      //   userInput,
      // });
      // return response.data;
      return await trpc.getAIResponse.query({
        userId,
        conversationId,
        userInput,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);

// Create slice for chat state
const chatSlice = createSlice({
  name: 'chat',
  initialState: chatAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserChats.fulfilled, (state, action) => {
        if (!action.payload) return;
        chatAdapter.setAll(state, action.payload.conversations);
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAIResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAIResponse.fulfilled, (state, action) => {
        const { aiResponse, conversation } = action.payload;
        const { _id, history } = conversation;
        console.log('payload:', action.payload);
        console.log('state.entities:', state.entities);
        console.log('state.entities[_id]:', state.entities[_id]);
        chatAdapter.upsertOne(state, {
          id: _id,
          changes: {
            history: history.split('\n'),
          },
        });
        state.loading = false;
        state.error = null;
      })
      .addCase(getAIResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Selectors for chat state
export const {
  selectAll: selectAllConversations,
  selectById: selectConversationById,
} = chatAdapter.getSelectors((state) => state.chat);

export default chatSlice.reducer;
