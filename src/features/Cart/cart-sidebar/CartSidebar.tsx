import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import classes from '../Cart.module.scss';
import { IRootState, useAppDispatch } from '../../../store';
import { fetchCartItems, fetchPromocodeData, fetchPromocodeDataRemove, createCart, deleteMyCart } from '../cart-slice';

const CartSidebar: React.FC<{ accessToken: string | null; idCart: string; versionCart: number }> = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();
  const [promocode, setPromoCode] = useState('');
  const [open, setOpen] = React.useState(false);

  const token = props.accessToken || localStorage.getItem('anonymousToken');
  const cartId = useSelector((state: IRootState) => state.cart.cartData.cartId);
  const cartVersion = useSelector((state: IRootState) => state.cart.cartData.actualCartVer);
  const promocodeId = useSelector((state: IRootState) => state.cart?.promocodeId);
  const isPromocodeApplied = useSelector((state: IRootState) => state.cart?.isPromocodeActive);

  const username = useSelector((state: IRootState) => state.auth.authData.credentials.login);
  const password = useSelector((state: IRootState) => state.auth.authData.credentials.password);

  const handleApply = (): void => {
    dispatch(fetchPromocodeData({ promocode, cartId, cartVersion, username, password }));
  };

  const handleRemove = (): void => {
    dispatch(fetchPromocodeDataRemove({ promocodeId, cartId, cartVersion, username, password }));
  };

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleCartDelete = (): void => {
    setOpen(false);
    deleteMyCart(token, props.idCart, props.versionCart);
    createCart(token);
    setTimeout(() => {
      dispatch(fetchCartItems(props.accessToken as string));
    }, 1000);
  };

  const totalCartPrice = useSelector((state: IRootState) => state.cart.cartData.cartAmount);
  const fullCartPrice = useSelector((state: IRootState) => state.cart.fullPrice);
  const error = useSelector((state: IRootState) => state.cart.error);
  const errorMessage = error === 'Request failed with status code 400' ? 'The discount code was not found.' : error;
  const errorWhileUnauthorized = 'Please Sign in / Sign up to apply promocode';
  const isCustomerAutorized = useSelector((state: IRootState) => state.auth.authData.accessToken);

  return (
    <>
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
                style={{ fontSize: '10px', backgroundColor: '#48DC6A', color: '#000', opacity: '0.7' }}
                color="primary"
                disabled={!isCustomerAutorized}
                onClick={handleApply}
              >
                Apply promocode
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ opacity: '0.7' }}
                disabled={!isPromocodeApplied}
                onClick={handleRemove}
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

      <Typography variant="body1" color="textSecondary" style={{ cursor: 'pointer' }} onClick={handleClickOpen}>
        Clear Cart
      </Typography>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogContent>
          <DialogContentText>Are you sure you want to clear your cart?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCartDelete}>
            Yes
          </Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CartSidebar;
