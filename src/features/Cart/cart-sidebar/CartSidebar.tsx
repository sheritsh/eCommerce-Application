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

  const cartId = useSelector((state: IRootState) => state.cart.cartData.cartId);
  const cartVersion = useSelector((state: IRootState) => state.cart.cartData.actualCartVer);
  const promocodeId = useSelector((state: IRootState) => state.cart?.promocodeId);
  const isPromocodeApplied = useSelector((state: IRootState) => state.cart?.isPromocodeActive);

  const handleApply = (e): void => {
    dispatch(fetchPromocodeData({ promocode, cartId, cartVersion }));
  };

  const handleRemove = (e): void => {
    dispatch(fetchPromocodeDataRemove({ promocodeId, cartId, cartVersion }));
  };

  const totalCartPrice = useSelector((state: IRootState) => state.cart.cartData.cartAmount);
  const fullCartPrice = useSelector((state: IRootState) => state.cart.fullPrice);
  const error = useSelector((state: IRootState) => state.cart.error);
  const errorMessage = error === 'Request failed with status code 400' ? 'The discount code was not found.' : error;
  const errorWhileUnauthorized = 'Please Sign up to apply promocode';
  const isCustomerAutorized = useSelector((state: IRootState) => state.auth.authData.accessToken);

  return (
    <Card>
      <CardContent>
        <h2 className={classes.total_title}>Total</h2>
        {!isPromocodeApplied ? (
          <div className={classes.total_price}>Price: ${totalCartPrice}</div>
        ) : (
          <div className={classes.total_price}>
            Price: <span>${fullCartPrice}</span> ${totalCartPrice}
          </div>
        )}

        <div>
          <div className={classes.error}>{isCustomerAutorized ? errorMessage : errorWhileUnauthorized}</div>
          <TextField
            label="Promo Code"
            variant="outlined"
            value={promocode}
            onChange={(e): void => setPromoCode(e.target.value)}
            className={classes.input_promo}
          />
          <div className={classes.promo_btn}>
            <Button
              variant="contained"
              color="primary"
              disabled={!isCustomerAutorized}
              onClick={(e): void => handleApply(e)}
            >
              Apply promocode
            </Button>
            <Button
              variant="contained"
              color="secondary"
              disabled={!isPromocodeApplied}
              onClick={(e): void => handleRemove(e)}
            >
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
