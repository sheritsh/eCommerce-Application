import { AuthState } from '../store/auth/reducer';
import { ICategoriesState } from './Categories/types';
import { IProductsState } from './Products/types';

export interface IRootState {
  auth: AuthState;
  products: IProductsState;
  categories: ICategoriesState;
}
