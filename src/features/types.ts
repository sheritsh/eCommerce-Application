import { AuthState } from './Authorization/authorization-slice';
import { ICategoriesState } from './Categories/types';
import { IProductsState } from './Products/types';
import { IDetailedProductState } from './DetailedProducts/types';
import { ICustomerState } from './Profile/types';
import { ICartState } from './Cart/types';

export interface IRootState {
  auth: AuthState;
  products: IProductsState;
  categories: ICategoriesState;
  // productsByCategoryId: IProductsByCategoryIdState;
  // productsByBrand: IProductsByBrandState;
  detailedProduct: IDetailedProductState;
  customer: ICustomerState;
  cart: ICartState;
}