import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'react-loader-spinner';
import { useAppDispatch } from '../../store';
import { fetchProducts } from './products-slice';
import { IRootState } from '../types';
import classes from './Products.module.scss';
import ProductCard from './ProductCard/ProductCard';
import SelectedProductCard from './ProductCard/SelectedProductCard';
import { IResult, ISelectedProduct } from './types';

interface IFilterQuery {
  brands: {
    id: number;
    checked: boolean;
    label: string;
  }[];
  colors: {
    id: number;
    checked: boolean;
    label: string;
  }[];
  sizes: {
    id: number;
    checked: boolean;
    label: number;
  }[];
  selectedPrice: number[];
}

interface IFilterProp {
  id: number;
  checked: boolean;
  label: string;
}

interface IFilterPropNumber {
  id: number;
  checked: boolean;
  label: number;
}

interface IProductsProps {
  categoryId?: string;
  searchQuery?: string;
  sortQuery?: string;
  brands: IFilterProp[];
  colors: IFilterProp[];
  sizes: IFilterPropNumber[];
  selectedPrice: number[];
}

const Products: React.FC<IProductsProps> = ({
  categoryId = '',
  searchQuery = '',
  sortQuery = '',
  brands,
  colors,
  sizes,
  selectedPrice,
}) => {
  const products = useSelector((state: IRootState) => state.products.productsData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts(searchQuery, sortQuery, brands, colors, sizes, selectedPrice));
  }, [searchQuery, sortQuery, brands, colors, sizes, selectedPrice]);
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
            searchQuery ||
            sortQuery ||
            brands.some((brand) => brand.checked) ||
            colors.some((color) => color.checked) ||
            sizes.some((size) => size.checked) ||
            selectedPrice[0] > 3605 ||
            selectedPrice[1] < 13279 ? (
              <SelectedProductCard product={result as ISelectedProduct} key={result.id} />
            ) : (
              <ProductCard product={result as IResult} key={result.id} />
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
