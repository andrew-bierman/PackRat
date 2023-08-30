import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { api } from '../constants/api';
import { REHYDRATE } from 'redux-persist';
export const authApi = createApi({
  // baseQuery : (trpcResult: Promise<unknown>) => trpcResult.then(data => ({ data })).catch(error => ({ error })),
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  reducerPath: 'authApi',
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    signUp: build.mutation<any, any>({
      query: (patch) => ({
        url: '/user/signup',
        method: 'POST',
        body: patch,
      }),
      transformResponse: (response: { user : any }, meta, arg) => response.user,
    }),
    signIn: build.mutation<any, any>({
      query: (patch) => ({
        url: '/user/signin',
        method: 'POST',
        body: patch,
      }),
      transformResponse: (response: { user: any }, meta, arg) => response.user,
    
    }),
    signInWithGoogle : build.mutation({
      query : ({ idToken }) => ({
        url : '/user/google',
        method: 'POST',
        body: { idToken }
      }),
      transformResponse: (response: { user: any }, meta, arg) => response.user,
    })
  }),
});

export const { useSignUpMutation, useSignInMutation, useSignInWithGoogleMutation } = authApi;
