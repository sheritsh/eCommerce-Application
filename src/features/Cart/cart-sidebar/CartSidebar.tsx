import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import classes from '../Cart.module.scss';
import { IRootState } from '../../../store';

const CartSidebar: React.FC = () => {
  const [promoCode, setPromoCode] = useState('');

  const handleApply = (): void => {
    // dispatch action when use promo
  };

  const totalCartPrice = useSelector((state: IRootState) => state.cart.cartData.cartAmount);

  return (
    <Card>
      <CardContent>
        <h2 className={classes.total_title}>Total</h2>
        <div className={classes.total_price}>Price: ${totalCartPrice}</div>
        <div>
          <TextField
            label="Promo Code"
            variant="outlined"
            value={promoCode}
            onChange={(e): void => setPromoCode(e.target.value)}
            className={classes.input_promo}
          />
          <div className={classes.promo_btn}>
            <Button variant="contained" disabled color="secondary" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
        <div className={classes.checkout_btn}>
          <Button variant="contained" style={{ background: '#FF652D' }} color="primary" size="large">
            Proceed to Checkout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSidebar;
