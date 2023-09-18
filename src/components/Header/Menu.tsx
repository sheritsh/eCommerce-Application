import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IRootState } from '../../store';
import { logout } from '../../features/Authorization/authorization-slice';
import { createCart, getHasCart } from '../../api/cart';
import classes from './Header.module.scss';
import Hamburger from '../UI/burger/Hamburger';
import {
  resetPromocode,
  fetchPromocodeDataRemove,
  fetchCartItems,
  clearCartState,
} from '../../features/Cart/cart-slice';

const Menu = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const isAuthenticated = useSelector((state: IRootState) => state.auth.authData.accessToken !== null);

  const dispatch = useDispatch();

  if (open) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'visible';
  }

  const accessToken = useSelector((state: IRootState) => state.auth.authData.accessToken);

  useEffect(() => {
    async function initializeApp(): Promise<void> {
      const hasCart = await getHasCart(accessToken);
      if (!hasCart) {
        createCart(accessToken);
      }
    }
    if (accessToken) initializeApp();
    dispatch(fetchCartItems(accessToken));
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
            <NavLink to="/catalog" onClick={(): void => setOpen(false)}>
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
