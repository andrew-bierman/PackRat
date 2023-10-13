import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { useUserChatsQuery, useAIResponseQuery } from 'store/customTrpc/customTRPCQueryHooks';

const chatAdapter = createEntityAdapter();
const chatSlice = createSlice({
  name: 'chat',
  initialState: chatAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
});

export const { reducer } = chatSlice;

export const fetchUserChats = (userId) => {
  return async (dispatch) => {
    dispatch(getUserChats.pending());

    const response = await useUserChatsQuery(userId);

    if (response.error) {
      dispatch(getUserChats.rejected({ error: response.error }));
    } else {
      dispatch(getUserChats.fulfilled(response.data));
    }
  };
};

export const fetchAIResponse = (userId, conversationId, userInput) => {
  return async (dispatch) => {
    dispatch(getAIResponse.pending());

    const response = await useAIResponseQuery(
      userId,
      conversationId,
      userInput,
    );

    if (response.error) {
      dispatch(getAIResponse.rejected({ error: response.error }));
    } else {
      dispatch(getAIResponse.fulfilled(response.data));
    }
  };
};

// Selectors and other code as needed...
