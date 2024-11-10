import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://6719d7c4acf9aa94f6a803b0.mockapi.io/bike";

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addProductToApi = createAsyncThunk(
  "data/addProductToApi",
  async (newProduct) => {
    const response = await axios.post(API_URL, newProduct);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addProductToApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductToApi.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addProductToApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
