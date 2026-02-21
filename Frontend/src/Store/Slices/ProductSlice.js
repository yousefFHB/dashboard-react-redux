import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  productId: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.product = action.payload;
    },
    deleteProduct: (state, action) => {
      state.product = state.product.filter((pr) => pr.id !== action.payload);
      if (state.productId === action.payload) {
        state.productId = null;
      }
    },
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
  },
});

export const { setProducts, deleteProduct, setProductId } = productSlice.actions;
export default productSlice.reducer;
