import axios from 'axios';
import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { ICategoriesState, ICategory } from './types';
import { register } from '../../api/auth';
import Endpoints from '../../api/endpoints';

const initialState: ICategoriesState = {
  categoriesData: {
    limit: null,
    offset: null,
    count: null,
    total: null,
    results: [],
    isLoading: false,
    error: null,
  },
};

export const categoriesReducer = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategoriesStart: (state): ICategoriesState => ({
      ...state,
      categoriesData: {
        ...state.categoriesData,
        isLoading: true,
      },
    }),
    getCategoriesSuccess: (state, action: PayloadAction<ICategory[]>): ICategoriesState => ({
      ...state,
      categoriesData: {
        ...state.categoriesData,
        results: action.payload,
        isLoading: false,
        error: null,
      },
    }),
    getCategoriesFailure: (state, action: PayloadAction<string>): ICategoriesState => ({
      ...state,
      categoriesData: {
        ...state.categoriesData,
        isLoading: false,
        error: action.payload,
      },
    }),
  },
});

export const { getCategoriesStart, getCategoriesSuccess, getCategoriesFailure } = categoriesReducer.actions;

export default categoriesReducer.reducer;

export const fetchCategories =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const token = await register();
      dispatch(getCategoriesStart());
      const response = await axios.get(Endpoints.GET_CATEGORIES, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      const categories = response.data.results;
      dispatch(getCategoriesSuccess(categories));
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) dispatch(getCategoriesFailure(e.message));
      throw new Error('Something went wrong while fetching categories');
    }
  };
