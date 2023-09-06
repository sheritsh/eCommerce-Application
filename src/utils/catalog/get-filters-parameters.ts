import { IObject, ISelectedProduct } from '../../features/Products/types';
import { IBrand } from '../../components/Filters/Checkbox/BrandCheckbox/types';
import { ISize } from '../../components/Filters/Checkbox/SizeCheckbox/types';
import { IColor } from '../../components/Filters/Checkbox/ColorCheckbox/types';

interface IFiltersParameters {
  startBrands: IBrand['brand'][];
  startSizes: ISize['size'][];
  startColors: IColor['color'][];
}

const getFiltersParameters = (products: ISelectedProduct[]): IFiltersParameters => {
  const attributesBrand = products.map(
    (product) => product.masterVariant.attributes.filter((attribute) => attribute.name === 'brand')[0].value,
  );
  const attributesColorObject = products.map(
    (product) => product.masterVariant.attributes.filter((attribute) => attribute.name === 'color')[0] as IObject,
  );
  const attributesSize = products.map(
    (product) => product.masterVariant.attributes.filter((attribute) => attribute.name === 'size')[0].value as number,
  );
  const attributesColor = attributesColorObject.map((obj) => obj.value.key);

  const startBrands = [...new Set(attributesBrand)].sort().map((element, index) => {
    return {
      id: index,
      checked: false,
      label: element,
    };
  });

  const startColors = [...new Set(attributesColor)].sort().map((element, index) => {
    return {
      id: index,
      checked: false,
      label: element,
    };
  });
  const startSizes = [...new Set(attributesSize)]
    .sort((a, b) => a - b)
    .map((element, index) => {
      return {
        id: index,
        checked: false,
        label: element,
      };
    });

  const startPrice = [
    ...new Set(
      products.map((product) =>
        product.masterVariant.prices[0].discounted
          ? product.masterVariant.prices[0].discounted.value.centAmount
          : product.masterVariant.prices[0].value.centAmount,
      ),
    ),
  ].sort((a, b) => a - b);
  return { startBrands, startColors, startSizes, startPrice };
};

export default getFiltersParameters;
