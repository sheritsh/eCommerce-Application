import * as React from 'react';
import Slider from '@mui/material/Slider';
import classes from './PriceSlider.module.scss';
import { IPrice } from './types';

const PriceSlider: React.FC<IPrice> = ({ value, price, changePrice }) => {
  return (
    <div className={classes.slider}>
      <Slider
        // aria-label="Price"
        // defaultValue={price.min}
        value={value}
        onChangeCommitted={changePrice}
        valueLabelDisplay="on"
        sx={{
          color: '#247C52',
        }}
        min={price.min}
        max={price.max}
      />
    </div>
  );
};

export default PriceSlider;
