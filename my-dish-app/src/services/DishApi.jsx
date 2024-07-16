import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const DishApi = createApi({
  reducerPath: 'DishApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/user/' }),
  endpoints: (builder) => ({
    getDishes: builder.query({
      query: () => 'dishes/',
    }),
    togglePublish: builder.mutation({
      query: ({ id, isPublished }) => ({
        url: `dishes/${id}/`,
        method: 'PUT',
        body: { isPublished },
      }),
    }),
  }),
});

export const { useGetDishesQuery, useTogglePublishMutation } = DishApi;
