import { Languages } from '../../api/types';

interface IAncestor {
  typeId: string;
  id: string;
}

interface IParent {
  typeId: string;
  id: string;
}

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
  ancestors: IAncestor[];
  parent: IParent;
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

export interface ICategoriesData {
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
