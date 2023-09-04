import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Container from '../components/UI/container/Container';
import Categories from '../features/Categories/Categories';
import { IRootState } from '../features/types';
import { Languages } from '../api/types';
import ProductsByCategoryId from '../features/filters/ProductsByCategoryId/ProductsByCategoryId';
import SearchForm from '../features/filters/search/SearchForm';
import Filters from '../components/Filters/Filters';
import SortForm from '../features/filters/sorting/SortForm';
import { IResult, IObject } from '../features/Products/types';

const CategoryPage: React.FC = () => {
  const params = useParams();
  const categories = useSelector((state: IRootState) => state.categories.categoriesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortQuery, setSortQuery] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (sortOption: string): void => {
    setSortQuery(sortOption);
  };

  const products: IResult[] = useSelector((state: IRootState) => {
    const allProducts = state.products.productsData.results;
    return allProducts.filter((product: IResult[]) => 'masterData' in product);
  });

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
  };

  useEffect(() => {
    applyFilters();
  }, [brands, colors, sizes, prices]);

  const currentCategory = categories.results.filter((category) => category.id === params.categoryId)[0];
  const categoryName = currentCategory.name[Languages.English];

  return (
    <div className="content">
      <Container>
        <div className="catalog">
          <h1>{categoryName}</h1>
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
              <ProductsByCategoryId
                categoryId={params.categoryId}
                searchQuery={searchQuery}
                sortQuery={sortQuery}
                brands={brands}
                colors={colors}
                sizes={sizes}
                selectedPrice={selectedPrice}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
