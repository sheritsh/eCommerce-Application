import { IBrand } from './Checkbox/BrandCheckbox/types';
import { IColor } from './Checkbox/ColorCheckbox/types';
import { ISize } from './Checkbox/SizeCheckbox/types';

export interface IFilters {
  brands: IBrand['brand'][];
  colors: IColor['color'][];
  sizes: ISize['size'][];
  handleChangeCheckedBrand: (id: number) => void;
  handleChangeCheckedColor: (id: number) => void;
  handleChangeCheckedSize: (id: number) => void;
  prices: number[];
  changePrice: () => void;
  selectedPrice: number[];
}
