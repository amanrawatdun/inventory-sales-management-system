import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import dashboardReducer from '../features/dashboard/dashboardSlice'
import salesReducer from '../features/sales/salesSlice';
import productsReducer from '../features/product/productSlice'
import themeReducer from '../features/theme/themeSlice'

export const store=configureStore({
    reducer:{
       auth:authReducer,
       dashboard:dashboardReducer,
       sales:salesReducer,
       products:productsReducer,
       theme: themeReducer
    }
});