import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'react-loader-spinner';
import { useAppDispatch } from '../../store';
import { fetchProductDetails } from './detailed-products-slice';
import { IRootState } from '../types';
// import classes from './DetailedProduct.module.scss';

interface IProductsProps {
  categoryId?: string;
}

const DetailedProduct: React.FC<IProductsProps> = () => {
  const products = useSelector((state: IRootState) => state.products.productsData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProductDetails());
  }, []);
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
      {!products.isLoading && products.results.length ? <>FETCHED IN CONSOLE</> : null}
    </>
  );
};

export default DetailedProduct;
