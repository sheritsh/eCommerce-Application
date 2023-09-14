import React, { useState } from 'react';
import { Languages } from '../../../api/types';
import formatPrice from '../../../utils/catalog/format-price';
import truncateString from '../../../utils/catalog/truncate-string';
import classes from './ProductCard.module.scss';
import Button from '../../../components/UI/button/Button';
import { ISelectedProduct } from '../types';

interface IProductProps {
  product: ISelectedProduct;
  key?: string;
}

const ProductCard: React.FC<IProductProps> = ({ product }) => {
  if (!product.name) return null;

  // Temporary local shopping cart
  const [productsInCart, addProductToCart] = useState(['']);

  const addToCartHandler = (e: React.MouseEvent<HTMLButtonElement>, id: string): void => {
    addProductToCart([...productsInCart, id]);
    // console.log('Add', productsInCart);
  };

  const removeFromCartHandler = (e: React.MouseEvent<HTMLButtonElement>, id: string): void => {
    addProductToCart([...productsInCart.filter((item) => item !== id)]);
    // console.log('Remove', productsInCart);
  };

  return (
    <>
      {product ? (
        <li className={classes.item}>
          <h3>
            <a href={`catalog/${product.id}`} title={product.name[Languages.English]} className={classes.title}>
              {product.name[Languages.English]}
            </a>
          </h3>
          {product.masterVariant.prices[0].discounted ? (
            <div className={classes.prices}>
              <span className={classes.discount}>
                {formatPrice(product.masterVariant.prices[0].value.centAmount)}{' '}
                {product.masterVariant.prices[0].value.currencyCode}
              </span>
              <span className={classes.price}>
                {formatPrice(product.masterVariant.prices[0].discounted.value.centAmount)}{' '}
                {product.masterVariant.prices[0].discounted.value.currencyCode}
              </span>
            </div>
          ) : (
            <span className={classes.price}>
              {formatPrice(product.masterVariant.prices[0].value.centAmount)}{' '}
              {product.masterVariant.prices[0].value.currencyCode}
            </span>
          )}
          <a href={`catalog/${product.id}`} title={product.name[Languages.English]} className={classes.link}>
            <img
              src={product.masterVariant.images[0].url}
              alt={product.name[Languages.English]}
              className={classes.image}
            />
          </a>
          {!productsInCart?.includes(product.id) ? (
            <Button
              type="button"
              text="Add to cart"
              onClick={(e: React.MouseEvent<HTMLButtonElement>): void => addToCartHandler(e, product.id)}
            />
          ) : (
            <Button
              type="button"
              text="Remove from cart"
              backgroundColor="#247C52"
              onClick={(e: React.MouseEvent<HTMLButtonElement>): void => removeFromCartHandler(e, product.id)}
            />
          )}
          <div className={classes.description}>
            <a href={`catalog/${product.id}`} title={product.name[Languages.English]} className={classes.link}>
              {truncateString(product.description[Languages.English], 200)}
            </a>
          </div>
        </li>
      ) : null}
    </>
  );
};

export default ProductCard;
