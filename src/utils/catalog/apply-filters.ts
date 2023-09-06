import { IBrand } from '../../components/Filters/Checkbox/BrandCheckbox/types';
import { ISize } from '../../components/Filters/Checkbox/SizeCheckbox/types';
import { IColor } from '../../components/Filters/Checkbox/ColorCheckbox/types';

const applyFilters = (filtersData): object => {
  const { brands, colors, sizes, selectedPrice } = filtersData;
  const brandsChecked = brands.filter((item) => item.checked).map((item) => item.label);
  const colorsChecked = colors.filter((item) => item.checked).map((item) => item.label.toLowerCase());
  const sizesChecked = sizes.filter((item) => item.checked).map((item) => item.label);
  const minPrice = selectedPrice[0];
  const maxPrice = selectedPrice[1];
  const priceRange = [minPrice, maxPrice];
  return {
    brandsChecked,
    colorsChecked,
    sizesChecked,
    priceRange,
  };
};

export default applyFilters;
