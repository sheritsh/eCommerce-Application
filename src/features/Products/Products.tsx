import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'react-loader-spinner';
import { useAppDispatch } from '../../store';
import { fetchProducts } from './products-slice';
import { IRootState } from '../types';
import classes from './Products.module.scss';
import ProductCard from './ProductCard/ProductCard';
import SelectedProductCard from './ProductCard/SelectedProductCard';
import { ISelectedProduct } from './types';

interface IProductsProps {
  categoryId?: string;
  searchQuery?: string;
}

const Products: React.FC<IProductsProps> = ({ categoryId, searchQuery }) => {
  const products = useSelector((state: IRootState) => state.products.productsData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts(searchQuery));
  }, [searchQuery]);
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
          {products.results.map((result) =>
            searchQuery ? (
              <SelectedProductCard product={result} key={result.id} />
            ) : (
              <ProductCard product={result} key={result.id} />
            ),
          )}
        </ul>
      ) : (
        <div className={classes.not_found}>No products matching your search criteria</div>
      )}
    </>
  );
};

export default Products;
