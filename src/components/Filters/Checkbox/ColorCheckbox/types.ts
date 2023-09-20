export interface IColor {
  color: {
    id: number;
    checked: boolean;
    label: string;
  };
  handleChangeCheckedColor: (id: number) => void;
}
