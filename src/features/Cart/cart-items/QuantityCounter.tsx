import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import classes from './CartItems.module.scss';

interface QuantityCounterProps {
  initialValue: number;
  onAddItem?: () => void;
  onRemoveItem?: () => void;
}

const QuantityCounter: React.FC<QuantityCounterProps> = ({ initialValue, onAddItem, onRemoveItem }) => {
  let quantity: number = initialValue;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleIncrement = (): void => {
    if (quantity < 99) {
      quantity += 1;
      setIsButtonDisabled(true);
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 1000);
    }
  };

  const handleDecrement = (): void => {
    if (quantity > 1) {
      quantity -= 1;
      setIsButtonDisabled(true);
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 1000);
    }
  };

  return (
    <div className={classes.quantitiy_counters}>
      <IconButton
        aria-label="decrement"
        onClick={() => {
          handleDecrement();
          if (onRemoveItem) onRemoveItem();
        }}
        disabled={isButtonDisabled}
      >
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
      <IconButton
        aria-label="increment"
        onClick={() => {
          handleIncrement();
          if (onAddItem) onAddItem();
        }}
        disabled={isButtonDisabled}
      >
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default QuantityCounter;
