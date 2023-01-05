import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://iuqkny-8080.preview.csb.app/api/' }),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `users`,
    }),
  }),
});
