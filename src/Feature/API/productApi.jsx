import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://b.mmsdev.site/api/v1" }),
  tagTypes: ["productApi"],
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: ({ token, productData }) => ({
        url: "/products",
        method: "POST",
        body: productData,
        headers: {
          authorization: `Bearer ${token}`,
        },
       
      }),
      invalidatesTags: ["productApi"],
    }),
    getProductInfo: builder.query({
      query: ({token,currentPage}) => ({
        url:`/products?page=${currentPage}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
        
      }),
      providesTags:['productApi']

    }),

  }),
});

export const { useCreateProductMutation ,useGetProductInfoQuery} = productApi;
