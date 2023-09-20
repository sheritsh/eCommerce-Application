import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { IRootState } from '../types';
import CartItems from './cart-items/CartItems';
import CartSidebar from './cart-sidebar/CartSidebar';
import { fetchCartItems } from './cart-slice';
import classes from './Cart.module.scss';
import { useAppDispatch } from '../../store';

const Cart: React.FC = () => {
  const accessToken = useSelector((state: IRootState) => state.auth.authData.accessToken);
  const isEmpty = useSelector((state: IRootState) => !state.cart.cartData.cartAmount);

  const cartId = useSelector((state: IRootState) => state.cart.cartData.cartId);
  const cartVersion = useSelector((state: IRootState) => state.cart.cartData.actualCartVer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (accessToken) dispatch(fetchCartItems(accessToken));
  }, [accessToken]);

  return isEmpty ? (
    <>
      <div className={classes.empty_cart}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontFamily: 'Overpass, "Helvetica Neue", Helvetica, Arial, sans-serif',
          }}
        >
          Nothing in your cart yet
        </Typography>
        <div>
          <a href="/catalog">
            <Button
              size="large"
              variant="contained"
              sx={{
                backgroundColor: '#FF652e',
                fontFamily: 'Arial',
                '&:hover, &:focus ': {
                  fontFamily: 'Arial',
                  backgroundColor: '#FF652e',
                  opacity: 0.8,
                  transition: 'all linear 0.5s',
                },
              }}
            >
              Go Shopping Now
            </Button>
          </a>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className={classes.cart_page}>
        <div className={classes.cart_list}>
          <h1>Your cart</h1>
          <CartItems />
        </div>
        <div className={classes.cart_sidebar}>
          <CartSidebar accessToken={accessToken} idCart={cartId} versionCart={cartVersion} />
        </div>
      </div>
    </>
  );
};

export default Cart;
