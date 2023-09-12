import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Grid } from 'react-loader-spinner';
import { IRootState, useAppDispatch } from '../../../store';
import classes from '../../Products/Products.module.scss';
import ProductCard from '../../Products/ProductCard/ProductCard';
import { fetchProductsByParams } from './fetch-products-by-params';
import { IBrand } from '../../../components/Filters/Checkbox/BrandCheckbox/types';
import { IColor } from '../../../components/Filters/Checkbox/ColorCheckbox/types';
import { ISize } from '../../../components/Filters/Checkbox/SizeCheckbox/types';
import { setPage } from '../../Pagination/pagination-slice';

const ProductsByParams: React.FC = () => {
  const dispatch = useAppDispatch();
  const routerParams = useParams();
  const { categoryId } = routerParams;
  // get filter parameters
  const actualFilters = useSelector((state: IRootState) => state.filters.productsForFiltersData.filtersData);
  const {
    brands,
    colors,
    sizes,
    price,
  }: {
    brands: IBrand['brand'][];
    colors: IColor['color'][];
    sizes: ISize['size'][];
    price: number[];
  } = actualFilters;

  const page = useSelector((state: IRootState) => state.pagination.page);
  const offset = useSelector((state: IRootState) => state.pagination.offset);

  let params = '';

  useEffect(() => {
    // Same code in Filter component.
    const brandQuery = brands
      ?.filter((brand) => brand.checked)
      .map((element) => `"${element.label}"`)
      .join(',');
    const colorQuery = colors
      ?.filter((color) => color.checked)
      .map((element) => `"${element.label}"`)
      .join(',');
    const sizeQuery = sizes
      ?.filter((size) => size.checked)
      .map((element) => `"${element.label}"`)
      .join(',');

    if (brandQuery) params += `&filter=variants.attributes.brand:${brandQuery}`;
    if (colorQuery) params += `&filter=variants.attributes.color.key:${colorQuery}`;
    if (sizeQuery) params += `&filter=variants.attributes.size:${sizeQuery}`;
    if (price[0] && price[price.length - 1])
      params += `&filter=variants.price.centAmount:range (${price[0]} to ${price[1]})`;
    params += `&offset=${offset}`;
    // To dispay products
    dispatch(fetchProductsByParams({ params, categoryId, offset }));
  }, [page, brands, colors, sizes, price]);
  useEffect(() => {
    dispatch(setPage(1));
    // To count pages in pagination
    dispatch(fetchProductsByParams({ params, categoryId, limit: 100 }));
  }, [categoryId, brands, colors, sizes, price]);
  const products = useSelector((state: IRootState) => state.products.productsData);
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
      {!products.isLoading && products.results.length ? (
        <ul className={classes.list}>
          {products.results.map((result) => (
            <ProductCard product={result} key={result.id} />
          ))}
        </ul>
      ) : (
        <div className={classes.not_found}>No products matching your search criteria</div>
      )}
    </>
  );
};

export default ProductsByParams;
