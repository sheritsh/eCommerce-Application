import axios from 'axios';
import { Dispatch, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { register } from '../../../api/auth';
import Endpoints from '../../../api/endpoints';
import {
  getProductsStart,
  getProductsFailure,
  getProductsSuccess,
  getAllProductsStart,
  getAllProductsFailure,
  getAllProductsSuccess,
} from '../../Products/products-slice';
import { Settings } from '../../../api/types';

interface ISearchState {
  searchQuery: string;
  error: boolean;
}

const initialState: ISearchState = {
  searchQuery: '',
  error: true,
};

interface ISearchArguments {
  params: string;
  categoryId?: string;
  limit?: number;
  offset?: number;
}

export const fetchProductsBySearch =
  ({ params, categoryId = '', limit = Settings.ProductsPerPage }: ISearchArguments) =>
  async (dispatch: Dispatch): Promise<void> => {
    let endpoint;
    if (!categoryId) {
      endpoint = `${Endpoints.GET_SEARCH}"${params}&limit=${limit}"`;
    } else {
      endpoint = `${Endpoints.GET_SEARCH}"${params}"&filter=categories.id:"${categoryId}"&limit=${limit}`;
    }
    const token = await register();
    if (limit === Settings.ProductsPerPage) {
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
        throw new Error('Something went wrong while searching products');
      }
    } else {
      try {
        dispatch(getAllProductsStart());
        const response = await axios.get(endpoint, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.access_token}`,
          },
        });
        const products = response.data.results;
        dispatch(getAllProductsSuccess(products));
      } catch (e: unknown) {
        if (e instanceof Error) dispatch(getAllProductsFailure(e.message));
        throw new Error('Something went wrong while searching products');
      }
    }
  };

export const SearchReducer = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>): ISearchState => ({
      ...state,
      searchQuery: action.payload,
    }),
    setError: (state, action: PayloadAction<boolean>): ISearchState => ({
      ...state,
      error: action.payload,
    }),
  },
});

export const { setSearchQuery, setError } = SearchReducer.actions;

export default SearchReducer.reducer;
