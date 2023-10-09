import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const dbApi = createApi({
    reducerPath: "dbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://b.mmsdev.site/api/v1" }),
  tagTypes: ["dbApi"],
  endpoints: (builder) => ({
    getDashboardData: builder.query({
        query: ({token}) => ({
          url:`/dashboard-overview/yearly`,
          headers: {
            authorization: `Bearer ${token}`,
          },
          
        }),
        providesTags:['dbApi']
  
      }),
      getDashboardDataMonthly: builder.query({
        query: ({token}) => ({
          url:`/dashboard-overview/monthly`,
          headers: {
            authorization: `Bearer ${token}`,
          },
          
        }),
        providesTags:['dbApi']
  
      }),
      getDashboardDataWeekly: builder.query({
        query: ({token}) => ({
          url:`/dashboard-overview/weekly`,
          headers: {
            authorization: `Bearer ${token}`,
          },
          
        }),
        providesTags:['dbApi']
  
      }),
  })
})
export const {useGetDashboardDataQuery,useGetDashboardDataMonthlyQuery,useGetDashboardDataWeeklyQuery} = dbApi;