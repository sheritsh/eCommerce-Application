import React, { useState } from 'react';
import SearchForm from '../features/filters/search/SearchForm';
import Container from '../components/UI/container/Container';
import Products from '../features/Products/Products';
import Categories from '../features/Categories/Categories';

const Catalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="content">
      <Container>
        <div className="catalog">
          <h1>Catalog</h1>
          <Categories />
          <SearchForm onSearch={handleSearch} />
          <Products searchQuery={searchQuery} />
        </div>
      </Container>
    </div>
  );
};

export default Catalog;
