import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  productId: null,
  fetched: false,
};

const normalizeId = (value) => Number(value);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      const fetchedProducts = action.payload || [];
      const map = new Map();

      state.product.forEach((item) => {
        map.set(normalizeId(item.id), item);
      });

      fetchedProducts.forEach((item) => {
        const id = normalizeId(item.id);
        if (!map.has(id)) {
          map.set(id, item);
        }
      });

      state.product = Array.from(map.values());
      state.fetched = true;
    },

    addProduct: (state, action) => {
      state.product.unshift(action.payload);
    },

    updateProduct: (state, action) => {
      const index = state.product.findIndex((pr) => normalizeId(pr.id) === normalizeId(action.payload.id));
      if (index !== -1) {
        state.product[index] = action.payload;
      }
    },

    deleteProduct: (state, action) => {
      const targetId = normalizeId(action.payload);
      state.product = state.product.filter((pr) => normalizeId(pr.id) !== targetId);
      if (normalizeId(state.productId) === targetId) {
        state.productId = null;
      }
    },

    setProductId: (state, action) => {
      state.productId = action.payload;
    },
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct, setProductId } = productSlice.actions;
export default productSlice.reducer;
