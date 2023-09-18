import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchForm from '../features/filters/search/SearchForm';
import Container from '../components/UI/container/Container';
import ProductsByParams from '../features/filters/ProductsByParams/ProductsByParams';
import Categories from '../features/Categories/Categories';
import Filters from '../components/Filters/Filters';
import SortForm from '../features/filters/sorting/SortForm';
import PaginationBlock from '../features/Pagination/Pagination';
import { fetchCartItems } from '../features/Cart/cart-slice';
import Popup from '../components/UI/popup/Popup';
import { IRootState } from '../store';

const Catalog: React.FC = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: IRootState) => state.auth.authData.accessToken);
  if (accessToken) {
    setTimeout(() => {
      dispatch(fetchCartItems(accessToken));
    }, 1500);
  }
  const [isSuccessPopupActive, setSuccessPopupActive] = useState(false);

  if (!localStorage.getItem('anonymousToken') || !accessToken) {
    dispatch(fetchCartItems(null));
  }

  return (
    <div className="content">
      <Container>
        <div className="catalog">
          <h1>Catalog</h1>
          <div className="catalog-wrapper">
            <div className="filters-wrapper">
              <Categories />
              <Filters />
            </div>
            <div className="catalog-main">
              <div className="catalog-nav">
                <SearchForm />
                <SortForm />
              </div>
              <ProductsByParams popupToggle={setSuccessPopupActive} />
              <PaginationBlock />
            </div>
          </div>
        </div>
        <Popup
          active={isSuccessPopupActive}
          setActive={setSuccessPopupActive}
          popupType="info"
          message="Product successfully added to the cart"
        />
      </Container>
    </div>
  );
};

export default Catalog;
