import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../API/authApi";
import { profileApi } from "../API/profileApi";
import authSlice from "./authSlice";
import { userApi } from "../API/userApi";
import userSlice from "./userSlice";
import { api } from '../API/mediaSlice'
import { getallProductsApi } from "../API/getallProductsApi";
import { saleApi } from "../API/saleApi";
import recieptSlice from "./recieptSlice";
import { productApi } from "../API/productApi";
import productSlice from "./productSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    authSlice: authSlice,
    [userApi.reducerPath]: userApi.reducer,
    userSlice: userSlice,
    [productApi.reducerPath]: productApi.reducer,
    productSlice: productSlice,
    [getallProductsApi.reducerPath]:getallProductsApi.reducer,
    recieptSlice:recieptSlice,
    [saleApi.reducerPath]:saleApi.reducer,
    [api.reducerPath]: api.reducer,
    [profileApi.reducerPath] : profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware,api.middleware,getallProductsApi.middleware, saleApi.middleware, profileApi.middleware,productApi.middleware),

});
