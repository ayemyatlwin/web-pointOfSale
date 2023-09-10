import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getFinancedataApi=createApi({
    reducerPath : "getFinancedataApi",
    baseQuery: fetchBaseQuery({baseUrl : "https://b.mmsdev.site/api/v1"}),
    tagTypes:["getFinancedataApi"],
    endpoints:(builder)=>({
        getDailyFinanceInfo: builder.query({
          query: ({ token, currentPage, date }) => ({
            url: `daily-records?date=${date}&page=${currentPage}`,
            headers: {
              authorization: `Bearer ${token}`,
            },
          }),
          providesTags: ["getFinancedataApi"],
        }),
      })
})

export const {useGetDailyFinanceInfoQuery} = getFinancedataApi;
