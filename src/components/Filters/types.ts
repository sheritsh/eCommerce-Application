import { IBrand } from './Checkbox/BrandCheckbox/types';
import { IColor } from './Checkbox/ColorCheckbox/types';
import { ISize } from './Checkbox/SizeCheckbox/types';

export type IFilterItem = IBrand['brand'] | IColor['color'] | ISize['size'];
