import { Languages } from '../../api/types';

export interface ICategory {
  id: string;
  version: number;
  key: string;
  externalId: string;
  name: {
    [Languages.English]: string;
  };
  slug: string;
  description: string;
  ancestors: object[];
  parent: string;
  orderHint: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  assets: object[];
  custom: object[];
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
}

interface ICategoriesData {
  limit: number | null;
  offset: number | null;
  count: number | null;
  total: number | null;
  results: ICategory[];
  isLoading: boolean;
  error: string | null;
}

export interface ICategoriesState {
  categoriesData: ICategoriesData;
}
