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
  (searchQuery: string, sortQuery: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    let endpoint = Endpoints.GET_PRODUCTS;
    if (searchQuery) {
      endpoint = `${Endpoints.GET_SEARCH}/search?text.en-US="${searchQuery}"`;
    }
    if (sortQuery) {
      if (sortQuery === 'sort=name.en-US') {
        endpoint = `${Endpoints.GET_SEARCH}/?${sortQuery}`;
      } else {
        endpoint = `${Endpoints.GET_SEARCH}/search?${sortQuery}`;
      }
    }
    const token = await register();
    try {
      dispatch(getProductsStart());
      const response = await axios.get(endpoint, {
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
