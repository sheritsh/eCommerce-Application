import { IResult } from '../Products/types';

// export interface IDetailedProductData {
//   id: string | null;
//   name: string | null;
//   description: string | null;
//   price: number | null;
//   discountedPrice: number | null;
//   images: Array<string> | null;
//   isLoading: boolean;
//   error: string | null;
// }

export interface IDetailedProductData {
  result: IResult;
  isLoading: boolean;
  error: string | null;
}

export interface IDetailedProductState {
  detailedProductData: IDetailedProductData;
}
