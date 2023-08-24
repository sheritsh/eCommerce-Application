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

interface IResult {
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
        'en-US': string;
      };
      categories: ICategory[];
      categoryOrderHints: object;
      slug: {
        'en-US': string;
      };
      metaTitle: {
        'en-US': string;
      };
      metaDescription: {
        'en-US': string;
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
        'en-US': string;
      };
      description: {
        'en-US': string;
      };
      categories: ICategory[];
      categoryOrderHints: object;
      slug: {
        'en-US': string;
      };
      metaTitle: {
        'en-US': string;
      };
      metaDescription: {
        'en-US': string;
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

export interface IProductsData {
  limit: number | null;
  offset: number | null;
  count: number | null;
  total: number | null;
  results: IResult[];
  loading: boolean;
}

export interface ProductsState {
  productsData: IProductsData;
}
