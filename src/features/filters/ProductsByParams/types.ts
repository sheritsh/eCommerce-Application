import { Languages } from '../../../api/types';
import { ICategory, IPrice, IImage } from '../../Products/types';

export interface IProductsByCategoryIdData {
  limit: number | null;
  offset: number | null;
  count: number | null;
  total: number | null;
  results: IResult[];
  isLoading: boolean;
  error: string | null;
}

export interface IProductsByCategoryIdState {
  productsByCategoryIdData: IProductsByCategoryIdData;
}

export interface IResult {
  id: string;
  version: number;
  name: {
    [Languages.English]: string;
  };
  description: {
    [Languages.English]: string;
  };
  categories: ICategory[];
  categoryOrderHints: object;
  slug: {
    [Languages.English]: string;
  };
  metaTitle: {
    [Languages.English]: string;
  };
  metaDescription: {
    [Languages.English]: string;
  };
  variants: [];
  masterVariant: {
    id: number;
    prices: IPrice[];
    images: IImage[];
    attributes: string[];
    assets: string[];
  };
  searchKeywords: object;
  hasStagedChanges: boolean;
  published: boolean;
  priceMode: string;
  createdAt: string;
  lastModifiedAt: string;
}
