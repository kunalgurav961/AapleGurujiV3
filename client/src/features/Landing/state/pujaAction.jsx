import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/api";

export const getPuja = createAsyncThunk(
    "api/pujas",
    async () => {
        try{
            let res = await api.get('/pujas');
            console.log(res)
            return res.data.data
        } catch (error) {
            console.log(error.message)
        }
    }
)

export const getPujaById = createAsyncThunk(
    "api/pujas/:id",
    async (id) => {
        try{
            let res = await api.get(`/pujas/${id}`);
            console.log(res)
            return res.data.data
        } catch (error) {
            console.log(error.message)
        }
    }
)