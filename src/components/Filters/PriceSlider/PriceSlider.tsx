import * as React from 'react';
import Slider from '@mui/material/Slider';
import classes from './PriceSlider.module.scss';
import { IPrice } from './types';

const PriceSlider: React.FC<IPrice> = ({ price }: IPrice) => {
  const [value, setValue] = React.useState<number>(price.min);

  const handleChange = (event: Event, newValue: number | number[]): void => {
    setValue(newValue as number);
  };

  return (
    <div className={classes.slider}>
      <Slider
        aria-label="Price"
        defaultValue={price.min}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
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
