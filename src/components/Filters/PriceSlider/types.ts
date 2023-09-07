export interface IPrice {
  price: {
    min: number;
    max: number;
  };
  value: number[];
  changePrice: () => void;
}
