import React from 'react';
import { Languages } from '../../../../api/types';
import formatPrice from '../../../../utils/catalog/format-price';
import truncateString from '../../../../utils/catalog/truncate-string';
import classes from '../../../Products/ProductCard/ProductCard.module.scss';
import Button from '../../../../components/UI/button/Button';
import { IResult } from '../types';

interface IProductProps {
  product: IResult;
  key?: string;
}

const ProductCard: React.FC<IProductProps> = ({ product }) => {
  return (
    <li className={classes.item}>
      <h3>
        <a href="#" title={product.name[Languages.English]} className={classes.title}>
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
      <a href="#" title={product.name[Languages.English]} className={classes.link}>
        <img
          src={product.masterVariant.images[0].url}
          alt={product.name[Languages.English]}
          className={classes.image}
        />
      </a>
      <Button type="button" text="Add to cart" />
      <p>
        <a href="#" title={product.name[Languages.English]} className={classes.link}>
          {truncateString(product.description[Languages.English], 200)}
        </a>
      </p>
    </li>
  );
};

export default ProductCard;
