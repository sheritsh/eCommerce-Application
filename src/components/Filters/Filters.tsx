import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { Grid } from 'react-loader-spinner';
import { IRootState, useAppDispatch } from '../../store';
import BrandCheckbox from './Checkbox/BrandCheckbox/BrandCheckbox';
import ColorCheckbox from './Checkbox/ColorCheckbox/ColorCheckbox';
import PriceSlider from './PriceSlider/PriceSlider';
import SizeCheckbox from './Checkbox/SizeCheckbox/SizeCheckbox';
import classes from './Filters.module.scss';
import {
  fetchFiltersData,
  getFiltersData,
  checkBrands,
  checkColors,
  checkSizes,
  setPrice,
} from '../../features/FiltersParameters/filters-parameters-slice';
import { fetchProductsByParams } from '../../features/filters/ProductsByParams/fetch-products-by-params';
import Button from '../UI/button/Button';
import checkItem from '../../utils/catalog/check-items';
import { IBrand } from './Checkbox/BrandCheckbox/types';
import { IColor } from './Checkbox/ColorCheckbox/types';
import { ISize } from './Checkbox/SizeCheckbox/types';
import resetFilter from '../../utils/catalog/reset-filter';

const Filters: React.FC = () => {
  const location = useLocation();

  const routerParams = useParams();
  const { categoryId } = routerParams;

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const error = useSelector((state: IRootState) => state.filters.productsForFiltersData.error);

  const productsForFilters = useSelector((state: IRootState) => state.filters.productsForFiltersData.results);

  useEffect(() => {
    dispatch(getFiltersData(productsForFilters));
  }, [productsForFilters]);

  const startFilters = useSelector((state: IRootState) => state.filters.productsForFiltersData.filtersData);

  // get filter parameters
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
  } = startFilters;

  const [startPrice, setStartPrice] = useState([0, 0]);

  // Set min & max price for slider
  useEffect(() => {
    if (price[0] && startPrice[0] === 0 && startPrice[startPrice.length - 1] === 0) setStartPrice(price);
  }, [price]);

  const handleChangeCheckedBrand = (id: number): void => {
    const checkedBrands = checkItem(brands, id);
    dispatch(checkBrands(checkedBrands));
  };

  const handleChangeCheckedColor = (id: number): void => {
    const checkedColors = checkItem(colors, id);
    dispatch(checkColors(checkedColors));
  };

  const handleChangeCheckedSize = (id: number): void => {
    const checkedSizes = checkItem(sizes, id);
    dispatch(checkSizes(checkedSizes));
  };

  const handleChangePrice = (event?: Event, newValue?: number[]): void => {
    dispatch(setPrice(newValue as number[]));
  };

  useEffect(() => {
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

    let params = '';

    if (brandQuery) params += `&filter=variants.attributes.brand:${brandQuery}`;
    if (colorQuery) params += `&filter=variants.attributes.color.key:${colorQuery}`;
    if (sizeQuery) params += `&filter=variants.attributes.size:${sizeQuery}`;
    if (price[0] && price[price.length - 1])
      params += `&filter=variants.price.centAmount:range (${price[0]} to ${price[1]})`;
    dispatch(fetchProductsByParams({ params, categoryId }));
  }, [brands, colors, sizes, price]);

  const handleResetFilters = (): void => {
    dispatch(checkBrands(resetFilter(brands)));
    dispatch(checkColors(resetFilter(colors)));
    dispatch(checkSizes(resetFilter(sizes)));
    dispatch(setPrice(startPrice));
  };

  useEffect(() => {
    handleResetFilters();
    setStartPrice([0, 0]);
    setLoading(true);
    if (categoryId) {
      dispatch(fetchFiltersData(categoryId));
    } else {
      dispatch(fetchFiltersData(''));
    }
    setLoading(false);
  }, [categoryId, location]);
  return (
    <div className={classes.container}>
      {error && <b>{error}</b>}
      {loading ? (
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
      ) : (
        <>
          <div className={classes.filter}>
            <h4 className={classes.title}>Brands</h4>
            {brands?.length &&
              brands.map((brand: IBrand['brand']) => (
                <BrandCheckbox key={brand.id} brand={brand} handleChangeCheckedBrand={handleChangeCheckedBrand} />
              ))}
          </div>
          <div className={classes.filter}>
            <h4 className={classes.title}>Colors</h4>
            {colors?.length &&
              colors.map((color: IColor['color']) => (
                <ColorCheckbox key={color.id} color={color} handleChangeCheckedColor={handleChangeCheckedColor} />
              ))}
          </div>
          <div className={classes.filter}>
            <h4 className={classes.title}>Sizes</h4>
            {sizes?.length &&
              sizes.map((size: ISize['size']) => (
                <SizeCheckbox key={size.id} size={size} handleChangeCheckedSize={handleChangeCheckedSize} />
              ))}
          </div>
          <div className={classes.filter}>
            <h4 className={classes.title}>Price</h4>
            <PriceSlider
              price={{
                min: startPrice.length ? startPrice[0] : 0,
                max: startPrice.length ? startPrice[startPrice.length - 1] : 0,
              }}
              value={price.length ? price : []}
              changePrice={handleChangePrice}
            />
          </div>
          <Button text="Reset" onClick={handleResetFilters} />
        </>
      )}
    </div>
  );
};

export default Filters;
