import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import SearchForm from '../features/filters/search/SearchForm';
import Container from '../components/UI/container/Container';
import Products from '../features/Products/Products';
import Categories from '../features/Categories/Categories';
import Filters from '../components/Filters/Filters';
import { IObject, IResult, ISelectedProduct } from '../features/Products/types';
import SortForm from '../features/filters/sorting/SortForm';
import { productsReducer } from '../features/Products/products-slice';

const Catalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortQuery, setSortQuery] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const products = useSelector((state: IRootState) => state.products.productsData.results);

  if (products) {
    const attributesBrand = products.map(
      (product) =>
        product.masterData.staged.masterVariant.attributes.filter((attribute) => attribute.name === 'brand')[0]
          .value as string,
    );
    const startBrands = [...new Set(attributesBrand)].sort().map((element, index) => {
      return {
        id: index,
        checked: false,
        label: element,
      };
    });

    const [brands, setBrands] = useState(startBrands);

    const attributesColorObject = products.map(
      (product) =>
        product.masterData.staged.masterVariant.attributes.filter(
          (attribute) => attribute.name === 'color',
        )[0] as IObject,
    );
    const attributesColor = attributesColorObject.map((obj) => obj.value.key);

    const startColors = [...new Set(attributesColor)].sort().map((element, index) => {
      return {
        id: index,
        checked: false,
        label: element,
      };
    });

    const [colors, setColors] = useState(startColors);

    const attributesSize = products.map(
      (product) =>
        product.masterData.staged.masterVariant.attributes.filter((attribute) => attribute.name === 'size')[0]
          .value as number,
    );
    const startSizes = [...new Set(attributesSize)]
      .sort((a, b) => a - b)
      .map((element, index) => {
        return {
          id: index,
          checked: false,
          label: element,
        };
      });

    const [sizes, setSizes] = useState(startSizes);

    const prices = [
      ...new Set(
        products.map((product) =>
          product.masterData.staged.masterVariant.prices[0].discounted
            ? product.masterData.staged.masterVariant.prices[0].discounted.value.centAmount
            : product.masterData.staged.masterVariant.prices[0].value.centAmount,
        ),
      ),
    ].sort((a, b) => a - b);

    const [selectedPrice, setSelectedPrice] = useState([prices[0], prices[prices.length - 1]]);

    const handleChangePrice = (event?: Event, newValue?: number[]): void => {
      setSelectedPrice(newValue as number[]);
    };

    const handleChangeCheckedBrand = (id: number): void => {
      const brandsStateList = brands;
      const changeCheckedBrands = brandsStateList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      );
      setBrands(changeCheckedBrands);
    };

    const handleChangeCheckedColor = (id: number): void => {
      const colorsStateList = colors;
      const changeCheckedColors = colorsStateList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      );
      setColors(changeCheckedColors);
    };

    const handleChangeCheckedSize = (id: number): void => {
      const sizesStateList = sizes;
      const changeCheckedSizes = sizesStateList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      );
      setSizes(changeCheckedSizes);
    };

    const applyFilters = (): void => {
      // Brand Filter
      const brandsChecked = brands.filter((item) => item.checked).map((item) => item.label.toLowerCase());

      // Color Filter
      const colorsChecked = colors.filter((item) => item.checked).map((item) => item.label.toLowerCase());

      // Size Filter
      const sizesChecked = sizes.filter((item) => item.checked).map((item) => item.label);

      // Price Filter
      const minPrice = selectedPrice[0];
      const maxPrice = selectedPrice[1];

      console.log('changed', brandsChecked, colorsChecked, sizesChecked, 'min', minPrice, 'max', maxPrice);
    };

    useEffect(() => {
      applyFilters();
    }, [brands, colors, sizes, prices]);

    const handleSort = (sortOption: string): void => {
      setSortQuery(sortOption);
    };
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
                  prices={prices}
                  selectedPrice={selectedPrice}
                  changePrice={handleChangePrice}
                />
              </div>
              <div className="catalog-main">
                <div className="catalog-nav">
                  <SearchForm onSearch={handleSearch} />
                  <SortForm onSort={handleSort} />
                </div>
                <Products searchQuery={searchQuery} sortQuery={sortQuery} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return null;
};

export default Catalog;
