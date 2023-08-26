import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { fetchProducts } from './products-slice';
import { IRootState } from '../../components/UI/forms/form/type';
import { Languages } from './types';
import formatPrice from '../../utils/catalog/format-price';
import truncateString from '../../utils/catalog/truncate-string';
import classes from './Products.module.scss';
import Button from '../../components/UI/button/Button';

const Products: React.FC = () => {
  const products = useSelector((state: IRootState) => state.products.productsData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <>
      {products.isLoading && <div>Loading...</div>}
      {!products.isLoading && products.error ? <div>{products.error}</div> : null}
      {!products.isLoading && products.results.length ? (
        <ul className={classes.list}>
          {products.results.map((result) => (
            <li key={result.id} className={classes.item}>
              <h3>
                <a href="#" title={result.masterData.staged.name[Languages.English]} className={classes.title}>
                  {result.masterData.staged.name[Languages.English]}
                </a>
              </h3>
              {result.masterData.staged.masterVariant.prices[0].discounted ? (
                <div className={classes.prices}>
                  <span className={classes.discount}>
                    {formatPrice(result.masterData.staged.masterVariant.prices[0].value.centAmount)}{' '}
                    {result.masterData.staged.masterVariant.prices[0].value.currencyCode}
                  </span>
                  <span className={classes.price}>
                    {formatPrice(result.masterData.staged.masterVariant.prices[0].discounted.value.centAmount)}{' '}
                    {result.masterData.staged.masterVariant.prices[0].discounted.value.currencyCode}
                  </span>
                </div>
              ) : (
                <span className={classes.price}>
                  {formatPrice(result.masterData.staged.masterVariant.prices[0].value.centAmount)}{' '}
                  {result.masterData.staged.masterVariant.prices[0].value.currencyCode}
                </span>
              )}
              <a href="#" title={result.masterData.staged.name[Languages.English]} className={classes.link}>
                <img
                  src={result.masterData.staged.masterVariant.images[0].url}
                  alt={result.masterData.staged.name[Languages.English]}
                  className={classes.image}
                />
              </a>
              <Button type="button" text="Add to cart" />
              <p>
                <a href="#" title={result.masterData.staged.name[Languages.English]} className={classes.link}>
                  {truncateString(result.masterData.staged.description[Languages.English], 200)}
                </a>
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default Products;
