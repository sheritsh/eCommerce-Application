import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register } from '../../api/auth';
import Endpoints from '../../api/endpoints';
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

export const fetchFiltersData = createAsyncThunk(
  'filter-products/fetchFiltersData',
  async (categoryId: string = '') => {
    const endpoint = categoryId
      ? `${Endpoints.GET_PRODUCTS_BY_CATEGORY}"${categoryId}"&limit=100`
      : `${Endpoints.GET_PRODUCTS}?limit=100`;

    const token = await register();
    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    return response.data.results;
  },
);

export const filtersReducer = createSlice({
  name: 'filters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiltersData.pending, (state) => ({
        ...state,
        productsForFiltersData: {
          ...state.productsForFiltersData,
          isLoading: true,
          error: null,
        },
      }))
      .addCase(fetchFiltersData.fulfilled, (state, action) => {
        return {
          ...state,
          productsForFiltersData: {
            ...state.productsForFiltersData,
            results: action.payload,
            isLoading: false,
            error: null,
          },
        };
      })
      .addCase(fetchFiltersData.rejected, (state, action) => ({
        ...state,
        productsForFiltersData: {
          ...state.productsForFiltersData,
          isLoading: false,
          error: action.payload as string,
        },
      }));
  },
});

export default filtersReducer.reducer;
