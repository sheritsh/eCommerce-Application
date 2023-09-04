import * as React from 'react';
import Slider from '@mui/material/Slider';
import classes from './PriceSlider.module.scss';

const PriceSlider: React.FC = () => {
  const [value, setValue] = React.useState<number>(30);

  const handleChange = (event: Event, newValue: number | number[]): void => {
    setValue(newValue as number);
  };

  return (
    <div className={classes.slider}>
      <Slider
        aria-label="Volume"
        value={value}
        onChange={handleChange}
        sx={{
          color: '#247C52',
        }}
      />
    </div>
  );
};

export default PriceSlider;
