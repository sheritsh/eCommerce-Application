import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import classes from './CartItems.module.scss';
import { IRootState } from '../../../store';
import QuantityCounter from './QuantityCounter';
import { addItemToCart, removeItemFromCart } from '../../../api/cart';

const CartItems: React.FC = () => {
  const lineItems = useSelector((state: IRootState) => state.cart.cartData.cartItems);
  const anonToken = localStorage.getItem('anonymousToken');
  const accessToken = useSelector((state: IRootState) => state.auth.authData.accessToken) as string || anonToken;
  const cartId = useSelector((state: IRootState) => state.cart.cartData.cartId);
  const cartVersion = useSelector((state: IRootState) => state.cart.cartData.actualCartVer);
  const dispatch = useDispatch();

  if (!lineItems[0]) return null;

  return (
    <>
      {lineItems.map((item, index) => {
        const { name, price, quantity, productId, id } = item;
        console.error(item);
        const { centAmount } = price.value;
        const { images } = item.variant;
        let discountedCentAmount = null;
        const imageUrl = images && images[0] && images[0].url;
        if (price.discounted) {
          discountedCentAmount = price.discounted.value.centAmount;
        }
        const handleRemoveFromCart = (amount = 1): void => {
          dispatch(removeItemFromCart(accessToken, cartId, id, amount, cartVersion) as unknown as AnyAction);
        };

        const handleAddItemToCart = (): void => {
          dispatch(addItemToCart(accessToken, cartId, productId, 1, cartVersion) as unknown as AnyAction);
        };

        return (
          <React.Fragment key={index}>
            <Card>
              <CardContent>
                <div className={classes.cart_item}>
                  <div className={classes.card_img}>
                    <a href={`/catalog/${productId}`}>
                      <CardMedia component="img" height="200" image={imageUrl} alt="CartName" />
                    </a>
                  </div>
                  <div className={classes.card_content}>
                    <Typography variant="h6">
                      <a href={`/catalog/${productId}`}>{name['en-US']}</a>
                    </Typography>
                    <div>Quantity: {quantity}</div>
                  </div>
                  <div className={classes.card_prices}>
                    <div>{discountedCentAmount ? `$${discountedCentAmount / 100}` : null}</div>
                    <div className={discountedCentAmount && classes.discounted_price}>${centAmount / 100}</div>
                  </div>
                  <div className={classes.card_change_val}>
                    <QuantityCounter
                      initialValue={quantity}
                      onAddItem={handleAddItemToCart}
                      onRemoveItem={handleRemoveFromCart}
                    />
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      style={{ cursor: 'pointer' }}
                      onClick={(): void => {
                        handleRemoveFromCart(quantity);
                      }}
                    >
                      Remove
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default CartItems;
