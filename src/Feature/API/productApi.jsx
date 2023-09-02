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
    deleteProducts:builder.mutation({
      query:({id,token})=>({
       
        url: `products/${id}`,
        method:"DELETE",
       
        headers:{authorization:`Bearer ${token}`}
      }),
      invalidatesTags:['productApi']
     
    }),
    updateProduct: builder.mutation({
      query: ({ token, id, updateProductData }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: updateProductData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["productApi"],
    }),
    getSingleProductInfo:builder.query({
      query:({token,id})=>({
        url:`/products/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },

      })
    })

  }),
});

export const { useCreateProductMutation ,useGetProductInfoQuery,useGetSingleProductInfoQuery,useDeleteProductsMutation} = productApi;
