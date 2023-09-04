import React, { useState } from 'react';
import SearchForm from '../features/filters/search/SearchForm';
import Container from '../components/UI/container/Container';
import Products from '../features/Products/Products';
import Categories from '../features/Categories/Categories';
import Filters from '../components/Filters/Filters';
import SortForm from '../features/filters/sorting/SortForm';

const Catalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortQuery, setSortQuery] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

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
              <Filters />
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
};

export default Catalog;
