import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import classes from '../Cart.module.scss';
import { IRootState, useAppDispatch } from '../../../store';
import { fetchPromocodeData, fetchPromocodeDataRemove } from '../cart-slice';

const CartSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [promocode, setPromoCode] = useState('');
  const [isActive, setActive] = useState(false);

  const cartId = useSelector((state: IRootState) => state.cart.cartData.cartId);
  const cartVersion = useSelector((state: IRootState) => state.cart.cartData.actualCartVer);
  const promocodeId = useSelector(
    (state: IRootState) => state.cart?.promocodeAnswer?.data?.discountCodes[0]?.discountCode?.id,
  );

  const handleApply = (e): void => {
    dispatch(fetchPromocodeData({ promocode, cartId, cartVersion }));
    setActive(true);
  };

  const handleRemove = (e): void => {
    console.log(promocodeId);
    dispatch(fetchPromocodeDataRemove({ promocodeId, cartId, cartVersion }));
    setActive(false);
  };

  const totalCartPrice = useSelector((state: IRootState) => state.cart.cartData.cartAmount);

  return (
    <Card>
      <CardContent>
        <h2 className={classes.total_title}>Total</h2>
        {!isActive ? (
          <div className={classes.total_price}>Price: ${totalCartPrice}</div>
        ) : (
          <div className={classes.total_price}>
            Price: <span>${totalCartPrice}</span> ${totalCartPrice}
          </div>
        )}

        <div>
          <TextField
            label="Promo Code"
            variant="outlined"
            value={promocode}
            onChange={(e): void => setPromoCode(e.target.value)}
            className={classes.input_promo}
          />
          <div className={classes.promo_btn}>
            <Button variant="contained" color="primary" onClick={(e): void => handleApply(e)}>
              Apply
            </Button>
            <Button variant="contained" color="secondary" disabled={!isActive} onClick={(e): void => handleRemove(e)}>
              Remove
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
