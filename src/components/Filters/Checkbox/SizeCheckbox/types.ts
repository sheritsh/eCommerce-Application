export interface ISize {
  size: {
    id: number;
    checked: boolean;
    label: number;
  };
  handleChangeCheckedSize: (id: number) => void;
}
