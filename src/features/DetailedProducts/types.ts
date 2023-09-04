export interface IDetailedProductData {
  result: IProduct;
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

interface IUser {
  typeId: string;
  id: string;
}

interface IProductType {
  typeId: string;
  id: string;
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
}

export interface IImage {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

export interface IAttribute {
  name: string;
  value: string | { key: string; label: string };
}

export interface IMasterData {
  current: {
    name: { [key: string]: string };
    description: { [key: string]: string };
    categories: { typeId: string; id: string }[];
    categoryOrderHints: { [key: string]: string };
    slug: { [key: string]: string };
    metaTitle: { [key: string]: string };
    metaDescription: { [key: string]: string };
    masterVariant: {
      id: number;
      prices: IPrice[];
      images: IImage[];
      attributes: IAttribute[];
      assets: unknown[];
    };
    variants: unknown[];
    searchKeywords: unknown;
  };
  staged: {
    name: { [key: string]: string };
    description: { [key: string]: string };
    categories: { typeId: string; id: string }[];
    categoryOrderHints: { [key: string]: string };
    slug: { [key: string]: string };
    metaTitle: { [key: string]: string };
    metaDescription: { [key: string]: string };
    masterVariant: {
      id: number;
      prices: IPrice[];
      images: IImage[];
      attributes: IAttribute[];
      assets: unknown[];
    };
    variants: unknown[];
    searchKeywords: unknown;
  };
  published: boolean;
  hasStagedChanges: boolean;
}

export interface IProduct {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
    user: IUser;
  };
  createdBy: {
    isPlatformClient: boolean;
    user: IUser;
  };
  productType: IProductType;
  masterData: IMasterData;
  priceMode: string;
  lastVariantId: number;
}
