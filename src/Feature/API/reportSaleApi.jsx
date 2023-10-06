import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reportSaleApi = createApi({
  reducerPath: "reportSaleApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://b.mmsdev.site/api/v1` }),
  tagTypes: ["sale"],
  endpoints: (builder) => ({
    getTodaySaleReport: builder.query({
      query: (token) => ({
        url: `today-sale-overview`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["sale"],
    }),
    getWeeklySaleReport: builder.query({
      query:({token,type})=>({
        url:`/sale-overview/${type}`,
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags:["sale"]
    })
  }),
});
export const { useGetTodaySaleReportQuery,useGetWeeklySaleReportQuery } = reportSaleApi;
