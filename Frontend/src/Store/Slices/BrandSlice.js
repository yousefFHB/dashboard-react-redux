import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    addBrand: (state, action) => {
      state.brands.push(action.payload);
    },

    updateBrand: (state, action) => {
      const index = state.brands.findIndex(
        (brand) => brand.id === action.payload.id
      );

      if (index !== -1) {
        state.brands[index] = action.payload;
      }
    },

    deleteBrand: (state, action) => {
      state.brands = state.brands.filter(
        (brand) => brand.id !== action.payload
      );
    },
  },
});

export const { addBrand, updateBrand, deleteBrand } = brandSlice.actions;
export default brandSlice.reducer;
