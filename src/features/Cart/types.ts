export interface ICartState {
  cartData: {
    cartId: string;
    actualCartVer: number;
    cartAmount: number;
    cartItems: [];
  };
  isLoaded: boolean;
  status: null | string;
  error: null | string;
  isPromocodeActive: boolean;
  fullPrice: number;
}

export interface IApllyPromocode {
  promocode: string;
  cartId: string;
  cartVersion: number;
  username: string;
  password: string;
}

export interface IRemovePromocode {
  promocodeId: string;
  cartId: string;
  cartVersion: number;
  username: string;
  password: string;
  isPromocodeActive: boolean;
  fullPrice: number;
}
