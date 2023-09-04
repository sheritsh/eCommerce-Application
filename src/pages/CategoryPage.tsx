import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from '../store';
import Container from '../components/UI/container/Container';
import { fetchCategories } from '../features/Categories/categories-slice';
import Categories from '../features/Categories/Categories';
import { IRootState } from '../features/types';
import { Languages } from '../api/types';
import ProductsByCategoryId from '../features/filters/ProductsByCategoryId/ProductsByCategoryId';
import SearchForm from '../features/filters/search/SearchForm';
import Filters from '../components/Filters/Filters';
import SortForm from '../features/filters/sorting/SortForm';

const CategoryPage: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const categories = useSelector((state: IRootState) => state.categories.categoriesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortQuery, setSortQuery] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (sortOption: string): void => {
    setSortQuery(sortOption);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

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
              <Filters />
            </div>
            <div className="catalog-main">
              <div className="catalog-nav">
                <SearchForm onSearch={handleSearch} />
                <SortForm onSort={handleSort} />
              </div>
              <ProductsByCategoryId categoryId={params.categoryId} searchQuery={searchQuery} sortQuery={sortQuery} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
