import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import SearchForm from '../features/filters/Search/SearchForm';
import Container from '../components/UI/container/Container';
import ProductsByParams from '../features/filters/ProductsByParams/ProductsByParams';
import Categories from '../features/Categories/Categories';
import Filters from '../components/Filters/Filters';
import { useAppDispatch, IRootState } from '../store';
import { fetchProductsByParams } from '../features/filters/ProductsByParams/fetch-products-by-params';
import Button from '../components/UI/button/Button';
import { fetchProductsBySearch } from '../features/filters/Search/fetch-products-by-search';
import SortForm from '../features/filters/Sorting/SortForm';
import { fetchProductsBySort } from '../features/filters/Sorting/fetch-products-by-sort';
import getFiltersParameters from '../utils/catalog/get-filters-parameters';
import applyFilters from '../utils/catalog/apply-filters';

const Catalog: React.FC = () => {
  const routerParams = useParams();
  const { categoryId } = routerParams;
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [sortQuery, setSortQuery] = useState('');

  const handleSort = (sortOption: string): void => {
    setSortQuery(sortOption);
  };

  useEffect(() => {
    let endpoint = '';
    if (sortQuery) {
      if (sortQuery === 'sort=name.en-US') {
        endpoint = `?${sortQuery}`;
      } else {
        endpoint = `search?${sortQuery}`;
      }
      if (endpoint) dispatch(fetchProductsBySort(endpoint, categoryId));
    }
  }, [sortQuery]);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchProductsBySearch(searchQuery, categoryId));
    }
  }, [searchQuery]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const productsForFilters = useSelector((state: IRootState) => state.filters.productsForFiltersData.results);

  const startFilters = getFiltersParameters(productsForFilters);

  // get filter parameters
  const { startBrands, startColors, startSizes, startPrice } = startFilters;

  const [brands, setBrands] = useState(startBrands);
  useEffect(() => {
    setBrands(startBrands);
  }, [categoryId, location]);
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
  useEffect(() => {
    setSelectedPrice([startPrice[0], startPrice[startPrice.length - 1]]);
  }, []);
  const handleChangePrice = (event?: Event, newValue?: number[]): void => {
    setSelectedPrice(newValue as number[]);
  };

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
    if (selectedPrice[0] && selectedPrice[1])
      params += `&filter=variants.price.centAmount:range (${selectedPrice[0]} to ${selectedPrice[1]})`;

    if (brandQuery || colorQuery || sizeQuery || selectedPrice) {
      dispatch(fetchProductsByParams(params, categoryId));
    }
  }, [brands, colors, sizes, selectedPrice, categoryId]);

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
    setSearchQuery('');
  };

  useEffect(() => {
    handleResetFilters();
  }, [categoryId, location]);

  return (
    <div className="content">
      <Container>
        <div className="catalog">
          <h1>Catalog</h1>
          <div className="catalog-wrapper">
            <div className="filters-wrapper">
              <Categories />
              <Filters
                brands={brands}
                handleChangeCheckedBrand={handleChangeCheckedBrand}
                colors={colors}
                handleChangeCheckedColor={handleChangeCheckedColor}
                sizes={sizes}
                handleChangeCheckedSize={handleChangeCheckedSize}
                prices={startPrice}
                selectedPrice={selectedPrice}
                changePrice={handleChangePrice}
              />
              <Button text="Reset" onClick={handleResetFilters} />
            </div>
            <div className="catalog-main">
              <div className="catalog-nav">
                <SearchForm onSearch={handleSearch} />
                <SortForm onSort={handleSort} />
              </div>
              <ProductsByParams />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Catalog;
