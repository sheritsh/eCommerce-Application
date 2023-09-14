import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import classes from './CartItems.module.scss';

interface QuantityCounterProps {
  initialValue: number;
  onChange: (value: number) => void;
}

const QuantityCounter: React.FC<QuantityCounterProps> = ({ initialValue, onChange }) => {
  const [quantity, setQuantity] = useState(initialValue);

  const handleIncrement = (): void => {
    setQuantity(quantity + 1);
    onChange(quantity + 1);
  };

  const handleDecrement = (): void => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onChange(quantity - 1);
    }
  };

  return (
    <div className={classes.quantitiy_counters}>
      <IconButton aria-label="decrement" onClick={handleDecrement}>
        <RemoveIcon />
      </IconButton>
      <TextField
        type="number"
        value={quantity}
        inputProps={{ min: 1 }}
        onChange={(e): void => {
          const newQuantity = parseInt(e.target.value, 10) || 1;
          setQuantity(newQuantity);
          onChange(newQuantity);
        }}
      />
      <IconButton aria-label="increment" onClick={handleIncrement}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default QuantityCounter;
