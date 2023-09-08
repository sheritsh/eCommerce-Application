import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import SearchForm from '../features/filters/Search/SearchForm';
import Container from '../components/UI/container/Container';
import ProductsByParams from '../features/filters/ProductsByParams/ProductsByParams';
import Categories from '../features/Categories/Categories';
import Filters from '../components/Filters/Filters';
import { useAppDispatch } from '../store';
import SortForm from '../features/filters/Sorting/SortForm';
import { fetchProductsBySort } from '../features/filters/Sorting/fetch-products-by-sort';

const Catalog: React.FC = () => {
  const routerParams = useParams();
  const { categoryId } = routerParams;
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



  return (
    <div className="content">
      <Container>
        <div className="catalog">
          <h1>Catalog</h1>
          <div className="catalog-wrapper">
            <div className="filters-wrapper">
              <Categories />
              <Filters />
            </div>
            <div className="catalog-main">
              <div className="catalog-nav">
                <SearchForm />
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
