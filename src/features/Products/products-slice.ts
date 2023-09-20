import axios from 'axios';
import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { IProductsState, ISelectedProduct } from './types';
import { register } from '../../api/auth';
import Endpoints from '../../api/endpoints';
import { Settings } from '../../api/types';

const initialState: IProductsState = {
  productsData: {
    limit: null,
    offset: null,
    count: null,
    total: null,
    results: [],
    allResults: [],
    isLoading: false,
    error: null,
    filtersData: {
      brands: [],
      sizes: [],
      colors: [],
      price: [],
    },
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
    getProductsSuccess: (state, action: PayloadAction<ISelectedProduct[]>): IProductsState => ({
      ...state,
      productsData: {
        ...state.productsData,
        results: action.payload.map((product: ISelectedProduct) => {
          if (product.masterVariant.prices[0].discounted) {
            // eslint-disable-next-line no-param-reassign
            product.masterVariant.prices[0].discounted.value.centAmount = +(
              product.masterVariant.prices[0].discounted.value.centAmount / 100
            ).toFixed(2);
          } else {
            // eslint-disable-next-line no-param-reassign
            product.masterVariant.prices[0].value.centAmount = +(
              product.masterVariant.prices[0].value.centAmount / 100
            ).toFixed(2);
          }
          return product;
        }),
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
    getAllProductsStart: (state): IProductsState => ({
      ...state,
      productsData: {
        ...state.productsData,
        isLoading: true,
      },
    }),
    getAllProductsSuccess: (state, action: PayloadAction<ISelectedProduct[]>): IProductsState => ({
      ...state,
      productsData: {
        ...state.productsData,
        allResults: action.payload.map((product: ISelectedProduct) => {
          if (product.masterVariant.prices[0].discounted) {
            // eslint-disable-next-line no-param-reassign
            product.masterVariant.prices[0].discounted.value.centAmount = +(
              product.masterVariant.prices[0].discounted.value.centAmount / 100
            ).toFixed(2);
          } else {
            // eslint-disable-next-line no-param-reassign
            product.masterVariant.prices[0].value.centAmount = +(
              product.masterVariant.prices[0].value.centAmount / 100
            ).toFixed(2);
          }
          return product;
        }),
        isLoading: false,
        error: null,
      },
    }),
    getAllProductsFailure: (state, action: PayloadAction<string>): IProductsState => ({
      ...state,
      productsData: {
        ...state.productsData,
        isLoading: false,
        error: action.payload,
      },
    }),
  },
});

export const {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  getAllProductsStart,
  getAllProductsSuccess,
  getAllProductsFailure,
} = productsReducer.actions;

export default productsReducer.reducer;

export const fetchProducts =
  (limit: number = Settings.ProductsPerPage) =>
  async (dispatch: Dispatch): Promise<void> => {
    const endpoint = `${Endpoints.GET_PRODUCTS}?limit=${limit}`;

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
