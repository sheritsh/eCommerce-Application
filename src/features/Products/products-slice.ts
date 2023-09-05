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
  (searchQuery: string, sortQuery: string, brands: [], colors: [], sizes: [], selectedPrice: []) =>
  async (dispatch: Dispatch): Promise<void> => {
    const convertArrayToString = (arr: []): string | null => {
      const filteredArr = arr.filter((item) => item.checked);
      const stringArr = filteredArr.map((item) => `"${item.label}"`);
      const resultString = stringArr.join(',');
      return filteredArr.length === 0 ? null : resultString;
    };

    const convertSizeArrayToString = (arr: []): string | null => {
      const filteredArr = arr.filter((item) => item.checked);
      const stringArr = filteredArr.map((item) => `"${String(item.label)}"`);
      const resultString = stringArr.join(',');
      return filteredArr.length === 0 ? null : resultString;
    };

    const filteredBrands = brands.filter((item) => item.checked === true);
    const brandsQuery = convertArrayToString(filteredBrands);

    const filteredColors = colors.filter((item) => item.checked === true);
    const colorsQuery = convertArrayToString(filteredColors);

    const filteredSizes = sizes.filter((item) => item.checked === true);
    const sizeQuery = convertSizeArrayToString(filteredSizes);

    let priceQuery = null;

    let brandsFilterEndpoint = brandsQuery ? `filter=variants.attributes.brand:${brandsQuery}` : null;
    let colorsFilterEndpoint = colorsQuery ? `filter=variants.attributes.color.key:${colorsQuery}` : null;
    let sizesFilterEndpoint = sizeQuery ? `filter=variants.attributes.size:${sizeQuery}` : null;
    let priceFilterEndpoint = priceQuery ? `filter=variants.price.centAmount:range${priceQuery}` : null;

    const filters = [brandsFilterEndpoint, colorsFilterEndpoint, sizesFilterEndpoint, priceFilterEndpoint].filter(
      (filter) => filter,
    );
    const filterEndpoint = filters.join('&');

    let endpoint = filterEndpoint ? `${Endpoints.GET_SEARCH}/search?${filterEndpoint}` : `${Endpoints.GET_PRODUCTS}`;

    if (searchQuery) {
      endpoint = `${Endpoints.GET_SEARCH}/search?text.en-US="${searchQuery}"`;
      if (sortQuery) {
        endpoint = `${endpoint}&${sortQuery}+asc`;
      }
    } else if (sortQuery) {
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
