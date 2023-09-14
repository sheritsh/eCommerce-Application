import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import classes from './CartItems.module.scss';

interface QuantityCounterProps {
  initialValue: number;
}

const QuantityCounter: React.FC<QuantityCounterProps> = ({ initialValue }) => {
  const [quantity, setQuantity] = useState(initialValue);

  const handleIncrement = (): void => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = (): void => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
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
        inputProps={{
          readOnly: true,
          min: 1,
        }}
        onChange={(e): void => {
          const newQuantity = parseInt(e.target.value, 10) || 1;
          setQuantity(newQuantity);
        }}
      />
      <IconButton aria-label="increment" onClick={handleIncrement}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default QuantityCounter;
