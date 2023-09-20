import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { register } from '../../api/auth';
import Endpoints from '../../api/endpoints';
import { IFiltersState } from './type';
import getFiltersParameters from '../../utils/catalog/get-filters-parameters';
import { ISelectedProduct } from '../Products/types';
import { IBrand } from '../../components/Filters/Checkbox/BrandCheckbox/types';
import { IColor } from '../../components/Filters/Checkbox/ColorCheckbox/types';
import { ISize } from '../../components/Filters/Checkbox/SizeCheckbox/types';

const initialState: IFiltersState = {
  productsForFiltersData: {
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
  reducers: {
    getFiltersData: (state, action: PayloadAction<ISelectedProduct[]>): IFiltersState => ({
      ...state,
      productsForFiltersData: {
        ...state.productsForFiltersData,
        filtersData: getFiltersParameters(action.payload),
        isLoading: false,
        error: null,
      },
    }),
    checkBrands: (state, action: PayloadAction<IBrand['brand'][]>): IFiltersState => ({
      ...state,
      productsForFiltersData: {
        ...state.productsForFiltersData,
        filtersData: {
          ...state.productsForFiltersData.filtersData,
          brands: action.payload,
        },
        isLoading: false,
        error: null,
      },
    }),
    checkColors: (state, action: PayloadAction<IColor['color'][]>): IFiltersState => ({
      ...state,
      productsForFiltersData: {
        ...state.productsForFiltersData,
        filtersData: {
          ...state.productsForFiltersData.filtersData,
          colors: action.payload,
        },
        isLoading: false,
        error: null,
      },
    }),
    checkSizes: (state, action: PayloadAction<ISize['size'][]>): IFiltersState => ({
      ...state,
      productsForFiltersData: {
        ...state.productsForFiltersData,
        filtersData: {
          ...state.productsForFiltersData.filtersData,
          sizes: action.payload,
        },
        isLoading: false,
        error: null,
      },
    }),
    setPrice: (state, action: PayloadAction<number[]>): IFiltersState => ({
      ...state,
      productsForFiltersData: {
        ...state.productsForFiltersData,
        filtersData: {
          ...state.productsForFiltersData.filtersData,
          price: action.payload,
        },
        isLoading: false,
        error: null,
      },
    }),
  },
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

export const { getFiltersData, checkBrands, checkColors, checkSizes, setPrice } = filtersReducer.actions;

export default filtersReducer.reducer;
