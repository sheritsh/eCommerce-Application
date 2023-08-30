import { createSlice, createAsyncThunk, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import Endpoints from '../../api/endpoints';
import { IDetailedProductState } from './types';
import { register } from '../../api/auth';
import { IResult } from '../Products/types';

const initialState: IDetailedProductState = {
  detailedProductData: {
    result: {} as IResult,
    isLoading: false,
    error: null,
  },
};

export const fetchProductDetails = createAsyncThunk('detailed-products/fetchProductDetails', async () => {
  const token = await register();
  const response = await fetch(`${Endpoints.GET_PRODUCTS}/1ffa9ba4-c4b0-4fee-8c59-6873ec2b01e6`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.access_token}`,
    },
  });
  const data = await response.json();

  return data;
});

export const detailedProductReducer = createSlice({
  name: 'detailedProduct',
  initialState,
  reducers: {
    // getProductsStart: (state): IProductsState => ({
    //   ...state,
    //   productsData: {
    //     ...state.productsData,
    //     isLoading: true,
    //   },
    // }),
    // getProductsSuccess: (state, action: PayloadAction<IResult[]>): IProductsState => ({
    //   ...state,
    //   productsData: {
    //     ...state.productsData,
    //     results: action.payload,
    //     isLoading: false,
    //     error: null,
    //   },
    // }),
    // getProductsFailure: (state, action: PayloadAction<string>): IProductsState => ({
    //   ...state,
    //   productsData: {
    //     ...state.productsData,
    //     isLoading: false,
    //     error: action.payload,
    //   },
    // }),
  },
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
      .addCase(fetchProductDetails.fulfilled, (state, action) => ({
        ...state,
        detailedProductData: {
          ...state.detailedProductData,
          result: action.payload,
          isLoading: false,
          error: null,
        },
      }))
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

// export const { getProductsStart, getProductsSuccess, getProductsFailure } = productsReducer.actions;

// export default detailedProductReducer.reducer;
