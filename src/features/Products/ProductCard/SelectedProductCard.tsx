import React from 'react';
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

const SelectedProductCard: React.FC<IProductProps> = ({ product }) => {
  if (product) {
    const productName = product.name[Languages.English];
    const productDescription = product.description[Languages.English];
    const productRegularPrice = product.masterVariant.prices[0].value.centAmount;
    const productDiscountedPrice = product.masterVariant.prices[0].discounted;
    const productImage = product.masterVariant.images[0].url;

    return (
      <li className={classes.item}>
        <h3>
          <a href={`catalog/${product.id}`} title={productName} className={classes.title}>
            {productName}
          </a>
        </h3>
        {productDiscountedPrice ? (
          <div className={classes.prices}>
            <span className={classes.discount}>
              {formatPrice(productRegularPrice)}
              {'  $'}
            </span>
            <span className={classes.price}>
              {formatPrice(productDiscountedPrice.value.centAmount)} {productDiscountedPrice.value.currencyCode}
            </span>
          </div>
        ) : (
          <span className={classes.price}>
            {formatPrice(productRegularPrice)}
            {' $'}
          </span>
        )}
        <a href="#" title={productName} className={classes.link}>
          <img src={productImage} alt={productName} className={classes.image} />
        </a>
        <Button type="button" text="Add to cart" />
        <p>
          <a href="#" title={productName} className={classes.link}>
            {truncateString(productDescription, 200)}
          </a>
        </p>
      </li>
    );
  }

  return null;
};

export default SelectedProductCard;
