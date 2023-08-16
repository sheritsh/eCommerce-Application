import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.module.css';
import Container from '../UI/container/Container';

const Header: React.FC = () => {
  return (
    <Container>
      <header>
        <div>Tourist Tracks Store</div>
        <nav>
          <ul className="header__nav nav">
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
      </header>
    </Container>
  );
};

export default Header;
