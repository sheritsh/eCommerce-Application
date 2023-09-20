import { IImage } from '../Products/types';

export interface ICartItem {
  id: string;
  productId: string;
  name: {
    'en-US': string;
  };
  price: {
    id: string;
    value: {
      type: string;
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
    discounted: {
      value: {
        centAmount: number;
      };
    };
  };
  quantity: number;
  variant: {
    images: IImage[];
  };
}
export interface ICartState {
  cartData: {
    cartId: string;
    actualCartVer: number;
    cartAmount: number;
    cartItems: ICartItem[];
  };
  isLoaded: boolean;
  status: null | string;
  error: null | string;
  isPromocodeActive: boolean;
  promocodeId: string;
  fullPrice: number;
}

export interface IApllyPromocode {
  promocode: string;
  cartId: string;
  cartVersion: number;
  username?: string;
  password?: string;
}

export interface IRemovePromocode {
  promocodeId: string;
  cartId: string;
  cartVersion: number;
  username?: string;
  password?: string;
}
