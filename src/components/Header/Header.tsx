import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import classes from './Header.module.css';
import Container from '../UI/container/Container';

const Header: React.FC = () => {
  return (
    <header>
      <Container>
        <div className={classes.header}>
          <div className={classes.header__title} id="title">
            <Link to="/dist">Tourist Tracks Store</Link>
          </div>
          <nav>
            <ul className={classes.nav}>
              <li>
                <NavLink to="/dist">Main Page</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/registration">Register</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
