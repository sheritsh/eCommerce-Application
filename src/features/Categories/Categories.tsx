import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { fetchCategories } from './categories-slice';
import { IRootState } from '../types';
import { Languages } from '../../api/types';

const Categories: React.FC = () => {
  const categories = useSelector((state: IRootState) => state.categories.categoriesData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <>
      {categories.isLoading && <div>Loading...</div>}
      {!categories.isLoading && categories.error ? <div>{categories.error}</div> : null}
      {!categories.isLoading && categories.results.length ? (
        <ul>
          {categories.results.map((result) => (
            <li key={result.id}>{result.name[Languages.English]}</li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default Categories;
