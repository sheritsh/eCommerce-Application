import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Endpoints from '../../api/endpoints';
import { IDetailedProductState, IProduct } from './types';
import { register } from '../../api/auth';

const initialState: IDetailedProductState = {
  detailedProductData: {
    result: {} as IProduct,
    isLoading: false,
    error: null,
  },
};

export const fetchProductDetails = createAsyncThunk(
  'detailed-products/fetchProductDetails',
  async (id: string = '') => {
    const token = await register();
    const response = await fetch(`${Endpoints.GET_DETAILED_PRODUCT}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    const data = await response.json();

    return data;
  },
);

export const detailedProductReducer = createSlice({
  name: 'detailedProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => ({
        ...state,
        detailedProductData: {
          ...state.detailedProductData,
          isLoading: true,
          error: null,
        },
      }))
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        return {
          ...state,
          detailedProductData: {
            ...state.detailedProductData,
            result: action.payload,
            isLoading: false,
            error: null,
          },
        };
      })
      .addCase(fetchProductDetails.rejected, (state, action) => ({
        ...state,
        detailedProductData: {
          ...state.detailedProductData,
          isLoading: false,
          error: action.payload as string,
        },
      }));
  },
});

export default detailedProductReducer.reducer;
