import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProductAPI, deleteProductAPI, getAllProductsAPI, updateProductAPI } from "../../services/productApi";

export const fetchProducts = createAsyncThunk(
    'products/fetch',
    async (_, thunkAPI) => {
        try {
            const res = await getAllProductsAPI();
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const createProduct = createAsyncThunk(
    'products/create',
    async (data, thunkAPI) => {
        try {
            const res = await createProductAPI(data);
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const updateProduct = createAsyncThunk(
    'products/update/',
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await updateProductAPI(id, data);
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'products/delete/',
    async (id, thunkAPI) => {
        try {
            await deleteProductAPI(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p._id !== action.payload);
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                state.loading=false;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
}
})

export default productSlice.reducer;