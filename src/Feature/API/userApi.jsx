import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://b.mmsdev.site/api/v1", }),
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
    createUser: builder.mutation({
      query: ({ token, userData }) => ({
        url: "/register",
        method: "POST",
        body: userData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["userApi"],
    }),
    getSingleUser: builder.query({
      query: ({ token, id }) => ({
        url: `/users/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["userApi"],
    }),
    updateUser: builder.mutation({
      query: ({ token, id, updateUserData }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: updateUserData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["userApi"],
    }),
    deleteUser: builder.mutation({
      query: ({ token, id }) => ({
        url: `/users/${id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["userApi"],
    }),
    
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useGetSingleUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
