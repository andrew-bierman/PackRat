import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../constants/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const chatAdapter = createEntityAdapter(
    {selectId: (chat) => chat._id}
);

export const getUserChats = createAsyncThunk(
  "chat/getUserChats",
  async (userId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get(`${api}/openai/user-chats/${userId}`,config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getAIResponse = createAsyncThunk(
  "chat/getAIResponse",
  async ({ userId, conversationId, userInput }) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.post(`${api}/openai/ai-response`, {
        userId,
        conversationId,
        userInput,
      },config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
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
        console.log("payload:", action.payload);
        console.log("state.entities:", state.entities);
        console.log(
          "state.entities[_id]:",
          state.entities[_id]
        );
        chatAdapter.upsertOne(state, { // use upsertOne to add new conversation if it doesn't exist
          id: _id,
          changes: {
            history: history.split('\n') // assuming history is a string
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

export const {
  selectAll: selectAllConversations,
  selectById: selectConversationById,
} = chatAdapter.getSelectors((state) => state.chat);

export default chatSlice.reducer;
