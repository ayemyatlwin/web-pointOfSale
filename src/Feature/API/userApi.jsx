import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://b.mmsdev.site/api/v1" }),
  tagTypes: ["userApi"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ currentPage, token }) => ({
        url: `/users?page=${currentPage}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["userApi"],
    }),
  }),
});

export const {useGetAllUsersQuery} = userApi;