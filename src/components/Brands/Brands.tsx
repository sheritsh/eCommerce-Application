import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Brands.module.scss';
import brands from '../../assets/data/main-brands';

const Brands: React.FC = () => {
  return (
    <ul className={classes.list}>
      {brands.length
        ? brands.map((brand) => (
            <li className={classes.item} key={brand.id}>
              <Link to="/catalog">
                <img src={brand.url} alt={brand.alt} />
              </Link>
            </li>
          ))
        : null}
    </ul>
  );
};

export default Brands;
