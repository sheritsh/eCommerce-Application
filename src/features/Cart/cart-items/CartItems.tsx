import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { useSelector } from 'react-redux';
import classes from './CartItems.module.scss';
import { IRootState } from '../../../store';
import QuantityCounter from './QuantityCounter';

const CartItems: React.FC = () => {
  const lineItems = useSelector((state: IRootState) => state.cart.cartData.cartItems);

  if (!lineItems[0]) return null;

  return (
    <>
      {lineItems.map((item, index) => {
        const { name, price, quantity } = item;
        const { centAmount } = price.value;
        const { images } = item.variant;
        let discountedCentAmount = null;
        // console.error(images[0]);
        const imageUrl = images && images[0] && images[0].url;
        if (price.discounted) {
          discountedCentAmount = price.discounted.value.centAmount;
        }

        return (
          <Card key={index}>
            <CardContent>
              <div className={classes.cart_item}>
                <div className={classes.card_img}>
                  <CardMedia component="img" height="200" image={imageUrl} alt="CartName" />
                </div>
                <div className={classes.card_content}>
                  <Typography variant="h6">{name['en-US']}</Typography>
                  <div>Quantity: {quantity}</div>
                </div>
                <div className={classes.card_prices}>
                  <div>{discountedCentAmount ? `$${discountedCentAmount / 100}` : null}</div>
                  <div>${centAmount / 100}</div>
                </div>
                <div className={classes.card_change_val}>
                  <QuantityCounter initialValue={quantity} />
                  <Typography variant="body1" color="textSecondary" style={{ cursor: 'pointer' }}>
                    Remove
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default CartItems;
