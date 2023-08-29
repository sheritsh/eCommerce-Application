import axios from 'axios';
import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { IProductsState, IResult } from './types';
import { register } from '../../api/auth';
import Endpoints from '../../api/endpoints';

const initialState: IProductsState = {
  productsData: {
    limit: null,
    offset: null,
    count: null,
    total: null,
    results: [],
    isLoading: false,
    error: null,
  },
};

export const productsReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductsStart: (state): IProductsState => ({
      ...state,
      productsData: {
        ...state.productsData,
        isLoading: true,
      },
    }),
    getProductsSuccess: (state, action: PayloadAction<IResult[]>): IProductsState => ({
      ...state,
      productsData: {
        ...state.productsData,
        results: action.payload,
        isLoading: false,
        error: null,
      },
    }),
    getProductsFailure: (state, action: PayloadAction<string>): IProductsState => ({
      ...state,
      productsData: {
        ...state.productsData,
        isLoading: false,
        error: action.payload,
      },
    }),
  },
});

export const { getProductsStart, getProductsSuccess, getProductsFailure } = productsReducer.actions;

export default productsReducer.reducer;

export const fetchProducts =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    const token = await register();
    try {
      dispatch(getProductsStart());
      const response = await axios.get(Endpoints.GET_PRODUCTS, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      const products = response.data.results;
      dispatch(getProductsSuccess(products));
    } catch (e: unknown) {
      if (e instanceof Error) dispatch(getProductsFailure(e.message));
      throw new Error('Something went wrong while fetching products');
    }
  };
