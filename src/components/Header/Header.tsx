import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.module.css';
import Container from '../UI/container/Container';

const Header: React.FC = () => {
  return (
    <header>
      <Container>
        <div>Tourist Tracks Store</div>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Main Page</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/registration">Register</NavLink>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
