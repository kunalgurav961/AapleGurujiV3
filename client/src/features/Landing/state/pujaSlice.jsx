import { createSlice } from "@reduxjs/toolkit";
import { getPuja, getPujaById } from "./pujaAction";

const pujaSlice = createSlice({
  name: "puja",
  initialState: {
    pujas: null,
    selectedPuja: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPuja.pending, (state) =>
        console.log(`pending -> ${state.pujas}`),
      )
      .addCase(getPuja.fulfilled, (state, action) => {
        state.pujas = action.payload;
        console.log(`done -> ${state.pujas}`);
      })
        .addCase(getPuja.rejected, (state) => {
          console.log('rejected')
      })
      .addCase(getPujaById.pending, (state) =>
        console.log(`pending -> ${state.selectedPuja}`),
      )
      .addCase(getPujaById.fulfilled, (state, action) => {
        state.selectedPuja = action.payload;
        console.log(`done -> ${state.selectedPuja}`);
      })
      .addCase(getPujaById.rejected, (state) => {
        console.log('rejected')
      })
  },
});

export default pujaSlice.reducer;
export const {} = pujaSlice.actions;
