import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppDispatch, IRootState } from '../../store';
import { logout } from '../../features/Authorization/authorization-slice';
import {
  createCart,
  getHasCart,
  resetPromocode,
  fetchPromocodeDataRemove,
  fetchCartItems,
  clearCartState,
} from '../../features/Cart/cart-slice';
import classes from './Header.module.scss';
import Hamburger from '../UI/burger/Hamburger';
import { setCategoryId } from '../../features/filters/CategoryChange/category-change-slice';
import { resetFilters, setPrice } from '../../features/FiltersParameters/filters-parameters-slice';
import { setSearchQuery } from '../../features/filters/search/products-by-search-slice';

const Menu = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const isAuthenticated = useSelector((state: IRootState) => state.auth.authData.accessToken !== null);
  const searchQuery = useSelector((state: IRootState) => state.search.searchQuery);

  const dispatch = useAppDispatch();

  if (open) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'visible';
  }

  const accessToken = useSelector((state: IRootState) => state.auth.authData.accessToken);

  async function initializeApp(): Promise<void> {
    if (accessToken) {
      const hasCart = await getHasCart(accessToken);
      if (!hasCart) {
        createCart(accessToken);
      }
    }
  }

  useEffect(() => {
    initializeApp();
    if (accessToken) dispatch(fetchCartItems(accessToken));
  }, [accessToken]);

  const count = useSelector((state: IRootState) => state.cart.cartData.cartItems.length);

  const cartId = useSelector((state: IRootState) => state.cart.cartData.cartId);
  const cartVersion = useSelector((state: IRootState) => state.cart.cartData.actualCartVer);
  const promocodeId = useSelector((state: IRootState) => state.cart?.promocodeId);

  const username = useSelector((state: IRootState) => state.auth.authData.credentials.login);
  const password = useSelector((state: IRootState) => state.auth.authData.credentials.password);

  const handleLogout = (): void => {
    dispatch(clearCartState());
    if (promocodeId) dispatch(fetchPromocodeDataRemove({ promocodeId, cartId, cartVersion, username, password }));
    dispatch(logout());
    dispatch(resetPromocode());
  };

  return (
    <div>
      <nav className={!open ? classes.nav : `${classes.nav} ${classes.nav_active}`}>
        <ul className={!open ? classes.navList : `${classes.navList_active} ${classes.navList}`}>
          <li>
            <NavLink to="/" onClick={(): void => setOpen(false)}>
              Main
            </NavLink>
          </li>
          <li>
            <NavLink to="/about_us" onClick={(): void => setOpen(false)}>
              About us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/catalog"
              onClick={(e): void => {
                setOpen(false);
                const locationToArray = window.location.href.split('/');
                if (locationToArray[locationToArray.length - 1] === 'catalog') {
                  e.preventDefault();
                } else {
                  dispatch(resetFilters());
                  if (searchQuery.length) dispatch(setSearchQuery(''));
                  dispatch(setPrice([0, 0]));
                  dispatch(setCategoryId(''));
                }
              }}
            >
              Catalog
            </NavLink>
          </li>
          <li>
            <NavLink to="/shopping-cart" onClick={(): void => setOpen(false)}>
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
                <NavLink to="/profile" onClick={(): void => setOpen(false)}>
                  Profile
                </NavLink>
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
                <NavLink to="/login" onClick={(): void => setOpen(false)}>
                  Sign In
                </NavLink>
              </li>
              <li>
                <NavLink to="/registration" onClick={(): void => setOpen(false)}>
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div onClick={(): void => setOpen(!open)}>
        <Hamburger open={open} />
      </div>
    </div>
  );
};

export default Menu;
