import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import classes from './Header.module.css';
import Container from '../UI/container/Container';
import { IRootState } from '../../store';
import { logout } from '../../store/auth/reducer';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: IRootState) => state.auth.authData.accessToken !== null);

  const handleLogout = (): void => {
    dispatch(logout());
  };

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
              {isAuthenticated ? (
                <>
                  <li>
                    <NavLink to="/profile">Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to="/shopping-cart">Cart</NavLink>
                  </li>
                  <li>
                    <Link to="/dist" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/login">Sign In</NavLink>
                  </li>
                  <li>
                    <NavLink to="/registration">Sign Up</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
