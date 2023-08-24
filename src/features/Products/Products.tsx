import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { fetchProducts } from './products-slice';
import { IRootState } from '../../components/UI/forms/form/type';
import { Languages } from './types';

const Products: React.FC = () => {
  const products = useSelector((state: IRootState) => state.products.productsData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <>
      {products.isLoading && <div>Loading...</div>}
      {!products.isLoading && products.error ? <div>{products.error}</div> : null}
      {!products.isLoading && products.results.length ? (
        <ul>
          {products.results.map((result) => (
            <li key={result.id}>
              <h3>{result.masterData.staged.name[Languages.English]}</h3>
              <span>
                Price:{' '}
                <strong>
                  {result.masterData.staged.masterVariant.prices[0].value.centAmount}{' '}
                  {result.masterData.staged.masterVariant.prices[0].value.currencyCode}
                </strong>
              </span>
              <img
                src={result.masterData.staged.masterVariant.images[0].url}
                alt={result.masterData.staged.name[Languages.English]}
              />
              <p>{result.masterData.staged.description[Languages.English]}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default Products;
