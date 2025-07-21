import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSaleAPI, getAllSalesAPI } from "../../services/salesApi";
import { fetchProducts } from "../product/productSlice";

export const createSale = createAsyncThunk(
    'sales/create',
    async (data, thunkAPI) => {
        try {
            const res = await createSaleAPI(data);
            thunkAPI.dispatch(fetchProducts());
            
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const fetchSales = createAsyncThunk(
    'sales/fetch',
    async (_, thunkAPI) => {
        try {
            const res = await getAllSalesAPI();
            console.log(res);
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

const salesSlice = createSlice({
    name: 'sales',
    initialState: {
        sales: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createSale.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSale.fulfilled, (state, action) => {
                state.loading = false;
                state.sales.unshift(action.payload.sale); //  new sale at the top
            })
            .addCase(createSale.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchSales.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSales.fulfilled, (state, action) => {
                state.sales = action.payload;
                state.loading = false;
            })
            .addCase(fetchSales.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default salesSlice.reducer;