import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice"
import brandSliceReducer from "./Slices/BrandSlice"
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        brand:brandSliceReducer,
    }
})
export default store