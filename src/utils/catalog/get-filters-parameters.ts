import { IObject, ISelectedProduct, IFiltersParameters } from '../../features/Products/types';

const getFiltersParameters = (products: ISelectedProduct[]): IFiltersParameters => {
  const attributesBrand = products.map(
    (product) => product.masterVariant.attributes.filter((attribute) => attribute.name === 'brand')[0].value as string,
  );
  const attributesColorObject = products.map(
    (product) => product.masterVariant.attributes.filter((attribute) => attribute.name === 'color')[0] as IObject,
  );
  const attributesSize = products.map(
    (product) => product.masterVariant.attributes.filter((attribute) => attribute.name === 'size')[0].value as number,
  );
  const attributesColor = attributesColorObject.map((obj) => obj.value.key);

  const brands = [...new Set(attributesBrand)].sort().map((element, index) => {
    return {
      id: index,
      checked: false,
      label: element,
    };
  });

  const colors = [...new Set(attributesColor)].sort().map((element, index) => {
    return {
      id: index,
      checked: false,
      label: element,
    };
  });
  const sizes = [...new Set(attributesSize)]
    .sort((a, b) => a - b)
    .map((element, index) => {
      return {
        id: index,
        checked: false,
        label: element,
      };
    });

  const prices = [
    ...new Set(
      products.map((product) =>
        product.masterVariant.prices[0].discounted
          ? product.masterVariant.prices[0].discounted.value.centAmount
          : product.masterVariant.prices[0].value.centAmount,
      ),
    ),
  ].sort((a, b) => a - b);
  const price = [prices[0], prices[prices.length - 1]];
  return { brands, colors, sizes, price };
};

export default getFiltersParameters;
