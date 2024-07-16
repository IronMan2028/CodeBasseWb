import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const UserAuthApi = createApi({
  reducerPath: 'UserAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/user/' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: 'register/',
        method: 'POST',
        body: user,
        headers: {
          'Content-type': 'application/json',
        },
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: 'login/',
        method: 'POST',
        body: user,
        headers: {
          'Content-type': 'application/json',
        },
      }),
    }),
    getLoggedUser: builder.query({
      query: (access_token) => ({
        url: 'profile/',
        method: 'GET',
        headers: {
          'authorization': `Bearer ${access_token}`,
        },
      }),
    }),
    changeUserPassword: builder.mutation({
      query: ({ actualData, access_token }) => ({
        url: 'changepassword/',
        method: 'POST',
        body: actualData,
        headers: {
          'authorization': `Bearer ${access_token}`,
        },
      }),
    }),
    sendPasswordResetEmail: builder.mutation({
      query: (user) => ({
        url: 'send-reset-password-email/',
        method: 'POST',
        body: user,
        headers: {
          'Content-type': 'application/json',
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ actualData, id, token }) => ({
        url: `reset-password/${id}/${token}/`,
        method: 'POST',
        body: actualData,
        headers: {
          'Content-type': 'application/json',
        },
      }),
    }),
    
  }),
});

// Destructure mutation and query hooks for easy access in components
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetLoggedUserQuery,
  useChangeUserPasswordMutation,
  useSendPasswordResetEmailMutation,
  useResetPasswordMutation,
} = UserAuthApi;
