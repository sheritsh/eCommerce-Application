import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch, IRootState } from '../../store';
import { fetchCategories } from './categories-slice';
import { Languages } from '../../api/types';
import classes from './Categories.module.scss';
import processChildCategories from '../../utils/catalog/process-child-categories';
import { setCategoryId } from '../filters/CategoryChange/category-change-slice';
import { setPrice, resetFilters } from '../FiltersParameters/filters-parameters-slice';
import { setSearchQuery } from '../filters/search/products-by-search-slice';

const Categories: React.FC = () => {
  const categories = useSelector((state: IRootState) => state.categories.categoriesData);
  const processedCategories = processChildCategories(categories.results);
  const searchQuery = useSelector((state: IRootState) => state.search.searchQuery);
  const categoryId = useSelector((state: IRootState) => state.categoryId.categoryId);

  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent, id: string): void => {
    if (id === categoryId) {
      e.preventDefault();
    } else {
      dispatch(resetFilters());
      if (searchQuery.length) dispatch(setSearchQuery(''));
      dispatch(setPrice([0, 0]));
      dispatch(setCategoryId(id));
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <>
      {categories.isLoading && null}
      {!categories.isLoading && categories.error ? <div>{categories.error}</div> : null}
      {!categories.isLoading && categories.results.length ? (
        <ul className={classes.list}>
          {categories.results.map((result) =>
            !result.parent ? (
              <li key={result.id} className={classes.item} id={result.id}>
                <NavLink
                  to={`/categories/${result.id}`}
                  title={result.name[Languages.English]}
                  onClick={(e): void => handleClick(e, result.id)}
                >
                  {result.name[Languages.English]}
                </NavLink>
                <ul className={classes.innerList}>
                  {processedCategories[result.id].map((childId) => (
                    <li key={childId} className={classes.innerItem} id={childId}>
                      <NavLink
                        to={`/categories/${childId}`}
                        onClick={(e): void => handleClick(e, childId)}
                        title={
                          categories.results.filter((category) => category.id === childId)[0].name[Languages.English]
                        }
                      >
                        {categories.results.filter((category) => category.id === childId)[0].name[Languages.English]}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            ) : null,
          )}
        </ul>
      ) : null}
    </>
  );
};

export default React.memo(Categories);
