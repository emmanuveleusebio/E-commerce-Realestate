// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios'


// export const getProducts = createAsyncThunk('products/getProducts', async (filterKey = null) => {
//     const response = await axios.get('api/Products', {
//         params: { category: filterKey },
//     });
//     return response.data
// })


// const productSlice = createSlice({
//     name: 'products',
//     initialState: {
//         products: [],
//         status: 'idle',
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(getProducts.pending, (state) => {
//                 state.status = 'loading';
//                 state.error = null;
//             })
//             .addCase(getProducts.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.products = action.payload.plots;
//             })
//             .addCase(getProducts.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message || 'Failed to fetch products';
//             });
//     }
// })

// export default productSlice.reducer;