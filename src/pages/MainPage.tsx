import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Container from '../components/UI/container/Container';
import slides from '../assets/data/main-slider';
import Brands from '../components/Brands/Brands';
import MainCategories from '../components/MainCategories/MainCategories';

const MainPage: React.FC = () => {
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
        </div>
      </Container>
    </div>
  );
};

export default MainPage;
