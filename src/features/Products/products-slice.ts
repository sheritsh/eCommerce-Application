import { createSlice } from '@reduxjs/toolkit';
import { IProductsState, IProductsData } from './types';
import { register } from '../../api/auth';
import Endpoints from '../../api/endpoints';

const initialState: IProductsState = {
  productsData: {
    limit: null,
    offset: null,
    count: null,
    total: null,
    results: [],
    loading: false,
  },
};

export const fetchProducts = async (): Promise<string[]> => {
  try {
    const token = await register();
    const response = await fetch(Endpoints.GET_PRODUCTS, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    const data: IProductsData = await response.json();
    const { results } = data;
    const ids = results.map((result) => result.id);
    return ids;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const productsReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts: (state): ProductsState => ({
      ...state,
      productsData: {
        ...state.productsData,
      },
    }),
  },
});

export const { getProducts } = productsReducer.actions;

export default productsReducer.reducer;
