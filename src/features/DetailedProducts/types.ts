import { IResult } from '../Products/types';

export interface IDetailedProductData {
  result: IResult;
  isLoading: boolean;
  error: string | null;
}

export interface IDetailedProductState {
  detailedProductData: IDetailedProductData;
}

export interface IProcessedProductData {
  name: string;
  price: number;
  discountedPrice: number | null;
  description: string;
  images: string[];
}
