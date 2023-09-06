import axios from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { register } from '../../../api/auth';
import Endpoints from '../../../api/endpoints';
import { Settings } from '../../../api/types';
import { getProductsStart, getProductsFailure, getProductsSuccess } from '../../Products/products-slice';

export const fetchProductsByCategory =
  (categoryId: string, limit: number = Settings.ProductsPerPage) =>
  async (dispatch: Dispatch): Promise<void> => {
    const endpoint = `${Endpoints.GET_PRODUCTS_BY_CATEGORY}"${categoryId}"&limit=${limit}`;
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
      throw new Error('Something went wrong while fetching products from category');
    }
  };
