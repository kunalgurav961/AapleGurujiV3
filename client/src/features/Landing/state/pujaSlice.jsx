import { createSlice } from "@reduxjs/toolkit";
import { getPuja, getPujaById } from "./pujaAction";

const pujaSlice = createSlice({
  name: "puja",
  initialState: {
    pujas: null,
    selectedPuja: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPuja.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPuja.fulfilled, (state, action) => {
        state.pujas = action.payload;
        state.loading = false;
      })
      .addCase(getPuja.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getPujaById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedPuja = null;
      })
      .addCase(getPujaById.fulfilled, (state, action) => {
        state.selectedPuja = action.payload;
        state.loading = false;
      })
      .addCase(getPujaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default pujaSlice.reducer;
