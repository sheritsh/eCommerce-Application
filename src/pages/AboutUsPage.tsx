import React from 'react';
import Container from '../components/UI/container/Container';
import AboutUs from '../features/AboutUs/AboutUs';

const AboutUsPage: React.FC = () => {
  return (
    <div className="content">
      <Container>
        <AboutUs />
      </Container>
    </div>
  );
};

export default AboutUsPage;
