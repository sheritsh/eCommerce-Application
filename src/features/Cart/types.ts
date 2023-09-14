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
}
