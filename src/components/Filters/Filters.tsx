import React from 'react';
import BrandCheckbox from './Checkbox/BrandCheckbox/BrandCheckbox';
import ColorCheckbox from './Checkbox/ColorCheckbox/ColorCheckbox';
import PriceSlider from './PriceSlider/PriceSlider';
import SizeCheckbox from './Checkbox/SizeCheckbox/SizeCheckbox';
import classes from './Filters.module.scss';
import { IFilters } from './types';
import { IPrice } from './PriceSlider/types';
import Button from '../UI/button/Button';

const Filters: React.FC<IFilters> = ({
  brands,
  colors,
  sizes,
  handleChangeCheckedBrand,
  handleChangeCheckedColor,
  handleChangeCheckedSize,
  prices,
  selectedPrice,
  changePrice,
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.filter}>
        <h4 className={classes.title}>Brands</h4>
        {brands.map((brand, index) => (
          <BrandCheckbox key={index} brand={brand} handleChangeCheckedBrand={handleChangeCheckedBrand} />
        ))}
      </div>
      <div className={classes.filter}>
        <h4 className={classes.title}>Colors</h4>
        {colors.map((color, index) => (
          <ColorCheckbox key={index} color={color} handleChangeCheckedColor={handleChangeCheckedColor} />
        ))}
      </div>
      <div className={classes.filter}>
        <h4 className={classes.title}>Sizes</h4>
        {sizes.map((size, index) => (
          <SizeCheckbox key={index} size={size} handleChangeCheckedSize={handleChangeCheckedSize} />
        ))}
      </div>
      <div className={classes.filter}>
        <h4 className={classes.title}>Price</h4>
        <PriceSlider
          price={{ min: prices[0], max: prices[prices.length - 1] } as IPrice['price']}
          value={selectedPrice}
          changePrice={changePrice || []}
        />
      </div>
    </div>
  );
};

export default Filters;
