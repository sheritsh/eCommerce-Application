import axios from 'axios';
import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { IResult } from '../Products/types';
import { register } from '../../api/auth';
import Endpoints from '../../api/endpoints';
import { Settings } from '../../api/types';
import { IFiltersState } from './type';

const initialState: IFiltersState = {
  productsForFiltersData: {
    limit: null,
    offset: null,
    count: null,
    total: null,
    results: [],
    isLoading: false,
    error: null,
  },
};

export const filtersReducer = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    getFiltersDataStart: (state): IFiltersState => ({
      ...state,
      productsForFiltersData: {
        ...state.productsForFiltersData,
        isLoading: true,
      },
    }),
    getFiltersDataSuccess: (state, action: PayloadAction<IResult[]>): IFiltersState => ({
      ...state,
      productsForFiltersData: {
        ...state.productsForFiltersData,
        results: action.payload,
        isLoading: false,
        error: null,
      },
    }),
    getFiltersDataFailure: (state, action: PayloadAction<string>): IFiltersState => ({
      ...state,
      productsForFiltersData: {
        ...state.productsForFiltersData,
        isLoading: false,
        error: action.payload,
      },
    }),
  },
});

export const { getFiltersDataStart, getFiltersDataSuccess, getFiltersDataFailure } = filtersReducer.actions;

export default filtersReducer.reducer;

export const fetchFiltersData =
  (limit: number = Settings.ProductsPerPage) =>
  async (dispatch: Dispatch): Promise<void> => {
    const endpoint = `${Endpoints.GET_PRODUCTS}?limit=${limit}`;

    const token = await register();
    try {
      dispatch(getFiltersDataStart());
      const response = await axios.get(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      const products = response.data.results;
      dispatch(getFiltersDataSuccess(products));
    } catch (e: unknown) {
      if (e instanceof Error) dispatch(getFiltersDataFailure(e.message));
      throw new Error('Something went wrong while fetching products');
    }
  };
