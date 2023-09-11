import axios from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { register } from '../../../api/auth';
import Endpoints from '../../../api/endpoints';
import { getProductsStart, getProductsFailure, getProductsSuccess } from '../../Products/products-slice';
import { Settings } from '../../../api/types';

interface IFiltersArguments {
  params: string;
  categoryId?: string;
  limit?: number;
  offset?: number;
}

export const fetchProductsByParams =
  ({ params, categoryId = '', limit = Settings.ProductsPerPage, offset = 0 }: IFiltersArguments) =>
  async (dispatch: Dispatch): Promise<void> => {
    let endpoint;
    if (!categoryId) {
      endpoint = `${Endpoints.GET_PRODUCTS_BY_PARAMS}${params}&limit=${limit}&offset=${offset}`;
    } else {
      endpoint = `${Endpoints.GET_PRODUCTS_BY_PARAMS}&filter=categories.id:"${categoryId}"${params}&limit=${limit}&offset=${offset}`;
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
