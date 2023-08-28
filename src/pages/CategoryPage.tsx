import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from '../store';
import Container from '../components/UI/container/Container';
import { fetchCategories } from '../features/Categories/categories-slice';
import H1 from '../components/UI/titles/h1/H1';
import Categories from '../features/Categories/Categories';
import { IRootState } from '../features/types';
import { Languages } from '../api/types';
import Products from '../features/Products/Products';

const CategoryPage: React.FC = () => {
  const params = useParams();
  const categories = useSelector((state: IRootState) => state.categories.categoriesData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  const currentCategory = categories.results.filter((category) => category.id === params.categoryId)[0];
  const categoryName = currentCategory.name[Languages.English];

  return (
    <div className="content">
      <Container>
        <div className="catalog">
          <H1 text={categoryName} />
          <Categories />
          <Products categoryId={params.categoryId} />
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
