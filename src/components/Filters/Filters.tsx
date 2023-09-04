import React from 'react';
import BrandCheckbox from './Checkbox/BrandCheckbox/BrandCheckbox';
import ColorCheckbox from './Checkbox/ColorCheckbox/ColorCheckbox';
import PriceSlider from './PriceSlider/PriceSlider';
import classes from './Filters.module.scss';

const Filters: React.FC = () => {
  const brands = [
    { id: 1, title: 'Terranova', isChecked: false },
    { id: 2, title: 'SomeOther', isChecked: false },
  ];
  const colors = [
    {
      id: 1,
      name: 'white',
    },
    {
      id: 2,
      name: 'gray',
    },
    {
      id: 3,
      name: 'blue',
    },
  ];
  return (
    <div className={classes.container}>
      <div className={classes.filter}>
        <h4 className={classes.title}>Brands</h4>
        {brands.map((brand) => (
          <BrandCheckbox key={brand.id} brand={brand} />
        ))}
      </div>
      <div className={classes.filter}>
        <h4 className={classes.title}>Colors</h4>
        {colors.map((color) => (
          <ColorCheckbox key={color.id} color={color} />
        ))}
      </div>
      <div className={classes.filter}>
        <h4 className={classes.title}>Price</h4>
        <PriceSlider />
      </div>
    </div>
  );
};

export default Filters;
