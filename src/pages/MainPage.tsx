import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Container from '../components/UI/container/Container';
import slides from '../assets/data/main-slider';
import Brands from '../components/Brands/Brands';
import MainCategories from '../components/MainCategories/MainCategories';
import { getHasCart, createCart } from '../api/cart';
import { IRootState } from '../store';

const MainPage: React.FC = () => {
  const accessToken = useSelector((state: IRootState) => state.auth.authData.accessToken);
  useEffect(() => {
    if (accessToken) {
      (async function initializeCart(): Promise<void> {
        const hasCart = await getHasCart(accessToken);
        if (!hasCart) {
          await createCart(accessToken);
        }
      })();
    }
  }, []);
  return (
    <div className="content">
      <Container>
        <div className="main">
          <h1>Famous brands, good quality</h1>
          <Splide
            aria-label="Our actions"
            options={{
              rewind: true,
              width: '100%',
              gap: '1rem',
            }}
          >
            {slides.length
              ? slides.map((slide) => (
                  <SplideSlide key={slide.id}>
                    <img width="100%" src={slide.url} alt={slide.alt} />
                  </SplideSlide>
                ))
              : null}
          </Splide>
          <Brands />
          <MainCategories />
          {/* <h2>All pages of Sprint #3:</h2>
          <ul>
            <li>
              <Link to="/catalog">Catalog Page</Link>
            </li>
            <li>
              <Link to="/login">Login Page</Link>
            </li>
            <li>
              <Link to="/registration">Registration Page</Link>
            </li>
            <li>
              <Link to="/profile">Profile Page</Link>
            </li>
            <li>
              <Link to="/shopping-cart">Cart Page</Link>
            </li>
            <li>
              <Link to="/kakayato-eres">404 Not Found Page</Link>
            </li>
          </ul> */}
        </div>
      </Container>
    </div>
  );
};

export default MainPage;
