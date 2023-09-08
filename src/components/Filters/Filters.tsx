import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { IRootState, useAppDispatch } from '../../store';
import BrandCheckbox from './Checkbox/BrandCheckbox/BrandCheckbox';
import ColorCheckbox from './Checkbox/ColorCheckbox/ColorCheckbox';
import PriceSlider from './PriceSlider/PriceSlider';
import SizeCheckbox from './Checkbox/SizeCheckbox/SizeCheckbox';
import classes from './Filters.module.scss';
import { IPrice } from './PriceSlider/types';
import { fetchFiltersData } from '../../features/FiltersParameters/filters-parameters-slice';
import { fetchProductsByParams } from '../../features/filters/ProductsByParams/fetch-products-by-params';
import getFiltersParameters from '../../utils/catalog/get-filters-parameters';
import applyFilters from '../../utils/catalog/apply-filters';
import Button from '../UI/button/Button';

const Filters: React.FC = () => {
  const location = useLocation();

  const routerParams = useParams();
  const { categoryId } = routerParams;

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const error = useSelector((state: IRootState) => state.filters.productsForFiltersData.error);
  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      dispatch(fetchFiltersData(categoryId));
    } else {
      dispatch(fetchFiltersData(''));
    }
    setLoading(false);
  }, [categoryId]);

  const productsForFilters = useSelector((state: IRootState) => state.filters.productsForFiltersData.results);

  const startFilters = getFiltersParameters(productsForFilters);

  // get filter parameters
  const { startBrands, startColors, startSizes, startPrice } = startFilters;

  const [brands, setBrands] = useState(startBrands);

  const handleChangeCheckedBrand = (id: number): void => {
    const brandsStateList = brands;
    const changeCheckedBrands = brandsStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item,
    );
    setBrands(changeCheckedBrands);
  };

  const [colors, setColors] = useState(startColors);
  const handleChangeCheckedColor = (id: number): void => {
    const colorsStateList = colors;
    const changeCheckedColors = colorsStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item,
    );
    setColors(changeCheckedColors);
  };

  const [sizes, setSizes] = useState(startSizes);
  const handleChangeCheckedSize = (id: number): void => {
    const sizesStateList = sizes;
    const changeCheckedSizes = sizesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item,
    );
    setSizes(changeCheckedSizes);
  };

  const [selectedPrice, setSelectedPrice] = useState([startPrice[0], startPrice[startPrice.length - 1]]);
  const handleChangePrice = (event?: Event, newValue?: number[]): void => {
    setSelectedPrice(newValue as number[]);
  };

  useEffect(() => {
    setBrands(startBrands);
    setSizes(startSizes);
    setColors(startColors);
    setSelectedPrice([startPrice[0], startPrice[startPrice.length - 1]]);
  }, [productsForFilters]);

  useEffect(() => {
    const checkedFilters = applyFilters({ brands, colors, sizes, selectedPrice });
    const { brandsChecked, colorsChecked, sizesChecked } = checkedFilters;
    const brandQuery = brandsChecked.map((element) => `"${element}"`).join(',');
    const colorQuery = colorsChecked.map((element) => `"${element}"`).join(',');
    const sizeQuery = sizesChecked.map((element) => `"${element}"`).join(',');

    let params = '';

    if (brandQuery) params += `&filter=variants.attributes.brand:${brandQuery}`;
    if (colorQuery) params += `&filter=variants.attributes.color.key:${colorQuery}`;
    if (sizeQuery) params += `&filter=variants.attributes.size:${sizeQuery}`;
    params += `&filter=variants.price.centAmount:range (${selectedPrice[0]} to ${selectedPrice[1]})`;

    dispatch(fetchProductsByParams(params, categoryId));
  }, [brands, colors, sizes, selectedPrice]);

  const handleResetFilters = (): void => {
    const changeCheckedBrands = brands.map((item) => {
      return { ...item, checked: false };
    });
    setBrands(changeCheckedBrands);
    const changeCheckedColors = colors.map((item) => {
      return { ...item, checked: false };
    });
    setColors(changeCheckedColors);
    const changeCheckedSizes = sizes.map((item) => {
      return { ...item, checked: false };
    });
    setSizes(changeCheckedSizes);
    setSelectedPrice([startPrice[0], startPrice[startPrice.length - 1]]);
    // setSearchQuery('');
  };
  useEffect(() => {
    handleResetFilters();
  }, [categoryId, location]);
  return (
    <div className={classes.container}>
      {error && <b>{error}</b>}
      {loading ? (
        'loading...'
      ) : (
        <>
          <div className={classes.filter}>
            <h4 className={classes.title}>Brands</h4>
            {brands.map((brand, index) => (
              <BrandCheckbox key={index} brand={brand} handleChangeCheckedBrand={handleChangeCheckedBrand} />
            ))}
          </div>
          <div className={classes.filter}>
            <h4 className={classes.title}>Colors</h4>
            {colors.map((color, index) => (
              <ColorCheckbox key={index} color={color} handleChangeCheckedColor={handleChangeCheckedColor} />
            ))}
          </div>
          <div className={classes.filter}>
            <h4 className={classes.title}>Sizes</h4>
            {sizes.map((size, index) => (
              <SizeCheckbox key={index} size={size} handleChangeCheckedSize={handleChangeCheckedSize} />
            ))}
          </div>
          <div className={classes.filter}>
            <h4 className={classes.title}>Price</h4>
            <PriceSlider
              price={{ min: startPrice[0], max: startPrice[startPrice.length - 1] } as IPrice['price']}
              value={selectedPrice}
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
