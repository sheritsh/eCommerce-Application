import { IBrand } from '../../components/Filters/Checkbox/BrandCheckbox/types';
import { ISize } from '../../components/Filters/Checkbox/SizeCheckbox/types';
import { IColor } from '../../components/Filters/Checkbox/ColorCheckbox/types';

interface IFiltersData {
  brands: IBrand['brand'][];
  colors: IColor['color'][];
  sizes: ISize['size'][];
  selectedPrice: number[];
}

interface IApplyFiltersResult {
  [key: string]: string[] | number[];
}

const applyFilters = (filtersData: IFiltersData): IApplyFiltersResult => {
  const { brands, colors, sizes, selectedPrice } = filtersData;
  const brandsChecked = brands.filter((item) => item.checked).map((item) => item.label);
  const colorsChecked = colors.filter((item) => item.checked).map((item) => item.label.toLowerCase());
  const sizesChecked = sizes.filter((item) => item.checked).map((item) => item.label);
  const priceRange = [selectedPrice[0], selectedPrice[1]];
  return {
    brandsChecked,
    colorsChecked,
    sizesChecked,
    priceRange,
  };
};

export default applyFilters;
