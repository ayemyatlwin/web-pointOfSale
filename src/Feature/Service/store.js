import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../API/authApi";
import { profileApi } from "../API/profileApi";
import authSlice from "./authSlice";
import { userApi } from "../API/userApi";
import userSlice from "./userSlice";
import { api } from '../API/mediaApi'
import { getallProductsApi } from "../API/getallProductsApi";
import { saleApi } from "../API/saleApi";
import recieptSlice from "./recieptSlice";
import { productApi } from "../API/productApi";
import productSlice from "./productSlice";
import { brandApi } from "../API/brandApi";
import { financeApi } from "../API/financeApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [getallProductsApi.reducerPath]:getallProductsApi.reducer,
    [saleApi.reducerPath]:saleApi.reducer,
    [profileApi.reducerPath] : profileApi.reducer,
    [financeApi.reducerPath] : financeApi.reducer,
    [api.reducerPath]: api.reducer,

    authSlice: authSlice,
    userSlice: userSlice,
    productSlice: productSlice,
    recieptSlice:recieptSlice,
  },
  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware,api.middleware,getallProductsApi.middleware, saleApi.middleware, profileApi.middleware,productApi.middleware,brandApi.middleware,financeApi.middleware),

});
