import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import classes from './Header.module.scss';
import Container from '../UI/container/Container';
import { IRootState } from '../../store';
import { logout } from '../../features/Authorization/authorization-slice';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { createCart, getHasCart } from '../../api/cart';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: IRootState) => state.auth.authData.accessToken !== null);

  const handleLogout = (): void => {
    dispatch(logout());
  };

  const accessToken = useSelector((state: IRootState) => state.auth.authData.accessToken);

  useEffect(() => {
    async function initializeApp(): Promise<void> {
      const hasCart = await getHasCart(accessToken);
      if (!hasCart) {
        createCart(accessToken);
      }
    }
    if (accessToken) initializeApp();
  }, [accessToken]);

  const count = useSelector((state: IRootState) => state.cart.cartData.cartItems.length);

  return (
    <header>
      <Container>
        <div className={classes.header}>
          <div className={classes.header__title} id="title">
            <Link to="/">Tourist Tracks Store</Link>
          </div>
          <nav>
            <ul className={classes.nav}>
              <li>
                <NavLink to="/">Main</NavLink>
              </li>
              <li>
                <NavLink to="/catalog">Catalog</NavLink>
              </li>
              <li>
                <NavLink to="/shopping-cart">
                  <div className={classes.cart}>
                    Cart
                    <ShoppingCartIcon fontSize="small" />
                    <span>{count || 0}</span>
                  </div>
                </NavLink>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <NavLink to="/profile">Profile</NavLink>
                  </li>
                  <li>
                    <Link to="/" onClick={handleLogout}>
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
        <Breadcrumbs />
      </Container>
    </header>
  );
};

export default Header;
