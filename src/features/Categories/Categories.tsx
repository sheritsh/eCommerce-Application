import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { fetchCategories } from './categories-slice';
import { IRootState } from '../types';
import { Languages } from '../../api/types';
import classes from './Categories.module.scss';

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
        <ul className={classes.list}>
          {categories.results.map((result) => (
            <li key={result.id} className={classes.item}>
              <NavLink to={`/categories/${result.id}`} title={result.name[Languages.English]}>
                {result.name[Languages.English]}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default Categories;
