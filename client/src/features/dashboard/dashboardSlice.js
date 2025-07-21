import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDashboardSummary } from "../../services/dashboardApi";

export const getDashboardSummary = createAsyncThunk(
  'dashboard/getSummary',
  async (_, thunkAPI) => {
    try {
      return await fetchDashboardSummary();
    } catch (err) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    totalProfit: 0,
    outOfStockCount: 0,
    highestSaleProduct: null,
    lowStockProducts: [],
    outOfStockProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.totalProducts = action.payload.totalProducts;
        state.totalSales = action.payload.totalSales;
        state.totalRevenue = action.payload.totalRevenue;
        state.totalProfit = action.payload.totalProfit;
        state.outOfStockCount = action.payload.outOfStockCount;
        state.highestSaleProduct = action.payload.highestSaleProduct;
        state.lowStockProducts = action.payload.lowStockProducts;
        state.outOfStockProducts = action.payload.outOfStockProducts;
      })
      .addCase(getDashboardSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
