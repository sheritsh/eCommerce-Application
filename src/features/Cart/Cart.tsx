import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { createCart, getMyCart, getHasCart } from '../../api/cart';
import Button from '@mui/material/Button';
import { IRootState } from '../../store';
import CartItems from './cart-items/CartItems';
import CartSidebar from './cart-sidebar/CartSidebar';
import { fetchCartItems } from './cart-slice';
import classes from './Cart.module.scss';

const Cart: React.FC = () => {
  const accessToken = useSelector((state: IRootState) => state.auth.authData.accessToken);
  const isEmpty = useSelector((state: IRootState) => !state.cart.cartData.cartAmount);

  const cartId = useSelector((state: IRootState) => state.cart.cartData.cartId);
  const cartVersion = useSelector((state: IRootState) => state.cart.cartData.actualCartVer);

  // const state = useSelector((state: IRootState) => state.cart.cartData.cartId);
  // const hasCart = useSelector((state: IRootState) => !!state.cart.cartData.cartId);

  const dispatch = useDispatch();

  // const fullPrice = useSelector((state: IRootState) => state.cart.fullPrice);

  useEffect(() => {
    dispatch(fetchCartItems(accessToken));
  }, [accessToken]);

  // getMyCart(accessToken);
  // createCart(accessToken);
  // getHasCart(accessToken).then((res) => {
  //   console.error(res);
  // });
  // console.error(hasCart);
  return isEmpty ? (
    <>
      <div className={classes.empty_cart}>
        <Typography variant="h2" gutterBottom>
          Nothing in your cart yet
        </Typography>
        <div>
          <a href="/catalog">
            <Button size="large" variant="contained">
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

  // В корзине пока пусто
  // Загляните на главную, чтобы выбрать товары или найдите нужное в поиске
  // Перейти на главную
};

export default Cart;
