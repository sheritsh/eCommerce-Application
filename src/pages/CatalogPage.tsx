import React, { useState } from 'react';
import SearchForm from '../features/filters/search/SearchForm';
import Container from '../components/UI/container/Container';
import Products from '../features/Products/Products';
import Categories from '../features/Categories/Categories';
import Filters from '../components/Filters/Filters';

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
          <div className="catalog-wrapper">
            <div className="filters-wrapper">
              <Categories />
              <SearchForm onSearch={handleSearch} />
              <Filters
              // selectedCategory={selectedCategory}
              // selectCategory={handleSelectCategory}
              // selectedRating={selectedRating}
              // selectedPrice={selectedPrice}
              // selectRating={handleSelectRating}
              // cuisines={cuisines}
              // changeChecked={handleChangeChecked}
              // changePrice={handleChangePrice}
              />
            </div>
            <Products searchQuery={searchQuery} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Catalog;
