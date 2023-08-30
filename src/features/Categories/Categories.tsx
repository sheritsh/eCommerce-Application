import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid } from 'react-loader-spinner';
import { useAppDispatch } from '../../store';
import { fetchCategories } from './categories-slice';
import { IRootState } from '../types';
import { Languages } from '../../api/types';
import classes from './Categories.module.scss';
import processChildCategories from '../../utils/catalog/process-child-categories';

const Categories: React.FC = () => {
  const categories = useSelector((state: IRootState) => state.categories.categoriesData);
  const processedCategories = processChildCategories(categories.results);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <>
      {categories.isLoading && (
        <Grid
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="spinner"
          visible={true}
        />
      )}
      {!categories.isLoading && categories.error ? <div>{categories.error}</div> : null}
      {!categories.isLoading && categories.results.length ? (
        <ul className={classes.list}>
          {categories.results.map((result) =>
            !result.parent ? (
              <li key={result.id} className={classes.item} id={result.id}>
                <NavLink to={`/categories/${result.id}`} title={result.name[Languages.English]}>
                  {result.name[Languages.English]}
                </NavLink>
                <ul className={classes.innerList}>
                  {processedCategories[result.id].map((childId) => (
                    <li key={childId} className={classes.innerItem} id={childId}>
                      <NavLink
                        to={`/categories/${childId}`}
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

export default Categories;
