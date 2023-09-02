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
  name: string | null;
  price: number | null;
  discountedPrice: number | null;
  description: string | null;
  images: IFetchedImages[];
}

interface IFetchedImages {
  url: string;
}
