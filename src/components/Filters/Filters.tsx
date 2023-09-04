import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store';
import BrandCheckbox from './Checkbox/BrandCheckbox/BrandCheckbox';
import ColorCheckbox from './Checkbox/ColorCheckbox/ColorCheckbox';
import PriceSlider from './PriceSlider/PriceSlider';
import SizeCheckbox from './Checkbox/SizeCheckbox/SizeCheckbox';
import classes from './Filters.module.scss';
import formatPrice from '../../utils/catalog/format-price';
import { IObject } from '../../features/Products/types';

const Filters: React.FC = () => {
  const products = useSelector((state: IRootState) => state.products.productsData.results);

  const attributesBrand = products.map(
    (product) =>
      product.masterData.staged.masterVariant.attributes.filter((attribute) => attribute.name === 'brand')[0]
        .value as string,
  );
  const brands = [...new Set(attributesBrand)].sort();

  const attributesColorObject = products.map(
    (product) =>
      product.masterData.staged.masterVariant.attributes.filter(
        (attribute) => attribute.name === 'color',
      )[0] as IObject,
  );
  const attributesColor = attributesColorObject.map((obj) => obj.value.key);

  const colors = [...new Set(attributesColor)].sort();

  const attributesSize = products.map(
    (product) =>
      product.masterData.staged.masterVariant.attributes.filter((attribute) => attribute.name === 'size')[0]
        .value as number,
  );
  const sizes = [...new Set(attributesSize)].sort((a, b) => a - b);

  const prices = [
    ...new Set(
      products.map((product) =>
        product.masterData.staged.masterVariant.prices[0].discounted
          ? product.masterData.staged.masterVariant.prices[0].discounted.value.centAmount
          : product.masterData.staged.masterVariant.prices[0].value.centAmount,
      ),
    ),
  ].sort((a, b) => a - b);

  return (
    <div className={classes.container}>
      <div className={classes.filter}>
        <h4 className={classes.title}>Brands</h4>
        {brands.map((brand, index) => (
          <BrandCheckbox key={index} brand={brand} />
        ))}
      </div>
      <div className={classes.filter}>
        <h4 className={classes.title}>Colors</h4>
        {colors.map((color, index) => (
          <ColorCheckbox key={index} color={color} />
        ))}
      </div>
      <div className={classes.filter}>
        <h4 className={classes.title}>Sizes</h4>
        {sizes.map((size, index) => (
          <SizeCheckbox key={index} size={size} />
        ))}
      </div>
      <div className={classes.filter}>
        <h4 className={classes.title}>Price</h4>
        <PriceSlider price={{ min: formatPrice(prices[0]), max: formatPrice(prices[prices.length - 1]) }} />
      </div>
    </div>
  );
};

export default Filters;
