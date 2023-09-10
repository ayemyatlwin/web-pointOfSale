import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const financeApi = createApi({
  reducerPath: "financeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://b.mmsdev.site/api/v1" }),
  tagTypes: ["financeApi"],
  endpoints: (builder) => ({
    getDailyFinanceInfo: builder.query({
      query: ({ token, currentPage, date }) => ({
        url: `daily-records?date=${date}&page=${currentPage}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["financeApi"],
    }),
  }),
});
export const { useGetDailyFinanceInfoQuery } = financeApi;
