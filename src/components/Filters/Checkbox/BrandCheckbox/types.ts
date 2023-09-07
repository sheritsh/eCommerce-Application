export interface IBrand {
  brand: {
    id: number;
    checked: boolean;
    label: string;
  };
  handleChangeCheckedBrand: (id: number) => void;
}
