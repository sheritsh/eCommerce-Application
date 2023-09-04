import { Languages } from '../../api/types';

interface INumber {
  name: 'size';
  value: number;
}

interface IString {
  name: 'brand';
  value: string;
}

export interface IObject {
  name: 'color';
  value: {
    key: string;
    label: string;
  };
}

type Attribute = INumber | IString | IObject;

export interface IImage {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

export interface IPrice {
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

export interface ICategory {
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
        attributes: Attribute[];
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

export interface IProductsData {
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

export interface ISelectedProduct {
  id: string;
  version: number;
  productType: {
    typeId: string;
    id: string;
  };
  name: {
    [language: string]: string;
  };
  description: {
    [language: string]: string;
  };
  categories: {
    typeId: string;
    id: string;
  }[];
  categoryOrderHints: Record<string, unknown>;
  slug: {
    [language: string]: string;
  };
  metaTitle: {
    [language: string]: string;
  };
  metaDescription: {
    [language: string]: string;
  };
  variants: unknown[];
  masterVariant: {
    attributes: unknown[];
    assets: unknown[];
    images: {
      url: string;
      dimensions: {
        w: number;
        h: number;
      };
    }[];
    prices: {
      id: string;
      value: {
        type: string;
        currencyCode: string;
        centAmount: number;
        fractionDigits: number;
      };
      discounted: {
        value: {
          type: string;
          currencyCode: string;
          centAmount: number;
          fractionDigits: number;
        };
        discount: {
          typeId: string;
          id: string;
        };
      };
    }[];
    id: number;
  };
  searchKeywords: Record<string, unknown>;
  hasStagedChanges: boolean;
  published: boolean;
  priceMode: string;
  createdAt: string;
  lastModifiedAt: string;
}

export interface ISelectedProductSearchResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: ISelectedProduct[];
  facets: Record<string, unknown>;
}
