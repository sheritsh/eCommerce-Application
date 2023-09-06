import { AuthState } from '../store/auth/reducer';
import { ICategoriesState } from './Categories/types';
import { IProductsState } from './Products/types';
import { IProductsByCategoryIdState } from './filters/ProductsByCategoryId/types';
import { IDetailedProductState } from './DetailedProducts/types';
import { ICustomerState } from './Profile/types';
import { IProductsByBrandState } from './filters/ProductsByBrand/types';

export interface IRootState {
  auth: AuthState;
  products: IProductsState;
  categories: ICategoriesState;
  productsByCategoryId: IProductsByCategoryIdState;
  productsByBrand: IProductsByBrandState;
  detailedProduct: IDetailedProductState;
  customer: ICustomerState;
}
