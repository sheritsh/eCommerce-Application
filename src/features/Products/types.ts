import { Languages } from '../../api/types';

interface IImage {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

interface IPrice {
  id: string;
  value: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  discounted: {
    discount: {
      id: string;
      typeId: string;
    };
    value: {
      centAmount: number;
      currencyCode: string;
      fractionDigits: number;
      type: string;
    };
  };
}

interface ICategory {
  typeId: string;
  id: string;
}

interface IVariant {
  id: number;
  prices: number[];
  images: string[];
  attributes: string[];
  assets: string[];
}

export interface IResult {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
  };
  createdBy: {
    isPlatformClient: boolean;
    user: {
      typeId: string;
      id: string;
    };
  };
  productType: {
    typeId: string;
    id: string;
  };
  masterData: {
    current: {
      name: {
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
      masterVariant: {
        id: number;
        prices: number[];
        images: string[];
        attributes: string[];
        assets: string[];
      };
      variants: IVariant[];
      searchKeywords: object;
    };
    staged: {
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
      masterVariant: {
        id: number;
        prices: IPrice[];
        images: IImage[];
        attributes: string[];
        assets: string[];
      };
      variants: string[];
      searchKeywords: object;
    };
    published: boolean;
    hasStagedChanges: boolean;
  };
  priceMode: string;
  lastVariantId: number;
}

interface IProductsData {
  limit: number | null;
  offset: number | null;
  count: number | null;
  total: number | null;
  results: IResult[];
  isLoading: boolean;
  error: string | null;
}

export interface IProductsState {
  productsData: IProductsData;
}
