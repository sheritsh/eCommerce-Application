import React from 'react';
import SearchForm from '../features/filters/search/SearchForm';
import Container from '../components/UI/container/Container';
import ProductsByParams from '../features/filters/ProductsByParams/ProductsByParams';
import Categories from '../features/Categories/Categories';
import Filters from '../components/Filters/Filters';
import SortForm from '../features/filters/sorting/SortForm';
import PaginationBlock from '../features/Pagination/Pagination';

const Catalog: React.FC = () => {
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
                <SortForm />
              </div>
              <ProductsByParams />
              <PaginationBlock />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Catalog;
