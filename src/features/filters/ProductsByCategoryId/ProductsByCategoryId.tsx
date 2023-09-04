import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'react-loader-spinner';
import { useAppDispatch } from '../../../store';
import { fetchProductsByCategoryId } from './products-by-category-id-slice';
import { IRootState } from '../../types';
import classes from '../../Products/Products.module.scss';
import ProductCard from './ProductCard/ProductCard';
import SelectedProductCard from '../../Products/ProductCard/SelectedProductCard';

interface IProductsProps {
  categoryId?: string;
  searchQuery?: string;
}

const ProductsByCategoryId: React.FC<IProductsProps> = ({ categoryId = '', searchQuery }) => {
  const products = useSelector((state: IRootState) => state.productsByCategoryId.productsByCategoryIdData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProductsByCategoryId(categoryId, searchQuery));
  }, [categoryId, searchQuery]);
  return (
    <>
      {products.isLoading && (
        <Grid
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="spinner"
          visible={true}
        />
      )}
      {!products.isLoading && products.error ? <div>{products.error}</div> : null}
      {!products.isLoading && products.results.length && !categoryId ? (
        <ul className={classes.list}>
          {products.results.map((result) => (
            <ProductCard product={result} key={result.id} />
          ))}
        </ul>
      ) : null}
      {categoryId ? (
        <ul className={classes.list}>
          {products.results.map((result) =>
            searchQuery ? (
              <SelectedProductCard product={result} key={result.id} />
            ) : (
              <ProductCard product={result} key={result.id} />
            ),
          )}
        </ul>
      ) : null}
    </>
  );
};

export default ProductsByCategoryId;
