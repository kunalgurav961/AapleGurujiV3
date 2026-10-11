import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/api";

export const getPuja = createAsyncThunk(
  "pujas/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/pujas");
      console.log(response.data.data)
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to load pujas",
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const { pujas, loading, error } = getState().puja;
      return pujas === null && !loading && !error;
    },
  },
);

export const getPujaById = createAsyncThunk(
  "pujas/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/pujas/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to load this puja",
      );
    }
  },
);
