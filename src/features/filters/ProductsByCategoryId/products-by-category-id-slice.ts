import axios from 'axios';
import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { register } from '../../../api/auth';
import Endpoints from '../../../api/endpoints';
import { IProductsByCategoryIdState, IResult } from './types';

const initialState: IProductsByCategoryIdState = {
  productsByCategoryIdData: {
    limit: null,
    offset: null,
    count: null,
    total: null,
    results: [],
    isLoading: false,
    error: null,
  },
};

export const productsByCategoryIdReducer = createSlice({
  name: 'products-by-category-id',
  initialState,
  reducers: {
    getProductsByCategoryIdStart: (state): IProductsByCategoryIdState => ({
      ...state,
      productsByCategoryIdData: {
        ...state.productsByCategoryIdData,
        isLoading: true,
      },
    }),
    getProductsByCategoryIdSuccess: (state, action: PayloadAction<IResult[]>): IProductsByCategoryIdState => ({
      ...state,
      productsByCategoryIdData: {
        ...state.productsByCategoryIdData,
        results: action.payload,
        isLoading: false,
        error: null,
      },
    }),
    getProductsByCategoryIdFailure: (state, action: PayloadAction<string>): IProductsByCategoryIdState => ({
      ...state,
      productsByCategoryIdData: {
        ...state.productsByCategoryIdData,
        isLoading: false,
        error: action.payload,
      },
    }),
  },
});

export const { getProductsByCategoryIdStart, getProductsByCategoryIdSuccess, getProductsByCategoryIdFailure } =
  productsByCategoryIdReducer.actions;

export default productsByCategoryIdReducer.reducer;

export const fetchProductsByCategoryId =
  (categoryId: string, searchQuery: string, sortQuery: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    let endpoint = `${Endpoints.GET_PRODUCTS_BY_CATEGORY}"${categoryId}"`;
    if (searchQuery) {
      endpoint = `${Endpoints.GET_PRODUCTS_BY_CATEGORY}"${categoryId}"&text.en-US+asc"${searchQuery}"`;
    }
    if (sortQuery) {
      if (sortQuery === 'sort=name.en-US') {
        endpoint = `${Endpoints.GET_PRODUCTS_BY_CATEGORY_FILTER}sort=${sortQuery}&&staged=true&limit=10&filter=categories.id:"${categoryId}"`;
      } else {
        endpoint = `${Endpoints.GET_PRODUCTS_BY_CATEGORY_FILTER}${sortQuery}&&staged=true&limit=10&filter=categories.id:"${categoryId}"`;
      }
    }
    const token = await register();
    try {
      dispatch(getProductsByCategoryIdStart());
      const response = await axios.get(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      const products = response.data.results;
      dispatch(getProductsByCategoryIdSuccess(products));
    } catch (e: unknown) {
      if (e instanceof Error) dispatch(getProductsByCategoryIdFailure(e.message));
      throw new Error('Something went wrong while fetching products');
    }
  };
