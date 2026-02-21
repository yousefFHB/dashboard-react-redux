import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice";
import brandSliceReducer from "./Slices/BrandSlice";
import productSliceReducer from "./Slices/ProductSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    brand: brandSliceReducer,
    product: productSliceReducer,
  },
});

export default store;
